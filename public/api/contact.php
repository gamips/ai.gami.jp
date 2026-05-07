<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

function respond(int $statusCode, array $payload): never
{
  http_response_code($statusCode);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['success' => false, 'message' => 'POST only.']);
}

if (!function_exists('mail')) {
  respond(500, ['success' => false, 'message' => 'メール送信関数が利用できません。']);
}

function sanitizeValue(?string $value): string
{
  $value = trim((string) $value);
  $value = preg_replace('/[\r\n]+/', ' ', $value) ?? '';
  return preg_replace('/[\x00-\x1F\x7F]/u', '', $value);
}

function parseRequestPayload(): array
{
  $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));

  if (str_contains($contentType, 'application/json')) {
    $rawPayload = file_get_contents('php://input');
    $payload = json_decode($rawPayload ?: '', true);
    if (is_array($payload)) {
      return $payload;
    }
    respond(400, ['success' => false, 'message' => 'Invalid JSON payload.']);
  }

  if (!empty($_POST)) {
    return $_POST;
  }

  parse_str((string) file_get_contents('php://input'), $parsed);
  return is_array($parsed) ? $parsed : [];
}

function encodeHeaderValue(string $value): string
{
  $value = trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
  if ($value === '') {
    return '';
  }

  if (!preg_match('/[^\x20-\x7E]/', $value)) {
    return $value;
  }

  return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function isFreemailAddress(string $email): bool
{
  $domain = strtolower((string) substr(strrchr($email, '@') ?: '', 1));
  if ($domain === '') {
    return false;
  }

  $freemailDomains = [
    'gmail.com',
    'googlemail.com',
    'yahoo.co.jp',
    'yahoo.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'outlook.com',
    'hotmail.com',
    'live.jp',
    'live.com',
    'msn.com',
  ];

  return in_array($domain, $freemailDomains, true);
}

function sendMailWithEnvelope(string $to, string $subject, string $body, array $headers, string $envelopeFrom): bool
{
  $headerText = implode("\r\n", $headers);

  if (@mail($to, $subject, $body, $headerText, "-f{$envelopeFrom}")) {
    return true;
  }

  return @mail($to, $subject, $body, $headerText);
}

$payload = parseRequestPayload();

$name = sanitizeValue((string) ($payload['name'] ?? ''));
$company = sanitizeValue((string) ($payload['company'] ?? ''));
$email = sanitizeValue((string) ($payload['email'] ?? ''));
$phone = sanitizeValue((string) ($payload['phone'] ?? ''));
$service = sanitizeValue((string) ($payload['service'] ?? ''));
$message = trim((string) ($payload['message'] ?? ''));
$submittedAt = sanitizeValue((string) ($payload['submittedAt'] ?? ''));
$honeypot = sanitizeValue((string) ($payload['company_name'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
  respond(400, ['success' => false, 'message' => '必須項目が不足しています。']);
}

if ($honeypot !== '') {
  respond(400, ['success' => false, 'message' => '不正な送信と判定されました。']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(400, ['success' => false, 'message' => 'メールアドレスの形式が正しくありません。']);
}

$allowedServices = [
  'saas' => ['label' => 'AIシステム開発 / SaaS・DX', 'subject' => 'AI SaaS / DX'],
  'marketing' => ['label' => 'AI導入支援 / Growth・Support', 'subject' => 'AI Adoption Support'],
  'web' => ['label' => 'AI Web制作 / LP・コーポレートサイト', 'subject' => 'AI Web / Brand Site'],
  'consulting' => ['label' => 'AI導入支援 / コンサルティング', 'subject' => 'AI Consulting'],
  'other' => ['label' => 'その他・相談したい', 'subject' => 'Other inquiry'],
];
$serviceInfo = $allowedServices[$service] ?? ['label' => '未選択', 'subject' => 'General inquiry'];
$serviceLabel = $serviceInfo['label'];
$serviceSubject = $serviceInfo['subject'];

$hostRaw = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
$host = preg_replace('/:[0-9]+$/', '', $hostRaw);
$adminEmail = getenv('GAMI_CONTACT_TO') ?: 'info@ai.gami.jp';
$adminFromAddress = getenv('GAMI_MAIL_FROM') ?: 'noreply@' . $host;

if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
  respond(500, ['success' => false, 'message' => '管理者メールアドレスの設定が不正です。']);
}

if (!filter_var($adminFromAddress, FILTER_VALIDATE_EMAIL)) {
  $adminFromAddress = 'noreply@' . $host;
}
if (!str_contains($adminFromAddress, '@')) {
  $adminFromAddress = $host ?: 'localhost';
  $adminFromAddress = "noreply@{$adminFromAddress}";
}

$adminFromName = encodeHeaderValue('株式会社ガミ');
$adminFrom = "{$adminFromName} <{$adminFromAddress}>";

$subject = "Gami お問い合わせ";
$mailSubject = encodeHeaderValue($subject);

$body = "【GAMI Webサイト お問い合わせ】\r\n\r\n" .
  "氏名: {$name}\r\n" .
  "会社名: {$company}\r\n" .
  "メールアドレス: {$email}\r\n" .
  "電話番号: {$phone}\r\n" .
  "サービス: {$serviceLabel}\r\n" .
  "送信日時: {$submittedAt}\r\n\r\n" .
  "---\r\n\r\n" .
  "【お問い合わせ内容】\r\n{$message}\r\n";

$adminHeaders = [
  "MIME-Version: 1.0",
  "From: {$adminFrom}",
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: PHP/' . phpversion(),
  'Date: ' . gmdate('D, d M Y H:i:s +0000'),
  'Message-ID: <' . bin2hex(random_bytes(8)) . "-admin@{$host}>",
];

if (!isFreemailAddress($email)) {
  $adminHeaders[] = "Reply-To: {$email}";
}

if (!sendMailWithEnvelope($adminEmail, $mailSubject, $body, $adminHeaders, $adminFromAddress)) {
  respond(500, ['success' => false, 'message' => 'メール送信に失敗しました。サーバー設定を確認してください。']);
}

$autoReplySubject = '【Gami】お問い合わせを受け付けました';
$autoReplySubject = encodeHeaderValue($autoReplySubject);
$autoReplyBody = "このたびはGAMIへお問い合わせいただき、ありがとうございます。\r\n\r\n" .
  "以下の内容で受け付けました。\r\n\r\n" .
  "【お名前】{$name}\r\n" .
  "【メールアドレス】{$email}\r\n" .
  "【電話番号】{$phone}\r\n\r\n" .
  "【ご相談内容】\r\n{$message}\r\n\r\n" .
  "担当者より折り返しご連絡いたします。\r\n\r\n" .
  "GAMI";

$autoHeaders = [
  "MIME-Version: 1.0",
  "From: {$adminFrom}",
  "Reply-To: {$adminEmail}",
  "Date: " . gmdate('D, d M Y H:i:s +0000'),
  "X-Mailer: PHP/" . phpversion(),
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  "Message-ID: <" . bin2hex(random_bytes(8)) . "-autoreply@{$host}>",
];
if (!sendMailWithEnvelope($email, $autoReplySubject, $autoReplyBody, $autoHeaders, $adminFromAddress)) {
  error_log("[GAMI Contact] Auto-reply mail send failed: to={$email}, from={$adminFromAddress}");
}

respond(200, ['success' => true, 'message' => 'お問い合わせを送信しました。']);
?>




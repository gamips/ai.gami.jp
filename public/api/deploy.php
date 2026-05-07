<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header("X-Robots-Tag: noindex, nofollow");

function respond(int $statusCode, array $payload): void
{
  http_response_code($statusCode);
  echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}

function removeDeployPath(string $documentRoot, string $relativePath): int
{
  $root = realpath($documentRoot);
  $target = realpath($documentRoot . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $relativePath));

  if (
    $root === false ||
    $target === false ||
    $target === $root ||
    !str_starts_with($target, $root . DIRECTORY_SEPARATOR)
  ) {
    return 0;
  }

  if (is_file($target) || is_link($target)) {
    return @unlink($target) ? 1 : 0;
  }

  if (!is_dir($target)) {
    return 0;
  }

  $deleted = 0;
  $iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($target, FilesystemIterator::SKIP_DOTS),
    RecursiveIteratorIterator::CHILD_FIRST
  );

  foreach ($iterator as $item) {
    $itemPath = $item->getPathname();

    if ($item->isDir() && !$item->isLink()) {
      if (@rmdir($itemPath)) {
        $deleted++;
      }
    } elseif (@unlink($itemPath)) {
      $deleted++;
    }
  }

  if (@rmdir($target)) {
    $deleted++;
  }

  return $deleted;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respond(405, ["ok" => false, "error" => "method_not_allowed"]);
}

$documentRoot = realpath(dirname(__DIR__));
if ($documentRoot === false) {
  respond(500, ["ok" => false, "error" => "document_root_unavailable"]);
}

$tokenPath = realpath(dirname(__DIR__, 3)) . DIRECTORY_SEPARATOR . ".gami-ai-deploy-token";
if (!is_file($tokenPath)) {
  respond(500, ["ok" => false, "error" => "deploy_token_not_configured"]);
}

$expectedToken = trim((string) file_get_contents($tokenPath));
$actualToken = $_SERVER["HTTP_X_GAMI_DEPLOY_TOKEN"] ?? "";

if ($expectedToken === "" || !hash_equals($expectedToken, $actualToken)) {
  respond(403, ["ok" => false, "error" => "forbidden"]);
}

if (!class_exists("ZipArchive")) {
  respond(500, ["ok" => false, "error" => "ziparchive_unavailable"]);
}

$contentLength = (int) ($_SERVER["CONTENT_LENGTH"] ?? 0);
if ($contentLength <= 0 || $contentLength > 30 * 1024 * 1024) {
  respond(413, ["ok" => false, "error" => "invalid_payload_size"]);
}

$tempZip = tempnam(sys_get_temp_dir(), "gami-deploy-");
if ($tempZip === false) {
  respond(500, ["ok" => false, "error" => "tempfile_unavailable"]);
}

$input = fopen("php://input", "rb");
$output = fopen($tempZip, "wb");
if ($input === false || $output === false) {
  @unlink($tempZip);
  respond(500, ["ok" => false, "error" => "stream_unavailable"]);
}

stream_copy_to_stream($input, $output);
fclose($input);
fclose($output);

$zip = new ZipArchive();
if ($zip->open($tempZip) !== true) {
  @unlink($tempZip);
  respond(400, ["ok" => false, "error" => "invalid_zip"]);
}

$assetFilesInZip = [];
$extracted = 0;

for ($i = 0; $i < $zip->numFiles; $i++) {
  $entryName = $zip->getNameIndex($i);
  if ($entryName === false) {
    continue;
  }

  $normalized = str_replace("\\", "/", $entryName);
  if (
    $normalized === "" ||
    str_starts_with($normalized, "/") ||
    str_contains($normalized, "../") ||
    str_contains($normalized, "\0")
  ) {
    $zip->close();
    @unlink($tempZip);
    respond(400, ["ok" => false, "error" => "unsafe_zip_entry"]);
  }

  if (str_ends_with($normalized, "/")) {
    continue;
  }

  if (str_starts_with($normalized, "assets/")) {
    $assetFilesInZip[basename($normalized)] = true;
  }
}

$assetsDir = $documentRoot . DIRECTORY_SEPARATOR . "assets";
if (is_dir($assetsDir)) {
  foreach (glob($assetsDir . DIRECTORY_SEPARATOR . "*.{js,css}", GLOB_BRACE) ?: [] as $assetPath) {
    if (!isset($assetFilesInZip[basename($assetPath)])) {
      @unlink($assetPath);
    }
  }
}

$stalePaths = [
  "admin",
  "uploads",
  "news/clickfix",
  "news/renewal",
  "news/sodatsu-mitsumori",
  "apple-touch-icon.png",
  "favicon.ico",
  "favicon.svg",
];
$deletedStalePaths = 0;

foreach ($stalePaths as $stalePath) {
  $deletedStalePaths += removeDeployPath($documentRoot, $stalePath);
}

for ($i = 0; $i < $zip->numFiles; $i++) {
  $entryName = $zip->getNameIndex($i);
  if ($entryName === false) {
    continue;
  }

  $normalized = str_replace("\\", "/", $entryName);
  if ($normalized === "" || str_ends_with($normalized, "/")) {
    continue;
  }

  $targetPath = $documentRoot . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $normalized);
  $targetDir = dirname($targetPath);

  if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true)) {
    $zip->close();
    @unlink($tempZip);
    respond(500, ["ok" => false, "error" => "mkdir_failed"]);
  }

  $source = $zip->getStream($entryName);
  $target = fopen($targetPath, "wb");
  if ($source === false || $target === false) {
    $zip->close();
    @unlink($tempZip);
    respond(500, ["ok" => false, "error" => "extract_failed"]);
  }

  stream_copy_to_stream($source, $target);
  fclose($source);
  fclose($target);
  $extracted++;
}

$zip->close();
@unlink($tempZip);

respond(200, ["ok" => true, "extracted" => $extracted, "deletedStalePaths" => $deletedStalePaths]);

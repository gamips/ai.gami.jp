<?php
// PHP front controller for HTML pages with shared PHP includes.
if (isset($_SERVER["REQUEST_URI"]) && $_SERVER["REQUEST_URI"] !== null) {
  $rawRequestUri = $_SERVER["REQUEST_URI"];
} else {
  $rawRequestUri = "/";
}

$requestPath = parse_url($rawRequestUri, PHP_URL_PATH);
if ($requestPath === false || $requestPath === null || $requestPath === "") {
  $requestPath = "/";
}
$requestPath = urldecode($requestPath);
$normalizedPath = rtrim($requestPath, "/");
if ($normalizedPath === "") {
  $normalizedPath = "/";
}

$documentRoot = __DIR__;
$requestedFilePath = $documentRoot . $normalizedPath;
$isRouterScript = realpath($requestedFilePath) === realpath(__FILE__);

if (is_file($requestedFilePath) && !$isRouterScript) {
  $extension = strtolower(pathinfo($requestedFilePath, PATHINFO_EXTENSION));
  $isApiPhp = $extension === "php" && str_starts_with($normalizedPath, "/api/");
  if ($isApiPhp) {
    include $requestedFilePath;
    exit;
  }

  if (!$isRouterScript && $extension !== "") {
    if (function_exists("mime_content_type")) {
      $mimeType = @mime_content_type($requestedFilePath);
      if ($mimeType !== false) {
        header("Content-Type: {$mimeType}");
      }
    }
    readfile($requestedFilePath);
    exit;
  }
}

$routeFilePath = $documentRoot . ($normalizedPath === "/" ? "/index.html" : $normalizedPath . "/index.html");
$defaultHtmlPath = $documentRoot . "/index.html";
$servePath = $defaultHtmlPath;

if (is_file($routeFilePath)) {
  $servePath = $routeFilePath;
}

header("Content-Type: text/html; charset=UTF-8");

if (!is_file($servePath)) {
  http_response_code(404);
  echo "<!doctype html><html><head><meta charset=\"UTF-8\"><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>ページが見つかりません。</p></body></html>";
  exit;
}

$routeHtml = file_get_contents($servePath);
if ($routeHtml === false) {
  http_response_code(500);
  echo "<!doctype html><html><head><meta charset=\"UTF-8\"><title>500 Internal Server Error</title></head><body><h1>500 Internal Server Error</h1><p>ページの取得に失敗しました。</p></body></html>";
  exit;
}

if (preg_match("/<html([^>]*)>/i", $routeHtml, $htmlTagMatch) === 1) {
  $htmlAttributes = $htmlTagMatch[1];
} else {
  $htmlAttributes = ' lang="ja"';
}

if (preg_match("/<head>([\\s\\S]*?)<\\/head>/i", $routeHtml, $headMatch) === 1) {
  $headContent = $headMatch[1];
} else {
  $headContent = "";
}

if (preg_match("/<body([^>]*)>([\\s\\S]*?)<\\/body>/i", $routeHtml, $bodyMatch) === 1) {
  $bodyAttributes = trim($bodyMatch[1]);
  $bodyContent = $bodyMatch[2];
} else {
  echo $routeHtml;
  exit;
}

$bodyAttributes = trim($bodyAttributes);
if ($bodyAttributes !== "") {
  $bodyAttributes .= " data-server-shell=\"1\"";
} else {
  $bodyAttributes = ' data-server-shell="1"';
}

echo "<!doctype html>\n";
echo "<html" . $htmlAttributes . ">\n";
echo "<head>\n";
echo $headContent . "\n";
echo "  <script>window.__gamiServerChrome = true;</script>\n";
echo "</head>\n";
echo "<body" . $bodyAttributes . ">\n";

$headerFile = $documentRoot . "/partials/header.php";
if (is_file($headerFile)) {
  include $headerFile;
}

echo $bodyContent . "\n";

$footerFile = $documentRoot . "/partials/footer.php";
if (is_file($footerFile)) {
  include $footerFile;
}

echo "</body>\n</html>";
exit;

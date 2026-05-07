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
$notFoundHtmlPath = $documentRoot . "/404/index.html";
$servePath = $defaultHtmlPath;

if (is_file($routeFilePath)) {
  $servePath = $routeFilePath;
} elseif ($normalizedPath !== "/") {
  http_response_code(404);
  if (is_file($notFoundHtmlPath)) {
    $servePath = $notFoundHtmlPath;
  } else {
    header("Content-Type: text/html; charset=UTF-8");
    echo "<!doctype html><html lang=\"ja\"><head><meta charset=\"UTF-8\"><meta name=\"robots\" content=\"noindex,nofollow\"><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>ページが見つかりません。</p></body></html>";
    exit;
  }
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

echo $routeHtml;
exit;

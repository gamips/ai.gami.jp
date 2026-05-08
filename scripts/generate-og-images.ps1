$ErrorActionPreference = "Stop"

$outputDir = Join-Path $PSScriptRoot "..\\public\\og"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Add-Type -AssemblyName System.Drawing

$items = @(
  @{ File = "home.png"; Eyebrow = "GAMI"; Lines = @("AI Speed,", "Human Craft."); AccentSecond = $true },
  @{ File = "concept.png"; Eyebrow = "CONCEPT"; Lines = @("AI Base,", "Human Craft."); AccentSecond = $true },
  @{ File = "services.png"; Eyebrow = "SERVICES"; Lines = @("Three AI Fields", "Solutions"); AccentSecond = $true },
  @{ File = "service-ai-saas.png"; Eyebrow = "SERVICE 01"; Lines = @("AI × SaaS", "AI × DX"); AccentSecond = $true },
  @{ File = "service-ai-growth.png"; Eyebrow = "SERVICE 02"; Lines = @("AI × Growth", "AI × Support"); AccentSecond = $true },
  @{ File = "service-ai-brand.png"; Eyebrow = "SERVICE 03"; Lines = @("AI × Brand", "AI × Site"); AccentSecond = $true },
  @{ File = "price.png"; Eyebrow = "PRICE"; Lines = @("Start Small,", "Move Monthly."); AccentSecond = $true },
  @{ File = "news.png"; Eyebrow = "NEWS"; Lines = @("Latest", "Updates"); AccentSecond = $true },
  @{ File = "about.png"; Eyebrow = "ABOUT"; Lines = @("Build for Business,", "Not for Show."); AccentSecond = $true },
  @{ File = "contact.png"; Eyebrow = "CONTACT"; Lines = @("Talk to", "GAMI"); AccentSecond = $true }
)

function New-Font($name, $size, $style = [System.Drawing.FontStyle]::Regular) {
  return New-Object System.Drawing.Font($name, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

foreach ($item in $items) {
  $bitmap = New-Object System.Drawing.Bitmap 1200, 630
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $rect = New-Object System.Drawing.Rectangle 0, 0, 1200, 630
  $gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 4, 5, 13),
    [System.Drawing.Color]::FromArgb(255, 91, 33, 182),
    25
  )
  $graphics.FillRectangle($gradient, $rect)

  $cyanBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 34, 211, 238))
  $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
  $softBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 255, 255, 255))
  $overlayBrush1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(38, 59, 130, 246))
  $overlayBrush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(52, 168, 85, 247))
  $overlayBrush3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(32, 34, 211, 238))

  $graphics.FillEllipse($overlayBrush1, -60, -80, 480, 480)
  $graphics.FillEllipse($overlayBrush2, 760, 40, 360, 360)
  $graphics.FillEllipse($overlayBrush3, 640, 310, 460, 460)

  $eyebrowFont = New-Font "Segoe UI" 30 ([System.Drawing.FontStyle]::Bold)
  $titleFont = New-Font "Segoe UI" 86 ([System.Drawing.FontStyle]::Bold)
  $subtitleFont = New-Font "Segoe UI" 34 ([System.Drawing.FontStyle]::Regular)

  $graphics.DrawString($item.Eyebrow, $eyebrowFont, $cyanBrush, 92, 92)
  $graphics.DrawString($item.Lines[0], $titleFont, $whiteBrush, 92, 180)
  $secondBrush = if ($item.AccentSecond) { $cyanBrush } else { $whiteBrush }
  $graphics.DrawString($item.Lines[1], $titleFont, $secondBrush, 92, 292)
  $graphics.DrawString("https://ai.gami.jp", $subtitleFont, $softBrush, 94, 524)

  $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 255, 255, 255), 2)
  $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
  $graphics.DrawEllipse($dashPen, 908, 138, 180, 180)
  $graphics.DrawEllipse($dashPen, 956, 186, 84, 84)

  $outPath = Join-Path $outputDir $item.File
  $bitmap.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $dashPen.Dispose()
  $subtitleFont.Dispose()
  $titleFont.Dispose()
  $eyebrowFont.Dispose()
  $overlayBrush3.Dispose()
  $overlayBrush2.Dispose()
  $overlayBrush1.Dispose()
  $softBrush.Dispose()
  $whiteBrush.Dispose()
  $cyanBrush.Dispose()
  $gradient.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

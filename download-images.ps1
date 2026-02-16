# Download product images script
$outputDir = "E:\Personal Nemises\BotB\BotA\public\images"

# Create directory if it doesn't exist
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

# Image URLs and filenames
$images = @(
    @{url="https://ke.sunking.com/wp-content/uploads/2024/03/HomePlus.png"; filename="HomePlus.png"},
    @{url="https://ke.sunking.com/wp-content/uploads/2024/03/HomePlus-Pro.png"; filename="HomePlus-Pro.png"},
    @{url="https://ke.sunking.com/wp-content/uploads/2024/03/HomePlus-Max.png"; filename="HomePlus-Max.png"},
    @{url="https://ke.sunking.com/wp-content/uploads/2024/03/HomePlus-Max-24-TV.png"; filename="HomePlus-Max-24-TV.png"},
    @{url="https://ke.sunking.com/wp-content/uploads/2024/03/HomePlus-Max-32-TV.png"; filename="HomePlus-Max-32-TV.png"},
    @{url="https://ke.sunking.com/wp-content/uploads/2024/03/HomePlus-Max-43-TV.png"; filename="HomePlus-Max-43-TV.png"}
)

# Download each image
foreach ($image in $images) {
    $outputPath = Join-Path $outputDir $image.filename
    Write-Host "Downloading $($image.filename)..." -ForegroundColor Cyan
    
    try {
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath
        Write-Host "  ✓ Downloaded successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "  ✗ Failed to download: $_" -ForegroundColor Red
    }
}

Write-Host "`nAll images downloaded to: $outputDir" -ForegroundColor Yellow

# PowerShell script to copy and convert images for Maison Dénudé landing page

$sourceBase = "C:\maison\thieu\context\reference\maison_denude_assets"
$targetLanding = "C:\maison\thieu\main-dev\src\assets\landing"
$targetPublic = "C:\maison\thieu\main-dev\public"

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path $targetLanding | Out-Null
New-Item -ItemType Directory -Force -Path $targetPublic | Out-Null

Write-Host "Copying JPG files..." -ForegroundColor Green

# Section 1 - set_mood (2 files)
Copy-Item "$sourceBase\landing_page\1.set_mood\181225_MD_ 440 copy.jpg" "$targetLanding\hero-embroidered-gown-back-portrait.jpg"
Write-Host "✓ hero-embroidered-gown-back-portrait.jpg"

Copy-Item "$sourceBase\landing_page\1.set_mood\MD BRIDAL2569 (1).jpg" "$targetLanding\hero-silk-halter-back-detail.jpg"
Write-Host "✓ hero-silk-halter-back-detail.jpg"

# Section 2 - KOL_featuring (3 JPGs)
Copy-Item "$sourceBase\landing_page\2.KOL_featuring\1.jpg" "$targetLanding\kol-white-lace-red-floral-red-wall.jpg"
Write-Host "✓ kol-white-lace-red-floral-red-wall.jpg"

Copy-Item "$sourceBase\landing_page\2.KOL_featuring\5.jpg" "$targetLanding\kol-black-sequin-floral-saigon-night.jpg"
Write-Host "✓ kol-black-sequin-floral-saigon-night.jpg"

Copy-Item "$sourceBase\landing_page\2.KOL_featuring\IMG_9753.JPG" "$targetLanding\kol-black-sequin-aodai-rooftop-night.jpg"
Write-Host "✓ kol-black-sequin-aodai-rooftop-night.jpg"

# Section 3 - Runway (10 files)
Copy-Item "$sourceBase\landing_page\3.Runway\181225_MD_ 414 copy.jpg" "$targetLanding\runway-group-6models-maison-signage.jpg"
Write-Host "✓ runway-group-6models-maison-signage.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\181225_MD_ 120 copy.jpg" "$targetLanding\runway-trio-cityview-black-red-pink.jpg"
Write-Host "✓ runway-trio-cityview-black-red-pink.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\DTQ08652 copy.jpg" "$targetLanding\runway-aodai-detail-dark-velvet.jpg"
Write-Host "✓ runway-aodai-detail-dark-velvet.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\181225_MD_ 473 copy.jpg" "$targetLanding\runway-bridal-5models-red-ivory.jpg"
Write-Host "✓ runway-bridal-5models-red-ivory.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\181225_MD_ 495 copy.jpg" "$targetLanding\runway-aodai-orchid-embroidery-detail.jpg"
Write-Host "✓ runway-aodai-orchid-embroidery-detail.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\DSC06791 copy.jpg" "$targetLanding\runway-dragon-embroidery-aodai-teal.jpg"
Write-Host "✓ runway-dragon-embroidery-aodai-teal.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\AT_00768 copy.jpg" "$targetLanding\runway-black-kaftan-silver-lace-solo.jpg"
Write-Host "✓ runway-black-kaftan-silver-lace-solo.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\DSC06353.jpg" "$targetLanding\runway-aodai-orchid-closeup-lace.jpg"
Write-Host "✓ runway-aodai-orchid-closeup-lace.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\SAG03459 copy.jpg" "$targetLanding\runway-white-lace-aodai-detail-shoes.jpg"
Write-Host "✓ runway-white-lace-aodai-detail-shoes.jpg"

Copy-Item "$sourceBase\landing_page\3.Runway\SAG03107 copy.jpg" "$targetLanding\runway-bridal-aodai-5models-lineup.jpg"
Write-Host "✓ runway-bridal-aodai-5models-lineup.jpg"

# Section 4 - RENAISSANCE (5 files)
Copy-Item "$sourceBase\landing_page\4.RENAISSANCE\MD BRIDAL1801 3 2 copy.jpg" "$targetLanding\renaissance-gold-motion-logo.jpg"
Write-Host "✓ renaissance-gold-motion-logo.jpg"

Copy-Item "$sourceBase\landing_page\4.RENAISSANCE\MD BRIDAL2463 1 .jpg" "$targetLanding\renaissance-ivory-brocade-reclining.jpg"
Write-Host "✓ renaissance-ivory-brocade-reclining.jpg"

Copy-Item "$sourceBase\landing_page\4.RENAISSANCE\MD BRIDAL2677 .jpg" "$targetLanding\renaissance-blue-tulle-portrait.jpg"
Write-Host "✓ renaissance-blue-tulle-portrait.jpg"

Copy-Item "$sourceBase\landing_page\4.RENAISSANCE\MD BRIDAL2802.jpg" "$targetLanding\renaissance-black-sequin-sitting.jpg"
Write-Host "✓ renaissance-black-sequin-sitting.jpg"

Copy-Item "$sourceBase\landing_page\4.RENAISSANCE\MD BRIDAL3625_(3).jpg" "$targetLanding\renaissance-red-tulle-full-body.jpg"
Write-Host "✓ renaissance-red-tulle-full-body.jpg"

# Section 5 - SABLE_ORCHID (5 files)
Copy-Item "$sourceBase\landing_page\5.SABLE_ORCHID\IMG_6589.jpg" "$targetLanding\sable-duo-jacquard-bar-interior.jpg"
Write-Host "✓ sable-duo-jacquard-bar-interior.jpg"

Copy-Item "$sourceBase\landing_page\5.SABLE_ORCHID\IMG_6591.jpg" "$targetLanding\sable-black-lace-bow-gown-instagram.jpg"
Write-Host "✓ sable-black-lace-bow-gown-instagram.jpg"

Copy-Item "$sourceBase\landing_page\5.SABLE_ORCHID\IMG_6592.jpg" "$targetLanding\sable-teal-aodai-hotel-instagram.jpg"
Write-Host "✓ sable-teal-aodai-hotel-instagram.jpg"

Copy-Item "$sourceBase\landing_page\5.SABLE_ORCHID\IMG_6593.jpg" "$targetLanding\sable-red-lace-aodai-red-carpet.jpg"
Write-Host "✓ sable-red-lace-aodai-red-carpet.jpg"

Copy-Item "$sourceBase\landing_page\5.SABLE_ORCHID\IMG_6594.jpg" "$targetLanding\sable-green-lace-cape-red-curtain.jpg"
Write-Host "✓ sable-green-lace-cape-red-curtain.jpg"

# Section 6 - FOOTER (1 file)
Copy-Item "$sourceBase\landing_page\6.FOOTER\R0008451.jpg" "$targetLanding\footer-atelier-chair-dark-wood.jpg"
Write-Host "✓ footer-atelier-chair-dark-wood.jpg"

Write-Host "`nConverting HEIC files to JPG..." -ForegroundColor Green

# Try to use ImageMagick (magick) for HEIC conversion
# If not available, copy as-is (fallback)
try {
    $magickPath = Get-Command magick -ErrorAction Stop

    & magick "$sourceBase\landing_page\2.KOL_featuring\IMG_9128.HEIC" "$targetLanding\kol-placeholder-1.jpg"
    Write-Host "✓ kol-placeholder-1.jpg (converted from HEIC)"

    & magick "$sourceBase\landing_page\2.KOL_featuring\IMG_9491.HEIC" "$targetLanding\kol-placeholder-2.jpg"
    Write-Host "✓ kol-placeholder-2.jpg (converted from HEIC)"

    & magick "$sourceBase\landing_page\2.KOL_featuring\8.HEIC" "$targetLanding\kol-placeholder-3.jpg"
    Write-Host "✓ kol-placeholder-3.jpg (converted from HEIC)"
}
catch {
    Write-Host "⚠ ImageMagick not found, copying HEIC files as-is..." -ForegroundColor Yellow
    Copy-Item "$sourceBase\landing_page\2.KOL_featuring\IMG_9128.HEIC" "$targetLanding\kol-placeholder-1.heic"
    Copy-Item "$sourceBase\landing_page\2.KOL_featuring\IMG_9491.HEIC" "$targetLanding\kol-placeholder-2.heic"
    Copy-Item "$sourceBase\landing_page\2.KOL_featuring\8.HEIC" "$targetLanding\kol-placeholder-3.heic"
}

Write-Host "`nVerifying files..." -ForegroundColor Green

$landingFiles = Get-ChildItem $targetLanding | Sort-Object Name
$publicFiles = Get-ChildItem $targetPublic | Sort-Object Name

Write-Host "`nLanding Page Assets ($($landingFiles.Count) files):"
foreach ($file in $landingFiles) {
    $size = "{0:N0}" -f $file.Length
    Write-Host "  $($file.Name) ($size bytes)"
}

Write-Host "`nPublic Assets ($($publicFiles.Count) files):"
foreach ($file in $publicFiles) {
    $size = "{0:N0}" -f $file.Length
    Write-Host "  $($file.Name) ($size bytes)"
}

Write-Host "`nDone!" -ForegroundColor Green

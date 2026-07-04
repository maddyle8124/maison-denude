@echo off
REM Batch script to copy and convert images for Maison Denude landing page

setlocal enabledelayedexpansion

set SOURCE_BASE=C:\maison\thieu\context\reference\maison_denude_assets
set TARGET_LANDING=C:\maison\thieu\main-dev\src\assets\landing
set TARGET_PUBLIC=C:\maison\thieu\main-dev\public

REM Create directories
if not exist "%TARGET_LANDING%" mkdir "%TARGET_LANDING%"
if not exist "%TARGET_PUBLIC%" mkdir "%TARGET_PUBLIC%"

echo Copying JPG files...

REM Section 1 - set_mood (2 files)
copy "%SOURCE_BASE%\landing_page\1.set_mood\181225_MD_ 440 copy.jpg" "%TARGET_LANDING%\hero-embroidered-gown-back-portrait.jpg"
echo.✓ hero-embroidered-gown-back-portrait.jpg

copy "%SOURCE_BASE%\landing_page\1.set_mood\MD BRIDAL2569 (1).jpg" "%TARGET_LANDING%\hero-silk-halter-back-detail.jpg"
echo.✓ hero-silk-halter-back-detail.jpg

REM Section 2 - KOL_featuring (3 JPGs)
copy "%SOURCE_BASE%\landing_page\2.KOL_featuring\1.jpg" "%TARGET_LANDING%\kol-white-lace-red-floral-red-wall.jpg"
echo.✓ kol-white-lace-red-floral-red-wall.jpg

copy "%SOURCE_BASE%\landing_page\2.KOL_featuring\5.jpg" "%TARGET_LANDING%\kol-black-sequin-floral-saigon-night.jpg"
echo.✓ kol-black-sequin-floral-saigon-night.jpg

copy "%SOURCE_BASE%\landing_page\2.KOL_featuring\IMG_9753.JPG" "%TARGET_LANDING%\kol-black-sequin-aodai-rooftop-night.jpg"
echo.✓ kol-black-sequin-aodai-rooftop-night.jpg

REM Section 3 - Runway (10 files)
copy "%SOURCE_BASE%\landing_page\3.Runway\181225_MD_ 414 copy.jpg" "%TARGET_LANDING%\runway-group-6models-maison-signage.jpg"
echo.✓ runway-group-6models-maison-signage.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\181225_MD_ 120 copy.jpg" "%TARGET_LANDING%\runway-trio-cityview-black-red-pink.jpg"
echo.✓ runway-trio-cityview-black-red-pink.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\DTQ08652 copy.jpg" "%TARGET_LANDING%\runway-aodai-detail-dark-velvet.jpg"
echo.✓ runway-aodai-detail-dark-velvet.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\181225_MD_ 473 copy.jpg" "%TARGET_LANDING%\runway-bridal-5models-red-ivory.jpg"
echo.✓ runway-bridal-5models-red-ivory.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\181225_MD_ 495 copy.jpg" "%TARGET_LANDING%\runway-aodai-orchid-embroidery-detail.jpg"
echo.✓ runway-aodai-orchid-embroidery-detail.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\DSC06791 copy.jpg" "%TARGET_LANDING%\runway-dragon-embroidery-aodai-teal.jpg"
echo.✓ runway-dragon-embroidery-aodai-teal.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\AT_00768 copy.jpg" "%TARGET_LANDING%\runway-black-kaftan-silver-lace-solo.jpg"
echo.✓ runway-black-kaftan-silver-lace-solo.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\DSC06353.jpg" "%TARGET_LANDING%\runway-aodai-orchid-closeup-lace.jpg"
echo.✓ runway-aodai-orchid-closeup-lace.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\SAG03459 copy.jpg" "%TARGET_LANDING%\runway-white-lace-aodai-detail-shoes.jpg"
echo.✓ runway-white-lace-aodai-detail-shoes.jpg

copy "%SOURCE_BASE%\landing_page\3.Runway\SAG03107 copy.jpg" "%TARGET_LANDING%\runway-bridal-aodai-5models-lineup.jpg"
echo.✓ runway-bridal-aodai-5models-lineup.jpg

REM Section 4 - RENAISSANCE (5 files)
copy "%SOURCE_BASE%\landing_page\4.RENAISSANCE\MD BRIDAL1801 3 2 copy.jpg" "%TARGET_LANDING%\renaissance-gold-motion-logo.jpg"
echo.✓ renaissance-gold-motion-logo.jpg

copy "%SOURCE_BASE%\landing_page\4.RENAISSANCE\MD BRIDAL2463 1 .jpg" "%TARGET_LANDING%\renaissance-ivory-brocade-reclining.jpg"
echo.✓ renaissance-ivory-brocade-reclining.jpg

copy "%SOURCE_BASE%\landing_page\4.RENAISSANCE\MD BRIDAL2677 .jpg" "%TARGET_LANDING%\renaissance-blue-tulle-portrait.jpg"
echo.✓ renaissance-blue-tulle-portrait.jpg

copy "%SOURCE_BASE%\landing_page\4.RENAISSANCE\MD BRIDAL2802.jpg" "%TARGET_LANDING%\renaissance-black-sequin-sitting.jpg"
echo.✓ renaissance-black-sequin-sitting.jpg

copy "%SOURCE_BASE%\landing_page\4.RENAISSANCE\MD BRIDAL3625_(3).jpg" "%TARGET_LANDING%\renaissance-red-tulle-full-body.jpg"
echo.✓ renaissance-red-tulle-full-body.jpg

REM Section 5 - SABLE_ORCHID (5 files)
copy "%SOURCE_BASE%\landing_page\5.SABLE_ORCHID\IMG_6589.jpg" "%TARGET_LANDING%\sable-duo-jacquard-bar-interior.jpg"
echo.✓ sable-duo-jacquard-bar-interior.jpg

copy "%SOURCE_BASE%\landing_page\5.SABLE_ORCHID\IMG_6591.jpg" "%TARGET_LANDING%\sable-black-lace-bow-gown-instagram.jpg"
echo.✓ sable-black-lace-bow-gown-instagram.jpg

copy "%SOURCE_BASE%\landing_page\5.SABLE_ORCHID\IMG_6592.jpg" "%TARGET_LANDING%\sable-teal-aodai-hotel-instagram.jpg"
echo.✓ sable-teal-aodai-hotel-instagram.jpg

copy "%SOURCE_BASE%\landing_page\5.SABLE_ORCHID\IMG_6593.jpg" "%TARGET_LANDING%\sable-red-lace-aodai-red-carpet.jpg"
echo.✓ sable-red-lace-aodai-red-carpet.jpg

copy "%SOURCE_BASE%\landing_page\5.SABLE_ORCHID\IMG_6594.jpg" "%TARGET_LANDING%\sable-green-lace-cape-red-curtain.jpg"
echo.✓ sable-green-lace-cape-red-curtain.jpg

REM Section 6 - FOOTER (1 file)
copy "%SOURCE_BASE%\landing_page\6.FOOTER\R0008451.jpg" "%TARGET_LANDING%\footer-atelier-chair-dark-wood.jpg"
echo.✓ footer-atelier-chair-dark-wood.jpg

echo.
echo Attempting HEIC conversion with ImageMagick...

where magick >nul 2>&1
if !ERRORLEVEL! equ 0 (
    echo Converting HEIC files...
    magick "%SOURCE_BASE%\landing_page\2.KOL_featuring\IMG_9128.HEIC" "%TARGET_LANDING%\kol-placeholder-1.jpg"
    echo.✓ kol-placeholder-1.jpg

    magick "%SOURCE_BASE%\landing_page\2.KOL_featuring\IMG_9491.HEIC" "%TARGET_LANDING%\kol-placeholder-2.jpg"
    echo.✓ kol-placeholder-2.jpg

    magick "%SOURCE_BASE%\landing_page\2.KOL_featuring\8.HEIC" "%TARGET_LANDING%\kol-placeholder-3.jpg"
    echo.✓ kol-placeholder-3.jpg
) else (
    echo.ImageMagick not found - copying HEIC files as-is...
    copy "%SOURCE_BASE%\landing_page\2.KOL_featuring\IMG_9128.HEIC" "%TARGET_LANDING%\kol-placeholder-1.heic"
    echo.✓ kol-placeholder-1.heic

    copy "%SOURCE_BASE%\landing_page\2.KOL_featuring\IMG_9491.HEIC" "%TARGET_LANDING%\kol-placeholder-2.heic"
    echo.✓ kol-placeholder-2.heic

    copy "%SOURCE_BASE%\landing_page\2.KOL_featuring\8.HEIC" "%TARGET_LANDING%\kol-placeholder-3.heic"
    echo.✓ kol-placeholder-3.heic
)

REM Create placeholder file (copy first image)
echo.
echo Creating placeholder file...
copy "%TARGET_LANDING%\kol-placeholder-1.jpg" "%TARGET_LANDING%\_placeholder.jpg"
echo.✓ _placeholder.jpg

echo.
echo Verification - Landing Page Assets:
dir /B "%TARGET_LANDING%" | sort

echo.
echo Verification - Public Assets:
dir /B "%TARGET_PUBLIC%"

echo.
echo Done!
pause

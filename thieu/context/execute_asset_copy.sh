#!/bin/bash
set -e

# Create directories
echo "Creating directories..."
mkdir -p /c/maison/thieu/main-dev/src/assets/landing
mkdir -p /c/maison/thieu/main-dev/public

echo "Copying Section 1 - set_mood (2 files)..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/1.set_mood/181225_MD_ 440 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/hero-embroidered-gown-back-portrait.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/1.set_mood/MD BRIDAL2569 (1).jpg" "/c/maison/thieu/main-dev/src/assets/landing/hero-silk-halter-back-detail.jpg"

echo "Copying Section 2 - KOL_featuring (3 JPGs, skipping duplicate)..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/2.KOL_featuring/1.jpg" "/c/maison/thieu/main-dev/src/assets/landing/kol-white-lace-red-floral-red-wall.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/2.KOL_featuring/5.jpg" "/c/maison/thieu/main-dev/src/assets/landing/kol-black-sequin-floral-saigon-night.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/2.KOL_featuring/IMG_9753.JPG" "/c/maison/thieu/main-dev/src/assets/landing/kol-black-sequin-aodai-rooftop-night.jpg"

echo "Copying Section 3 - Runway (10 files)..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/181225_MD_ 414 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-group-6models-maison-signage.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/181225_MD_ 120 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-trio-cityview-black-red-pink.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/DTQ08652 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-aodai-detail-dark-velvet.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/181225_MD_ 473 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-bridal-5models-red-ivory.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/181225_MD_ 495 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-aodai-orchid-embroidery-detail.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/DSC06791 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-dragon-embroidery-aodai-teal.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/AT_00768 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-black-kaftan-silver-lace-solo.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/DSC06353.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-aodai-orchid-closeup-lace.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/SAG03459 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-white-lace-aodai-detail-shoes.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/3.Runway/SAG03107 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/runway-bridal-aodai-5models-lineup.jpg"

echo "Copying Section 4 - RENAISSANCE (5 files)..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/4.RENAISSANCE/MD BRIDAL1801 3 2 copy.jpg" "/c/maison/thieu/main-dev/src/assets/landing/renaissance-gold-motion-logo.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/4.RENAISSANCE/MD BRIDAL2463 1 .jpg" "/c/maison/thieu/main-dev/src/assets/landing/renaissance-ivory-brocade-reclining.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/4.RENAISSANCE/MD BRIDAL2677 .jpg" "/c/maison/thieu/main-dev/src/assets/landing/renaissance-blue-tulle-portrait.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/4.RENAISSANCE/MD BRIDAL2802.jpg" "/c/maison/thieu/main-dev/src/assets/landing/renaissance-black-sequin-sitting.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/4.RENAISSANCE/MD BRIDAL3625_(3).jpg" "/c/maison/thieu/main-dev/src/assets/landing/renaissance-red-tulle-full-body.jpg"

echo "Copying Section 5 - SABLE_ORCHID (5 files)..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/5.SABLE_ORCHID/IMG_6589.jpg" "/c/maison/thieu/main-dev/src/assets/landing/sable-duo-jacquard-bar-interior.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/5.SABLE_ORCHID/IMG_6591.jpg" "/c/maison/thieu/main-dev/src/assets/landing/sable-black-lace-bow-gown-instagram.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/5.SABLE_ORCHID/IMG_6592.jpg" "/c/maison/thieu/main-dev/src/assets/landing/sable-teal-aodai-hotel-instagram.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/5.SABLE_ORCHID/IMG_6593.jpg" "/c/maison/thieu/main-dev/src/assets/landing/sable-red-lace-aodai-red-carpet.jpg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/5.SABLE_ORCHID/IMG_6594.jpg" "/c/maison/thieu/main-dev/src/assets/landing/sable-green-lace-cape-red-curtain.jpg"

echo "Copying Section 6 - FOOTER (1 file)..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/6.FOOTER/R0008451.jpg" "/c/maison/thieu/main-dev/src/assets/landing/footer-atelier-chair-dark-wood.jpg"

echo "Converting HEIC files to JPG..."
magick "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/2.KOL_featuring/IMG_9128.HEIC" "/c/maison/thieu/main-dev/src/assets/landing/kol-placeholder-1.jpg"
magick "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/2.KOL_featuring/IMG_9491.HEIC" "/c/maison/thieu/main-dev/src/assets/landing/kol-placeholder-2.jpg"
magick "/c/maison/thieu/context/reference/maison_denude_assets/landing_page/2.KOL_featuring/8.HEIC" "/c/maison/thieu/main-dev/src/assets/landing/kol-placeholder-3.jpg"

echo "Copying logos..."
cp "/c/maison/thieu/context/reference/maison_denude_assets/logo_white.svg" "/c/maison/thieu/main-dev/public/logo_white.svg"
cp "/c/maison/thieu/context/reference/maison_denude_assets/logo_black.svg" "/c/maison/thieu/main-dev/public/logo_black.svg"

echo "Creating placeholder file..."
cp "/c/maison/thieu/main-dev/src/assets/landing/kol-placeholder-1.jpg" "/c/maison/thieu/main-dev/src/assets/landing/_placeholder.jpg"

echo "All files copied successfully!"
echo ""
echo "Verifying landing page assets..."
ls -la /c/maison/thieu/main-dev/src/assets/landing/ | sort

echo ""
echo "Verifying public assets (logos)..."
ls -la /c/maison/thieu/main-dev/public/

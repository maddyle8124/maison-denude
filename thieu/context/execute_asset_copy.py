#!/usr/bin/env python3
import shutil
import os
from pathlib import Path
import subprocess

# Define paths
context_base = Path("C:/maison/thieu/context")
source_base = context_base / "reference/maison_denude_assets"
target_base = Path("C:/maison/thieu/main-dev")
landing_dir = target_base / "src/assets/landing"
public_dir = target_base / "public"

# Create directories
landing_dir.mkdir(parents=True, exist_ok=True)
public_dir.mkdir(parents=True, exist_ok=True)
print(f"Created directories: {landing_dir}, {public_dir}")

# Define all file operations
operations = [
    # Section 1 - set_mood
    ("landing_page/1.set_mood/181225_MD_ 440 copy.jpg", "hero-embroidered-gown-back-portrait.jpg"),
    ("landing_page/1.set_mood/MD BRIDAL2569 (1).jpg", "hero-silk-halter-back-detail.jpg"),

    # Section 2 - KOL_featuring (JPGs only)
    ("landing_page/2.KOL_featuring/1.jpg", "kol-white-lace-red-floral-red-wall.jpg"),
    ("landing_page/2.KOL_featuring/5.jpg", "kol-black-sequin-floral-saigon-night.jpg"),
    ("landing_page/2.KOL_featuring/IMG_9753.JPG", "kol-black-sequin-aodai-rooftop-night.jpg"),

    # Section 3 - Runway
    ("landing_page/3.Runway/181225_MD_ 414 copy.jpg", "runway-group-6models-maison-signage.jpg"),
    ("landing_page/3.Runway/181225_MD_ 120 copy.jpg", "runway-trio-cityview-black-red-pink.jpg"),
    ("landing_page/3.Runway/DTQ08652 copy.jpg", "runway-aodai-detail-dark-velvet.jpg"),
    ("landing_page/3.Runway/181225_MD_ 473 copy.jpg", "runway-bridal-5models-red-ivory.jpg"),
    ("landing_page/3.Runway/181225_MD_ 495 copy.jpg", "runway-aodai-orchid-embroidery-detail.jpg"),
    ("landing_page/3.Runway/DSC06791 copy.jpg", "runway-dragon-embroidery-aodai-teal.jpg"),
    ("landing_page/3.Runway/AT_00768 copy.jpg", "runway-black-kaftan-silver-lace-solo.jpg"),
    ("landing_page/3.Runway/DSC06353.jpg", "runway-aodai-orchid-closeup-lace.jpg"),
    ("landing_page/3.Runway/SAG03459 copy.jpg", "runway-white-lace-aodai-detail-shoes.jpg"),
    ("landing_page/3.Runway/SAG03107 copy.jpg", "runway-bridal-aodai-5models-lineup.jpg"),

    # Section 4 - RENAISSANCE
    ("landing_page/4.RENAISSANCE/MD BRIDAL1801 3 2 copy.jpg", "renaissance-gold-motion-logo.jpg"),
    ("landing_page/4.RENAISSANCE/MD BRIDAL2463 1 .jpg", "renaissance-ivory-brocade-reclining.jpg"),
    ("landing_page/4.RENAISSANCE/MD BRIDAL2677 .jpg", "renaissance-blue-tulle-portrait.jpg"),
    ("landing_page/4.RENAISSANCE/MD BRIDAL2802.jpg", "renaissance-black-sequin-sitting.jpg"),
    ("landing_page/4.RENAISSANCE/MD BRIDAL3625_(3).jpg", "renaissance-red-tulle-full-body.jpg"),

    # Section 5 - SABLE_ORCHID
    ("landing_page/5.SABLE_ORCHID/IMG_6589.jpg", "sable-duo-jacquard-bar-interior.jpg"),
    ("landing_page/5.SABLE_ORCHID/IMG_6591.jpg", "sable-black-lace-bow-gown-instagram.jpg"),
    ("landing_page/5.SABLE_ORCHID/IMG_6592.jpg", "sable-teal-aodai-hotel-instagram.jpg"),
    ("landing_page/5.SABLE_ORCHID/IMG_6593.jpg", "sable-red-lace-aodai-red-carpet.jpg"),
    ("landing_page/5.SABLE_ORCHID/IMG_6594.jpg", "sable-green-lace-cape-red-curtain.jpg"),

    # Section 6 - FOOTER
    ("landing_page/6.FOOTER/R0008451.jpg", "footer-atelier-chair-dark-wood.jpg"),
]

# Execute JPG copies
print("\nCopying JPG files...")
copied_count = 0
for src_rel, dest_name in operations:
    src = source_base / src_rel
    dest = landing_dir / dest_name

    if src.exists():
        shutil.copy2(str(src), str(dest))
        print(f"  ✓ {dest_name}")
        copied_count += 1
    else:
        print(f"  ✗ FAILED: {src_rel} not found")

print(f"Copied {copied_count} JPG files")

# HEIC to JPG conversions
print("\nConverting HEIC files to JPG...")
heic_operations = [
    ("landing_page/2.KOL_featuring/IMG_9128.HEIC", "kol-placeholder-1.jpg"),
    ("landing_page/2.KOL_featuring/IMG_9491.HEIC", "kol-placeholder-2.jpg"),
    ("landing_page/2.KOL_featuring/8.HEIC", "kol-placeholder-3.jpg"),
]

converted_count = 0
for src_rel, dest_name in heic_operations:
    src = source_base / src_rel
    dest = landing_dir / dest_name

    if src.exists():
        try:
            # Use ImageMagick via command line
            subprocess.run(
                ["magick", str(src), str(dest)],
                check=True,
                capture_output=True
            )
            print(f"  ✓ {dest_name}")
            converted_count += 1
        except subprocess.CalledProcessError as e:
            print(f"  ✗ FAILED to convert {src_rel}: {e}")
        except FileNotFoundError:
            print(f"  ✗ ImageMagick (magick) not found")
            # Fallback: copy as-is if magick not available
            try:
                shutil.copy2(str(src), str(dest))
                print(f"  ⚠ Copied HEIC as-is (no conversion): {dest_name}")
                converted_count += 1
            except Exception as copy_err:
                print(f"  ✗ Fallback copy also failed: {copy_err}")
    else:
        print(f"  ✗ FAILED: {src_rel} not found")

print(f"Converted {converted_count} HEIC files")

# Copy logos
print("\nCopying logos...")
logos = [
    ("logo_white.svg", "logo_white.svg"),
    ("logo_black.svg", "logo_black.svg"),
]

logo_count = 0
for src_name, dest_name in logos:
    src = source_base / src_name
    dest = public_dir / dest_name

    if src.exists():
        shutil.copy2(str(src), str(dest))
        print(f"  ✓ {dest_name}")
        logo_count += 1
    else:
        print(f"  ✗ FAILED: {src_name} not found")

print(f"Copied {logo_count} logos")

# Create placeholder
print("\nCreating placeholder file...")
placeholder_src = landing_dir / "kol-placeholder-1.jpg"
placeholder_dest = landing_dir / "_placeholder.jpg"
if placeholder_src.exists():
    shutil.copy2(str(placeholder_src), str(placeholder_dest))
    print(f"  ✓ _placeholder.jpg")
else:
    print(f"  ✗ FAILED: Could not create placeholder (source not found)")

# Verification
print("\n" + "="*60)
print("VERIFICATION - Landing Page Assets:")
print("="*60)
landing_files = sorted(os.listdir(str(landing_dir)))
for f in landing_files:
    file_size = os.path.getsize(str(landing_dir / f))
    print(f"  {f} ({file_size} bytes)")

print("\n" + "="*60)
print("VERIFICATION - Public Assets (Logos):")
print("="*60)
public_files = sorted(os.listdir(str(public_dir)))
for f in public_files:
    file_size = os.path.getsize(str(public_dir / f))
    print(f"  {f} ({file_size} bytes)")

print("\n" + "="*60)
print("SUMMARY")
print("="*60)
expected_landing = [
    "_placeholder.jpg",
    "footer-atelier-chair-dark-wood.jpg",
    "hero-embroidered-gown-back-portrait.jpg",
    "hero-silk-halter-back-detail.jpg",
    "kol-black-sequin-aodai-rooftop-night.jpg",
    "kol-black-sequin-floral-saigon-night.jpg",
    "kol-placeholder-1.jpg",
    "kol-placeholder-2.jpg",
    "kol-placeholder-3.jpg",
    "kol-white-lace-red-floral-red-wall.jpg",
    "renaissance-black-sequin-sitting.jpg",
    "renaissance-blue-tulle-portrait.jpg",
    "renaissance-gold-motion-logo.jpg",
    "renaissance-ivory-brocade-reclining.jpg",
    "renaissance-red-tulle-full-body.jpg",
    "runway-aodai-detail-dark-velvet.jpg",
    "runway-aodai-orchid-closeup-lace.jpg",
    "runway-aodai-orchid-embroidery-detail.jpg",
    "runway-black-kaftan-silver-lace-solo.jpg",
    "runway-bridal-5models-red-ivory.jpg",
    "runway-bridal-aodai-5models-lineup.jpg",
    "runway-dragon-embroidery-aodai-teal.jpg",
    "runway-group-6models-maison-signage.jpg",
    "runway-trio-cityview-black-red-pink.jpg",
    "runway-white-lace-aodai-detail-shoes.jpg",
    "sable-black-lace-bow-gown-instagram.jpg",
    "sable-duo-jacquard-bar-interior.jpg",
    "sable-green-lace-cape-red-curtain.jpg",
    "sable-red-lace-aodai-red-carpet.jpg",
    "sable-teal-aodai-hotel-instagram.jpg",
]

expected_public = [
    "logo_black.svg",
    "logo_white.svg",
]

missing_landing = set(expected_landing) - set(landing_files)
missing_public = set(expected_public) - set(public_files)
extra_landing = set(landing_files) - set(expected_landing)
extra_public = set(public_files) - set(expected_public)

if not missing_landing and not missing_public:
    print("✓ ALL FILES PRESENT AND ACCOUNTED FOR")
    print(f"  Landing: {len(landing_files)} files")
    print(f"  Public: {len(public_files)} files")
else:
    if missing_landing:
        print(f"✗ MISSING from landing: {missing_landing}")
    if missing_public:
        print(f"✗ MISSING from public: {missing_public}")
    if extra_landing:
        print(f"⚠ EXTRA in landing: {extra_landing}")
    if extra_public:
        print(f"⚠ EXTRA in public: {extra_public}")

print("="*60)

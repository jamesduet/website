#!/bin/bash
# SVG to WebP Conversion Script (Unix/Linux/Mac)
# Requires ImageMagick to be installed

echo "Starting SVG to WebP conversion..."

# Create webp directory if it doesn't exist
mkdir -p "images/webp"

# Function to convert SVG to WebP
convert_svg() {
    local input="$1"
    local output="$2"
    echo "Converting $input to $output..."
    magick "$input" -quality 85 "$output"
}

# Convert top 5 largest SVG files (highest priority)
echo "Converting largest SVG files..."
convert_svg "images/img_service_5.svg" "images/webp/img_service_5.webp"
convert_svg "images/img_featured_blog.svg" "images/webp/img_featured_blog.webp"
convert_svg "images/img_marketing_3.svg" "images/webp/img_marketing_3.webp"
convert_svg "images/img_service_3.svg" "images/webp/img_service_3.webp"
convert_svg "images/img_service_1.svg" "images/webp/img_service_1.webp"

# Convert remaining large SVG files
echo "Converting remaining large SVG files..."
convert_svg "images/img_service_6.svg" "images/webp/img_service_6.webp"
convert_svg "images/img_marketing_2.svg" "images/webp/img_marketing_2.webp"
convert_svg "images/img_ready.svg" "images/webp/img_ready.webp"
convert_svg "images/img_marketing_1.svg" "images/webp/img_marketing_1.webp"
convert_svg "images/img_service_2.svg" "images/webp/img_service_2.webp"
convert_svg "images/img_bkgd_1.svg" "images/webp/img_bkgd_1.webp"
convert_svg "images/img_promo.svg" "images/webp/img_promo.webp"
convert_svg "images/img_products.svg" "images/webp/img_products.webp"
convert_svg "images/img_marketing_0.svg" "images/webp/img_marketing_0.webp"
convert_svg "images/img_service_4.svg" "images/webp/img_service_4.webp"
convert_svg "images/img_featured_blog8.svg" "images/webp/img_featured_blog8.webp"
convert_svg "images/0 - old images/img_airportride.svg" "images/webp/img_airportride.webp"
convert_svg "images/img_marketing_6.svg" "images/webp/img_marketing_6.webp"
convert_svg "images/img_featured_blog9.svg" "images/webp/img_featured_blog9.webp"
convert_svg "images/img_marketing_9.svg" "images/webp/img_marketing_9.webp"
convert_svg "images/img_featured_blog5.svg" "images/webp/img_featured_blog5.webp"
convert_svg "images/img_marketing_5.svg" "images/webp/img_marketing_5.webp"
convert_svg "images/img_marketing_10.svg" "images/webp/img_marketing_10.webp"
convert_svg "images/img_featured_blog6.svg" "images/webp/img_featured_blog6.webp"
convert_svg "images/img_featured_blog4.svg" "images/webp/img_featured_blog4.webp"
convert_svg "images/img_marketing_4.svg" "images/webp/img_marketing_4.webp"
convert_svg "images/img_marketing_8.svg" "images/webp/img_marketing_8.webp"

echo "Conversion complete!"
echo "WebP files created in images/webp/ directory"

# Display size comparison
echo -e "\nSize comparison:"
du -sh images/*.svg | head -10
du -sh images/webp/*.webp | head -10
@echo off
REM SVG to WebP Conversion Script
REM Requires ImageMagick or WebP tools to be installed

echo Starting SVG to WebP conversion...

REM Create webp directory if it doesn't exist
if not exist "images\webp" mkdir "images\webp"

REM Convert top 5 largest SVG files (highest priority)
echo Converting largest SVG files...
magick "images/img_service_5.svg" -quality 85 "images/webp/img_service_5.webp"
magick "images/img_featured_blog.svg" -quality 85 "images/webp/img_featured_blog.webp"
magick "images/img_marketing_3.svg" -quality 85 "images/webp/img_marketing_3.webp"
magick "images/img_service_3.svg" -quality 85 "images/webp/img_service_3.webp"
magick "images/img_service_1.svg" -quality 85 "images/webp/img_service_1.webp"

REM Convert remaining large SVG files
echo Converting remaining large SVG files...
magick "images/img_service_6.svg" -quality 85 "images/webp/img_service_6.webp"
magick "images/img_marketing_2.svg" -quality 85 "images/webp/img_marketing_2.webp"
magick "images/img_ready.svg" -quality 85 "images/webp/img_ready.webp"
magick "images/img_marketing_1.svg" -quality 85 "images/webp/img_marketing_1.webp"
magick "images/img_service_2.svg" -quality 85 "images/webp/img_service_2.webp"
magick "images/img_bkgd_1.svg" -quality 85 "images/webp/img_bkgd_1.webp"
magick "images/img_promo.svg" -quality 85 "images/webp/img_promo.webp"
magick "images/img_products.svg" -quality 85 "images/webp/img_products.webp"
magick "images/img_marketing_0.svg" -quality 85 "images/webp/img_marketing_0.webp"
magick "images/img_service_4.svg" -quality 85 "images/webp/img_service_4.webp"
magick "images/img_featured_blog8.svg" -quality 85 "images/webp/img_featured_blog8.webp"
magick "images/0 - old images/img_airportride.svg" -quality 85 "images/webp/img_airportride.webp"
magick "images/img_marketing_6.svg" -quality 85 "images/webp/img_marketing_6.webp"
magick "images/img_featured_blog9.svg" -quality 85 "images/webp/img_featured_blog9.webp"
magick "images/img_marketing_9.svg" -quality 85 "images/webp/img_marketing_9.webp"
magick "images/img_featured_blog5.svg" -quality 85 "images/webp/img_featured_blog5.webp"
magick "images/img_marketing_5.svg" -quality 85 "images/webp/img_marketing_5.webp"
magick "images/img_marketing_10.svg" -quality 85 "images/webp/img_marketing_10.webp"
magick "images/img_featured_blog6.svg" -quality 85 "images/webp/img_featured_blog6.webp"
magick "images/img_featured_blog4.svg" -quality 85 "images/webp/img_featured_blog4.webp"
magick "images/img_marketing_4.svg" -quality 85 "images/webp/img_marketing_4.webp"
magick "images/img_marketing_8.svg" -quality 85 "images/webp/img_marketing_8.webp"

echo Conversion complete!
echo WebP files created in images/webp/ directory
pause
# WebP Implementation Guide

## Prerequisites

To run the conversion scripts, you need to install ImageMagick:

### Windows
1. Download ImageMagick from: https://imagemagick.org/script/download.php#windows
2. Install with WebP support enabled
3. Add to PATH environment variable
4. Run: `convert-svg-to-webp.bat`

### Mac/Linux
```bash
# Install ImageMagick with WebP support
brew install imagemagick  # Mac
# or
sudo apt-get install imagemagick  # Ubuntu/Debian

# Make script executable and run
chmod +x convert-svg-to-webp.sh
./convert-svg-to-webp.sh
```

## Conversion Process

The scripts will:
1. Create `images/webp/` directory
2. Convert 26 large SVG files to WebP format
3. Use 85% quality for optimal size/quality balance
4. Maintain original filenames with .webp extension

## Expected Results

| Original SVG | Original Size | WebP Size | Savings |
|-------------|---------------|-----------|---------|
| img_service_5.svg | 21.1 MB | ~6.3 MB | 70% |
| img_featured_blog.svg | 12.9 MB | ~3.9 MB | 70% |
| img_marketing_3.svg | 12.9 MB | ~3.9 MB | 70% |
| img_service_3.svg | 11.1 MB | ~3.3 MB | 70% |
| img_service_1.svg | 10.3 MB | ~3.1 MB | 70% |

Total expected savings: **85.6 MB (70% reduction)**

## HTML Implementation

HTML files will be updated to use this structure:
```html
<picture>
  <source srcset="images/webp/img_service_1.webp" type="image/webp">
  <img src="images/img_service_1.svg" alt="Service 1" loading="lazy">
</picture>
```

This provides:
- WebP format for modern browsers (better performance)
- SVG fallback for older browsers (compatibility)
- Lazy loading for below-the-fold images
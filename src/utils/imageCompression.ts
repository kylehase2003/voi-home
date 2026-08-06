/**
 * Compresses an image file using canvas
 * @param file - The image file to compress
 * @param maxWidth - Maximum width of the output image (default: 1920)
 * @param maxHeight - Maximum height of the output image (default: 1080)
 * @param quality - Quality from 0 to 1 (default: 0.8)
 * @param preserveTransparency - Whether to preserve PNG transparency (default: false)
 * @returns Compressed file as a Blob
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8,
  preserveTransparency: boolean = false
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // Check if the file is a PNG (which may have transparency)
    const isPng = file.type === 'image/png';
    const shouldPreserveTransparency = preserveTransparency || isPng;
    const outputType = shouldPreserveTransparency ? 'image/png' : 'image/jpeg';
    const outputExtension = shouldPreserveTransparency ? '.png' : '.jpg';
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // For PNG with transparency, don't fill background
        // For JPEG, fill with white background first
        if (!shouldPreserveTransparency) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob - use appropriate quality for each format
        // PNG doesn't use quality parameter the same way
        const blobQuality = shouldPreserveTransparency ? undefined : quality;
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }
            
            // Create a new file with appropriate extension
            const baseName = file.name.replace(/\.[^/.]+$/, '');
            const newFileName = baseName + outputExtension;
            
            const compressedFile = new File([blob], newFileName, {
              type: outputType,
              lastModified: Date.now(),
            });
            
            console.log(
              `Image compressed: ${(file.size / 1024).toFixed(1)}KB → ${(compressedFile.size / 1024).toFixed(1)}KB (${Math.round((1 - compressedFile.size / file.size) * 100)}% reduction) [${outputType}]`
            );
            
            resolve(compressedFile);
          },
          outputType,
          blobQuality
        );
      };
      
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}


export const handleImageFileSelection = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create a blob URL for immediate preview
        const blobUrl = URL.createObjectURL(file);
        console.log('📁 File selected:', file.name, 'Size:', file.size);
        resolve(blobUrl);
      } else {
        reject(new Error('No file selected'));
      }
    };
    
    input.oncancel = () => {
      reject(new Error('File selection cancelled'));
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });
};

export const validateImageFile = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (file.size > maxSize) {
    console.error('File too large:', file.size);
    return false;
  }
  
  if (!allowedTypes.includes(file.type)) {
    console.error('Invalid file type:', file.type);
    return false;
  }
  
  return true;
};

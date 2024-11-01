interface Position {
  x: number;
  y: number;
}

const loadImage = async (url: string) => {
  const response = await fetch(url, { mode: 'cors', method: 'GET', cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Failed to fetch image at ${url}`);
  }
  const blob = await response.blob();
  
return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(img.src); // Clean up
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image at ${url}`));
    };
  });
};

const generateMockup = async (
  mockupUrl: string,
  imageUrl: string,
  position: Position,
  maxUserImageSize: number,
): Promise<string> => {
  try {
    // Load both images in parallel
    const [mockupImage, userImage] = await Promise.all([loadImage(mockupUrl), loadImage(imageUrl)]);

    // Create a canvas matching the dimensions of the mockup image
    const canvas = document.createElement('canvas');
    canvas.width = mockupImage.width;
    canvas.height = mockupImage.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to get canvas context');

    // Draw the mockup image onto the canvas
    ctx.drawImage(mockupImage, 0, 0);

    // Calculate the user image dimensions while maintaining aspect ratio
    const userAspectRatio = userImage.width / userImage.height;
    let userDrawWidth: number;
    let userDrawHeight: number;

    if (userAspectRatio > 1) {
      // Image is wider than tall
      userDrawWidth = maxUserImageSize;
      userDrawHeight = maxUserImageSize / userAspectRatio;
    } else {
      // Image is taller than wide
      userDrawWidth = maxUserImageSize * userAspectRatio;
      userDrawHeight = maxUserImageSize;
    }

    // Adjust the position if necessary
    const adjustedX = position.x;
    const adjustedY = position.y;

    // Save the current context state
    ctx.save();

    // Set shadow properties for a realistic effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)'; // Semi-transparent black shadow
    ctx.shadowBlur = 20; // Soften the shadow edges
    ctx.shadowOffsetX = 10; // Horizontal shadow offset
    ctx.shadowOffsetY = 10; // Vertical shadow offset

    // Draw the user image onto the canvas
    ctx.drawImage(userImage, adjustedX, adjustedY, userDrawWidth, userDrawHeight);

    // Restore the context to its original state
    ctx.restore();

    // Convert the canvas to a blob and create a URL
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });
    if (!blob) throw new Error('Canvas is empty');

    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
  } catch (error: any) {
    throw new Error(`An error occurred: ${error.message}`);
  }
};

export default generateMockup;

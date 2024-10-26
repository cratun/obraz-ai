import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(request: Request) {
  try {
    // Parse the image URL from the request query parameters
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imgId');

    if (!imageId) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Fetch the image from the provided URL
    const response = await fetch(`https://obraz-ai-bucket.s3.eu-central-1.amazonaws.com/${imageId}.webp`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const fileBuffer = await response.arrayBuffer();

    // Resize the image to 300x300 pixels using Sharp
    const resizedImage = await sharp(fileBuffer).resize(300, 300).toFormat('webp').toBuffer();

    // Return the resized image as a response
    return new NextResponse(resizedImage, { headers: { 'Content-Type': 'image/jpeg' } });
  } catch (error) {
    console.error('Error resizing image:', error);

    return NextResponse.json({ error: 'Failed to resize image' }, { status: 500 });
  }
}

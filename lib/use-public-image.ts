"use client";

import { useEffect, useState } from 'react';

// This hook is used to convert an image from public folder to a data URL for PDF generation
export const usePublicImage = (imagePath: string): string => {
  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Create a new image element
        const img = new Image();
        
        // Set crossOrigin to anonymous to avoid CORS issues
        img.crossOrigin = 'anonymous';
        
        // Create a promise to handle image loading
        const imageLoaded = new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
        });
        
        // Set the image source to the public path
        img.src = imagePath;
        
        // Wait for the image to load
        await imageLoaded;
        
        // Create a canvas to draw the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // Convert the canvas to a data URL
          const dataUrl = canvas.toDataURL('image/png');
          setImageDataUrl(dataUrl);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        // Set a fallback image
        setImageDataUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEHUlEQVR4nO2dS4gcVRSGr0aJLnxEjSL4woWKaHDhwoULQUFE1I0rFReCotGo0ZpzqlrFR0CJD3yB4hND6k5PjVHxCW7cuBIXgiLixkV8JKiJGMHEmJhHnRoJzGQmk5np6vvvrf+DYhimq+v8X98+fW931Q0hCIIgCIIgCIIgCIIgCIIwUZcncp0Z6hzzCMcDwhsI8SHCN4hwwAodROBDBDZH1DbrxxqEOgvba0Wd9GNyfKrOZIQ9iNDuN4ReG9O/gch+dCbsfvnyuU17KdiFCZNLR1SC0EbgKQzY8g2NeSvUicngWoRtU52JU0HwJcLWpJEUQGovR+BvkwnhBEL4ve/19pxG4EIE9k85hL8w1esMbtO4+hUC30wxhKNdaUS2ZbKx+pRScLukYVyBwHZkFERHAHy9Mtn4CLpXj58VP4jjbx7ijCxCQOBvTSYa36R7qXOVbxADrE97KMfA3poUciWCerdOm7oys3ahawhH2sDXK/tcGumOsO0po2OddN83GgThRDDHtzHgupOGEQrFDKJTj9/NdXV88ZIwQsGYQSRyYeDy04WR1qTBGUSwlX0dV1wYpzZIXkHQDbZluluyFEYoGDeIuJFa7RauxDCyDSLkJi6M0PFcaRih4MwgOm1wYYzlHSCEjGAahLjCMJ1Z3iHaTsqFMc5KVBihYMwgii2MUDBmEEUXRigYNIgiCyMUjHYeUXRhhIJBgzCx6JpEpc7i1JMQhjrLpjPbuA1GwXh3KmGEgjGDSGDtTNbZIwyO+35s6ZySYWP4jb5jTVwYw68y63wYcR0YchcVrsgwQsGYQZS1MELB6MurmjEIYRgjD4IwiYgwCLsxCMIFEQbhLQbBcRDsGO4Yw5VDJu0JgjCJiDAIuzEIwgURBuEtBsFxEOwY7hjDlUMm7QmCMImIMAi7MQjCBREG4S0GwXEQ7BjuGMOVQybtCYIwiYgwCLsxCMIFEQbhLQbBcRDsGO4Yw5VDJu0JgjCJiDAIuzEIwgURBuEtBsFxEOwY7hjDlUMm7QmCMImIMAi7MQjCBREG4S0GwXEQ7BjuGMOVQybtCYIwiYgwCLsxCMIFEQbhLQbBcRDsGO4Yw5VDJu0JgjCJiDAIuzEIwgURBuEtBsFxEOwY7hjDlUMm7QmCMImIMAi7MQjCBREG4S0GwXEQ7BjuGMOVQybtCYIwiYgwCLsxCMIFEQbhLQbBcRDsGO4Yw5VDJu0JgjCJiDAIuzEIwgURBuEtBsFxEOwY7hjDlUMm7QmCMImIMAi7MQjCBREG4S0GwXEQ7BjuGMOVQybtCYIwiYgwCLsxCMIFEQbhLQbBcRDsGO4Yw5VDJu0JgjCJiDAIuzEIwgURBuEtBsFxEOwY7hjDlUMm7QmCMAno7VF1JgdBEARBEARBEARBEARBEMKI8h+Ka8TXNGp1lAAAAABJRU5ErkJggg==');
      }
    };

    if (imagePath) {
      loadImage();
    }
  }, [imagePath]);

  return imageDataUrl;
};

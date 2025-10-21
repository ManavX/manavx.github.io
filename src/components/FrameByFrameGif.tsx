import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { parseGIF, decompressFrames } from 'gifuct-js';

interface FrameByFrameGifProps {
  scrollProgress: number;
}

export function FrameByFrameGif(_props: FrameByFrameGifProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Load and parse GIF
  useEffect(() => {
    const loadGif = async () => {
      try {
        const response = await fetch('/manav.gif');
        const arrayBuffer = await response.arrayBuffer();
        const gif = parseGIF(arrayBuffer);
        const parsedFrames = decompressFrames(gif, true);

        setFrames(parsedFrames);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading GIF:', error);
      }
    };

    loadGif();
  }, []);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  // Draw frames based on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || frames.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map scroll progress to frame index
      const frameIndex = Math.floor(latest * (frames.length - 1));
      const frame = frames[frameIndex];

      if (!frame) return;

      // Create temporary canvas for frame
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return;

      tempCanvas.width = frame.dims.width;
      tempCanvas.height = frame.dims.height;

      // Create image data from frame patch
      const imageData = tempCtx.createImageData(frame.dims.width, frame.dims.height);
      imageData.data.set(frame.patch);
      tempCtx.putImageData(imageData, 0, 0);

      // Calculate dimensions to cover canvas
      const gifAspect = frame.dims.width / frame.dims.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > gifAspect) {
        // Canvas is wider - fit to width
        drawWidth = canvas.width;
        drawHeight = canvas.width / gifAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller - fit to height
        drawHeight = canvas.height;
        drawWidth = canvas.height * gifAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      // Clear canvas and draw frame
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, offsetX, offsetY, drawWidth, drawHeight);
    });

    // Draw initial frame
    scrollYProgress.set(scrollYProgress.get());

    return () => unsubscribe();
  }, [frames, isLoaded, scrollYProgress]);

  return (
    <div className="frame-by-frame-gif">
      <canvas ref={canvasRef} className="gif-canvas" />
      {!isLoaded && (
        <div className="loading-indicator">Loading animation...</div>
      )}
    </div>
  );
}

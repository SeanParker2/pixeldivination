import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = 100;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // 0.5 to 2.5
          speed: Math.random() * 0.5 + 0.1, // 0.1 to 0.6
          opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
          color: Math.random() > 0.8 
            ? (Math.random() > 0.5 ? '#A78BFA' : '#FFD700') // Purple or Gold
            : '#FFFFFF' // White
        });
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Update position (move down slowly to simulate moving forward/up)
        // Or move up? User said "simulate spaceship moving slowly forward".
        // Usually stars move radially or top-down/bottom-up depending on perspective.
        // Let's do simple vertical scrolling for parallax.
        // "simulate spaceship moving slowly forward" often implies stars streaming past.
        // If we look forward, stars come from center (radial). 
        // If we look down/up, they stream. 
        // Given "float slowly" and "y coordinate update", let's assume vertical movement.
        // Let's move them DOWN (y increases) to simulate moving UP/FORWARD in a 2D scroller sense?
        // Or user said "floating". Let's stick to simple subtle movement.
        
        star.y += star.speed;

        // Reset if out of bounds
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    update();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#1E1E2E' }} // Fallback or base color, but MainLayout has bg-pixel-dark
    />
  );
};

import React, { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const count = Math.floor((width * height) / 2000);
    
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    
    starsRef.current = stars;
  }, []);

  const addShootingStar = useCallback((width: number, height: number) => {
    if (Math.random() > 0.005) return; // 控制频率
    
    const angle = Math.random() * 0.5 + 0.3; // 15-45度
    shootingStarsRef.current.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.3,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 8 + 5,
      angle,
      opacity: 1,
      life: 0,
      maxLife: Math.random() * 30 + 20,
    });
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    timeRef.current += 1;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制渐变背景
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) / 2
    );
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.5, '#050510');
    gradient.addColorStop(1, '#000005');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制星云效果
    const nebulaGradient = ctx.createRadialGradient(
      width * 0.3, height * 0.4, 0,
      width * 0.3, height * 0.4, width * 0.4
    );
    nebulaGradient.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
    nebulaGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.02)');
    nebulaGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = nebulaGradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制星星
    for (const star of starsRef.current) {
      const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset);
      const opacity = star.opacity * (0.5 + twinkle * 0.5);
      const size = star.size * (0.8 + twinkle * 0.2);
      
      // 星星发光效果
      const glow = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, size * 3
      );
      glow.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      glow.addColorStop(0.5, `rgba(200, 200, 255, ${opacity * 0.3})`);
      glow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = glow;
      ctx.fillRect(star.x - size * 3, star.y - size * 3, size * 6, size * 6);
      
      // 星星核心
      ctx.beginPath();
      ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      
      // 十字光芒（仅对较大的星星）
      if (star.size > 1.5) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - size * 2, star.y);
        ctx.lineTo(star.x + size * 2, star.y);
        ctx.moveTo(star.x, star.y - size * 2);
        ctx.lineTo(star.x, star.y + size * 2);
        ctx.stroke();
      }
    }
    
    // 绘制流星
    addShootingStar(width, height);
    
    for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
      const star = shootingStarsRef.current[i];
      star.life++;
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.opacity = 1 - (star.life / star.maxLife);
      
      if (star.life >= star.maxLife) {
        shootingStarsRef.current.splice(i, 1);
        continue;
      }
      
      const tailX = star.x - Math.cos(star.angle) * star.length;
      const tailY = star.y - Math.sin(star.angle) * star.length;
      
      // 流星尾迹
      const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(star.x, star.y);
      ctx.stroke();
      
      // 流星头部发光
      const headGlow = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, 8
      );
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
      headGlow.addColorStop(0.5, `rgba(200, 200, 255, ${star.opacity * 0.5})`);
      headGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = headGlow;
      ctx.fillRect(star.x - 8, star.y - 8, 16, 16);
    }
  }, [addShootingStar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (ctx && canvas) {
        draw(ctx, canvas.width, canvas.height);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw, initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

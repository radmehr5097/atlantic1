import { useEffect, useRef } from 'react';

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2, // always float up
        opacity: Math.random() * 0.7 + 0.1,
        opacitySpeed: (Math.random() - 0.5) * 0.01,
      };
    };

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push(createParticle());
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#C9A227';
        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        if (p.opacity <= 0 || p.opacity >= 0.9) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Reset if out of bounds
        if (p.y < 0 || p.x < 0 || p.x > width) {
          particles[idx] = createParticle();
          particles[idx].y = height; // start at the bottom again
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gold-particles-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
    />
  );
}

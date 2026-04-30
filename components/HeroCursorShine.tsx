"use client";

import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function HeroCursorShine() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to cover the whole hero section
    const resizeCanvas = () => {
      const rect = hero.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Neon sprinkle colors matching the theme
    const colors = ["#a855f7", "#3b82f6", "#ec4899", "#ffffff", "#c084fc"];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      lastPosRef.current = { x, y };

      // Spawn sprinkles only if mouse is moving fast enough
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Create 3-5 particles per movement frame
        const particleCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            id: Math.random(),
            x,
            y,
            // Throw particles in the opposite direction of mouse movement with some random scatter
            vx: -dx * 0.05 + (Math.random() - 0.5) * 3,
            vy: -dy * 0.05 + (Math.random() - 0.5) * 3 + 0.5, // +0.5 adds slight gravity pulling them down
            life: 1,
            maxLife: 1,
            size: Math.random() * 3 + 1, // Sprinkles between 1px and 4px
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseenter", handleMouseEnter);
    hero.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current = particlesRef.current.filter((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        
        // Add a bit more gravity over time
        p.vy += 0.05; 
        
        // Fade out
        p.life -= 0.02;
        
        if (p.life <= 0) return false;

        // Draw particle
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Optional: Add a tiny glow to the sprinkle
        ctx.shadowBlur = 5;
        ctx.shadowColor = p.color;
        
        return true;
      });

      // Reset shadow blur to avoid performance hit on next clears
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseenter", handleMouseEnter);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* The brighter, more visible spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.4), transparent 40%)`,
        }}
      />
      {/* The canvas rendering the sprinkles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

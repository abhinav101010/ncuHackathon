import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { cursor } from "../utils/cursorTracker";

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let bubbles = [];
    let fishes = [];
    let sparkles = [];

    /* ================= RESIZE ================= */

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      createParticles();
      createBubbles();
      createFish();
    };

    /* ================= PARTICLES ================= */

    const createParticles = () => {
      particles = [];

      const count = window.innerWidth < 600 ? 40 : 80;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        });
      }
    };

    /* ================= BUBBLES ================= */

    const createBubbles = () => {
      bubbles = [];

      for (let i = 0; i < 30; i++) {
        bubbles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          r: Math.random() * 5 + 2,
          vy: Math.random() * 0.4 + 0.2,
        });
      }
    };

    /* ================= FISH ================= */

    const createFish = () => {
      fishes = [];

      for (let i = 0; i < 10; i++) {
        fishes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          speed: Math.random() * 0.7 + 0.3,
          dir: Math.random() > 0.5 ? 1 : -1,

          size: Math.random() * 6 + 6,
        });
      }
    };

    /* ================= STUDENT SPARKS ================= */

    const createSpark = (x, y) => {
      for (let i = 0; i < 8; i++) {
        sparkles.push({
          x,
          y,

          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 2 - 0.5,

          life: 50,
          size: Math.random() * 3 + 2,
        });
      }
    };

    resize();

    /* ================= NETWORK ================= */

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primary = theme.palette.primary.main;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        /* cursor repulsion */

        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        const radius = 140;

        if (dist < radius) {
          const force = (radius - dist) / radius;

          p.vx += dx * force * 0.01;
          p.vy += dy * force * 0.01;
        }

        ctx.fillStyle = primary;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = 1 - dist / 120;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);

            ctx.strokeStyle =
              theme.palette.mode === "light"
                ? `rgba(0,0,0,${opacity * 0.15})`
                : `rgba(0,229,255,${opacity * 0.35})`;

            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(drawNetwork);
    };

    /* ================= OCEAN ================= */

    const drawOcean = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.0015;

      /* waves */

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();

        for (let x = 0; x <= window.innerWidth; x++) {
          const y =
            window.innerHeight * 0.6 +
            Math.sin(x * 0.01 + time + i) * (20 + i * 8) +
            Math.sin(x * 0.02 + time * 1.4) * 12;

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(0,180,255,${0.2 + i * 0.15})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      /* bubbles */

      bubbles.forEach((b) => {
        b.y -= b.vy;

        const dx = b.x - cursor.x;
        const dy = b.y - cursor.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          b.x += dx * 0.02;
          b.y += dy * 0.02;
        }

        if (b.y < -10) {
          b.y = window.innerHeight + 10;
          b.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(180,240,255,0.25)";
        ctx.fill();
      });

      /* fish */

      fishes.forEach((f) => {
        f.x += f.speed * f.dir;

        const dx = f.x - cursor.x;
        const dy = f.y - cursor.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          f.x += dx * 0.03;
          f.y += dy * 0.03;
        }

        if (f.dir === 1 && f.x > window.innerWidth + 20) {
          f.x = -20;
          f.y = Math.random() * window.innerHeight;
        }

        if (f.dir === -1 && f.x < -20) {
          f.x = window.innerWidth + 20;
          f.y = Math.random() * window.innerHeight;
        }

        ctx.fillStyle = "rgba(200,240,255,0.85)";

        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x - 10 * f.dir, f.y - f.size / 2);
        ctx.lineTo(f.x - 10 * f.dir, f.y + f.size / 2);
        ctx.closePath();
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(drawOcean);
    };

    /* ================= STUDENT ================= */

    const drawStudent = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.15) {
        createSpark(cursor.x, cursor.y + 8);
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        const hue = (p.x + p.y) % 360;

        ctx.fillStyle = `hsl(${hue},90%,60%)`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      sparkles.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;

        s.vx *= 0.98;
        s.vy *= 0.97;

        s.life--;

        const lifeRatio = s.life / 50;

        const r = 255;
        const g = Math.floor(160 * lifeRatio + 80);
        const b = Math.floor(40 * lifeRatio);

        ctx.fillStyle = `rgba(${r},${g},${b},${lifeRatio})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();

        if (s.life <= 0) {
          sparkles.splice(i, 1);
        }
      });
      animationRef.current = requestAnimationFrame(drawStudent);
    };

    /* ================= SELECT THEME ================= */

    const themeName = theme.name || theme.palette.mode;

    if (themeName === "ocean") {
      drawOcean();
    } else if (themeName === "student") {
      drawStudent();
    } else {
      drawNetwork();
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

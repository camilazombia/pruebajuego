import React, { useEffect, useMemo, useRef, useState } from "react";

type BunnyProps = {
  size?: number | string;
  className?: string;
  eyeRangeUnits?: number;   // rango máximo de movimiento en unidades del viewBox
  mouthRangeUnits?: number; // movimiento vertical de la boca en unidades del viewBox
  wiggleEars?: boolean;
  showBodyBase?: boolean;
  blinkMs?: number;         // duración del parpadeo
  blinkEveryMs?: number;    // intervalo base entre parpadeos
  followSmooth?: number;    // 0..1 (más alto = más suave)
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Bunny: React.FC<BunnyProps> = ({
  size = 400,
  className = "",
  eyeRangeUnits = 4,     // MUY corto para que no “salga” del rostro
  mouthRangeUnits = 2,
  wiggleEars = true,
  showBodyBase = true,
  blinkMs = 140,
  blinkEveryMs = 3600,
  followSmooth = 0.18,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // objetivo normalizado por cursor (-1..1)
  const target = useRef({ x: 0, y: 0 });
  // estado suavizado (-1..1)
  const [nx, setNx] = useState(0);
  const [ny, setNy] = useState(0);

  const [isBlinking, setIsBlinking] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number>(0);

  // Seguir el cursor (fuera o dentro del SVG) -> normalizado
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      target.current.x = clamp(dx, -1, 1);
      target.current.y = clamp(dy, -1, 1);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Loop de suavizado (lerp en RAF)
  useEffect(() => {
    const tick = (ts: number) => {
      const dt = Math.min(1, (ts - (lastTs.current || ts)) / 16.67); // ~60fps
      lastTs.current = ts;
      setNx((prev) => lerp(prev, target.current.x, followSmooth * dt));
      setNy((prev) => lerp(prev, target.current.y, followSmooth * dt));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [followSmooth]);

  // Parpadeo automático
  useEffect(() => {
    let alive = true;
    const blinkOnce = () => {
      if (!alive) return;
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        // próximo parpadeo con pequeño jitter
        setTimeout(blinkOnce, blinkEveryMs + Math.random() * 1200);
      }, blinkMs);
    };
    const id = setTimeout(blinkOnce, blinkEveryMs);
    return () => {
      alive = false;
      clearTimeout(id);
    };
  }, [blinkMs, blinkEveryMs]);

  // Traslaciones en unidades del viewBox (500x500)
  const eyeDx = useMemo(() => clamp(nx * eyeRangeUnits, -eyeRangeUnits, eyeRangeUnits), [nx, eyeRangeUnits]);
  const eyeDy = useMemo(() => clamp(ny * eyeRangeUnits * 0.6, -eyeRangeUnits, eyeRangeUnits), [ny, eyeRangeUnits]);
  const mouthDy = useMemo(() => clamp(ny * mouthRangeUnits, -mouthRangeUnits, mouthRangeUnits), [ny, mouthRangeUnits]);

  return (
    <div
      className={className}
      style={{ width: typeof size === "number" ? `${size}px` : size, height: "auto", display: "inline-block" }}
    >
      <style>
        {`
          @keyframes bunny-ear-wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-4deg); }
            75% { transform: rotate(4deg); }
          }
          .ear {
            transform-origin: center bottom;
            ${wiggleEars ? "animation: bunny-ear-wiggle 2.6s ease-in-out infinite;" : ""}
          }
          .ear.right { animation-delay: 1.3s; }

          /* Parpadeo: escala Y solo del círculo del ojo */
          .eye-circle {
            transform-box: fill-box;   /* importante para SVG */
            transform-origin: 50% 50%;
            transition: transform 90ms ease-in-out;
          }
          .eye-circle.blink {
            transform: scaleY(0.08);
          }
        `}
      </style>

      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Bunny"
      >
        <defs>
          <style>{`
            .st0 { fill: #f59080; stroke: #d85441; stroke-miterlimit: 10; }
            .st1 { fill: #131321; }
            .st2 { fill: #fff; }
            .st3, .st4 { isolation: isolate; }
            .st5 { fill: #3268b1; }
            .st4 { fill: #cfd4cd; mix-blend-mode: multiply; }
          `}</style>
        </defs>

        <g className="st3">
          {/* Oreja derecha */}
          <g className="ear right">
            <path className="st2" d="M358.98,352.02s40.75-29.07,61.71-70.96c27.24-54.43,20.12-123.2-26.45-140.16-46.58-16.95-95.12,31.56-109.25,90.77-10.87,45.56,1.66,94.03,1.66,94.03l72.33,26.32h0Z"/>
            <path className="st0" d="M376.2,195.22c68.05,24.77-39.89,147.8-39.89,147.8l-12.47-4.54-.91-.33-12.47-4.54s-4.6-164,63.45-139.23l2.29.83h0Z"/>
          </g>

          {/* Oreja izquierda */}
          <g className="ear left">
            <path className="st2" d="M218.51,326.32s8.26-49.37-6.54-93.81c-19.23-57.75-72.89-101.35-117.81-80.4-44.92,20.95-44.94,89.58-13.07,141.43,24.53,39.91,67.66,65.31,67.66,65.31l69.76-32.53h0Z"/>
            <path className="st0" d="M119.82,203.27c65.63-30.61,76.31,132.72,76.31,132.72l-12.03,5.61-.88.41-12.03,5.61s-119.22-112.71-53.58-143.31l2.21-1.03h0Z"/>
          </g>

          {/* Base del cuerpo (fondo visible) */}
          {showBodyBase && (
            <path className="st2" d="M441.38,500H77.67c0-100.44,81.42-181.86,181.86-181.86s181.86,81.42,181.86,181.86h-.01Z" />
          )}

          {/* Cara */}
          <g id="cara">
            {/* Ojo izquierdo (centro 186.6, 423.86) */}
            <g transform={`translate(${eyeDx}, ${eyeDy})`}>
              <circle
                className={`st1 eye-circle ${isBlinking ? "blink" : ""}`}
                cx="186.6"
                cy="423.86"
                r="14.79"
              />
            </g>

            {/* Ojo derecho (centro 329.65, 418.47) */}
            <g transform={`translate(${eyeDx}, ${eyeDy})`}>
              <circle
                className={`st1 eye-circle ${isBlinking ? "blink" : ""}`}
                cx="329.65"
                cy="418.47"
                r="14.79"
              />
            </g>

            {/* Boca (solo movimiento vertical suave) */}
            <g transform={`translate(0, ${mouthDy})`}>
              <path
                className="st1"
                d="M225.14,428.56s5.1-10.09,35.01-10.09,32.38,10.09,32.38,10.09c0,0-7.64,25.95-33.01,25.95s-34.38-25.95-34.38-25.95h0Z"
              />
            </g>

            {/* Lengua / detalle azul (fija) */}
            <path
              className="st5"
              d="M238.58,453.79c-2.18,8.84-2.5,20.02,3.9,27.33,3.11,3.55,8.11,5.61,12.73,6.06s9.04-.91,12.56-3.72c4.31-3.44,5.87-8.76,6.67-14,.29-1.89-2.6-2.7-2.89-.8-.62,4.05-1.55,8.36-4.5,11.41-2.64,2.73-6.4,4.2-10.18,4.2-4.12,0-8.53-1.64-11.54-4.5s-4.32-7.12-4.88-11c-.68-4.72-.11-9.56,1.02-14.17.46-1.87-2.43-2.67-2.89-.8h0Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Bunny;

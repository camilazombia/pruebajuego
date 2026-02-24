import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CONFETTI_COLORS = ['#FFD93D', '#FF6B6B', '#6BCB77', '#4ECDC4', '#A66CFF', '#FF9F43', '#0ABDE3', '#FD79A8'];

interface Piece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1.5,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 5 + Math.random() * 7,
    rotation: Math.random() * 360,
  }));
}

export const PurchaseConfetti: React.FC = () => {
  const [pieces] = useState(() => generatePieces(30));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: p.size > 10 ? '50%' : '2px',
          }}
          initial={{ y: -10, opacity: 0, rotate: 0 }}
          animate={{
            y: ['-5%', '110%'],
            opacity: [0, 1, 1, 0],
            rotate: [0, p.rotation, p.rotation * 2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

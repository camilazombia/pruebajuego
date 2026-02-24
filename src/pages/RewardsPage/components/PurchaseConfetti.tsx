import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CONFETTI_COLORS = [
  '#FFD93D', '#FF6B6B', '#6BCB77', '#4ECDC4',
  '#A66CFF', '#FF9F43', '#0ABDE3', '#FD79A8',
  '#F368E0', '#54A0FF', '#00D2D3', '#FECA57',
];

interface Piece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'rect' | 'circle' | 'star';
  swayX: number;
}

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const shapes: Piece['shape'][] = ['rect', 'circle', 'star'];
    return {
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.8 + Math.random() * 1.4,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 8,
      rotation: 180 + Math.random() * 540,
      shape: shapes[i % 3],
      swayX: (Math.random() - 0.5) * 60,
    };
  });
}

function getShapeStyle(piece: Piece): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    left: `${piece.x}%`,
    background: piece.color,
  };

  switch (piece.shape) {
    case 'circle':
      return { ...base, width: piece.size, height: piece.size, borderRadius: '50%' };
    case 'star':
      return {
        ...base,
        width: piece.size,
        height: piece.size,
        borderRadius: '2px',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      };
    default:
      return { ...base, width: piece.size, height: piece.size * 0.4, borderRadius: '2px' };
  }
}

export const PurchaseConfetti: React.FC = () => {
  const [pieces] = useState(() => generatePieces(45));

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
          style={getShapeStyle(p)}
          initial={{ y: '50%', x: 0, opacity: 0, rotate: 0, scale: 0 }}
          animate={{
            y: ['-10%', '115%'],
            x: [0, p.swayX, -p.swayX * 0.5, p.swayX * 0.3],
            opacity: [0, 1, 1, 1, 0],
            rotate: [0, p.rotation],
            scale: [0, 1.2, 1, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
};

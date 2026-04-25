import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import type { MiniGameWord } from './DragAndDropWords';
import styles from './ColorAndLearn.module.css';

interface ColorAndLearnProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

const PALETTE_ENTRIES: { hex: string; cls: string }[] = [
	{ hex: '#ef4444', cls: 'red' },
	{ hex: '#f97316', cls: 'orange' },
	{ hex: '#eab308', cls: 'yellow' },
	{ hex: '#22c55e', cls: 'green' },
	{ hex: '#3b82f6', cls: 'blue' },
	{ hex: '#8b5cf6', cls: 'purple' },
	{ hex: '#ec4899', cls: 'pink' },
	{ hex: '#1f2937', cls: 'dark' },
	{ hex: '#ffffff', cls: 'white' },
	{ hex: '#92400e', cls: 'brown' },
];

const BRUSH_SIZES = [8, 16, 28];

export const ColorAndLearn: React.FC<ColorAndLearnProps> = ({ words, onComplete }) => {
	const { playWord, playFeedback } = useAudio();

	const [currentIdx, setCurrentIdx] = useState(0);
	const [color, setColor] = useState(PALETTE_ENTRIES[0].hex);
	const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
	const [isDrawing, setIsDrawing] = useState(false);
	const [hasDrawn, setHasDrawn] = useState(false);
	const [showWord, setShowWord] = useState(false);
	const [allDone, setAllDone] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const initRef = useRef(false);

	const word = words[currentIdx];

	const clearCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		drawOutline(ctx, word?.emoji || '?', canvas.width, canvas.height);
	}, [word]);

	useEffect(() => {
		if (!initRef.current) {
			initRef.current = true;
		}
		setHasDrawn(false);
		setShowWord(false);
		const t = setTimeout(clearCanvas, 50);
		return () => clearTimeout(t);
	}, [currentIdx, clearCanvas]);

	const getPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
		const canvas = canvasRef.current;
		if (!canvas) return null;
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		if ('touches' in e) {
			const touch = e.touches[0];
			if (!touch) return null;
			return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
		}
		return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
	};

	const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
		setIsDrawing(true);
		const pos = getPos(e);
		if (!pos) return;
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) return;
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		if (!isDrawing) return;
		const pos = getPos(e);
		if (!pos) return;
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) return;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = brushSize;
		ctx.strokeStyle = color;
		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
		if (!hasDrawn) setHasDrawn(true);
	};

	const stopDraw = () => setIsDrawing(false);

	const handleConfirm = () => {
		if (!hasDrawn) return;
		playFeedback('correct');
		setShowWord(true);
		setTimeout(() => playWord(word.english), 400);
	};

	const handleNext = () => {
		if (currentIdx + 1 >= words.length) {
			setAllDone(true);
			playFeedback('star');
			setTimeout(onComplete, 1200);
		} else {
			setCurrentIdx(prev => prev + 1);
		}
	};

	if (allDone) {
		return (
			<div className={styles.container}>
				<motion.div
					className={styles.doneCard}
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
				>
					<span className={styles.doneEmoji}>&#127912;</span>
					<h2 className={styles.doneTitle}>Great job, Explorer!</h2>
					<p className={styles.doneSub}>Coloreaste {words.length} dibujos</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.counter}>{currentIdx + 1} / {words.length}</span>
				<h3 className={styles.prompt}>
					Colorea: <span className={styles.emojiHint}>{word.emoji}</span> {word.spanish}
				</h3>
			</div>

			<div className={styles.canvasWrapper}>
				<canvas
					ref={canvasRef}
					width={400}
					height={400}
					className={styles.canvas}
					onMouseDown={startDraw}
					onMouseMove={draw}
					onMouseUp={stopDraw}
					onMouseLeave={stopDraw}
					onTouchStart={startDraw}
					onTouchMove={draw}
					onTouchEnd={stopDraw}
				/>
			</div>

			<div className={styles.toolbar}>
				<div className={styles.palette}>
					{PALETTE_ENTRIES.map(entry => (
						<button
							key={entry.hex}
							className={`${styles.colorBtn} ${entry.hex === color ? styles.colorActive : ''}`}
							onClick={() => setColor(entry.hex)}
							aria-label={`Color ${entry.cls}`}
						>
							<span className={`${styles.colorSwatch} ${styles[`swatch_${entry.cls}`]}`} />
						</button>
					))}
				</div>
				<div className={styles.brushes}>
					{BRUSH_SIZES.map((s, i) => (
						<button
							key={s}
							className={`${styles.brushBtn} ${s === brushSize ? styles.brushActive : ''}`}
							onClick={() => setBrushSize(s)}
							aria-label={`Pincel ${s}px`}
						>
							<span className={`${styles.brushDot} ${styles[`dot_${i}`]}`} />
						</button>
					))}
				</div>
				<div className={styles.actions}>
					<button className={styles.clearBtn} onClick={clearCanvas}>
						<span className="material-symbols-outlined">delete</span>
					</button>
				</div>
			</div>

			<AnimatePresence>
				{showWord ? (
					<motion.div
						className={styles.wordReveal}
						initial={{ scale: 0.6, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<span className={styles.revealEmoji}>{word.emoji}</span>
						<span className={styles.revealEnglish}>{word.english.toUpperCase()}</span>
						<button className={styles.nextBtn} onClick={handleNext}>
							{currentIdx + 1 >= words.length ? 'Terminar' : 'Siguiente'}
							<span className="material-symbols-outlined">arrow_forward</span>
						</button>
					</motion.div>
				) : (
					<motion.button
						className={styles.confirmBtn}
						onClick={handleConfirm}
						disabled={!hasDrawn}
						whileTap={{ scale: 0.95 }}
					>
						<span className="material-symbols-outlined">check_circle</span>
						Listo!
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
};

function drawOutline(ctx: CanvasRenderingContext2D, emoji: string, w: number, h: number) {
	ctx.save();
	ctx.font = `${Math.min(w, h) * 0.55}px serif`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.globalAlpha = 0.12;
	ctx.fillStyle = '#6b7280';
	ctx.fillText(emoji, w / 2, h / 2);
	ctx.restore();
}

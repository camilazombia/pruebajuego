import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './ColoringPage.module.css';

interface DrawingItem {
	id: string;
	title: string;
	description: string;
}

interface PaintState {
	isDrawing: boolean;
	color: string;
	brushSize: number;
	brushType: 'pencil' | 'bucket' | 'eraser';
}

const ColoringPage: React.FC = () => {
	const navigate = useNavigate();
	const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});
	const [selectedDrawing, setSelectedDrawing] = useState<string | null>(null);
	const [paintState, setPaintState] = useState<PaintState>({
		isDrawing: false,
		color: '#FF0000',
		brushSize: 5,
		brushType: 'pencil',
	});

	const colors = [
		{ name: 'Rojo', hex: '#FF0000' },
		{ name: 'Azul', hex: '#0000FF' },
		{ name: 'Verde', hex: '#00AA00' },
		{ name: 'Amarillo', hex: '#FFFF00' },
		{ name: 'Naranja', hex: '#FF8800' },
		{ name: 'Púrpura', hex: '#AA00FF' },
		{ name: 'Rosa', hex: '#FF69B4' },
		{ name: 'Marrón', hex: '#8B4513' },
		{ name: 'Negro', hex: '#000000' },
	];

	const drawings: DrawingItem[] = [
		{ id: 'sun', title: 'Sol', description: 'Colorea el sol' },
		{ id: 'flower', title: 'Flor', description: 'Colorea la flor' },
		{ id: 'butterfly', title: 'Mariposa', description: 'Colorea la mariposa' },
		{ id: 'house', title: 'Casa', description: 'Colorea la casa' },
		{ id: 'tree', title: 'Árbol', description: 'Colorea el árbol' },
		{ id: 'fish', title: 'Pez', description: 'Colorea el pez' },
	];

	const drawShape = (canvasId: string, drawFunction: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) => {
		const canvas = canvasRefs.current[canvasId];
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		// Limpiar canvas
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, width, height);

		// Dibujar contorno
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = 2;

		// Llamar función de dibujo específica
		drawFunction(ctx, width, height);

		// Guardar la imagen con las líneas negras
		if (!canvasRefs.current[`${canvasId}_outline`]) {
			canvasRefs.current[`${canvasId}_outline`] = ctx.getImageData(0, 0, width, height);
		}
	};

	const handleCanvasMount = (canvasId: string) => {
		setTimeout(() => {
			switch (canvasId) {
				case 'sun':
					drawShape(canvasId, (ctx, w, h) => {
						// Círculo central
						ctx.beginPath();
						ctx.arc(w / 2, h / 2, 40, 0, Math.PI * 2);
						ctx.stroke();

						// Rayos
						for (let i = 0; i < 8; i++) {
							const angle = (i / 8) * Math.PI * 2;
							const x1 = w / 2 + Math.cos(angle) * 50;
							const y1 = h / 2 + Math.sin(angle) * 50;
							const x2 = w / 2 + Math.cos(angle) * 70;
							const y2 = h / 2 + Math.sin(angle) * 70;
							ctx.beginPath();
							ctx.moveTo(x1, y1);
							ctx.lineTo(x2, y2);
							ctx.stroke();
						}
					});
					break;

				case 'flower':
					drawShape(canvasId, (ctx, w, h) => {
						// Pétalos
						for (let i = 0; i < 5; i++) {
							const angle = (i / 5) * Math.PI * 2;
							const centerX = w / 2 + Math.cos(angle) * 35;
							const centerY = h / 2 + Math.sin(angle) * 35;
							ctx.beginPath();
							ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
							ctx.stroke();
						}

						// Centro
						ctx.beginPath();
						ctx.arc(w / 2, h / 2, 15, 0, Math.PI * 2);
						ctx.stroke();

						// Tallo
						ctx.beginPath();
						ctx.moveTo(w / 2, h / 2 + 15);
						ctx.lineTo(w / 2, h - 20);
						ctx.stroke();

						// Hoja
						ctx.beginPath();
						ctx.ellipse(w / 2 - 25, h / 2 + 40, 15, 25, -0.3, 0, Math.PI * 2);
						ctx.stroke();
					});
					break;

				case 'butterfly':
					drawShape(canvasId, (ctx, w, h) => {
						// Alas izquierdas
						ctx.beginPath();
						ctx.ellipse(w / 2 - 35, h / 2 - 25, 25, 35, 0.3, 0, Math.PI * 2);
						ctx.stroke();

						ctx.beginPath();
						ctx.ellipse(w / 2 - 35, h / 2 + 25, 20, 25, -0.3, 0, Math.PI * 2);
						ctx.stroke();

						// Alas derechas
						ctx.beginPath();
						ctx.ellipse(w / 2 + 35, h / 2 - 25, 25, 35, -0.3, 0, Math.PI * 2);
						ctx.stroke();

						ctx.beginPath();
						ctx.ellipse(w / 2 + 35, h / 2 + 25, 20, 25, 0.3, 0, Math.PI * 2);
						ctx.stroke();

						// Cuerpo
						ctx.beginPath();
						ctx.arc(w / 2, h / 2 - 15, 8, 0, Math.PI * 2);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(w / 2, h / 2 - 7);
						ctx.lineTo(w / 2, h / 2 + 30);
						ctx.stroke();

						// Antenas
						ctx.beginPath();
						ctx.moveTo(w / 2 - 5, h / 2 - 15);
						ctx.quadraticCurveTo(w / 2 - 15, h / 2 - 40, w / 2 - 10, h / 2 - 50);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(w / 2 + 5, h / 2 - 15);
						ctx.quadraticCurveTo(w / 2 + 15, h / 2 - 40, w / 2 + 10, h / 2 - 50);
						ctx.stroke();
					});
					break;

				case 'house':
					drawShape(canvasId, (ctx, w, h) => {
						// Paredes
						ctx.beginPath();
						ctx.rect(w / 2 - 50, h / 2 - 10, 100, 60);
						ctx.stroke();

						// Techo
						ctx.beginPath();
						ctx.moveTo(w / 2 - 50, h / 2 - 10);
						ctx.lineTo(w / 2, h / 2 - 50);
						ctx.lineTo(w / 2 + 50, h / 2 - 10);
						ctx.stroke();

						// Puerta
						ctx.beginPath();
						ctx.rect(w / 2 - 15, h / 2 + 30, 30, 40);
						ctx.stroke();

						// Pomo de puerta
						ctx.beginPath();
						ctx.arc(w / 2 + 10, h / 2 + 50, 3, 0, Math.PI * 2);
						ctx.stroke();

						// Ventanas
						ctx.beginPath();
						ctx.rect(w / 2 - 40, h / 2 + 5, 25, 20);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(w / 2 - 27.5, h / 2 + 5);
						ctx.lineTo(w / 2 - 27.5, h / 2 + 25);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(w / 2 - 40, h / 2 + 15);
						ctx.lineTo(w / 2 - 15, h / 2 + 15);
						ctx.stroke();

						ctx.beginPath();
						ctx.rect(w / 2 + 15, h / 2 + 5, 25, 20);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(w / 2 + 27.5, h / 2 + 5);
						ctx.lineTo(w / 2 + 27.5, h / 2 + 25);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(w / 2 + 15, h / 2 + 15);
						ctx.lineTo(w / 2 + 40, h / 2 + 15);
						ctx.stroke();
					});
					break;

				case 'tree':
					drawShape(canvasId, (ctx, w, h) => {
						// Copa (triángulo)
						ctx.beginPath();
						ctx.moveTo(w / 2, h / 2 - 50);
						ctx.lineTo(w / 2 - 40, h / 2 + 10);
						ctx.lineTo(w / 2 + 40, h / 2 + 10);
						ctx.closePath();
						ctx.stroke();

						// Tronco
						ctx.beginPath();
						ctx.rect(w / 2 - 15, h / 2 + 10, 30, 50);
						ctx.stroke();

						// Detalles copa
						ctx.beginPath();
						ctx.arc(w / 2 - 20, h / 2 - 10, 15, 0, Math.PI * 2);
						ctx.stroke();

						ctx.beginPath();
						ctx.arc(w / 2 + 20, h / 2 - 10, 15, 0, Math.PI * 2);
						ctx.stroke();
					});
					break;

				case 'fish':
					drawShape(canvasId, (ctx, w, h) => {
						// Cuerpo
						ctx.beginPath();
						ctx.ellipse(w / 2, h / 2, 45, 30, 0, 0, Math.PI * 2);
						ctx.stroke();

						// Ojo
						ctx.beginPath();
						ctx.arc(w / 2 + 30, h / 2, 5, 0, Math.PI * 2);
						ctx.stroke();

						// Aleta dorsal
						ctx.beginPath();
						ctx.moveTo(w / 2, h / 2 - 30);
						ctx.lineTo(w / 2 - 15, h / 2 - 50);
						ctx.lineTo(w / 2 + 10, h / 2 - 30);
						ctx.stroke();

						// Aleta ventral
						ctx.beginPath();
						ctx.moveTo(w / 2, h / 2 + 30);
						ctx.lineTo(w / 2 - 10, h / 2 + 45);
						ctx.lineTo(w / 2 + 15, h / 2 + 30);
						ctx.stroke();

						// Cola
						ctx.beginPath();
						ctx.moveTo(w / 2 - 45, h / 2);
						ctx.lineTo(w / 2 - 75, h / 2 - 30);
						ctx.lineTo(w / 2 - 75, h / 2 + 30);
						ctx.closePath();
						ctx.stroke();
					});
					break;
			}
		}, 0);
	};

	const getMousePos = (canvas: HTMLCanvasElement, e: React.MouseEvent | React.TouchEvent) => {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		let x, y;
		if ('touches' in e) {
			x = (e.touches[0].clientX - rect.left) * scaleX;
			y = (e.touches[0].clientY - rect.top) * scaleY;
		} else {
			x = (e.clientX - rect.left) * scaleX;
			y = (e.clientY - rect.top) * scaleY;
		}

		return { x, y };
	};

	const startDrawing = (canvasId: string, e: React.MouseEvent | React.TouchEvent) => {
		const canvas = canvasRefs.current[canvasId];
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const { x, y } = getMousePos(canvas, e);
		ctx.beginPath();
		ctx.moveTo(x, y);
		setPaintState({ ...paintState, isDrawing: true });
	};

	const draw = (canvasId: string, e: React.MouseEvent | React.TouchEvent) => {
		if (!paintState.isDrawing) return;

		const canvas = canvasRefs.current[canvasId];
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const { x, y } = getMousePos(canvas, e);

		ctx.lineWidth = paintState.brushSize;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.globalCompositeOperation = 'source-over';

		// Borrador - borra solo el color, no el negro ni el blanco
		if (paintState.brushType === 'eraser') {
			// Obtener datos de la zona
			const imageData = ctx.getImageData(x - paintState.brushSize / 2, y - paintState.brushSize / 2, paintState.brushSize, paintState.brushSize);
			const data = imageData.data;
			
			// Solo borrar píxeles que tengan color (no negro, no blanco)
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				
				// Si es blanco (255,255,255) o negro (0,0,0), no borrar
				const isWhite = r === 255 && g === 255 && b === 255;
				const isBlack = r === 0 && g === 0 && b === 0;
				
				if (!isWhite && !isBlack) {
					// Es un color, borrarlo a blanco
					data[i] = 255;
					data[i + 1] = 255;
					data[i + 2] = 255;
					data[i + 3] = 255;
				}
			}
			ctx.putImageData(imageData, x - paintState.brushSize / 2, y - paintState.brushSize / 2);
		} else if (paintState.brushType === 'pencil') {
			// Lápiz - dibujar círculo suave
			ctx.fillStyle = paintState.color;
			ctx.beginPath();
			ctx.arc(x, y, paintState.brushSize / 2, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.globalAlpha = 1;
	};

	const stopDrawing = () => {
		setPaintState({ ...paintState, isDrawing: false });
	};

	const clearCanvas = (canvasId: string) => {
		handleCanvasMount(canvasId);
	};

	const floodFill = (canvasId: string, x: number, y: number) => {
		const canvas = canvasRefs.current[canvasId];
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		const getPixel = (pixelIndex: number) => [
			data[pixelIndex * 4],
			data[pixelIndex * 4 + 1],
			data[pixelIndex * 4 + 2],
			data[pixelIndex * 4 + 3],
		];

		const setPixel = (pixelIndex: number, color: string) => {
			const hex = color.replace('#', '');
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);

			data[pixelIndex * 4] = r;
			data[pixelIndex * 4 + 1] = g;
			data[pixelIndex * 4 + 2] = b;
			data[pixelIndex * 4 + 3] = 255;
		};

		const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
		const targetColor = getPixel(Math.floor(y * canvas.width + x));

		const queue: Array<[number, number]> = [[x, y]];
		const visited = new Set<number>();

		while (queue.length > 0) {
			const [px, py] = queue.shift()!;
			const pIndex = (Math.floor(py) * canvas.width + Math.floor(px)) * 4;

			if (visited.has(pIndex)) continue;
			visited.add(pIndex);

			const pixelColor = getPixel(Math.floor(py * canvas.width + px));

			if (pixelColor.every((v, i) => Math.abs(v - targetColor[i]) < 10)) {
				setPixel(Math.floor(py * canvas.width + px), paintState.color);

				if (px > 0) queue.push([px - 1, py]);
				if (px < canvas.width - 1) queue.push([px + 1, py]);
				if (py > 0) queue.push([px, py - 1]);
				if (py < canvas.height - 1) queue.push([px, py + 1]);
			}
		}

		ctx.putImageData(imageData, 0, 0);
	};

	const downloadDrawing = (canvasId: string, title: string) => {
		const canvas = canvasRefs.current[canvasId];
		if (!canvas) return;

		const link = document.createElement('a');
		link.href = canvas.toDataURL('image/png');
		link.download = `${title}-colorear.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const closeEditor = () => {
		setSelectedDrawing(null);
	};

	if (selectedDrawing) {
		const drawing = drawings.find((d) => d.id === selectedDrawing);
		return (
			<>
			<OrientationAlert />
			<div className={styles.editorPage}>
				<div className={styles.editorHeader}>
					<button className={styles.closeButton} onClick={closeEditor} aria-label="Cerrar editor">
						✕
					</button>
					<h2 className={styles.editorTitle}>{drawing?.title}</h2>
					<div className={styles.spacer} />
				</div>

				<div className={styles.editorContainer}>
					<div className={styles.canvasWrapper}>
						<canvas
							ref={(el) => {
								if (el) {
									canvasRefs.current[selectedDrawing] = el;
									if (!canvasRefs.current[selectedDrawing]?.hasAttribute('data-initialized')) {
										handleCanvasMount(selectedDrawing);
										el.setAttribute('data-initialized', 'true');
									}
								}
							}}
							width={600}
							height={500}
							className={styles.paintCanvas}
							onMouseDown={(e) => {
								if (paintState.brushType === 'bucket') {
									const { x, y } = getMousePos(e.currentTarget, e);
									floodFill(selectedDrawing, x, y);
								} else {
									startDrawing(selectedDrawing, e);
								}
							}}
							onMouseMove={(e) => draw(selectedDrawing, e)}
							onMouseUp={stopDrawing}
							onMouseLeave={stopDrawing}
							onTouchStart={(e) => {
								if (paintState.brushType === 'bucket') {
									const { x, y } = getMousePos(e.currentTarget, e);
									floodFill(selectedDrawing, x, y);
								} else {
									startDrawing(selectedDrawing, e);
								}
							}}
							onTouchMove={(e) => draw(selectedDrawing, e)}
							onTouchEnd={stopDrawing}
						/>
					</div>

					<div className={styles.toolPanel}>
						<div className={styles.toolSection}>
							<label className={styles.toolLabel}>Tipo de Pincel:</label>
							<div className={styles.brushTypesGrid}>
								<button
									className={`${styles.brushTypeButton} ${paintState.brushType === 'pencil' ? styles.active : ''}`}
									onClick={() => setPaintState({ ...paintState, brushType: 'pencil' })}
									title="Lápiz"
									aria-label="Lápiz"
								>
									✏
								</button>
								<button
									className={`${styles.brushTypeButton} ${paintState.brushType === 'bucket' ? styles.active : ''}`}
									onClick={() => setPaintState({ ...paintState, brushType: 'bucket' })}
									title="Balde de relleno"
									aria-label="Balde de relleno"
								>
									🪣
								</button>
								<button
									className={`${styles.brushTypeButton} ${paintState.brushType === 'eraser' ? styles.active : ''}`}
									onClick={() => setPaintState({ ...paintState, brushType: 'eraser' })}
									title="Borrador"
									aria-label="Borrador"
								>
									🧹
								</button>
							</div>
						</div>
						<div className={styles.toolSection}>
							<label className={styles.toolLabel}>Color:</label>
							<div className={styles.colorPalette}>
								{colors.map((color) => (
									<button
										key={color.hex}
										className={`${styles.colorButton} ${paintState.color === color.hex ? styles.colorActive : ''}`}
										style={{ backgroundColor: color.hex }}
										onClick={() => setPaintState({ ...paintState, color: color.hex })}
										title={color.name}
										aria-label={`Color ${color.name}`}
									/>
								))}
							</div>
						</div>

						<div className={styles.toolSection}>
							<label className={styles.toolLabel}>Tamaño de Pincel:</label>
							<div className={styles.brushSizeControl}>
								<input
									type="range"
									min="1"
									max="30"
									value={paintState.brushSize}
									onChange={(e) => setPaintState({ ...paintState, brushSize: parseInt(e.target.value) })}
									className={styles.brushSlider}
								/>
								<span className={styles.brushSizeValue}>{paintState.brushSize}px</span>
							</div>
							<div className={styles.brushPreview}>
								<div
									className={styles.brushDot}
									style={{
										width: `${paintState.brushSize * 2}px`,
										height: `${paintState.brushSize * 2}px`,
										backgroundColor: paintState.color,
									}}
									aria-label="Vista previa del pincel"
								/>
							</div>
						</div>

						<div className={styles.toolSection}>
							<button className={styles.clearButton} onClick={() => clearCanvas(selectedDrawing)}>
								Limpiar Dibujo
							</button>
						</div>

						<div className={styles.toolSection}>
							<button 
								className={styles.downloadButton} 
								onClick={() => downloadDrawing(selectedDrawing, drawing?.title || 'dibujo')}
							>
								Descargar
							</button>
						</div>
					</div>
				</div>
			</div>
			</>
		);
	}

	return (
		<>
		<OrientationAlert />
		<div className={styles.page}>
			<button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Volver">
				← Volver
			</button>

			<section className={styles.container} aria-label="Dibujos para Colorear">
				<h1 className={styles.title}>Dibujos para Colorear</h1>
				<p className={styles.subtitle}>Haz clic en un dibujo para pintar</p>

				<div className={styles.drawingsGrid}>
					{drawings.map((drawing) => (
						<button
							key={drawing.id}
							className={styles.drawingCard}
							onClick={() => setSelectedDrawing(drawing.id)}
							aria-label={`Pintar ${drawing.title}`}
						>
							<div className={styles.canvasContainer}>
								<canvas
									ref={(el) => {
										if (el) {
											canvasRefs.current[drawing.id] = el;
											handleCanvasMount(drawing.id);
										}
									}}
									width={200}
									height={200}
									className={styles.canvas}
								/>
							</div>
							<h2 className={styles.drawingTitle}>{drawing.title}</h2>
							<p className={styles.drawingDescription}>{drawing.description}</p>
						</button>
					))}
				</div>
			</section>
		</div>
		</>
	);
};

export default ColoringPage;

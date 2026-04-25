import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '../../shared/ui/ArrowButton/ArrowButton';
import { SoundButton } from '../../shared/ui/SoundButton/SoundButton';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './FlashcardsPage.module.css';

interface Flashcard {
	id: string;
	english: string;
	spanish: string;
	image: string;
	sound: string;
}

interface Topic {
	id: string;
	name: string;
	preview: string;
	cards: Flashcard[];
}

const FlashcardsPage: React.FC = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [progress, setProgress] = useState(0);
	const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
	const [carouselScroll, setCarouselScroll] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);

	// Datos de temas con flashcards - Expandido para 4-12 años
	const topics: Topic[] = [
		{
			id: 'fruits',
			name: 'Frutas',
			preview: '🍎',
			cards: [
				{ id: '1', english: 'Apple', spanish: 'Manzana', image: '', sound: 'apple' },
				{ id: '2', english: 'Banana', spanish: 'Plátano', image: '', sound: 'banana' },
				{ id: '3', english: 'Orange', spanish: 'Naranja', image: '', sound: 'orange' },
				{ id: '4', english: 'Strawberry', spanish: 'Fresa', image: '', sound: 'strawberry' },
				{ id: '5', english: 'Grape', spanish: 'Uva', image: '', sound: 'grape' },
				{ id: '6', english: 'Watermelon', spanish: 'Sandía', image: '', sound: 'watermelon' },
				{ id: '7', english: 'Lemon', spanish: 'Limón', image: '', sound: 'lemon' },
				{ id: '8', english: 'Peach', spanish: 'Melocotón', image: '', sound: 'peach' },
			],
		},
		{
			id: 'animals',
			name: 'Animales',
			preview: '🦁',
			cards: [
				{ id: '1', english: 'Cat', spanish: 'Gato', image: '', sound: 'cat' },
				{ id: '2', english: 'Dog', spanish: 'Perro', image: '', sound: 'dog' },
				{ id: '3', english: 'Bear', spanish: 'Oso', image: '', sound: 'bear' },
				{ id: '4', english: 'Elephant', spanish: 'Elefante', image: '', sound: 'elephant' },
				{ id: '5', english: 'Lion', spanish: 'León', image: '', sound: 'lion' },
				{ id: '6', english: 'Tiger', spanish: 'Tigre', image: '', sound: 'tiger' },
				{ id: '7', english: 'Monkey', spanish: 'Mono', image: '', sound: 'monkey' },
				{ id: '8', english: 'Penguin', spanish: 'Pingüino', image: '', sound: 'penguin' },
				{ id: '9', english: 'Rabbit', spanish: 'Conejo', image: '', sound: 'rabbit' },
				{ id: '10', english: 'Frog', spanish: 'Rana', image: '', sound: 'frog' },
			],
		},
		{
			id: 'nature',
			name: 'Naturaleza',
			preview: '',
			cards: [
				{ id: '1', english: 'Flower', spanish: 'Flor', image: '', sound: 'flower' },
				{ id: '2', english: 'Tree', spanish: 'Árbol', image: '', sound: 'tree' },
				{ id: '3', english: 'Sun', spanish: 'Sol', image: '', sound: 'sun' },
				{ id: '4', english: 'Moon', spanish: 'Luna', image: '', sound: 'moon' },
				{ id: '5', english: 'Star', spanish: 'Estrella', image: '', sound: 'star' },
				{ id: '6', english: 'Cloud', spanish: 'Nube', image: '', sound: 'cloud' },
				{ id: '7', english: 'Rain', spanish: 'Lluvia', image: '', sound: 'rain' },
				{ id: '8', english: 'Snow', spanish: 'Nieve', image: '', sound: 'snow' },
				{ id: '9', english: 'Mountain', spanish: 'Montaña', image: '', sound: 'mountain' },
				{ id: '10', english: 'Ocean', spanish: 'Océano', image: '', sound: 'ocean' },
			],
		},
		{
			id: 'colors',
			name: 'Colores',
			preview: '',
			cards: [
				{ id: '1', english: 'Red', spanish: 'Rojo', image: '', sound: 'red' },
				{ id: '2', english: 'Blue', spanish: 'Azul', image: '', sound: 'blue' },
				{ id: '3', english: 'Yellow', spanish: 'Amarillo', image: '', sound: 'yellow' },
				{ id: '4', english: 'Green', spanish: 'Verde', image: '', sound: 'green' },
				{ id: '5', english: 'Orange', spanish: 'Naranja', image: '', sound: 'orange' },
				{ id: '6', english: 'Purple', spanish: 'Púrpura', image: '', sound: 'purple' },
				{ id: '7', english: 'Pink', spanish: 'Rosa', image: '', sound: 'pink' },
				{ id: '8', english: 'Brown', spanish: 'Marrón', image: '', sound: 'brown' },
			],
		},
		{
			id: 'body',
			name: 'Cuerpo',
			preview: '',
			cards: [
				{ id: '1', english: 'Head', spanish: 'Cabeza', image: '', sound: 'head' },
				{ id: '2', english: 'Eye', spanish: 'Ojo', image: '', sound: 'eye' },
				{ id: '3', english: 'Nose', spanish: 'Nariz', image: '', sound: 'nose' },
				{ id: '4', english: 'Ear', spanish: 'Oreja', image: '', sound: 'ear' },
				{ id: '5', english: 'Mouth', spanish: 'Boca', image: '', sound: 'mouth' },
				{ id: '6', english: 'Tooth', spanish: 'Diente', image: '', sound: 'tooth' },
				{ id: '7', english: 'Hand', spanish: 'Mano', image: '', sound: 'hand' },
				{ id: '8', english: 'Foot', spanish: 'Pie', image: '', sound: 'foot' },
				{ id: '9', english: 'Arm', spanish: 'Brazo', image: '', sound: 'arm' },
				{ id: '10', english: 'Leg', spanish: 'Pierna', image: '', sound: 'leg' },
			],
		},
		{
			id: 'food',
			name: 'Comida',
			preview: '',
			cards: [
				{ id: '1', english: 'Pizza', spanish: 'Pizza', image: '', sound: 'pizza' },
				{ id: '2', english: 'Hamburger', spanish: 'Hamburguesa', image: '', sound: 'hamburger' },
				{ id: '3', english: 'Cookie', spanish: 'Galleta', image: '', sound: 'cookie' },
				{ id: '4', english: 'Cake', spanish: 'Pastel', image: '', sound: 'cake' },
				{ id: '5', english: 'Bread', spanish: 'Pan', image: '', sound: 'bread' },
				{ id: '6', english: 'Cheese', spanish: 'Queso', image: '', sound: 'cheese' },
				{ id: '7', english: 'Egg', spanish: 'Huevo', image: '', sound: 'egg' },
				{ id: '8', english: 'Ice Cream', spanish: 'Helado', image: '', sound: 'icecream' },
				{ id: '9', english: 'Candy', spanish: 'Caramelo', image: '', sound: 'candy' },
				{ id: '10', english: 'Chocolate', spanish: 'Chocolate', image: '', sound: 'chocolate' },
			],
		},
		{
			id: 'drinks',
			name: 'Bebidas',
			preview: '',
			cards: [
				{ id: '1', english: 'Juice', spanish: 'Jugo', image: '', sound: 'juice' },
				{ id: '2', english: 'Milk', spanish: 'Leche', image: '', sound: 'milk' },
				{ id: '3', english: 'Coffee', spanish: 'Café', image: '', sound: 'coffee' },
				{ id: '4', english: 'Tea', spanish: 'Té', image: '', sound: 'tea' },
				{ id: '5', english: 'Water', spanish: 'Agua', image: '', sound: 'water' },
				{ id: '6', english: 'Soda', spanish: 'Refresco', image: '', sound: 'soda' },
				{ id: '7', english: 'Smoothie', spanish: 'Batido', image: '', sound: 'smoothie' },
				{ id: '8', english: 'Beer', spanish: 'Cerveza', image: '', sound: 'beer' },
			],
		},
		{
			id: 'clothing',
			name: 'Ropa',
			preview: '',
			cards: [
				{ id: '1', english: 'Shirt', spanish: 'Camisa', image: '', sound: 'shirt' },
				{ id: '2', english: 'Dress', spanish: 'Vestido', image: '', sound: 'dress' },
				{ id: '3', english: 'Pants', spanish: 'Pantalones', image: '', sound: 'pants' },
				{ id: '4', english: 'Shoes', spanish: 'Zapatos', image: '', sound: 'shoes' },
				{ id: '5', english: 'Hat', spanish: 'Sombrero', image: '', sound: 'hat' },
				{ id: '6', english: 'Jacket', spanish: 'Chaqueta', image: '', sound: 'jacket' },
				{ id: '7', english: 'Socks', spanish: 'Calcetines', image: '', sound: 'socks' },
				{ id: '8', english: 'Gloves', spanish: 'Guantes', image: '', sound: 'gloves' },
				{ id: '9', english: 'Scarf', spanish: 'Bufanda', image: '', sound: 'scarf' },
			],
		},
		{
			id: 'sports',
			name: 'Deportes',
			preview: '',
			cards: [
				{ id: '1', english: 'Soccer', spanish: 'Fútbol', image: '⚽', sound: 'soccer' },
				{ id: '2', english: 'Basketball', spanish: 'Baloncesto', image: '🏀', sound: 'basketball' },
				{ id: '3', english: 'Tennis', spanish: 'Tenis', image: '🎾', sound: 'tennis' },
				{ id: '4', english: 'Swimming', spanish: 'Natación', image: '🏊', sound: 'swimming' },
				{ id: '5', english: 'Baseball', spanish: 'Béisbol', image: '⚾', sound: 'baseball' },
				{ id: '6', english: 'Skateboard', spanish: 'Patineta', image: '🛹', sound: 'skateboard' },
				{ id: '7', english: 'Bicycle', spanish: 'Bicicleta', image: '🚲', sound: 'bicycle' },
				{ id: '8', english: 'Dancing', spanish: 'Baile', image: '💃', sound: 'dancing' },
			],
		},
		{
			id: 'school',
			name: 'Escuela',
			preview: '',
			cards: [
				{ id: '1', english: 'Book', spanish: 'Libro', image: '📚', sound: 'book' },
				{ id: '2', english: 'Pencil', spanish: 'Lápiz', image: '✏️', sound: 'pencil' },
				{ id: '3', english: 'Paper', spanish: 'Papel', image: '📝', sound: 'paper' },
				{ id: '4', english: 'Pen', spanish: 'Bolígrafo', image: '🖊️', sound: 'pen' },
				{ id: '5', english: 'Desk', spanish: 'Escritorio', image: '🪑', sound: 'desk' },
				{ id: '6', english: 'Chair', spanish: 'Silla', image: '🪜', sound: 'chair' },
				{ id: '7', english: 'Backpack', spanish: 'Mochila', image: '🎒', sound: 'backpack' },
				{ id: '8', english: 'Ruler', spanish: 'Regla', image: '📏', sound: 'ruler' },
				{ id: '9', english: 'Scissors', spanish: 'Tijeras', image: '✂️', sound: 'scissors' },
				{ id: '10', english: 'Numbers', spanish: 'Números', image: '🔢', sound: 'numbers' },
			],
		},
		{
			id: 'toys',
			name: 'Juguetes',
			preview: '🧩',
			cards: [
				{ id: '1', english: 'Teddy Bear', spanish: 'Osito de Peluche', image: '🧸', sound: 'bear' },
				{ id: '2', english: 'Video Game', spanish: 'Videojuego', image: '🎮', sound: 'videogame' },
				{ id: '3', english: 'Target', spanish: 'Objetivo', image: '🎯', sound: 'target' },
				{ id: '4', english: 'Puzzle', spanish: 'Rompecabezas', image: '🧩', sound: 'puzzle' },
				{ id: '5', english: 'Ball', spanish: 'Pelota', image: '🎾', sound: 'ball' },
				{ id: '6', english: 'Doll', spanish: 'Muñeca', image: '👧', sound: 'doll' },
				{ id: '7', english: 'Kite', spanish: 'Cometa', image: '🪁', sound: 'kite' },
				{ id: '8', english: 'Blocks', spanish: 'Bloques', image: '🧱', sound: 'blocks' },
			],
		},
		{
			id: 'transport',
			name: 'Transporte',
			preview: '🚗',
			cards: [
				{ id: '1', english: 'Car', spanish: 'Coche', image: '🚗', sound: 'car' },
				{ id: '2', english: 'Airplane', spanish: 'Avión', image: '✈️', sound: 'airplane' },
				{ id: '3', english: 'Train', spanish: 'Tren', image: '🚂', sound: 'train' },
				{ id: '4', english: 'Bus', spanish: 'Autobús', image: '🚌', sound: 'bus' },
				{ id: '5', english: 'Bicycle', spanish: 'Bicicleta', image: '🚲', sound: 'bicycle' },
				{ id: '6', english: 'Boat', spanish: 'Barco', image: '⛵', sound: 'boat' },
				{ id: '7', english: 'Rocket', spanish: 'Cohete', image: '🚀', sound: 'rocket' },
				{ id: '8', english: 'Helicopter', spanish: 'Helicóptero', image: '🛩️', sound: 'helicopter' },
				{ id: '9', english: 'Truck', spanish: 'Camión', image: '🚚', sound: 'truck' },
			],
		},
		{
			id: 'house',
			name: 'Casa',
			preview: '🏠',
			cards: [
				{ id: '1', english: 'House', spanish: 'Casa', image: '🏠', sound: 'house' },
				{ id: '2', english: 'Bed', spanish: 'Cama', image: '🛏️', sound: 'bed' },
				{ id: '3', english: 'Door', spanish: 'Puerta', image: '🚪', sound: 'door' },
				{ id: '4', english: 'Window', spanish: 'Ventana', image: '🪟', sound: 'window' },
				{ id: '5', english: 'Kitchen', spanish: 'Cocina', image: '🍳', sound: 'kitchen' },
				{ id: '6', english: 'Sofa', spanish: 'Sofá', image: '🛋️', sound: 'sofa' },
				{ id: '7', english: 'Table', spanish: 'Mesa', image: '🪑', sound: 'table' },
				{ id: '8', english: 'Lamp', spanish: 'Lámpara', image: '🪔', sound: 'lamp' },
				{ id: '9', english: 'Carpet', spanish: 'Alfombra', image: '📋', sound: 'carpet' },
			],
		},
		{
			id: 'numbers',
			name: 'Números',
			preview: '🔢',
			cards: [
				{ id: '1', english: 'One', spanish: 'Uno', image: '1️⃣', sound: 'one' },
				{ id: '2', english: 'Two', spanish: 'Dos', image: '2️⃣', sound: 'two' },
				{ id: '3', english: 'Three', spanish: 'Tres', image: '3️⃣', sound: 'three' },
				{ id: '4', english: 'Four', spanish: 'Cuatro', image: '4️⃣', sound: 'four' },
				{ id: '5', english: 'Five', spanish: 'Cinco', image: '5️⃣', sound: 'five' },
				{ id: '6', english: 'Six', spanish: 'Seis', image: '6️⃣', sound: 'six' },
				{ id: '7', english: 'Seven', spanish: 'Siete', image: '7️⃣', sound: 'seven' },
				{ id: '8', english: 'Eight', spanish: 'Ocho', image: '8️⃣', sound: 'eight' },
				{ id: '9', english: 'Nine', spanish: 'Nueve', image: '9️⃣', sound: 'nine' },
				{ id: '10', english: 'Ten', spanish: 'Diez', image: '🔟', sound: 'ten' },
			],
		},
		{
			id: 'weather',
			name: 'Clima',
			preview: '☀️',
			cards: [
				{ id: '1', english: 'Sunny', spanish: 'Soleado', image: '☀️', sound: 'sunny' },
				{ id: '2', english: 'Rainy', spanish: 'Lluvioso', image: '🌧️', sound: 'rainy' },
				{ id: '3', english: 'Cloudy', spanish: 'Nublado', image: '☁️', sound: 'cloudy' },
				{ id: '4', english: 'Snowy', spanish: 'Nevado', image: '❄️', sound: 'snowy' },
				{ id: '5', english: 'Windy', spanish: 'Ventoso', image: '💨', sound: 'windy' },
				{ id: '6', english: 'Rainbow', spanish: 'Arcoíris', image: '🌈', sound: 'rainbow' },
				{ id: '7', english: 'Storm', spanish: 'Tormenta', image: '⛈️', sound: 'storm' },
				{ id: '8', english: 'Fog', spanish: 'Niebla', image: '🌫️', sound: 'fog' },
			],
		},
		{
			id: 'emotions',
			name: 'Emociones',
			preview: '😊',
			cards: [
				{ id: '1', english: 'Happy', spanish: 'Feliz', image: '😊', sound: 'happy' },
				{ id: '2', english: 'Sad', spanish: 'Triste', image: '😢', sound: 'sad' },
				{ id: '3', english: 'Angry', spanish: 'Enojado', image: '😠', sound: 'angry' },
				{ id: '4', english: 'Scared', spanish: 'Asustado', image: '😨', sound: 'scared' },
				{ id: '5', english: 'Tired', spanish: 'Cansado', image: '😴', sound: 'tired' },
				{ id: '6', english: 'Excited', spanish: 'Emocionado', image: '🤩', sound: 'excited' },
				{ id: '7', english: 'Confused', spanish: 'Confundido', image: '😕', sound: 'confused' },
				{ id: '8', english: 'Laughing', spanish: 'Riendo', image: '😂', sound: 'laughing' },
			],
		},
	];

	const currentTopic = topics.find(t => t.id === selectedTopic);
	const flashcards = currentTopic?.cards || [];
	const currentCard = flashcards[currentIndex];

	useEffect(() => {
		setProgress(flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0);
	}, [currentIndex, flashcards.length]);

	const handlePlaySound = () => {
		if (!currentCard?.sound) return;
		const audio = new Audio(`/assets/audio/voices/words/${currentCard.sound}.mp3`);
		audio.play().catch(() => {});
	};

	const handleNext = () => {
		if (currentIndex < flashcards.length - 1) {
			setCurrentIndex(currentIndex + 1);
			setIsFlipped(false);
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
			setIsFlipped(false);
		}
	};

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const handleSelectTopic = (topicId: string) => {
		setSelectedTopic(topicId);
		setCurrentIndex(0);
		setIsFlipped(false);
	};

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const scrollAmount = 320;
			if (direction === 'left') {
				carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
				setCarouselScroll(carouselScroll - scrollAmount);
			} else {
				carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
				setCarouselScroll(carouselScroll + scrollAmount);
			}
		}
	};

	// Pantalla de selección de temas con carrusel
	if (!selectedTopic) {
		return (
			<>
			<OrientationAlert />
			<div className={styles.page}>
				<button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Volver">
					← Volver
				</button>

				<section className={styles.container} aria-label="Temas disponibles">
					<div className={styles.carouselWrapper} tabIndex={0}>
					<ArrowButton
						direction="left"
						size={60}
						onClick={() => scrollCarousel('left')}
						aria-label="Anterior"
					/>

					<div className={styles.carousel} ref={carouselRef} role="list">
							{topics.map((topic) => (
								<article
									key={topic.id}
									role="listitem"
									className={styles.card}
									data-card
									onClick={() => handleSelectTopic(topic.id)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											handleSelectTopic(topic.id);
										}
									}}
									tabIndex={0}
									aria-label={`Estudiar ${topic.name}`}
								>
									<div className={styles.imagePlaceholder} aria-hidden>
										<span className={styles.previewEmoji}>{topic.preview}</span>
									</div>
									<div className={styles.namePill}>{topic.name}</div>
									<div className={styles.cardCount} aria-hidden>
										{topic.cards.length} palabras
									</div>
								</article>
							))}
						</div>

					<ArrowButton
						direction="right"
						size={60}
						onClick={() => scrollCarousel('right')}
						aria-label="Siguiente"
					/>
				</div>
				</section>
			</div>
			</>
		);
	}

	// Pantalla de flashcards
	return (
		<>
		<OrientationAlert />
		<div className={styles.page}>
			<button className={styles.backButton} onClick={() => setSelectedTopic(null)} aria-label="Volver">
				← Volver
			</button>

			<section className={styles.container}>
				{/* Progress bar */}
				<div className={styles.progressContainer}>
					<div className={styles.progressBar}>
						<div 
							className={`${styles.progressFill} ${styles[`progress${Math.round((progress / 100) * 10) * 10}`] || ''}`}
						></div>
					</div>
					<p className={styles.progressText}>
						{currentIndex + 1} de {flashcards.length}
					</p>
				</div>

				{/* Flashcard with arrows */}
				{currentCard && (
					<div className={styles.cardWrapper}>
						<ArrowButton
							direction="left"
							size={50}
							onClick={handlePrevious}
							aria-label="Tarjeta anterior"
							className={styles.arrowLeft}
						/>

						<div
							className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
							onClick={handleFlip}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									handleFlip();
								}
							}}
							tabIndex={0}
							aria-label={`Tarjeta: ${isFlipped ? currentCard.spanish : currentCard.english}`}
						>
						{/* Front */}
						<div className={styles.cardFront}>
							<div className={styles.cardImage}>{currentCard.image}</div>
							<div className={styles.cardText}>
								<p className={styles.language}>English</p>
								<h2 className={styles.word}>{currentCard.english}</h2>
							</div>
							<SoundButton
								size={50}
								onClick={(e) => {
									e.stopPropagation();
									handlePlaySound();
								}}
								aria-label={`Reproducir sonido de ${currentCard.english}`}
								className={styles.soundButton}
							/>
						</div>					{/* Back */}
					<div className={styles.cardBack}>
						<div className={styles.cardImage}>{currentCard.image}</div>
						<div className={styles.cardText}>
							<p className={styles.language}>Español</p>
							<h2 className={styles.word}>{currentCard.spanish}</h2>
						</div>
						<SoundButton
							size={50}
							onClick={(e) => {
								e.stopPropagation();
								handlePlaySound();
							}}
							aria-label={`Reproducir sonido de ${currentCard.spanish}`}
							className={styles.soundButton}
						/>
					</div>
					</div>

					<ArrowButton
						direction="right"
						size={50}
						onClick={handleNext}
						aria-label="Siguiente tarjeta"
						className={styles.arrowRight}
					/>
				</div>
			)}				{/* Hint text */}
			<p className={styles.hintText}>Haz clic en la tarjeta para voltearla</p>
		</section>
	</div>
	</>
);
};

export default FlashcardsPage;
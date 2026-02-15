import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { getLevelById, getChapterById, getWorldById } from '../../shared/data/worlds';
import { useUnlockLogic } from '../../features/progress/hooks/useUnlockLogic';
import { AwakeningLevel } from './AwakeningLevel';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import styles from './LevelPage.module.css';
import { DragAndDropWords } from './minigames/DragAndDropWords';
import { MultipleChoice } from './minigames/MultipleChoice';
import { SelectWords } from './minigames/SelectWords';
import { ListenAndChoose } from './minigames/ListenAndChoose';
import { BuildPhrase } from './minigames/BuildPhrase';
import type { MiniGameWord } from './minigames/DragAndDropWords';

const LevelPage: React.FC = () => {
	const { levelId } = useParams<{ levelId: string }>();
	const navigate = useNavigate();
	const { handleCompleteLevel } = useUnlockLogic();

	if (!levelId) {
		return <div className={styles.page}>Nivel no encontrado</div>;
	}

	const level = getLevelById(levelId);
	if (!level) {
		return <div className={styles.page}>Nivel no encontrado</div>;
	}

	const chapter = getChapterById(level.chapterId);
	if (!chapter) {
		return <div className={styles.page}>Capítulo no encontrado</div>;
	}

	const worldId = chapter.id.split('_')[1]?.replace('chapter', '').split('_')[0] || '1';
	const world = getWorldById(`world_${worldId}`);

	const [avatarMessage, setAvatarMessage] = useState('¡Vamos a aprender!');
	const [isCelebrating, setIsCelebrating] = useState(false);

	const handleInteractionComplete = () => {
		setIsCelebrating(true);
		setAvatarMessage('¡Excelente trabajo! 🌟');
		
		// Efecto de sonido positivo usando audio existente del proyecto
		try {
			const audio = new Audio('/assets/audio/sfx/orientation/rotate.mp3');
			void audio.play();
		} catch {
			// ignorar errores de reproducción (autoplay bloqueado, etc.)
		}

		setTimeout(() => {
			if (world) {
				handleCompleteLevel(levelId, chapter.id, world.id);
				navigate(`/chapters/${world.id}`);
			}
		}, 1500);
	};

	// Check if this is the first level of chapter 1 - Awakening level
	const isAwakeningLevel = levelId === 'world_1_chapter_1_level_1';

	if (isAwakeningLevel) {
		return <AwakeningLevel onInteractionComplete={handleInteractionComplete} />;
	}

	// Función helper para obtener datos del nivel según su ID
	const getLevelData = (levelId: string) => {
		// Mundo 1 - Fundamentos Mágicos
		// Capítulo 1: Magic Greetings
		if (levelId === 'world_1_chapter_1_level_2') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'hi', spanish: 'hola', emoji: '👋' },
					{ english: 'hello', spanish: 'hola', emoji: '👋' },
					{ english: 'goodbye', spanish: 'adiós', emoji: '👋' },
				] as MiniGameWord[],
				introAudioKey: 'audioMagicGreetingsIntro',
				wordAudioKeys: {
					hi: 'audioWordHi',
					hello: 'audioWordHello',
					goodbye: 'audioWordGoodbye',
				},
			};
		}
		if (levelId === 'world_1_chapter_1_level_3') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'hi', spanish: 'hola', emoji: '👋' },
					{ english: 'hello', spanish: 'hola', emoji: '👋' },
					{ english: 'goodbye', spanish: 'adiós', emoji: '👋' },
					{ english: 'good night', spanish: 'buenas noches', emoji: '🌙' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_1_level_4') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['Hello', '!'], spanish: '¡Hola!', emoji: '👋' },
					{ englishWords: ['Goodbye', '!'], spanish: '¡Adiós!', emoji: '👋' },
					{ englishWords: ['Good', 'night', '!'], spanish: '¡Buenas noches!', emoji: '🌙' },
				],
			};
		}
		if (levelId === 'world_1_chapter_1_level_5') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'hi', spanish: 'hola', emoji: '👋' },
					{ english: 'hello', spanish: 'hola', emoji: '👋' },
					{ english: 'goodbye', spanish: 'adiós', emoji: '👋' },
					{ english: 'good night', spanish: 'buenas noches', emoji: '🌙' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_1_level_6') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'hi', spanish: 'hola', emoji: '👋' },
					{ english: 'hello', spanish: 'hola', emoji: '👋' },
					{ english: 'goodbye', spanish: 'adiós', emoji: '👋' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 2: Color Spells
		if (levelId === 'world_1_chapter_2_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'red', spanish: 'rojo', emoji: '🔴' },
					{ english: 'blue', spanish: 'azul', emoji: '🔵' },
					{ english: 'yellow', spanish: 'amarillo', emoji: '🟡' },
				] as MiniGameWord[],
				introAudioKey: 'audioColorSpellsIntro',
				wordAudioKeys: {
					red: 'audioWordRed',
					blue: 'audioWordBlue',
					yellow: 'audioWordYellow',
				},
			};
		}
		if (levelId === 'world_1_chapter_2_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'red', spanish: 'rojo', emoji: '🔴' },
					{ english: 'blue', spanish: 'azul', emoji: '🔵' },
					{ english: 'yellow', spanish: 'amarillo', emoji: '🟡' },
					{ english: 'green', spanish: 'verde', emoji: '🟢' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_2_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'red', spanish: 'rojo', emoji: '🔴' },
					{ english: 'blue', spanish: 'azul', emoji: '🔵' },
					{ english: 'yellow', spanish: 'amarillo', emoji: '🟡' },
					{ english: 'green', spanish: 'verde', emoji: '🟢' },
					{ english: 'orange', spanish: 'naranja', emoji: '🟠' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_2_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'red', spanish: 'rojo', emoji: '🔴' },
					{ english: 'blue', spanish: 'azul', emoji: '🔵' },
					{ english: 'yellow', spanish: 'amarillo', emoji: '🟡' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_2_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['The', 'apple', 'is', 'red'], spanish: 'La manzana es roja', emoji: '🍎' },
					{ englishWords: ['The', 'sky', 'is', 'blue'], spanish: 'El cielo es azul', emoji: '☁️' },
				],
			};
		}
		if (levelId === 'world_1_chapter_2_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'red', spanish: 'rojo', emoji: '🔴' },
					{ english: 'blue', spanish: 'azul', emoji: '🔵' },
					{ english: 'yellow', spanish: 'amarillo', emoji: '🟡' },
					{ english: 'green', spanish: 'verde', emoji: '🟢' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 3: Magic Toys
		if (levelId === 'world_1_chapter_3_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'ball', spanish: 'pelota', emoji: '⚽' },
					{ english: 'doll', spanish: 'muñeca', emoji: '🧸' },
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
				] as MiniGameWord[],
				introAudioKey: 'audioMagicToysIntro',
				wordAudioKeys: {
					ball: 'audioWordBall',
					doll: 'audioWordDoll',
					car: 'audioWordCar',
				},
			};
		}
		if (levelId === 'world_1_chapter_3_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'ball', spanish: 'pelota', emoji: '⚽' },
					{ english: 'doll', spanish: 'muñeca', emoji: '🧸' },
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'toy', spanish: 'juguete', emoji: '🧩' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_3_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'ball', spanish: 'pelota', emoji: '⚽' },
					{ english: 'doll', spanish: 'muñeca', emoji: '🧸' },
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'toy', spanish: 'juguete', emoji: '🧩' },
					{ english: 'teddy bear', spanish: 'osito', emoji: '🧸' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_3_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'ball', spanish: 'pelota', emoji: '⚽' },
					{ english: 'doll', spanish: 'muñeca', emoji: '🧸' },
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_3_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'have', 'a', 'ball'], spanish: 'Tengo una pelota', emoji: '⚽' },
					{ englishWords: ['This', 'is', 'my', 'toy'], spanish: 'Este es mi juguete', emoji: '🧩' },
				],
			};
		}
		if (levelId === 'world_1_chapter_3_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'ball', spanish: 'pelota', emoji: '⚽' },
					{ english: 'doll', spanish: 'muñeca', emoji: '🧸' },
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 4: Family Charms
		if (levelId === 'world_1_chapter_4_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'mom', spanish: 'mamá', emoji: '👩' },
					{ english: 'dad', spanish: 'papá', emoji: '👨' },
					{ english: 'sister', spanish: 'hermana', emoji: '👧' },
				] as MiniGameWord[],
				introAudioKey: 'audioFamilyCharmsIntro',
				wordAudioKeys: {
					mom: 'audioWordMom',
					dad: 'audioWordDad',
					sister: 'audioWordSister',
				},
			};
		}
		if (levelId === 'world_1_chapter_4_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'mom', spanish: 'mamá', emoji: '👩' },
					{ english: 'dad', spanish: 'papá', emoji: '👨' },
					{ english: 'sister', spanish: 'hermana', emoji: '👧' },
					{ english: 'brother', spanish: 'hermano', emoji: '👦' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_4_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'mom', spanish: 'mamá', emoji: '👩' },
					{ english: 'dad', spanish: 'papá', emoji: '👨' },
					{ english: 'sister', spanish: 'hermana', emoji: '👧' },
					{ english: 'brother', spanish: 'hermano', emoji: '👦' },
					{ english: 'baby', spanish: 'bebé', emoji: '👶' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_4_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'mom', spanish: 'mamá', emoji: '👩' },
					{ english: 'dad', spanish: 'papá', emoji: '👨' },
					{ english: 'sister', spanish: 'hermana', emoji: '👧' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_4_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'love', 'my', 'mom'], spanish: 'Amo a mi mamá', emoji: '👩' },
					{ englishWords: ['This', 'is', 'my', 'dad'], spanish: 'Este es mi papá', emoji: '👨' },
				],
			};
		}
		if (levelId === 'world_1_chapter_4_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'mom', spanish: 'mamá', emoji: '👩' },
					{ english: 'dad', spanish: 'papá', emoji: '👨' },
					{ english: 'sister', spanish: 'hermana', emoji: '👧' },
					{ english: 'brother', spanish: 'hermano', emoji: '👦' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 5: Cozy Room
		if (levelId === 'world_1_chapter_5_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'bed', spanish: 'cama', emoji: '🛏️' },
					{ english: 'chair', spanish: 'silla', emoji: '🪑' },
					{ english: 'table', spanish: 'mesa', emoji: '🪑' },
				] as MiniGameWord[],
				introAudioKey: 'audioCozyRoomIntro',
				wordAudioKeys: {
					bed: 'audioWordBed',
					chair: 'audioWordChair',
					table: 'audioWordTable',
				},
			};
		}
		if (levelId === 'world_1_chapter_5_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'bed', spanish: 'cama', emoji: '🛏️' },
					{ english: 'chair', spanish: 'silla', emoji: '🪑' },
					{ english: 'table', spanish: 'mesa', emoji: '🪑' },
					{ english: 'lamp', spanish: 'lámpara', emoji: '💡' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_5_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'bed', spanish: 'cama', emoji: '🛏️' },
					{ english: 'chair', spanish: 'silla', emoji: '🪑' },
					{ english: 'table', spanish: 'mesa', emoji: '🪑' },
					{ english: 'lamp', spanish: 'lámpara', emoji: '💡' },
					{ english: 'window', spanish: 'ventana', emoji: '🪟' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_5_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'bed', spanish: 'cama', emoji: '🛏️' },
					{ english: 'chair', spanish: 'silla', emoji: '🪑' },
					{ english: 'table', spanish: 'mesa', emoji: '🪑' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_1_chapter_5_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['My', 'bed', 'is', 'here'], spanish: 'Mi cama está aquí', emoji: '🛏️' },
					{ englishWords: ['I', 'sit', 'on', 'the', 'chair'], spanish: 'Me siento en la silla', emoji: '🪑' },
				],
			};
		}
		if (levelId === 'world_1_chapter_5_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'bed', spanish: 'cama', emoji: '🛏️' },
					{ english: 'chair', spanish: 'silla', emoji: '🪑' },
					{ english: 'table', spanish: 'mesa', emoji: '🪑' },
					{ english: 'lamp', spanish: 'lámpara', emoji: '💡' },
				] as MiniGameWord[],
			};
		}

		// Mundo 2 - Aventuras en la Ciudad
		// Capítulo 1: At the Park
		if (levelId === 'world_2_chapter_1_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'park', spanish: 'parque', emoji: '🏞️' },
					{ english: 'swing', spanish: 'columpio', emoji: '🛝' },
					{ english: 'slide', spanish: 'tobogán', emoji: '🛝' },
				] as MiniGameWord[],
				introAudioKey: 'audioAtTheParkIntro',
				wordAudioKeys: {
					park: 'audioWordPark',
					swing: 'audioWordSwing',
					slide: 'audioWordSlide',
				},
			};
		}
		if (levelId === 'world_2_chapter_1_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'park', spanish: 'parque', emoji: '🏞️' },
					{ english: 'swing', spanish: 'columpio', emoji: '🛝' },
					{ english: 'slide', spanish: 'tobogán', emoji: '🛝' },
					{ english: 'tree', spanish: 'árbol', emoji: '🌳' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_1_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'park', spanish: 'parque', emoji: '🏞️' },
					{ english: 'swing', spanish: 'columpio', emoji: '🛝' },
					{ english: 'slide', spanish: 'tobogán', emoji: '🛝' },
					{ english: 'tree', spanish: 'árbol', emoji: '🌳' },
					{ english: 'bench', spanish: 'banco', emoji: '🪑' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_1_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'park', spanish: 'parque', emoji: '🏞️' },
					{ english: 'swing', spanish: 'columpio', emoji: '🛝' },
					{ english: 'slide', spanish: 'tobogán', emoji: '🛝' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_1_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'play', 'at', 'the', 'park'], spanish: 'Juego en el parque', emoji: '🏞️' },
					{ englishWords: ['The', 'swing', 'is', 'fun'], spanish: 'El columpio es divertido', emoji: '🛝' },
				],
			};
		}
		if (levelId === 'world_2_chapter_1_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'park', spanish: 'parque', emoji: '🏞️' },
					{ english: 'swing', spanish: 'columpio', emoji: '🛝' },
					{ english: 'slide', spanish: 'tobogán', emoji: '🛝' },
					{ english: 'tree', spanish: 'árbol', emoji: '🌳' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 2: On the Street
		if (levelId === 'world_2_chapter_2_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'bus', spanish: 'autobús', emoji: '🚌' },
					{ english: 'street', spanish: 'calle', emoji: '🛣️' },
				] as MiniGameWord[],
				introAudioKey: 'audioOnTheStreetIntro',
				wordAudioKeys: {
					car: 'audioWordCar',
					bus: 'audioWordBus',
					street: 'audioWordStreet',
				},
			};
		}
		if (levelId === 'world_2_chapter_2_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'bus', spanish: 'autobús', emoji: '🚌' },
					{ english: 'street', spanish: 'calle', emoji: '🛣️' },
					{ english: 'traffic light', spanish: 'semáforo', emoji: '🚦' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_2_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'bus', spanish: 'autobús', emoji: '🚌' },
					{ english: 'street', spanish: 'calle', emoji: '🛣️' },
					{ english: 'traffic light', spanish: 'semáforo', emoji: '🚦' },
					{ english: 'crosswalk', spanish: 'paso de cebra', emoji: '🚶' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_2_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'bus', spanish: 'autobús', emoji: '🚌' },
					{ english: 'street', spanish: 'calle', emoji: '🛣️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_2_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'see', 'a', 'car'], spanish: 'Veo un carro', emoji: '🚗' },
					{ englishWords: ['The', 'bus', 'is', 'big'], spanish: 'El autobús es grande', emoji: '🚌' },
				],
			};
		}
		if (levelId === 'world_2_chapter_2_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
					{ english: 'bus', spanish: 'autobús', emoji: '🚌' },
					{ english: 'street', spanish: 'calle', emoji: '🛣️' },
					{ english: 'traffic light', spanish: 'semáforo', emoji: '🚦' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 3: At School
		if (levelId === 'world_2_chapter_3_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'school', spanish: 'escuela', emoji: '🏫' },
					{ english: 'teacher', spanish: 'maestro', emoji: '👩‍🏫' },
					{ english: 'book', spanish: 'libro', emoji: '📚' },
				] as MiniGameWord[],
				introAudioKey: 'audioAtSchoolIntro',
				wordAudioKeys: {
					school: 'audioWordSchool',
					teacher: 'audioWordTeacher',
					book: 'audioWordBook',
				},
			};
		}
		if (levelId === 'world_2_chapter_3_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'school', spanish: 'escuela', emoji: '🏫' },
					{ english: 'teacher', spanish: 'maestro', emoji: '👩‍🏫' },
					{ english: 'book', spanish: 'libro', emoji: '📚' },
					{ english: 'pencil', spanish: 'lápiz', emoji: '✏️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_3_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'school', spanish: 'escuela', emoji: '🏫' },
					{ english: 'teacher', spanish: 'maestro', emoji: '👩‍🏫' },
					{ english: 'book', spanish: 'libro', emoji: '📚' },
					{ english: 'pencil', spanish: 'lápiz', emoji: '✏️' },
					{ english: 'desk', spanish: 'escritorio', emoji: '🪑' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_3_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'school', spanish: 'escuela', emoji: '🏫' },
					{ english: 'teacher', spanish: 'maestro', emoji: '👩‍🏫' },
					{ english: 'book', spanish: 'libro', emoji: '📚' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_3_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'go', 'to', 'school'], spanish: 'Voy a la escuela', emoji: '🏫' },
					{ englishWords: ['My', 'teacher', 'is', 'nice'], spanish: 'Mi maestro es amable', emoji: '👩‍🏫' },
				],
			};
		}
		if (levelId === 'world_2_chapter_3_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'school', spanish: 'escuela', emoji: '🏫' },
					{ english: 'teacher', spanish: 'maestro', emoji: '👩‍🏫' },
					{ english: 'book', spanish: 'libro', emoji: '📚' },
					{ english: 'pencil', spanish: 'lápiz', emoji: '✏️' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 4: At the Store
		if (levelId === 'world_2_chapter_4_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'apple', spanish: 'manzana', emoji: '🍎' },
					{ english: 'banana', spanish: 'plátano', emoji: '🍌' },
					{ english: 'store', spanish: 'tienda', emoji: '🏪' },
				] as MiniGameWord[],
				introAudioKey: 'audioAtTheStoreIntro',
				wordAudioKeys: {
					apple: 'audioWordApple',
					banana: 'audioWordBanana',
					store: 'audioWordStore',
				},
			};
		}
		if (levelId === 'world_2_chapter_4_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'apple', spanish: 'manzana', emoji: '🍎' },
					{ english: 'banana', spanish: 'plátano', emoji: '🍌' },
					{ english: 'store', spanish: 'tienda', emoji: '🏪' },
					{ english: 'orange', spanish: 'naranja', emoji: '🍊' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_4_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'apple', spanish: 'manzana', emoji: '🍎' },
					{ english: 'banana', spanish: 'plátano', emoji: '🍌' },
					{ english: 'store', spanish: 'tienda', emoji: '🏪' },
					{ english: 'orange', spanish: 'naranja', emoji: '🍊' },
					{ english: 'milk', spanish: 'leche', emoji: '🥛' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_4_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'apple', spanish: 'manzana', emoji: '🍎' },
					{ english: 'banana', spanish: 'plátano', emoji: '🍌' },
					{ english: 'store', spanish: 'tienda', emoji: '🏪' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_4_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'buy', 'an', 'apple'], spanish: 'Compro una manzana', emoji: '🍎' },
					{ englishWords: ['The', 'store', 'has', 'food'], spanish: 'La tienda tiene comida', emoji: '🏪' },
				],
			};
		}
		if (levelId === 'world_2_chapter_4_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'apple', spanish: 'manzana', emoji: '🍎' },
					{ english: 'banana', spanish: 'plátano', emoji: '🍌' },
					{ english: 'store', spanish: 'tienda', emoji: '🏪' },
					{ english: 'orange', spanish: 'naranja', emoji: '🍊' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 5: In the House
		if (levelId === 'world_2_chapter_5_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'kitchen', spanish: 'cocina', emoji: '🍳' },
					{ english: 'bedroom', spanish: 'dormitorio', emoji: '🛏️' },
					{ english: 'bathroom', spanish: 'baño', emoji: '🚿' },
				] as MiniGameWord[],
				introAudioKey: 'audioInTheHouseIntro',
				wordAudioKeys: {
					kitchen: 'audioWordKitchen',
					bedroom: 'audioWordBedroom',
					bathroom: 'audioWordBathroom',
				},
			};
		}
		if (levelId === 'world_2_chapter_5_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'kitchen', spanish: 'cocina', emoji: '🍳' },
					{ english: 'bedroom', spanish: 'dormitorio', emoji: '🛏️' },
					{ english: 'bathroom', spanish: 'baño', emoji: '🚿' },
					{ english: 'living room', spanish: 'sala', emoji: '🛋️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_5_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'kitchen', spanish: 'cocina', emoji: '🍳' },
					{ english: 'bedroom', spanish: 'dormitorio', emoji: '🛏️' },
					{ english: 'bathroom', spanish: 'baño', emoji: '🚿' },
					{ english: 'living room', spanish: 'sala', emoji: '🛋️' },
					{ english: 'garden', spanish: 'jardín', emoji: '🌳' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_5_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'kitchen', spanish: 'cocina', emoji: '🍳' },
					{ english: 'bedroom', spanish: 'dormitorio', emoji: '🛏️' },
					{ english: 'bathroom', spanish: 'baño', emoji: '🚿' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_2_chapter_5_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'cook', 'in', 'the', 'kitchen'], spanish: 'Cocino en la cocina', emoji: '🍳' },
					{ englishWords: ['I', 'sleep', 'in', 'my', 'bedroom'], spanish: 'Duermo en mi dormitorio', emoji: '🛏️' },
				],
			};
		}
		if (levelId === 'world_2_chapter_5_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'kitchen', spanish: 'cocina', emoji: '🍳' },
					{ english: 'bedroom', spanish: 'dormitorio', emoji: '🛏️' },
					{ english: 'bathroom', spanish: 'baño', emoji: '🚿' },
					{ english: 'living room', spanish: 'sala', emoji: '🛋️' },
				] as MiniGameWord[],
			};
		}

		// Mundo 3 - Exploradores Globales
		// Capítulo 1: Countries & Flags
		if (levelId === 'world_3_chapter_1_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'country', spanish: 'país', emoji: '🌍' },
					{ english: 'flag', spanish: 'bandera', emoji: '🚩' },
					{ english: 'world', spanish: 'mundo', emoji: '🌎' },
				] as MiniGameWord[],
				introAudioKey: 'audioCountriesFlagsIntro',
				wordAudioKeys: {
					country: 'audioWordCountry',
					flag: 'audioWordFlag',
					world: 'audioWordWorld',
				},
			};
		}
		if (levelId === 'world_3_chapter_1_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'country', spanish: 'país', emoji: '🌍' },
					{ english: 'flag', spanish: 'bandera', emoji: '🚩' },
					{ english: 'world', spanish: 'mundo', emoji: '🌎' },
					{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_1_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'country', spanish: 'país', emoji: '🌍' },
					{ english: 'flag', spanish: 'bandera', emoji: '🚩' },
					{ english: 'world', spanish: 'mundo', emoji: '🌎' },
					{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
					{ english: 'continent', spanish: 'continente', emoji: '🌏' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_1_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'country', spanish: 'país', emoji: '🌍' },
					{ english: 'flag', spanish: 'bandera', emoji: '🚩' },
					{ english: 'world', spanish: 'mundo', emoji: '🌎' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_1_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'see', 'many', 'countries'], spanish: 'Veo muchos países', emoji: '🌍' },
					{ englishWords: ['Each', 'country', 'has', 'a', 'flag'], spanish: 'Cada país tiene una bandera', emoji: '🚩' },
				],
			};
		}
		if (levelId === 'world_3_chapter_1_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'country', spanish: 'país', emoji: '🌍' },
					{ english: 'flag', spanish: 'bandera', emoji: '🚩' },
					{ english: 'world', spanish: 'mundo', emoji: '🌎' },
					{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 2: World Foods
		if (levelId === 'world_3_chapter_2_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'pizza', spanish: 'pizza', emoji: '🍕' },
					{ english: 'sushi', spanish: 'sushi', emoji: '🍣' },
					{ english: 'taco', spanish: 'taco', emoji: '🌮' },
				] as MiniGameWord[],
				introAudioKey: 'audioWorldFoodsIntro',
				wordAudioKeys: {
					pizza: 'audioWordPizza',
					sushi: 'audioWordSushi',
					taco: 'audioWordTaco',
				},
			};
		}
		if (levelId === 'world_3_chapter_2_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'pizza', spanish: 'pizza', emoji: '🍕' },
					{ english: 'sushi', spanish: 'sushi', emoji: '🍣' },
					{ english: 'taco', spanish: 'taco', emoji: '🌮' },
					{ english: 'pasta', spanish: 'pasta', emoji: '🍝' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_2_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'pizza', spanish: 'pizza', emoji: '🍕' },
					{ english: 'sushi', spanish: 'sushi', emoji: '🍣' },
					{ english: 'taco', spanish: 'taco', emoji: '🌮' },
					{ english: 'pasta', spanish: 'pasta', emoji: '🍝' },
					{ english: 'burger', spanish: 'hamburguesa', emoji: '🍔' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_2_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'pizza', spanish: 'pizza', emoji: '🍕' },
					{ english: 'sushi', spanish: 'sushi', emoji: '🍣' },
					{ english: 'taco', spanish: 'taco', emoji: '🌮' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_2_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'like', 'pizza'], spanish: 'Me gusta la pizza', emoji: '🍕' },
					{ englishWords: ['Sushi', 'is', 'from', 'Japan'], spanish: 'El sushi es de Japón', emoji: '🍣' },
				],
			};
		}
		if (levelId === 'world_3_chapter_2_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'pizza', spanish: 'pizza', emoji: '🍕' },
					{ english: 'sushi', spanish: 'sushi', emoji: '🍣' },
					{ english: 'taco', spanish: 'taco', emoji: '🌮' },
					{ english: 'pasta', spanish: 'pasta', emoji: '🍝' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 3: Travel Gear
		if (levelId === 'world_3_chapter_3_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'suitcase', spanish: 'maleta', emoji: '🧳' },
					{ english: 'passport', spanish: 'pasaporte', emoji: '📘' },
					{ english: 'ticket', spanish: 'boleto', emoji: '🎫' },
				] as MiniGameWord[],
				introAudioKey: 'audioTravelGearIntro',
				wordAudioKeys: {
					suitcase: 'audioWordSuitcase',
					passport: 'audioWordPassport',
					ticket: 'audioWordTicket',
				},
			};
		}
		if (levelId === 'world_3_chapter_3_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'suitcase', spanish: 'maleta', emoji: '🧳' },
					{ english: 'passport', spanish: 'pasaporte', emoji: '📘' },
					{ english: 'ticket', spanish: 'boleto', emoji: '🎫' },
					{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_3_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'suitcase', spanish: 'maleta', emoji: '🧳' },
					{ english: 'passport', spanish: 'pasaporte', emoji: '📘' },
					{ english: 'ticket', spanish: 'boleto', emoji: '🎫' },
					{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
					{ english: 'camera', spanish: 'cámara', emoji: '📷' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_3_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'suitcase', spanish: 'maleta', emoji: '🧳' },
					{ english: 'passport', spanish: 'pasaporte', emoji: '📘' },
					{ english: 'ticket', spanish: 'boleto', emoji: '🎫' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_3_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'pack', 'my', 'suitcase'], spanish: 'Empaco mi maleta', emoji: '🧳' },
					{ englishWords: ['I', 'need', 'my', 'passport'], spanish: 'Necesito mi pasaporte', emoji: '📘' },
				],
			};
		}
		if (levelId === 'world_3_chapter_3_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'suitcase', spanish: 'maleta', emoji: '🧳' },
					{ english: 'passport', spanish: 'pasaporte', emoji: '📘' },
					{ english: 'ticket', spanish: 'boleto', emoji: '🎫' },
					{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 4: Transport Around
		if (levelId === 'world_3_chapter_4_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'plane', spanish: 'avión', emoji: '✈️' },
					{ english: 'train', spanish: 'tren', emoji: '🚆' },
					{ english: 'ship', spanish: 'barco', emoji: '🚢' },
				] as MiniGameWord[],
				introAudioKey: 'audioTransportAroundIntro',
				wordAudioKeys: {
					plane: 'audioWordPlane',
					train: 'audioWordTrain',
					ship: 'audioWordShip',
				},
			};
		}
		if (levelId === 'world_3_chapter_4_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'plane', spanish: 'avión', emoji: '✈️' },
					{ english: 'train', spanish: 'tren', emoji: '🚆' },
					{ english: 'ship', spanish: 'barco', emoji: '🚢' },
					{ english: 'bike', spanish: 'bicicleta', emoji: '🚲' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_4_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'plane', spanish: 'avión', emoji: '✈️' },
					{ english: 'train', spanish: 'tren', emoji: '🚆' },
					{ english: 'ship', spanish: 'barco', emoji: '🚢' },
					{ english: 'bike', spanish: 'bicicleta', emoji: '🚲' },
					{ english: 'car', spanish: 'carro', emoji: '🚗' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_4_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'plane', spanish: 'avión', emoji: '✈️' },
					{ english: 'train', spanish: 'tren', emoji: '🚆' },
					{ english: 'ship', spanish: 'barco', emoji: '🚢' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_4_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['I', 'fly', 'on', 'a', 'plane'], spanish: 'Vuelo en un avión', emoji: '✈️' },
					{ englishWords: ['The', 'train', 'is', 'fast'], spanish: 'El tren es rápido', emoji: '🚆' },
				],
			};
		}
		if (levelId === 'world_3_chapter_4_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'plane', spanish: 'avión', emoji: '✈️' },
					{ english: 'train', spanish: 'tren', emoji: '🚆' },
					{ english: 'ship', spanish: 'barco', emoji: '🚢' },
					{ english: 'bike', spanish: 'bicicleta', emoji: '🚲' },
				] as MiniGameWord[],
			};
		}

		// Capítulo 5: Weather Zones
		if (levelId === 'world_3_chapter_5_level_1') {
			return {
				type: 'listenAndChoose',
				words: [
					{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
					{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
					{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
				] as MiniGameWord[],
				introAudioKey: 'audioWeatherZonesIntro',
				wordAudioKeys: {
					sunny: 'audioWordSunny',
					rainy: 'audioWordRainy',
					snowy: 'audioWordSnowy',
				},
			};
		}
		if (levelId === 'world_3_chapter_5_level_2') {
			return {
				type: 'dragAndDrop',
				words: [
					{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
					{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
					{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
					{ english: 'cloudy', spanish: 'nublado', emoji: '☁️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_5_level_3') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
					{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
					{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
					{ english: 'cloudy', spanish: 'nublado', emoji: '☁️' },
					{ english: 'windy', spanish: 'ventoso', emoji: '💨' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_5_level_4') {
			return {
				type: 'selectWords',
				words: [
					{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
					{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
					{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
				] as MiniGameWord[],
			};
		}
		if (levelId === 'world_3_chapter_5_level_5') {
			return {
				type: 'buildPhrase',
				phrases: [
					{ englishWords: ['Today', 'is', 'sunny'], spanish: 'Hoy está soleado', emoji: '☀️' },
					{ englishWords: ['It', 'is', 'rainy', 'today'], spanish: 'Está lluvioso hoy', emoji: '🌧️' },
				],
			};
		}
		if (levelId === 'world_3_chapter_5_level_6') {
			return {
				type: 'multipleChoice',
				words: [
					{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
					{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
					{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
					{ english: 'cloudy', spanish: 'nublado', emoji: '☁️' },
				] as MiniGameWord[],
			};
		}

		// Default fallback
		return null;
	};

	const levelData = getLevelData(levelId);

	// Si no hay datos para este nivel, mostrar placeholder
	if (!levelData) {
		return (
			<>
				<OrientationAlert />
				<div className={styles.page}>
					<header className={styles.header}>
						<button className={styles.backButton} onClick={() => navigate(`/chapters/${world?.id}`)}>
							← Volver
						</button>
						<div>
							<h2 className={styles.chapterName}>{chapter.title}</h2>
							<h1 className={styles.levelTitle}>{level.title}</h1>
						</div>
					</header>
					<div className={styles.content}>
						<div className={styles.activityContainer}>
							<div className={styles.activityPlaceholder}>
								<p>Próximamente: Nivel {level.number}</p>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}

	// Renderizar el juego según el tipo
	const renderGame = () => {
		if (!levelData) {
			return (
				<div className={styles.activityPlaceholder}>
					<p>Próximamente: Nivel {level.number}</p>
				</div>
			);
		}

		switch (levelData.type) {
			case 'listenAndChoose':
				return (
					<ListenAndChoose
						words={levelData.words || []}
						introAudioKey={levelData.introAudioKey}
						wordAudioKeys={levelData.wordAudioKeys || {}}
						onComplete={handleInteractionComplete}
					/>
				);
			case 'dragAndDrop':
				return <DragAndDropWords words={levelData.words || []} onComplete={handleInteractionComplete} />;
			case 'multipleChoice':
				return <MultipleChoice words={levelData.words || []} onComplete={handleInteractionComplete} />;
			case 'selectWords':
				return <SelectWords words={levelData.words || []} onComplete={handleInteractionComplete} />;
			case 'buildPhrase':
				return <BuildPhrase phrases={levelData.phrases || []} onComplete={handleInteractionComplete} />;
			default:
				return (
					<div className={styles.activityPlaceholder}>
						<p>Próximamente: Nivel {level.number}</p>
					</div>
				);
		}
	};

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<header className={styles.header}>
					<button className={styles.backButton} onClick={() => navigate(`/chapters/${world?.id}`)}>
						← Volver
					</button>
					<div>
						<h2 className={styles.chapterName}>{chapter.title}</h2>
						<h1 className={styles.levelTitle}>{level.title}</h1>
					</div>
				</header>

				<div className={styles.content}>
					{/* Panel del avatar siempre visible */}
					<div className={styles.avatarPanel}>
						<div className={styles.avatarContainer}>
							<motion.div
								animate={isCelebrating ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
								transition={{ duration: 0.5 }}
								style={{ width: '200px', height: 'auto' }}
							>
								<ChibiAvatar 
									eyeState={isCelebrating ? 'open' : 'open'}
									mouthState={isCelebrating ? 'smile' : 'neutral'}
									size="md"
								/>
							</motion.div>
						</div>
						<motion.div
							key={avatarMessage}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className={styles.avatarSpeechBubble}
						>
							{avatarMessage}
						</motion.div>
					</div>

					{/* Panel del juego */}
					<div className={styles.gamePanel}>
						<section className={styles.activityContainer}>{renderGame()}</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default LevelPage;

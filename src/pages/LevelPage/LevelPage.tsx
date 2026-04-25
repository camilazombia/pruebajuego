import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { getLevelById, getChapterById, getWorldById, WORLDS } from '../../shared/data/worlds';
import { useUnlockLogic } from '../../features/progress/hooks/useUnlockLogic';
import { useAudio } from '../../app/providers/AudioProvider';
import { AwakeningLevel } from './AwakeningLevel';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { useAvatar } from '../../app/providers/AvatarProvider';
import styles from './LevelPage.module.css';
import { DragAndDropWords } from './minigames/DragAndDropWords';
import { MultipleChoice } from './minigames/MultipleChoice';
import { SelectWords } from './minigames/SelectWords';
import { ListenAndChoose } from './minigames/ListenAndChoose';
import { BuildPhrase } from './minigames/BuildPhrase';
import { ColorAndLearn } from './minigames/ColorAndLearn';
import { BackgroundImage } from '../../shared/ui/BackgroundImage/BackgroundImage';
import type { MiniGameWord } from './minigames/DragAndDropWords';

const GENERIC_CHAPTER_WORDS: Record<string, MiniGameWord[]> = {
	// World 4 - Animals
	'world_4_chapter_1': [
		{ english: 'cow', spanish: 'vaca', emoji: '🐄' },
		{ english: 'pig', spanish: 'cerdo', emoji: '🐷' },
		{ english: 'chicken', spanish: 'pollo', emoji: '🐔' },
		{ english: 'horse', spanish: 'caballo', emoji: '🐴' },
		{ english: 'sheep', spanish: 'oveja', emoji: '🐑' },
	],
	'world_4_chapter_2': [
		{ english: 'lion', spanish: 'leon', emoji: '🦁' },
		{ english: 'tiger', spanish: 'tigre', emoji: '🐯' },
		{ english: 'elephant', spanish: 'elefante', emoji: '🐘' },
		{ english: 'monkey', spanish: 'mono', emoji: '🐵' },
		{ english: 'bear', spanish: 'oso', emoji: '🐻' },
	],
	'world_4_chapter_3': [
		{ english: 'dog', spanish: 'perro', emoji: '🐶' },
		{ english: 'cat', spanish: 'gato', emoji: '🐱' },
		{ english: 'rabbit', spanish: 'conejo', emoji: '🐰' },
		{ english: 'hamster', spanish: 'hamster', emoji: '🐹' },
		{ english: 'fish', spanish: 'pez', emoji: '🐟' },
	],
	'world_4_chapter_4': [
		{ english: 'moo', spanish: 'muu', emoji: '🐄' },
		{ english: 'oink', spanish: 'oinc', emoji: '🐷' },
		{ english: 'quack', spanish: 'cuac', emoji: '🦆' },
		{ english: 'woof', spanish: 'guau', emoji: '🐶' },
		{ english: 'meow', spanish: 'miau', emoji: '🐱' },
	],
	'world_4_chapter_5': [
		{ english: 'farm', spanish: 'granja', emoji: '🚜' },
		{ english: 'jungle', spanish: 'jungla', emoji: '🌴' },
		{ english: 'forest', spanish: 'bosque', emoji: '🌲' },
		{ english: 'river', spanish: 'rio', emoji: '🏞️' },
		{ english: 'ocean', spanish: 'oceano', emoji: '🌊' },
	],

	// World 5 - Routines
	'world_5_chapter_1': [
		{ english: 'wake up', spanish: 'despertar', emoji: '⏰' },
		{ english: 'brush', spanish: 'cepillar', emoji: '🪥' },
		{ english: 'wash', spanish: 'lavar', emoji: '🧼' },
		{ english: 'dress', spanish: 'vestir', emoji: '👕' },
		{ english: 'breakfast', spanish: 'desayuno', emoji: '🍳' },
	],
	'world_5_chapter_2': [
		{ english: 'study', spanish: 'estudiar', emoji: '📘' },
		{ english: 'read', spanish: 'leer', emoji: '📖' },
		{ english: 'write', spanish: 'escribir', emoji: '✍️' },
		{ english: 'play', spanish: 'jugar', emoji: '⚽' },
		{ english: 'lunch', spanish: 'almuerzo', emoji: '🍽️' },
	],
	'world_5_chapter_3': [
		{ english: 'dinner', spanish: 'cena', emoji: '🍲' },
		{ english: 'bath', spanish: 'bano', emoji: '🛁' },
		{ english: 'pajamas', spanish: 'pijama', emoji: '🧸' },
		{ english: 'sleep', spanish: 'dormir', emoji: '😴' },
		{ english: 'night', spanish: 'noche', emoji: '🌙' },
	],
	'world_5_chapter_4': [
		{ english: 'monday', spanish: 'lunes', emoji: '📅' },
		{ english: 'tuesday', spanish: 'martes', emoji: '📅' },
		{ english: 'wednesday', spanish: 'miercoles', emoji: '📅' },
		{ english: 'thursday', spanish: 'jueves', emoji: '📅' },
		{ english: 'friday', spanish: 'viernes', emoji: '📅' },
	],
	'world_5_chapter_5': [
		{ english: 'morning', spanish: 'manana', emoji: '🌞' },
		{ english: 'afternoon', spanish: 'tarde', emoji: '🌤️' },
		{ english: 'evening', spanish: 'atardecer', emoji: '🌆' },
		{ english: 'night', spanish: 'noche', emoji: '🌙' },
		{ english: 'clock', spanish: 'reloj', emoji: '🕒' },
	],

	// World 6 - Emotions
	'world_6_chapter_1': [
		{ english: 'happy', spanish: 'feliz', emoji: '😊' },
		{ english: 'smile', spanish: 'sonrisa', emoji: '😁' },
		{ english: 'laugh', spanish: 'reir', emoji: '😄' },
		{ english: 'joy', spanish: 'alegria', emoji: '🌟' },
		{ english: 'fun', spanish: 'diversion', emoji: '🎉' },
	],
	'world_6_chapter_2': [
		{ english: 'sad', spanish: 'triste', emoji: '😢' },
		{ english: 'cry', spanish: 'llorar', emoji: '😭' },
		{ english: 'tears', spanish: 'lagrimas', emoji: '💧' },
		{ english: 'blue', spanish: 'azul', emoji: '🔵' },
		{ english: 'comfort', spanish: 'consuelo', emoji: '🤗' },
	],
	'world_6_chapter_3': [
		{ english: 'angry', spanish: 'enojado', emoji: '😠' },
		{ english: 'calm', spanish: 'calma', emoji: '😌' },
		{ english: 'breathe', spanish: 'respirar', emoji: '🫁' },
		{ english: 'relax', spanish: 'relajar', emoji: '🧘' },
		{ english: 'peace', spanish: 'paz', emoji: '🕊️' },
	],
	'world_6_chapter_4': [
		{ english: 'scared', spanish: 'asustado', emoji: '😨' },
		{ english: 'brave', spanish: 'valiente', emoji: '🦸' },
		{ english: 'safe', spanish: 'seguro', emoji: '🛡️' },
		{ english: 'light', spanish: 'luz', emoji: '🔦' },
		{ english: 'friend', spanish: 'amigo', emoji: '🧑‍🤝‍🧑' },
	],
	'world_6_chapter_5': [
		{ english: 'kind', spanish: 'amable', emoji: '💖' },
		{ english: 'help', spanish: 'ayuda', emoji: '🤝' },
		{ english: 'hug', spanish: 'abrazo', emoji: '🫂' },
		{ english: 'okay', spanish: 'bien', emoji: '👌' },
		{ english: 'better', spanish: 'mejor', emoji: '✨' },
	],

	// World 7 - Weather and Clothes
	'world_7_chapter_1': [
		{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
		{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
		{ english: 'cloudy', spanish: 'nublado', emoji: '☁️' },
		{ english: 'windy', spanish: 'ventoso', emoji: '💨' },
		{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
	],
	'world_7_chapter_2': [
		{ english: 'shirt', spanish: 'camiseta', emoji: '👕' },
		{ english: 'pants', spanish: 'pantalon', emoji: '👖' },
		{ english: 'dress', spanish: 'vestido', emoji: '👗' },
		{ english: 'shoes', spanish: 'zapatos', emoji: '👟' },
		{ english: 'hat', spanish: 'sombrero', emoji: '🧢' },
	],
	'world_7_chapter_3': [
		{ english: 'spring', spanish: 'primavera', emoji: '🌸' },
		{ english: 'summer', spanish: 'verano', emoji: '🏖️' },
		{ english: 'autumn', spanish: 'otono', emoji: '🍂' },
		{ english: 'winter', spanish: 'invierno', emoji: '⛄' },
		{ english: 'season', spanish: 'estacion', emoji: '🗓️' },
	],
	'world_7_chapter_4': [
		{ english: 'jacket', spanish: 'chaqueta', emoji: '🧥' },
		{ english: 'scarf', spanish: 'bufanda', emoji: '🧣' },
		{ english: 'gloves', spanish: 'guantes', emoji: '🧤' },
		{ english: 'boots', spanish: 'botas', emoji: '🥾' },
		{ english: 'umbrella', spanish: 'sombrilla', emoji: '☂️' },
	],
	'world_7_chapter_5': [
		{ english: 'hot', spanish: 'caliente', emoji: '🔥' },
		{ english: 'cold', spanish: 'frio', emoji: '🧊' },
		{ english: 'warm', spanish: 'templado', emoji: '🌤️' },
		{ english: 'cool', spanish: 'fresco', emoji: '🍃' },
		{ english: 'weather', spanish: 'clima', emoji: '🌈' },
	],

	// World 8 - Ocean
	'world_8_chapter_1': [
		{ english: 'fish', spanish: 'pez', emoji: '🐟' },
		{ english: 'dolphin', spanish: 'delfin', emoji: '🐬' },
		{ english: 'whale', spanish: 'ballena', emoji: '🐋' },
		{ english: 'shark', spanish: 'tiburon', emoji: '🦈' },
		{ english: 'turtle', spanish: 'tortuga', emoji: '🐢' },
	],
	'world_8_chapter_2': [
		{ english: 'octopus', spanish: 'pulpo', emoji: '🐙' },
		{ english: 'jellyfish', spanish: 'medusa', emoji: '🎐' },
		{ english: 'seahorse', spanish: 'caballito de mar', emoji: '🐠' },
		{ english: 'crab', spanish: 'cangrejo', emoji: '🦀' },
		{ english: 'starfish', spanish: 'estrella de mar', emoji: '⭐' },
	],
	'world_8_chapter_3': [
		{ english: 'beach', spanish: 'playa', emoji: '🏖️' },
		{ english: 'sand', spanish: 'arena', emoji: '🏝️' },
		{ english: 'shell', spanish: 'concha', emoji: '🐚' },
		{ english: 'boat', spanish: 'barco', emoji: '⛵' },
		{ english: 'island', spanish: 'isla', emoji: '🏝️' },
	],
	'world_8_chapter_4': [
		{ english: 'coral', spanish: 'coral', emoji: '🪸' },
		{ english: 'reef', spanish: 'arrecife', emoji: '🌊' },
		{ english: 'blue', spanish: 'azul', emoji: '🔵' },
		{ english: 'green', spanish: 'verde', emoji: '🟢' },
		{ english: 'purple', spanish: 'morado', emoji: '🟣' },
	],
	'world_8_chapter_5': [
		{ english: 'swim', spanish: 'nadar', emoji: '🏊' },
		{ english: 'dive', spanish: 'bucear', emoji: '🤿' },
		{ english: 'float', spanish: 'flotar', emoji: '🛟' },
		{ english: 'wave', spanish: 'ola', emoji: '🌊' },
		{ english: 'ocean', spanish: 'oceano', emoji: '🌊' },
	],

	// World 9 - Body and Family
	'world_9_chapter_1': [
		{ english: 'head', spanish: 'cabeza', emoji: '🙂' },
		{ english: 'arms', spanish: 'brazos', emoji: '💪' },
		{ english: 'hands', spanish: 'manos', emoji: '👐' },
		{ english: 'legs', spanish: 'piernas', emoji: '🦵' },
		{ english: 'feet', spanish: 'pies', emoji: '🦶' },
	],
	'world_9_chapter_2': [
		{ english: 'eyes', spanish: 'ojos', emoji: '👀' },
		{ english: 'nose', spanish: 'nariz', emoji: '👃' },
		{ english: 'mouth', spanish: 'boca', emoji: '👄' },
		{ english: 'ears', spanish: 'orejas', emoji: '👂' },
		{ english: 'hair', spanish: 'cabello', emoji: '🧑' },
	],
	'world_9_chapter_3': [
		{ english: 'mom', spanish: 'mama', emoji: '👩' },
		{ english: 'dad', spanish: 'papa', emoji: '👨' },
		{ english: 'brother', spanish: 'hermano', emoji: '👦' },
		{ english: 'sister', spanish: 'hermana', emoji: '👧' },
		{ english: 'family', spanish: 'familia', emoji: '👨‍👩‍👧‍👦' },
	],
	'world_9_chapter_4': [
		{ english: 'tall', spanish: 'alto', emoji: '📏' },
		{ english: 'short', spanish: 'bajo', emoji: '📐' },
		{ english: 'big', spanish: 'grande', emoji: '🔍' },
		{ english: 'small', spanish: 'pequeno', emoji: '🔎' },
		{ english: 'strong', spanish: 'fuerte', emoji: '💪' },
	],
	'world_9_chapter_5': [
		{ english: 'mirror', spanish: 'espejo', emoji: '🪞' },
		{ english: 'smile', spanish: 'sonreir', emoji: '🙂' },
		{ english: 'point', spanish: 'senalar', emoji: '👉' },
		{ english: 'touch', spanish: 'tocar', emoji: '✋' },
		{ english: 'show', spanish: 'mostrar', emoji: '👋' },
	],

	// World 10 - Academy
	'world_10_chapter_1': [
		{ english: 'run', spanish: 'correr', emoji: '🏃' },
		{ english: 'jump', spanish: 'saltar', emoji: '🦘' },
		{ english: 'walk', spanish: 'caminar', emoji: '🚶' },
		{ english: 'dance', spanish: 'bailar', emoji: '💃' },
		{ english: 'sing', spanish: 'cantar', emoji: '🎤' },
	],
	'world_10_chapter_2': [
		{ english: 'can', spanish: 'puedo', emoji: '✅' },
		{ english: 'cannot', spanish: 'no puedo', emoji: '🚫' },
		{ english: 'open', spanish: 'abrir', emoji: '📂' },
		{ english: 'close', spanish: 'cerrar', emoji: '📕' },
		{ english: 'try', spanish: 'intentar', emoji: '✨' },
	],
	'world_10_chapter_3': [
		{ english: 'subject', spanish: 'sujeto', emoji: '🧩' },
		{ english: 'verb', spanish: 'verbo', emoji: '⚙️' },
		{ english: 'object', spanish: 'objeto', emoji: '🎯' },
		{ english: 'sentence', spanish: 'oracion', emoji: '📝' },
		{ english: 'order', spanish: 'orden', emoji: '↔️' },
	],
	'world_10_chapter_4': [
		{ english: 'what', spanish: 'que', emoji: '❓' },
		{ english: 'where', spanish: 'donde', emoji: '📍' },
		{ english: 'who', spanish: 'quien', emoji: '🧑' },
		{ english: 'when', spanish: 'cuando', emoji: '⏱️' },
		{ english: 'why', spanish: 'por que', emoji: '🤔' },
	],
	'world_10_chapter_5': [
		{ english: 'challenge', spanish: 'reto', emoji: '🏆' },
		{ english: 'review', spanish: 'repaso', emoji: '🔁' },
		{ english: 'practice', spanish: 'practica', emoji: '🧠' },
		{ english: 'success', spanish: 'exito', emoji: '🌟' },
		{ english: 'graduate', spanish: 'graduar', emoji: '🎓' },
	],

	// World 11 - Travel
	'world_11_chapter_1': [
		{ english: 'park', spanish: 'parque', emoji: '🏞️' },
		{ english: 'school', spanish: 'escuela', emoji: '🏫' },
		{ english: 'museum', spanish: 'museo', emoji: '🏛️' },
		{ english: 'library', spanish: 'biblioteca', emoji: '📚' },
		{ english: 'hospital', spanish: 'hospital', emoji: '🏥' },
	],
	'world_11_chapter_2': [
		{ english: 'bus', spanish: 'bus', emoji: '🚌' },
		{ english: 'train', spanish: 'tren', emoji: '🚆' },
		{ english: 'plane', spanish: 'avion', emoji: '✈️' },
		{ english: 'bike', spanish: 'bicicleta', emoji: '🚲' },
		{ english: 'car', spanish: 'carro', emoji: '🚗' },
	],
	'world_11_chapter_3': [
		{ english: 'left', spanish: 'izquierda', emoji: '⬅️' },
		{ english: 'right', spanish: 'derecha', emoji: '➡️' },
		{ english: 'straight', spanish: 'recto', emoji: '⬆️' },
		{ english: 'near', spanish: 'cerca', emoji: '📌' },
		{ english: 'far', spanish: 'lejos', emoji: '📍' },
	],
	'world_11_chapter_4': [
		{ english: 'stop', spanish: 'alto', emoji: '🛑' },
		{ english: 'go', spanish: 'ir', emoji: '🟢' },
		{ english: 'crosswalk', spanish: 'paso peatonal', emoji: '🚸' },
		{ english: 'traffic light', spanish: 'semaforo', emoji: '🚦' },
		{ english: 'station', spanish: 'estacion', emoji: '🚉' },
	],
	'world_11_chapter_5': [
		{ english: 'ticket', spanish: 'boleto', emoji: '🎫' },
		{ english: 'map', spanish: 'mapa', emoji: '🗺️' },
		{ english: 'suitcase', spanish: 'maleta', emoji: '🧳' },
		{ english: 'passport', spanish: 'pasaporte', emoji: '📘' },
		{ english: 'travel', spanish: 'viajar', emoji: '🌍' },
	],

	// World 12 - Storytelling
	'world_12_chapter_1': [
		{ english: 'hero', spanish: 'heroe', emoji: '🦸' },
		{ english: 'explorer', spanish: 'explorador', emoji: '🧭' },
		{ english: 'friend', spanish: 'amigo', emoji: '🧑‍🤝‍🧑' },
		{ english: 'wizard', spanish: 'mago', emoji: '🧙' },
		{ english: 'guardian', spanish: 'guardian', emoji: '🛡️' },
	],
	'world_12_chapter_2': [
		{ english: 'forest', spanish: 'bosque', emoji: '🌲' },
		{ english: 'city', spanish: 'ciudad', emoji: '🏙️' },
		{ english: 'ocean', spanish: 'oceano', emoji: '🌊' },
		{ english: 'castle', spanish: 'castillo', emoji: '🏰' },
		{ english: 'mountain', spanish: 'montana', emoji: '🏔️' },
	],
	'world_12_chapter_3': [
		{ english: 'find', spanish: 'encontrar', emoji: '🔎' },
		{ english: 'help', spanish: 'ayudar', emoji: '🤝' },
		{ english: 'save', spanish: 'salvar', emoji: '🛟' },
		{ english: 'build', spanish: 'construir', emoji: '🧱' },
		{ english: 'create', spanish: 'crear', emoji: '🎨' },
	],
	'world_12_chapter_4': [
		{ english: 'problem', spanish: 'problema', emoji: '⚠️' },
		{ english: 'solution', spanish: 'solucion', emoji: '💡' },
		{ english: 'first', spanish: 'primero', emoji: '1️⃣' },
		{ english: 'next', spanish: 'despues', emoji: '2️⃣' },
		{ english: 'finally', spanish: 'finalmente', emoji: '🏁' },
	],
	'world_12_chapter_5': [
		{ english: 'celebrate', spanish: 'celebrar', emoji: '🎉' },
		{ english: 'win', spanish: 'ganar', emoji: '🏆' },
		{ english: 'star', spanish: 'estrella', emoji: '⭐' },
		{ english: 'magic', spanish: 'magia', emoji: '✨' },
		{ english: 'thank you', spanish: 'gracias', emoji: '💛' },
	],
};

const buildGenericPhrases = (words: MiniGameWord[]) => {
	const first = words[0];
	const second = words[1] ?? words[0];

	return [
		{
			englishWords: ['I', 'see', first.english],
			spanish: `Veo ${first.spanish}`,
			emoji: first.emoji,
		},
		{
			englishWords: ['I', 'like', second.english],
			spanish: `Me gusta ${second.spanish}`,
			emoji: second.emoji,
		},
	];
};

const LevelPage: React.FC = () => {
	const { levelId } = useParams<{ levelId: string }>();
	const navigate = useNavigate();
	const { avatarState } = useAvatar();
	const { handleCompleteLevel } = useUnlockLogic();
	const { playSound } = useAudio();

	if (!levelId) {
		return <div className={styles.page}>Nivel no encontrado</div>;
	}

	const level = getLevelById(levelId);
	if (!level) {
		return <div className={styles.page}>Nivel no encontrado</div>;
	}
	if (!level.chapterId) {
		return <div className={styles.page}>Capítulo no encontrado</div>;
	}

	const chapter = getChapterById(level.chapterId);
	if (!chapter) {
		return <div className={styles.page}>Capítulo no encontrado</div>;
	}

	const worldIdNum = chapter.id.split('_')[1]?.replace('chapter', '').split('_')[0] || '1';
	const world = getWorldById(`world_${worldIdNum}`);

	const isLastLevelInChapter = level.number === chapter.levels.length;
	const isLastChapterInWorld = world
		? chapter.number === world.chapters.length
		: false;

	const [avatarMessage, setAvatarMessage] = useState('¡Vamos a aprender!');
	const [isCelebrating, setIsCelebrating] = useState(false);

	const handleInteractionComplete = () => {
		setIsCelebrating(true);
		setAvatarMessage('¡Excelente trabajo!');

		playSound('orientation/rotate');

		setTimeout(() => {
			if (!world) return;
			handleCompleteLevel(levelId, chapter.id, world.id);

			if (isLastLevelInChapter && isLastChapterInWorld) {
				const nextWorldIndex = WORLDS.findIndex((w) => w.id === world.id) + 1;
				const nextWorld = WORLDS[nextWorldIndex];
				navigate(`/chapters/${world.id}`, {
					state: {
						justCompletedLevel: levelId,
						fromChapterId: chapter.id,
						guardianCured: true,
						nextWorldId: nextWorld?.id,
					},
				});
			} else if (isLastLevelInChapter) {
				const nextChapter = world.chapters[chapter.number];
				navigate(`/chapters/${world.id}`, {
					state: {
						justCompletedLevel: levelId,
						fromChapterId: chapter.id,
						advanceToChapter: nextChapter?.id,
					},
				});
			} else {
				navigate(`/chapters/${world.id}`, {
					state: { justCompletedLevel: levelId, fromChapterId: chapter.id },
				});
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
					{ english: 'hello', spanish: 'hola', emoji: '👋' },
					{ english: 'good morning', spanish: 'buenos días', emoji: '☀️' },
					{ english: 'goodbye', spanish: 'adiós', emoji: '✌️' },
				] as MiniGameWord[],
				introAudioKey: 'audioMagicGreetingsIntro',
				wordAudioKeys: {
					hello: 'audioWordHello',
					'good morning': 'audioWordGoodMorning',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
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
				type: 'colorAndLearn',
				words: [
					{ english: 'sunny', spanish: 'soleado', emoji: '☀️' },
					{ english: 'rainy', spanish: 'lluvioso', emoji: '🌧️' },
					{ english: 'snowy', spanish: 'nevado', emoji: '❄️' },
					{ english: 'cloudy', spanish: 'nublado', emoji: '☁️' },
				] as MiniGameWord[],
			};
		}

		// Fallback generico para mundos/capitulos nuevos
		const parsed = levelId.match(/^world_(\d+)_chapter_(\d+)_level_(\d+)$/);
		if (!parsed) return null;

		const worldNum = Number(parsed[1]);
		const chapterNum = Number(parsed[2]);
		const levelNum = Number(parsed[3]);
		const chapterKey = `world_${worldNum}_chapter_${chapterNum}`;
		const words = GENERIC_CHAPTER_WORDS[chapterKey];
		if (!words || words.length < 3) return null;

		const normalizedLevel = ((levelNum - 1) % 6) + 1;
		const shortWords = words.slice(0, 3);
		const mediumWords = words.slice(0, 4);
		const fullWords = words.slice(0, 5);

		switch (normalizedLevel) {
			case 1:
				return { type: 'listenAndChoose', words: shortWords as MiniGameWord[] };
			case 2:
				return { type: 'dragAndDrop', words: mediumWords as MiniGameWord[] };
			case 3:
				return { type: 'multipleChoice', words: fullWords as MiniGameWord[] };
			case 4:
				return { type: 'selectWords', words: shortWords as MiniGameWord[] };
			case 5:
				return { type: 'buildPhrase', phrases: buildGenericPhrases(fullWords) };
			case 6:
				return { type: 'colorAndLearn', words: shortWords as MiniGameWord[] };
			default:
				return { type: 'multipleChoice', words: fullWords as MiniGameWord[] };
		}
	};

	const levelData = getLevelData(levelId);

	const instructionForType = (type?: string) => {
		switch (type) {
			case 'listenAndChoose': return 'Escucha la palabra y elige la imagen correcta';
			case 'dragAndDrop': return 'Arrastra cada palabra a su pareja';
			case 'multipleChoice': return 'Elige la respuesta correcta';
			case 'selectWords': return 'Selecciona las palabras correctas';
			case 'buildPhrase': return 'Pon las palabras en orden';
			case 'colorAndLearn': return 'Colorea el dibujo y aprende la palabra';
			default: return '¡Vamos a aprender!';
		}
	};

	useEffect(() => {
		if (levelData?.type) {
			setAvatarMessage(instructionForType(levelData.type));
		}
	}, [levelData?.type]);

	// Si no hay datos para este nivel, mostrar placeholder
	if (!levelData) {
		return (
			<>
				<OrientationAlert />
				<div className={styles.page}>
					<header className={styles.header}>
					<button className={styles.backButton} onClick={() => navigate(`/chapters/${world?.id}`)}>
						&#8592; Volver
					</button>
					<div>
						<h2 className={styles.chapterName}>{chapter.title}</h2>
						<h1 className={styles.levelTitle}>{level.title}</h1>
					</div>
				</header>
				<div className={styles.content}>
					<div className={styles.activityContainer}>
						<div className={styles.activityPlaceholder}>
							<p>Pr&#243;ximamente: Nivel {level.number}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
	}

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
			case 'colorAndLearn':
				return <ColorAndLearn words={levelData.words || []} onComplete={handleInteractionComplete} />;
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
				<BackgroundImage chapterId={chapter.id} className={styles.backgroundImage} />
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
					{/* Avatar + instrucción arriba centrado */}
					<div className={styles.avatarBar}>
						<motion.div
							animate={isCelebrating ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
							transition={{ duration: 0.5 }}
							className={styles.avatarSmall}
						>
							<ChibiAvatar
								eyeState="open"
								mouthState={isCelebrating ? 'smile' : 'neutral'}
								skinId={avatarState.skin}
								hairId={avatarState.hair}
								eyesId={avatarState.eyes}
								eyebrowsId={avatarState.eyebrows}
								mouthId={avatarState.mouth}
								glassesId={avatarState.glasses}
								specialId={avatarState.special}
								size="sm"
							/>
						</motion.div>
						<motion.div
							key={avatarMessage}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className={styles.avatarSpeechBubble}
						>
							{avatarMessage}
						</motion.div>
					</div>

					<div className={styles.gamePanel}>
						<section className={styles.activityContainer}>{renderGame()}</section>
					</div>
				</div>

			</div>
		</>
	);
};

export default LevelPage;

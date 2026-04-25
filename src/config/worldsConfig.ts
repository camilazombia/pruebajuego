/**
 * Configuración declarativa de mundos.
 *
 * Para agregar un mundo nuevo:
 *   1. Añade un objeto WorldConfig al final del array WORLD_CONFIGS.
 *   2. NO necesitas tocar ningún componente visual: WorldsMapPage,
 *      ChapterMapPage y HomePage leen de WORLDS (generado automáticamente).
 *   3. Crea los assets correspondientes según ASSETS_MANIFEST.txt.
 */

export interface ChapterTheme {
	icon: string;
	title: string;
	description: string;
}

export interface WorldConfig {
	id: string;
	number: number;
	title: string;
	description: string;
	storyDescription: string;
	guardianName: string;
	guardianEmoji: string;
	themeColor: string;
	chapters: ChapterTheme[];
}

export const WORLD_CONFIGS: WorldConfig[] = [
	{
		id: 'world_1',
		number: 1,
		title: 'Fundamentos Mágicos',
		description: 'Saludos y Colores para despertar la magia.',
		storyDescription: 'El Sol Dormilón no puede despertar porque olvidó las palabras mágicas. Aprende saludos y colores en inglés para devolverle su brillo al mundo.',
		guardianName: 'Sol Dormilón',
		guardianEmoji: '☀️',
		themeColor: '#FFD93D',
		chapters: [
			{ icon: 'greetings', title: 'Magic Greetings', description: 'Aprende a decir hi, hello y goodbye con tu varita mágica.' },
			{ icon: 'colors', title: 'Color Spells', description: 'Colores básicos que se encienden cuando dices el nombre en inglés.' },
			{ icon: 'toys', title: 'Magic Toys', description: 'Juguetes que cobran vida cuando pronuncias sus nombres.' },
			{ icon: 'family', title: 'Family Charms', description: 'Mamá, papá y amigos aparecen con palabras sencillas.' },
			{ icon: 'room', title: 'Cozy Room', description: 'Objetos de tu habitación que responden a tu voz.' },
		],
	},
	{
		id: 'world_2',
		number: 2,
		title: 'El Bosque de las Formas',
		description: 'Figuras y Números escondidos entre los árboles.',
		storyDescription: 'El Búho Geométrico perdió sus figuras y números. Sin ellos, los árboles del bosque crecen desordenados. Usa hechizos de formas y números para restaurar el orden.',
		guardianName: 'Búho Geométrico',
		guardianEmoji: '🦉',
		themeColor: '#6BCB77',
		chapters: [
			{ icon: 'shapes', title: 'Shape Forest', description: 'Círculos, cuadrados y triángulos mágicos entre los árboles.' },
			{ icon: 'numbers', title: 'Number Trees', description: 'Cuenta los árboles y animales del bosque.' },
			{ icon: 'sizes', title: 'Big & Small', description: 'Compara tamaños de las criaturas del bosque.' },
			{ icon: 'patterns', title: 'Pattern Paths', description: 'Sigue los patrones para encontrar el camino.' },
			{ icon: 'quest', title: 'Forest Quest', description: 'Misión final para restaurar el orden del bosque.' },
		],
	},
	{
		id: 'world_3',
		number: 3,
		title: 'La Ciudad Hambrienta',
		description: 'Comida y bebidas para alimentar la ciudad.',
		storyDescription: 'El Chef Mágico olvidó los nombres de todos los ingredientes. La ciudad entera tiene hambre. Aprende vocabulario de comida para cocinar los platos mágicos.',
		guardianName: 'Chef Mágico',
		guardianEmoji: '👨‍🍳',
		themeColor: '#FF6B6B',
		chapters: [
			{ icon: 'fruits', title: 'Fruit Market', description: 'Manzanas, plátanos y frutas mágicas.' },
			{ icon: 'vegetables', title: 'Veggie Garden', description: 'Zanahorias, tomates y verduras encantadas.' },
			{ icon: 'meals', title: 'Meal Time', description: 'Desayuno, almuerzo y cena para alimentar la ciudad.' },
			{ icon: 'drinks', title: 'Drink Potions', description: 'Agua, jugo y leche para las pociones.' },
			{ icon: 'quest', title: 'Chef Quest', description: 'Cocina el banquete final para curar al Chef Mágico.' },
		],
	},
	{
		id: 'world_4',
		number: 4,
		title: 'La Granja Ruidosa',
		description: 'Animales que necesitan sus nombres de vuelta.',
		storyDescription: 'El Espantapájaros ya no recuerda qué animal hace cada sonido. Los animales están confundidos. Nombra cada animal en inglés para devolver la armonía a la granja.',
		guardianName: 'Espantapájaros',
		guardianEmoji: '🤠',
		themeColor: '#C9A96E',
		chapters: [
			{ icon: 'farm_animals', title: 'Farm Friends', description: 'Vacas, cerdos y gallinas de la granja.' },
			{ icon: 'wild_animals', title: 'Wild Animals', description: 'Leones, elefantes y animales salvajes.' },
			{ icon: 'pets', title: 'My Pets', description: 'Perros, gatos y mascotas que te acompañan.' },
			{ icon: 'sounds', title: 'Animal Sounds', description: '¿Qué sonido hace cada animal?' },
			{ icon: 'quest', title: 'Farm Quest', description: 'Devuelve cada animal a su lugar en la granja.' },
		],
	},
	{
		id: 'world_5',
		number: 5,
		title: 'El Reloj Congelado',
		description: 'Rutinas diarias para descongelar el tiempo.',
		storyDescription: 'El Señor Tiempo se quedó dormido y su reloj se congeló. Nadie sabe si es de día o de noche. Aprende rutinas diarias en inglés para que el tiempo vuelva a correr.',
		guardianName: 'Señor Tiempo',
		guardianEmoji: '⏰',
		themeColor: '#4ECDC4',
		chapters: [
			{ icon: 'morning', title: 'Good Morning', description: 'Rutinas de la mañana para empezar el día.' },
			{ icon: 'afternoon', title: 'Afternoon Fun', description: 'Actividades de la tarde y juegos.' },
			{ icon: 'night', title: 'Good Night', description: 'La hora de dormir y los sueños.' },
			{ icon: 'days', title: 'Days of the Week', description: 'Los días de la semana en orden.' },
			{ icon: 'quest', title: 'Clock Quest', description: 'Descongela el reloj del Señor Tiempo.' },
		],
	},
	{
		id: 'world_6',
		number: 6,
		title: 'El Castillo de las Emociones',
		description: 'Sentimientos que iluminan el castillo.',
		storyDescription: 'El Fantasma Expresivo perdió todas sus emociones y ahora no siente nada. Las habitaciones del castillo están oscuras. Nombra cada sentimiento para devolver la luz.',
		guardianName: 'Fantasma Expresivo',
		guardianEmoji: '👻',
		themeColor: '#A66CFF',
		chapters: [
			{ icon: 'happy', title: 'Happy Room', description: 'Sonrisas, risas y alegría.' },
			{ icon: 'sad', title: 'Sad Room', description: 'Lágrimas y cómo sentirse mejor.' },
			{ icon: 'angry', title: 'Angry Room', description: 'Enojo y cómo calmarse.' },
			{ icon: 'scared', title: 'Brave Room', description: 'Miedos y valentía para superarlos.' },
			{ icon: 'quest', title: 'Emotion Quest', description: 'Ilumina todas las habitaciones del castillo.' },
		],
	},
	{
		id: 'world_7',
		number: 7,
		title: 'La Montaña del Clima',
		description: 'Clima y ropa para vestir a la montaña.',
		storyDescription: 'El Yeti Friolento no sabe qué ponerse porque olvidó las palabras del clima y la ropa. Ayúdalo a vestirse correctamente según el tiempo que haga.',
		guardianName: 'Yeti Friolento',
		guardianEmoji: '🏔️',
		themeColor: '#74B9FF',
		chapters: [
			{ icon: 'weather', title: 'Weather Watch', description: 'Soleado, lluvioso, nevado y más.' },
			{ icon: 'clothes', title: 'Closet Magic', description: 'Camisas, pantalones, zapatos y gorros.' },
			{ icon: 'seasons', title: 'Four Seasons', description: 'Primavera, verano, otoño e invierno.' },
			{ icon: 'dress_up', title: 'Dress the Yeti', description: 'Viste al Yeti según el clima.' },
			{ icon: 'quest', title: 'Mountain Quest', description: 'Llega a la cima de la Montaña del Clima.' },
		],
	},
	{
		id: 'world_8',
		number: 8,
		title: 'El Océano de los Colores',
		description: 'Animales marinos que perdieron sus colores.',
		storyDescription: 'La Sirena Descolorida perdió todos los colores del océano. Los peces, pulpos y estrellas de mar son transparentes. Nombra cada criatura marina para devolverle el color al mar.',
		guardianName: 'Sirena Descolorida',
		guardianEmoji: '🧜‍♀️',
		themeColor: '#0ABDE3',
		chapters: [
			{ icon: 'fish', title: 'Colorful Fish', description: 'Peces de todos los colores del arcoíris.' },
			{ icon: 'ocean', title: 'Deep Sea', description: 'Pulpos, medusas y criaturas del fondo.' },
			{ icon: 'shells', title: 'Shell Shore', description: 'Conchas, estrellas de mar y tesoros.' },
			{ icon: 'coral', title: 'Coral Reef', description: 'El arrecife mágico necesita color.' },
			{ icon: 'quest', title: 'Ocean Quest', description: 'Devuelve los colores a la Sirena Descolorida.' },
		],
	},
	{
		id: 'world_9',
		number: 9,
		title: 'La Casa de los Espejos',
		description: 'Cuerpo y familia reflejados en los espejos.',
		storyDescription: 'El Reflejo Perdido no puede verse en ningún espejo. Aprender las partes del cuerpo y los miembros de la familia hará que los reflejos vuelvan a aparecer.',
		guardianName: 'Reflejo Perdido',
		guardianEmoji: '🪞',
		themeColor: '#FD79A8',
		chapters: [
			{ icon: 'body', title: 'My Body', description: 'Cabeza, brazos, piernas y más.' },
			{ icon: 'face', title: 'My Face', description: 'Ojos, nariz, boca y orejas.' },
			{ icon: 'family', title: 'My Family', description: 'Mamá, papá, abuelos y hermanos.' },
			{ icon: 'describe', title: 'Describe Me', description: 'Alto, bajo, grande, pequeño.' },
			{ icon: 'quest', title: 'Mirror Quest', description: 'Devuelve el reflejo a cada espejo.' },
		],
	},
	{
		id: 'world_10',
		number: 10,
		title: 'La Academia Suprema',
		description: 'Verbos y repaso final para graduarse de mago.',
		storyDescription: 'El Gran Mago te espera en la Academia Suprema. Repasa todo lo aprendido y domina los verbos de acción para recibir tu título de Mago del Inglés.',
		guardianName: 'Gran Mago',
		guardianEmoji: '🧙‍♂️',
		themeColor: '#6C5CE7',
		chapters: [
			{ icon: 'verbs', title: 'Action Verbs', description: 'Correr, saltar, bailar y volar.' },
			{ icon: 'review_words', title: 'Word Review', description: 'Repasa las palabras de todos los mundos.' },
			{ icon: 'sentences', title: 'Magic Sentences', description: 'Forma oraciones completas.' },
			{ icon: 'challenge', title: 'Final Challenge', description: 'Demuestra todo lo que has aprendido.' },
			{ icon: 'graduation', title: 'Graduation', description: 'Recibe tu título de Mago del Inglés.' },
		],
	},
	{
		id: 'world_11',
		number: 11,
		title: 'Viajes y Lugares',
		description: 'Lugares, transporte y direcciones para explorar el mundo.',
		storyDescription: 'La Brújula Viajera perdió su rumbo. Aprende lugares, transporte y direcciones en inglés para ayudar a cada viajero a llegar a su destino.',
		guardianName: 'Brújula Viajera',
		guardianEmoji: '🧭',
		themeColor: '#00B894',
		chapters: [
			{ icon: 'places', title: 'City Places', description: 'Aprende lugares como park, school y museum.' },
			{ icon: 'transport', title: 'Transport Quest', description: 'Autobús, tren, avión y más.' },
			{ icon: 'directions', title: 'Magic Directions', description: 'Left, right y straight en misiones guiadas.' },
			{ icon: 'signs', title: 'Street Signs', description: 'Señales y símbolos para explorar con seguridad.' },
			{ icon: 'travel', title: 'Travel Tools', description: 'Ticket, map y objetos para el gran viaje.' },
		],
	},
	{
		id: 'world_12',
		number: 12,
		title: 'Reino Creador',
		description: 'Historias finales para graduarte como Hero del inglés.',
		storyDescription: 'Todos los guardianes te esperan para la misión final. Usa vocabulario, acciones y oraciones para crear historias y completar la gran aventura.',
		guardianName: 'Reina Imaginación',
		guardianEmoji: '👑',
		themeColor: '#E17055',
		chapters: [
			{ icon: 'characters', title: 'Story Heroes', description: 'Personajes para crear historias mágicas.' },
			{ icon: 'settings', title: 'Magic Settings', description: 'Lugares y escenarios de aventura.' },
			{ icon: 'actions', title: 'Story Actions', description: 'Verbos para dar vida a cada historia.' },
			{ icon: 'problem', title: 'Problem & Solution', description: 'Resolver retos con frases simples.' },
			{ icon: 'celebration', title: 'Final Celebration', description: 'Gran cierre de Explorer Hero.' },
		],
	},
];

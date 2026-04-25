import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { KaraokeSong } from '../../lib/karaoke/songCatalog';
import { getActiveLineIndex, parseLrc, type KaraokeLine } from '../../lib/karaoke/lrc';
import styles from './KaraokeModal.module.css';

type KaraokeMode = 'listen' | 'sing';
type SpeechStatus = 'idle' | 'listening' | 'success' | 'error';

interface KaraokeModalProps {
	worldTitle: string;
	songs: KaraokeSong[];
	initialMode: KaraokeMode;
	onClose: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface SpeechRecognitionResultItem {
	readonly transcript: string;
}

interface SpeechRecognitionResultCollection {
	readonly isFinal: boolean;
	readonly length: number;
	[item: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionEventLike extends Event {
	readonly resultIndex: number;
	readonly results: {
		[item: number]: SpeechRecognitionResultCollection;
		length: number;
	};
}

interface SpeechRecognition extends EventTarget {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	start: () => void;
	stop: () => void;
	onresult: ((event: SpeechRecognitionEventLike) => void) | null;
	onerror: ((event: Event) => void) | null;
	onend: (() => void) | null;
}

const CELEBRATE_EMOJIS = ['🌟', '⭐', '🎉', '🎊', '✨', '🦄', '🌈', '🎈'];

const normalizeText = (value: string): string =>
	value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const getHiddenWord = (line: string): string | null => {
	const words = line
		.split(/\s+/)
		.map((w) => w.replace(/[^a-zA-Z']/g, ''))
		.filter((w) => w.length > 2);
	if (words.length === 0) return null;
	return words[Math.floor(words.length / 2)];
};

const buildMaskedParts = (text: string, hiddenWord: string): Array<{ type: 'text' | 'blank'; value: string }> => {
	const regex = new RegExp(`(\\b${hiddenWord}\\b)`, 'i');
	const parts = text.split(regex);
	return parts.map((part) => ({
		type: regex.test(part) ? 'blank' : 'text',
		value: part,
	}));
};

interface CelebEmoji {
	id: number;
	emoji: string;
	x: number;
	delay: number;
}

const KaraokeModal: React.FC<KaraokeModalProps> = ({ worldTitle, songs, initialMode, onClose }) => {
	const [mode, setMode] = useState<KaraokeMode>(initialMode);
	const [selectedSongId, setSelectedSongId] = useState<string>(songs[0]?.id ?? '');
	const [lines, setLines] = useState<KaraokeLine[]>([]);
	const [activeLine, setActiveLine] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [speechText, setSpeechText] = useState('');
	const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('idle');
	const [attempts, setAttempts] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [solvedLineIndexes, setSolvedLineIndexes] = useState<Set<number>>(new Set());
	const [celebEmojis, setCelebEmojis] = useState<CelebEmoji[]>([]);
	const [micLevel, setMicLevel] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.8);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const recognitionRef = useRef<SpeechRecognition | null>(null);
	const mountedRef = useRef(true);
	const activeLineRef = useRef<HTMLDivElement | null>(null);
	const lyricsScrollRef = useRef<HTMLDivElement | null>(null);
	const micAnimFrameRef = useRef<number>(0);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const micStreamRef = useRef<MediaStream | null>(null);
	const celebIdRef = useRef(0);

	const selectedSong = useMemo(
		() => songs.find((s) => s.id === selectedSongId) ?? songs[0],
		[songs, selectedSongId],
	);

	const hiddenWord = useMemo(() => {
		if (mode !== 'sing') return null;
		const line = lines[activeLine]?.text ?? '';
		return getHiddenWord(line);
	}, [mode, lines, activeLine]);

	const stars = useMemo(() => {
		const lineTarget = Math.max(lines.length, 1);
		const ratio = solvedLineIndexes.size / lineTarget;
		if (ratio >= 0.8) return 3;
		if (ratio >= 0.5) return 2;
		if (ratio > 0) return 1;
		return 0;
	}, [lines.length, solvedLineIndexes.size]);

	const progressPercent = lines.length > 0 ? Math.round((solvedLineIndexes.size / lines.length) * 100) : 0;

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			mountedRef.current = false;
			recognitionRef.current?.stop();
			stopMicLevel();
		};
	}, []);

	// Reset on song/mode change
	useEffect(() => {
		setAttempts(0);
		setCorrect(0);
		setSolvedLineIndexes(new Set());
		setSpeechText('');
		setSpeechStatus('idle');
		setCelebEmojis([]);
	}, [selectedSongId, mode]);

	// Load LRC
	useEffect(() => {
		let cancelled = false;
		const loadLrc = async () => {
			if (!selectedSong?.available || !selectedSong.lrcSrc) {
				setLines([]);
				setLoadError('Esta cancion no tiene letra todavia.');
				return;
			}
			setIsLoading(true);
			setLoadError(null);
			try {
				const response = await fetch(encodeURI(selectedSong.lrcSrc));
				if (!response.ok) throw new Error();
				const raw = await response.text();
				const parsed = parseLrc(raw);
				if (!cancelled) {
					setLines(parsed);
					setActiveLine(0);
				}
			} catch {
				if (!cancelled) {
					setLoadError('No pude cargar la letra. Intenta de nuevo.');
					setLines([]);
				}
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		};
		loadLrc();
		return () => { cancelled = true; };
	}, [selectedSong]);

	// Auto-scroll active line
	useEffect(() => {
		if (activeLineRef.current && lyricsScrollRef.current) {
			activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [activeLine]);

	const handleTimeUpdate = () => {
		const audio = audioRef.current;
		if (!audio) return;
		setCurrentTime(audio.currentTime);
		if (lines.length > 0) setActiveLine(getActiveLineIndex(lines, audio.currentTime));
	};

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) { audio.play(); setIsPlaying(true); }
		else { audio.pause(); setIsPlaying(false); }
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		if (!audio) return;
		const t = Number(e.target.value);
		audio.currentTime = t;
		setCurrentTime(t);
	};

	const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = Number(e.target.value);
		setVolume(v);
		if (audioRef.current) audioRef.current.volume = v;
	};

	const formatTime = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = Math.floor(s % 60);
		return `${m}:${sec.toString().padStart(2, '0')}`;
	};

	// Mic level visualizer
	const stopMicLevel = useCallback(() => {
		cancelAnimationFrame(micAnimFrameRef.current);
		if (micStreamRef.current) {
			micStreamRef.current.getTracks().forEach((t) => t.stop());
			micStreamRef.current = null;
		}
		analyserRef.current = null;
		setMicLevel(0);
	}, []);

	const startMicLevel = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			micStreamRef.current = stream;
			const ctx = new AudioContext();
			const source = ctx.createMediaStreamSource(stream);
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 256;
			source.connect(analyser);
			analyserRef.current = analyser;

			const data = new Uint8Array(analyser.frequencyBinCount);
			const tick = () => {
				analyser.getByteFrequencyData(data);
				const avg = data.reduce((a, b) => a + b, 0) / data.length;
				setMicLevel(Math.min(100, avg * 2));
				micAnimFrameRef.current = requestAnimationFrame(tick);
			};
			tick();
		} catch {
			// mic access denied - ignore level
		}
	}, []);

	const triggerCelebration = useCallback(() => {
		const newEmojis: CelebEmoji[] = Array.from({ length: 8 }, (_, i) => ({
			id: ++celebIdRef.current,
			emoji: CELEBRATE_EMOJIS[Math.floor(Math.random() * CELEBRATE_EMOJIS.length)],
			x: 10 + Math.random() * 80,
			delay: i * 0.07,
		}));
		setCelebEmojis((prev) => [...prev, ...newEmojis]);
		setTimeout(() => {
			setCelebEmojis((prev) => prev.filter((e) => !newEmojis.some((n) => n.id === e.id)));
		}, 2200);
	}, []);

	const startRecognition = useCallback(async () => {
		const SpeechApi =
			(window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ??
			(window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;

		if (!SpeechApi) {
			setSpeechStatus('error');
			setSpeechText('Tu navegador no puede escucharte. Prueba Chrome.');
			return;
		}

		recognitionRef.current?.stop();
		await startMicLevel();

		const recognition = new SpeechApi();
		recognition.lang = 'en-US';
		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.onresult = (event) => {
			let transcript = '';
			for (let i = event.resultIndex; i < event.results.length; i += 1) {
				transcript += event.results[i][0]?.transcript ?? '';
			}
			const norm = normalizeText(transcript);
			const expected = normalizeText(hiddenWord ?? '');
			const isMatch =
				expected.length > 0 &&
				(norm.includes(expected) || expected.includes(norm));

			setSpeechText(transcript.trim());
			setAttempts((prev) => prev + 1);
			if (isMatch) {
				setCorrect((prev) => prev + 1);
				setSpeechStatus('success');
				setSolvedLineIndexes((prev) => new Set(prev).add(activeLine));
				triggerCelebration();
			} else {
				setSpeechStatus('error');
			}
			stopMicLevel();
		};

		recognition.onerror = () => {
			setSpeechStatus('error');
			setSpeechText('No te escuche. Intenta hablar mas fuerte!');
			stopMicLevel();
		};

		recognition.onend = () => {
			if (!mountedRef.current) return;
			if (speechStatus === 'listening') setSpeechStatus('idle');
			stopMicLevel();
		};

		recognitionRef.current = recognition;
		setSpeechStatus('listening');
		setSpeechText('');
		recognition.start();
	}, [hiddenWord, activeLine, speechStatus, startMicLevel, stopMicLevel, triggerCelebration]);

	const renderLine = (line: KaraokeLine, idx: number) => {
		const isActive = idx === activeLine;
		const isSolved = solvedLineIndexes.has(idx);
		const shouldMask = mode === 'sing' && isActive && hiddenWord != null && !isSolved;

		if (shouldMask && hiddenWord) {
			const parts = buildMaskedParts(line.text, hiddenWord);
			return (
				<div
					key={`${line.start}-${idx}`}
					ref={isActive ? activeLineRef : null}
					className={`${styles.line} ${styles.activeLine}`}
				>
					{parts.map((part, pi) =>
						part.type === 'blank' ? (
							<span key={pi} className={styles.hiddenBlank}>
								{'_ _ _'}
							</span>
						) : (
							<span key={pi}>{part.value}</span>
						),
					)}
				</div>
			);
		}

		if (isSolved && mode === 'sing') {
			const solvedParts = hiddenWord ? buildMaskedParts(line.text, hiddenWord) : null;
			return (
				<div
					key={`${line.start}-${idx}`}
					ref={isActive ? activeLineRef : null}
					className={`${styles.line} ${isActive ? styles.activeLine : ''} ${styles.solvedLine}`}
				>
					{solvedParts
						? solvedParts.map((part, pi) =>
								part.type === 'blank' ? (
									<span key={pi} className={styles.solvedWord}>{part.value}</span>
								) : (
									<span key={pi}>{part.value}</span>
								),
							)
						: line.text}
				</div>
			);
		}

		return (
			<div
				key={`${line.start}-${idx}`}
				ref={isActive ? activeLineRef : null}
				className={`${styles.line} ${isActive ? styles.activeLine : ''}`}
			>
				{line.text}
			</div>
		);
	};

	return (
		<motion.div
			className={styles.overlay}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
		>
			{/* Celebration emojis */}
			<AnimatePresence>
				{celebEmojis.map((ce) => (
					<motion.div
						key={ce.id}
						className={styles.celebEmoji}
						style={{ left: `${ce.x}%` }}
						initial={{ y: '80vh', opacity: 1, scale: 0.5 }}
						animate={{ y: '-10vh', opacity: 0, scale: 1.4 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1.4, delay: ce.delay, ease: 'easeOut' }}
					>
						{ce.emoji}
					</motion.div>
				))}
			</AnimatePresence>

			<motion.div
				className={styles.card}
				initial={{ scale: 0.88, opacity: 0, y: 40 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.88, opacity: 0, y: 40 }}
				transition={{ type: 'spring', stiffness: 300, damping: 28 }}
			>
				{/* Header */}
				<header className={styles.header}>
					<span className={styles.headerNote}>🎵</span>
					<div className={styles.headerText}>
						<h2 className={styles.title}>Karaoke</h2>
						<span className={styles.worldBadge}>{worldTitle}</span>
					</div>
					<button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar karaoke">
						✕
					</button>
				</header>

				{/* Mode tabs */}
				<div className={styles.modeTabs}>
					<button
						className={`${styles.modeTab} ${styles.modeTabListen} ${mode === 'listen' ? styles.modeTabActive : ''}`}
						onClick={() => setMode('listen')}
					>
						<span className={styles.modeTabIcon}>🎧</span>
						Escuchar
					</button>
					<button
						className={`${styles.modeTab} ${styles.modeTabSing} ${mode === 'sing' ? styles.modeTabActive : ''}`}
						onClick={() => setMode('sing')}
					>
						<span className={styles.modeTabIcon}>🎤</span>
						Cantar
					</button>
				</div>

				{/* Song selector */}
				<div className={styles.songSelector}>
					{songs.map((song) => (
						<button
							key={song.id}
							className={`${styles.songBtn} ${selectedSongId === song.id ? styles.songBtnActive : ''}`}
							onClick={() => song.available && setSelectedSongId(song.id)}
							disabled={!song.available}
						>
							🎵 {song.label}
						</button>
					))}
				</div>

				{/* Audio player */}
				{selectedSong?.available && (
					<>
						<audio
							ref={audioRef}
							src={encodeURI(selectedSong.audioSrc)}
							onTimeUpdate={handleTimeUpdate}
							onLoadedMetadata={() => {
								if (audioRef.current) setDuration(audioRef.current.duration);
							}}
							onEnded={() => setIsPlaying(false)}
						/>
						<div className={styles.player}>
							<button className={styles.playBtn} onClick={togglePlay} aria-label={isPlaying ? 'Pausar' : 'Reproducir'}>
								{isPlaying ? '⏸' : '▶'}
							</button>
							<div className={styles.playerCenter}>
								<input
									type="range"
									className={styles.seekBar}
									min={0}
									max={duration || 1}
									step={0.1}
									value={currentTime}
									onChange={handleSeek}
									aria-label="Progreso de la cancion"
								/>
								<div className={styles.timeRow}>
									<span>{formatTime(currentTime)}</span>
									<span>{formatTime(duration)}</span>
								</div>
							</div>
							<div className={styles.volumeWrap}>
								<span className={styles.volumeIcon}>🔊</span>
								<input
									type="range"
									className={styles.volumeBar}
									min={0}
									max={1}
									step={0.05}
									value={volume}
									onChange={handleVolume}
									aria-label="Volumen"
								/>
							</div>
						</div>
					</>
				)}

				{/* Lyrics panel */}
				<section className={styles.lyricsPanel}>
					{isLoading && (
						<div className={styles.hint}>
							<span className={styles.loadingDot}>●</span>
							<span className={styles.loadingDot}>●</span>
							<span className={styles.loadingDot}>●</span>
							<span style={{ marginLeft: '0.5rem' }}>Cargando letra...</span>
						</div>
					)}
					{loadError && <p className={styles.errorMsg}>{loadError}</p>}
					{!isLoading && !loadError && lines.length === 0 && (
						<p className={styles.hint}>No hay letra para esta cancion.</p>
					)}
					<div className={styles.lyricsScroll} ref={lyricsScrollRef}>
						{lines.map((line, idx) => renderLine(line, idx))}
					</div>
				</section>

				{/* Sing mode practice panel */}
				{mode === 'sing' && (
					<section className={styles.practicePanel}>
						<div className={styles.targetWord}>
							<p className={styles.targetLabel}>Di esta palabra:</p>
							{hiddenWord ? (
								<motion.p
									className={styles.targetValue}
									key={hiddenWord}
									initial={{ scale: 0.7, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ type: 'spring', stiffness: 400, damping: 18 }}
								>
									{hiddenWord}
								</motion.p>
							) : (
								<p className={styles.targetValueEmpty}>Escucha la cancion...</p>
							)}
						</div>

						{/* Mic button + level bar */}
						<div className={styles.micArea}>
							<motion.button
								className={`${styles.micBtn} ${speechStatus === 'listening' ? styles.micBtnListening : ''}`}
								onClick={startRecognition}
								disabled={!hiddenWord || speechStatus === 'listening'}
								whileTap={{ scale: 0.92 }}
								aria-label="Hablar con microfono"
							>
								{speechStatus === 'listening' ? '👂' : '🎤'}
							</motion.button>

							{/* Mic level bars */}
							{speechStatus === 'listening' && (
								<div className={styles.micLevelWrap}>
									{Array.from({ length: 8 }).map((_, i) => (
										<div
											key={i}
											className={styles.micLevelBar}
											style={{
												height: `${Math.max(15, micLevel * (0.4 + Math.sin(i * 0.9) * 0.6))}%`,
											}}
										/>
									))}
								</div>
							)}
						</div>

						{/* Feedback */}
						<AnimatePresence mode="wait">
							{speechStatus === 'success' && (
								<motion.div
									key="success"
									className={`${styles.feedbackChip} ${styles.feedbackSuccess}`}
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ type: 'spring', stiffness: 400 }}
								>
									<span>🌟</span> Perfecto!
								</motion.div>
							)}
							{speechStatus === 'error' && (
								<motion.div
									key="error"
									className={`${styles.feedbackChip} ${styles.feedbackError}`}
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ type: 'spring', stiffness: 400 }}
								>
									<span>💪</span> Intenta otra vez!
								</motion.div>
							)}
						</AnimatePresence>

						{speechText !== '' && (
							<p className={styles.transcript}>Te escuche: "{speechText}"</p>
						)}
					</section>
				)}

				{/* Stats bar */}
				<div className={styles.statsBar}>
					<div className={styles.statItem}>
						<span className={styles.statValue}>{correct}/{attempts}</span>
						<span className={styles.statLabel}>Respuestas</span>
					</div>
					<div className={styles.statDivider} />
					<div className={`${styles.statItem} ${styles.progressBar}`}>
						<span className={styles.statLabel}>Progreso {progressPercent}%</span>
						<div className={styles.progressTrack}>
							<div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
						</div>
					</div>
					<div className={styles.statDivider} />
					<div className={styles.statItem}>
						<span className={`${styles.statValue} ${styles.starsValue}`}>
							{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
						</span>
						<span className={styles.statLabel}>Estrellas</span>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default KaraokeModal;

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { KARAOKE_SONGS_BY_WORLD, RECURSOS_ADICIONALES } from '../../../shared/lib/karaoke/songCatalog';
import KaraokeModal from '../../../shared/ui/KaraokeModal/KaraokeModal';
import styles from './KaraokeSection.module.css';

const WORLD_LABELS: Record<string, { label: string; emoji: string }> = {
	world_1: { label: 'Fundamentos Mágicos', emoji: '✨' },
	world_2: { label: 'Aventuras en la Ciudad', emoji: '🏙️' },
	world_3: { label: 'Exploradores Globales', emoji: '🌍' },
	world_4: { label: 'La Granja Ruidosa', emoji: '🐄' },
	world_5: { label: 'El Reloj Congelado', emoji: '⏰' },
	world_6: { label: 'El Castillo de las Emociones', emoji: '🏰' },
	world_7: { label: 'La Montaña del Clima', emoji: '⛅' },
	world_8: { label: 'El Océano de los Colores', emoji: '🌊' },
	world_9: { label: 'La Casa de los Espejos', emoji: '🪞' },
	world_10: { label: 'La Academia Suprema', emoji: '🎓' },
	world_11: { label: 'Viajes y Lugares', emoji: '🗺️' },
	world_12: { label: 'Reino Creador', emoji: '🎨' },
};

type KaraokeMode = 'listen' | 'sing';

interface ModalState {
	title: string;
	songs: typeof RECURSOS_ADICIONALES[number]['songs'];
	mode: KaraokeMode;
}

const KaraokeSection: React.FC = () => {
	const [modal, setModal] = useState<ModalState | null>(null);

	const worldIds = Object.keys(KARAOKE_SONGS_BY_WORLD);

	const openWorld = (worldId: string, mode: KaraokeMode) => {
		const info = WORLD_LABELS[worldId] ?? { label: worldId, emoji: '🎵' };
		setModal({ title: info.label, songs: KARAOKE_SONGS_BY_WORLD[worldId] ?? [], mode });
	};

	const openRecurso = (themeId: string, mode: KaraokeMode) => {
		const theme = RECURSOS_ADICIONALES.find((r) => r.id === themeId);
		if (!theme) return;
		setModal({ title: theme.label, songs: theme.songs, mode });
	};

	return (
		<div className={styles.section}>
			{/* ── Recursos Adicionales ── */}
			<div className={styles.sectionHeader}>
				<span className={styles.sectionNote}>🌟</span>
				<div>
					<h2 className={styles.sectionTitle}>Recursos Adicionales</h2>
					<p className={styles.sectionSub}>Aprende el abecedario, los números y más</p>
				</div>
			</div>

			<div className={styles.recursosGrid}>
				{RECURSOS_ADICIONALES.map((theme, idx) => (
					<motion.div
						key={theme.id}
						className={styles.recursoCard}
						style={{ '--card-color': theme.color } as React.CSSProperties}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: idx * 0.08, type: 'spring', stiffness: 280, damping: 22 }}
					>
						<span className={styles.recursoEmoji}>{theme.emoji}</span>
						<div className={styles.recursoInfo}>
							<p className={styles.recursoLabel}>{theme.label}</p>
							<p className={styles.recursoSub}>{theme.subtitle}</p>
						</div>
						<div className={styles.recursoBtns}>
							<button
								className={styles.listenBtn}
								onClick={() => openRecurso(theme.id, 'listen')}
							>
								🎧 Escuchar
							</button>
							<button
								className={styles.singBtn}
								onClick={() => openRecurso(theme.id, 'sing')}
							>
								🎤 Cantar
							</button>
						</div>
					</motion.div>
				))}
			</div>

			{/* ── Karaoke por Mundo ── */}
			<div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
				<span className={styles.sectionNote}>🎵</span>
				<div>
					<h2 className={styles.sectionTitle}>Karaoke</h2>
					<p className={styles.sectionSub}>Canciones de cada mundo</p>
				</div>
			</div>

			<div className={styles.worldGrid}>
				{worldIds.map((worldId) => {
					const info = WORLD_LABELS[worldId] ?? { label: worldId, emoji: '🎵' };
					const songs = KARAOKE_SONGS_BY_WORLD[worldId] ?? [];
					const available = songs.some((s) => s.available);
					return (
						<div
							key={worldId}
							className={`${styles.worldCard} ${!available ? styles.worldCardLocked : ''}`}
						>
							<span className={styles.worldEmoji}>{info.emoji}</span>
							<p className={styles.worldLabel}>{info.label}</p>
							{available ? (
								<div className={styles.worldBtns}>
									<button
										className={styles.listenBtn}
										onClick={() => openWorld(worldId, 'listen')}
									>
										🎧 Escuchar
									</button>
									<button
										className={styles.singBtn}
										onClick={() => openWorld(worldId, 'sing')}
									>
										🎤 Cantar
									</button>
								</div>
							) : (
								<p className={styles.lockedText}>🔒 Próximamente</p>
							)}
						</div>
					);
				})}
			</div>

			<AnimatePresence>
				{modal && (
					<KaraokeModal
						worldTitle={modal.title}
						songs={modal.songs}
						initialMode={modal.mode}
						onClose={() => setModal(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default KaraokeSection;

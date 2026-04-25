import { WORLD_CONFIGS } from '../../config/worldsConfig';
import type { WorldConfig } from '../../config/worldsConfig';

export interface Level {
	id: string;
	number: number;
	title: string;
	isCompleted: boolean;
	stars: number; // 0-3
	chapterId?: string;
}

export interface Chapter {
	id: string;
	number: number;
	title: string;
	icon: string;
	description?: string;
	levels: Level[];
}

export interface World {
	id: string;
	number: number;
	title: string;
	description: string;
	storyDescription: string;
	guardianName: string;
	guardianEmoji: string;
	themeColor: string;
	chapters: Chapter[];
	isUnlocked: boolean;
	isLocked: boolean;
	progress: number; // 0-100
}

const LEVELS_PER_CHAPTER = 6;

const createLevels = (worldNum: number, chapterNum: number, chapterId: string): Level[] => {
	return Array.from({ length: LEVELS_PER_CHAPTER }, (_, i) => ({
		id: `world_${worldNum}_chapter_${chapterNum}_level_${i + 1}`,
		number: i + 1,
		title: `Level ${i + 1}`,
		isCompleted: false,
		stars: 0,
		chapterId,
	}));
};

const buildChapters = (cfg: WorldConfig): Chapter[] =>
	cfg.chapters.map((ch, i) => {
		const chapterId = `${cfg.id}_chapter_${i + 1}`;
		return {
			id: chapterId,
			number: i + 1,
			title: ch.title,
			icon: ch.icon,
			description: ch.description || undefined,
			levels: createLevels(cfg.number, i + 1, chapterId),
		};
	});

export const WORLDS: World[] = WORLD_CONFIGS.map((cfg, idx) => ({
	id: cfg.id,
	number: cfg.number,
	title: cfg.title,
	description: cfg.description,
	storyDescription: cfg.storyDescription,
	guardianName: cfg.guardianName,
	guardianEmoji: cfg.guardianEmoji,
	themeColor: cfg.themeColor,
	chapters: buildChapters(cfg),
	isUnlocked: idx === 0,
	isLocked: idx !== 0,
	progress: 0,
}));

export const getWorldById = (id: string) => WORLDS.find((w) => w.id === id);

export const getChapterById = (id: string) => {
	for (const world of WORLDS) {
		const chapter = world.chapters.find((c) => c.id === id);
		if (chapter) return chapter;
	}
	return undefined;
};

export const getLevelById = (id: string) => {
	for (const world of WORLDS) {
		for (const chapter of world.chapters) {
			const level = chapter.levels.find((l) => l.id === id);
			if (level) return level;
		}
	}
	return undefined;
};

export const getChaptersForWorld = (worldId: string) => getWorldById(worldId)?.chapters || [];

export const getLevelsForChapter = (chapterId: string) => getChapterById(chapterId)?.levels || [];

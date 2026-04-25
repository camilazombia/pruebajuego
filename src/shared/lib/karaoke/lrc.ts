export interface KaraokeLine {
	start: number;
	end: number;
	text: string;
}

const parseTimeToSeconds = (timeTag: string): number | null => {
	const match = timeTag.match(/^(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?$/);
	if (!match) return null;

	const [, min, sec, fraction = '0'] = match;
	const minutes = Number(min);
	const seconds = Number(sec);
	const ms = Number(fraction.padEnd(3, '0'));

	return minutes * 60 + seconds + ms / 1000;
};

export const parseLrc = (raw: string): KaraokeLine[] => {
	const rows = raw.split(/\r?\n/);
	const tempLines: Array<{ start: number; text: string }> = [];

	for (const row of rows) {
		const tags = [...row.matchAll(/\[(\d{1,2}:\d{2}(?:\.\d{1,3})?)\]/g)];
		if (tags.length === 0) continue;

		const text = row.replace(/\[[^\]]+\]/g, '').trim();
		if (!text) continue;

		for (const tag of tags) {
			const start = parseTimeToSeconds(tag[1]);
			if (start !== null) {
				tempLines.push({ start, text });
			}
		}
	}

	tempLines.sort((a, b) => a.start - b.start);

	return tempLines.map((line, idx) => {
		const next = tempLines[idx + 1];
		return {
			start: line.start,
			end: next ? Math.max(next.start - 0.01, line.start + 1) : line.start + 4,
			text: line.text,
		};
	});
};

export const getActiveLineIndex = (lines: KaraokeLine[], currentTime: number): number => {
	if (lines.length === 0) return -1;
	for (let i = 0; i < lines.length; i += 1) {
		if (currentTime >= lines[i].start && currentTime < lines[i].end) return i;
	}
	return currentTime < lines[0].start ? 0 : lines.length - 1;
};

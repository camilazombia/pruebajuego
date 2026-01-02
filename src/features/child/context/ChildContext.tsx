import React, { createContext, useContext, useState } from 'react';
import type {
	AgeGroup,
	ContentPreferences,
} from '../../../shared/data/ageGroups';
import {
	createDefaultContentPreferences,
	getAgeGroupByRange,
} from '../../../shared/data/ageGroups';

interface ChildContext {
	ageRange: string | null;
	ageGroup: AgeGroup | null;
	contentPreferences: ContentPreferences | null;
	setAgeRange: (range: string) => void;
	updateContentPreferences: (prefs: Partial<ContentPreferences>) => void;
}

const ChildContextProvider = createContext<ChildContext | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [ageRange, setAgeRangeState] = useState<string | null>(() => {
		const saved = localStorage.getItem('childAgeRange');
		return saved || null;
	});

	const [contentPreferences, setContentPreferences] =
		useState<ContentPreferences | null>(() => {
			const saved = localStorage.getItem('contentPreferences');
			if (saved) {
				try {
					return JSON.parse(saved);
				} catch {
					return null;
				}
			}
			return null;
		});

	const ageGroup: AgeGroup | null = ageRange ? getAgeGroupByRange(ageRange) ?? null : null;

	const setAgeRange = (range: string) => {
		setAgeRangeState(range);
		localStorage.setItem('childAgeRange', range);

		// Crear preferencias por defecto para este rango de edad
		const prefs = createDefaultContentPreferences(range);
		setContentPreferences(prefs);
		localStorage.setItem('contentPreferences', JSON.stringify(prefs));
	};

	const updateContentPreferences = (
		prefs: Partial<ContentPreferences>
	) => {
		if (!contentPreferences) return;
		const updated: ContentPreferences = { ...contentPreferences, ...prefs } as ContentPreferences;
		setContentPreferences(updated);
		localStorage.setItem('contentPreferences', JSON.stringify(updated));
	};

	const value: ChildContext = {
		ageRange,
		ageGroup,
		contentPreferences,
		setAgeRange,
		updateContentPreferences,
	};

	return (
		<ChildContextProvider.Provider value={value}>
			{children}
		</ChildContextProvider.Provider>
	);
};

export const useChild = () => {
	const context = useContext(ChildContextProvider);
	if (!context) {
		throw new Error('useChild must be used within a ChildProvider');
	}
	return context;
};

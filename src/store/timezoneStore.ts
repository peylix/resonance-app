import type { Timezone, TimeState } from '../types/timezone';
import type { Language } from '../i18n/translations';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserTimezone, getUtcOffset } from '../utils/timezone';
import { getCityByTimezone } from '../utils/cityData';

interface TimezoneStore {
    // states
    timezones: Timezone[];
    timeState: TimeState;
    now: Date; // real wall-clock time, updated every second regardless of live mode
    referenceTimezone: string;

    // language
    language: Language;

    // user settings
    activeStart: number;
    activeEnd: number;
    sleepStart: number;
    sleepEnd: number;

    // whether the user's own timezone has been auto-added on the first visit
    hasAutoAddedTimezone: boolean;

    // timezone operations
    addTimezone: (timezone: Timezone) => void;
    removeTimezone: (id: string) => void;
    clearTimezones: () => void;

    // time state operations
    setCurrentTime: (time: Date) => void;
    setLiveMode: (isLive: boolean) => void;
    tick: () => void;

    // language operations
    setLanguage: (language: Language) => void;

    // user settings operations
    setActiveHours: (start: number, end: number) => void;
    setSleepHours: (start: number, end: number) => void;
    markTimezoneAutoAdded: () => void;
}

export const useTimezoneStore = create<TimezoneStore>()(persist((set, get) => ({
    timezones: [],
    timeState: {
        currentTime: new Date(),
        isLive: true,
    },
    now: new Date(),

    referenceTimezone: getUserTimezone(),

    language: (navigator.language.startsWith('zh') ? 'zh' : 'en') as Language,

    activeStart: 9,
    activeEnd: 18,
    sleepStart: 0,
    sleepEnd: 7,

    hasAutoAddedTimezone: false,

    addTimezone: (timezone) => {
        set((state) => ({
            timezones: [...state.timezones, timezone],
        }));
    },

    removeTimezone: (id) => {
        set((state) => ({
            timezones: state.timezones.filter((tz) => tz.id !== id),
        }));
    },

    clearTimezones: () => {
        set({ timezones: [] });
    },

    setCurrentTime: (time) => {
        set({
            timeState: {
                currentTime: time,
                isLive: false, // pause live mode when time is manually set
            }
        });

    },

    setLiveMode: (isLive) => {
        set((state) => ({
            timeState: {
                currentTime: isLive ? new Date() : state.timeState.currentTime,
                isLive,
            },
        }));

    },

    tick: () => {
        const now = new Date();
        const { timeState } = get();
        if (timeState.isLive) {
            set({
                now,
                timeState: {
                    ...timeState,
                    currentTime: now,
                },
            });
        } else {
            set({ now });
        }
    },

    setLanguage: (language) => {
        set({ language });
    },

    setActiveHours: (start: number, end: number) => {
        set({
            activeStart: start,
            activeEnd: end
        });
    },

    setSleepHours: (start: number, end: number) => {
        set({
            sleepStart: start,
            sleepEnd: end
        });
    },

    markTimezoneAutoAdded: () => {
        set({ hasAutoAddedTimezone: true });
    },

}), {
    name: 'resonance-settings',
    // Only persist user choices; the clock state and reference timezone are runtime values
    partialize: (state) => ({
        timezones: state.timezones,
        language: state.language,
        activeStart: state.activeStart,
        activeEnd: state.activeEnd,
        sleepStart: state.sleepStart,
        sleepEnd: state.sleepEnd,
        hasAutoAddedTimezone: state.hasAutoAddedTimezone,
    }),
}));

/**
 * Create a Timezone object from a city name.
 * @param CityName - IANA timezone identifier of the city.
 * @returns Timezone object or null if city not found.
 */
export function createTimezoneFromCity(CityName: string): Timezone | null {
    const city = getCityByTimezone(CityName);
    if (!city) return null;

    return {
        id: `${city.timezone}-${Date.now()}`,
        cityKey: city.nameKey,
        regionKey: city.regionKey,
        timezone: city.timezone,
        offset: getUtcOffset(city.timezone),
    };

}

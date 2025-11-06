import type { Timezone, TimeState } from '../types/timezone';
import type { Language } from '../i18n/translations';
import { create } from 'zustand';
import { getUserTimezone, getUtcOffset } from '../utils/timezone';
import { getCityByTimezone } from '../utils/cityData';

interface TimezoneStore {
    // states
    timezones: Timezone[];
    timeState: TimeState;
    referenceTimezone: string;

    // language
    language: Language;

    // user settings
    workStart: number;
    workEnd: number;
    sleepStart: number;
    sleepEnd: number;

    // timezone operations
    addTimezone: (timezone: Timezone) => void;
    removeTimezone: (id: string) => void;
    clearTimezones: () => void;

    // time state operations
    setCurrentTime: (time: Date) => void;
    setLiveMode: (isLive: boolean) => void;
    updateTime: () => void;

    // language operations
    setLanguage: (language: Language) => void;

    // user settings operations
    setWorkingHours: (start: number, end: number) => void;
    setSleepHours: (start: number, end: number) => void;
}

export const useTimezoneStore = create<TimezoneStore>((set, get) => ({
    timezones: [],
    timeState: {
        currentTime: new Date(),
        isLive: true,
    },

    referenceTimezone: getUserTimezone(),

    language: (navigator.language.startsWith('zh') ? 'zh' : 'en') as Language,

    workStart: 9,
    workEnd: 18,
    sleepStart: 0,
    sleepEnd: 7,

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

    updateTime: () => {
        const { timeState } = get();
        if (timeState.isLive) {
            set({
                timeState: {
                    ...timeState,
                    currentTime: new Date(),
                },
            });
        }
    },

    setLanguage: (language) => {
        set({ language });
    },

    setWorkingHours: (start: number, end: number) => {
        set({
            workStart: start,
            workEnd: end
        });
    },

    setSleepHours: (start: number, end: number) => {
        set({
            sleepStart: start,
            sleepEnd: end
        });
    },

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
        emoji: city.emoji,
    };

}

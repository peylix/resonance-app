/**
 * Interface for representing timezone information.
 * Core data for timezone cards.
 */
export interface Timezone {
    id: string;
    city: string; // City name
    country: string; // Country name
    timezone: string; // IANA timezone identifier (e.g., "America/New_York")
    offset: number; // Offset from UTC in minutes. Adaptive for DST.
    emoji?: string; // Emoji representing the location (optional).
}

/**
 * Time state for the app.
 * Controls the current time that is displayed.
 */
export interface TimeState {
    currentTime: Date; // Current time being displayed
    isLive: boolean; // Whether it is auto-updating (true: current time, false: paused)
}

/**
 * Preset city data.
 */
export interface CityData {
    name: string;
    timezone: string; // IANA identifier
    country: string;
    emoji?: string;
    searchTerms?: string[]; // Key words for searching
}

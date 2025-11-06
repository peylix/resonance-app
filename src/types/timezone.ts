/**
 * Interface for representing timezone information.
 * Core data for timezone cards.
 */
export interface Timezone {
    id: string;
    cityKey: string; // Key for city name
    regionKey: string; // Key for region name
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
    nameKey: string; // Key for city name
    timezone: string; // IANA identifier
    regionKey: string; // Key for region name
    emoji?: string;
    searchTerms?: string[]; // Key words for searching
}

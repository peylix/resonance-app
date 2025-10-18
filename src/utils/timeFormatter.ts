/**
 * Format a time difference between two timezones
 * @param minutes - diff in minutes
 * @returns formatted time difference string (e.g., "+3 hours", "-30 minutes", "same time")
 */
export function formatTimeDifference(minutes: number): string {
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const minutesReduced = absMinutes % 60;

    const sign = minutes >= 0 ? '+' : '-';

    if (minutesReduced === 0) return `UTC${sign}${hours}`;

    return `UTC${sign}${hours}:${minutesReduced.toString().padStart(2, '0')}`;
}

/**
 * Convert minutes to human-readable format
 * @param minutes - diff in minutes
 * @returns a description of time
 */
export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const minutesReduced = minutes % 60;

    if (hours === 0) return `${minutesReduced} mins`;
    if (minutesReduced === 0) return `${hours} hrs`;

    return `${hours} hrs ${minutesReduced} mins`;
}

/**
 * Obtain the relative time description
 * @param date - target date
 * @returns a string of relative time (r.g., "in 3 hours", "just now")
 */
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
}

/**
 * Format a time to 12-hour format
 * @param hour - hour in 24-hour format
 * @returns formatted hour string (e.g., "3 PM", "11 AM")
 */
export function format12Hour(hour: number): string {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${hour12} ${suffix}`;
}

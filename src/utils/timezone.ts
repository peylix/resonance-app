import { toZonedTime, formatInTimeZone, fromZonedTime, getTimezoneOffset } from 'date-fns-tz';
import { differenceInMinutes, differenceInCalendarDays, addMinutes, startOfDay } from 'date-fns';

/**
 * Format a date to HH:mm
 * @param date - the date to format
 * @param timezone - IANA identifier.
 */
export function formatTime(date: Date, timezone: string): string {
    return formatInTimeZone(date, timezone, 'HH:mm');
}

/**
 * Format a date to MM/dd HH:mm
 * @param date - the date to format
 * @param timezone - IANA identifier.
 * @returns formatted date string (e.g., "10/16 18:00")
 */
export function formatFullTime(date: Date, timezone: string): string {
    return formatInTimeZone(date, timezone, 'MM/dd HH:mm');
}

/**
 * Obtain the calendar day difference between two timezones at a given moment
 * @param date - the date to check
 * @param timezone - IANA identifier for the target timezone
 * @param referenceTimezone - IANA identifier for the reference timezone (usually user's local timezone)
 * @returns days the target timezone is ahead of the reference (e.g., 1 for "tomorrow", -1 for "yesterday")
 */
export function getDayDifference(
    date: Date,
    timezone: string,
    referenceTimezone: string
): number {
    // get the local date for two timezones
    const targetDate = toZonedTime(date, timezone);
    const refDate = toZonedTime(date, referenceTimezone);

    // compare calendar days, which stays correct on 23h/25h DST days
    return differenceInCalendarDays(targetDate, refDate);
}

/**
 * Calculate the UTC offset difference between two timezones
 * @param timezone - IANA identifier for the target timezone
 * @param referenceTimezone - IANA identifier for the reference timezone (usually user's local timezone)
 * @returns minutes the target timezone is ahead of the reference (negative if behind)
 */
export function getTimeDifference(
    timezone: string,
    referenceTimezone: string,
    currentTime: Date = new Date()
): number {
    const targetTime = toZonedTime(currentTime, timezone);
    const refTime = toZonedTime(currentTime, referenceTimezone);

    return differenceInMinutes(targetTime, refTime);
}

/**
 * determine if a given hour is in active time (9:00 - 18:00 by default)
 * @param hour - how many hours (0-23)
 * @param activeStart - active start hour (default 9)
 * @param activeEnd - active end hour (default 18)
 * @returns whether it is active time
 */
export function isActiveHours(
    hour: number,
    activeStart: number = 9,
    activeEnd: number = 18
): boolean {
    if (activeStart > activeEnd) {
        return hour >= activeStart || hour < activeEnd;
    }
    return hour >= activeStart && hour < activeEnd;
}

/**
 * determine if a given hour is in sleep time (0:00 - 7:00 by default)
 * @param hour - how many hours (0-23)
 * @param sleepStart - sleep start hour (default 0)
 * @param sleepEnd - sleep end hour (default 7)
 * @returns whether it is sleep time
 */
export function isSleepHours(
    hour: number,
    sleepStart: number = 0,
    sleepEnd: number = 7
): boolean {
    // Handle wrap-around case (e.g., 23-7)
    if (sleepStart > sleepEnd) {
        return hour >= sleepStart || hour < sleepEnd;
    }
    // Handle normal case (e.g., 1-9)
    return hour >= sleepStart && hour < sleepEnd;
}

/**
 * Get the type for every hours in a day cycle (24 hrs)
 * @param activeStart - active start hour (default 9)
 * @param activeEnd - active end hour (default 18)
 * @param sleepStart - sleep start hour (default 0)
 * @param sleepEnd - sleep end hour (default 7)
 * @returns an array of 24 elements indicating the type of each hour
 */
export function getHourTypes(
    activeStart: number = 9,
    activeEnd: number = 18,
    sleepStart: number = 0,
    sleepEnd: number = 7
): ('active' | 'sleeping' | 'free')[] {
    const types: ('active' | 'sleeping' | 'free')[] = [];

    for (let hour = 0; hour < 24; hour++) {
        if (isActiveHours(hour, activeStart, activeEnd)) {
            types.push('active');
        } else if (isSleepHours(hour, sleepStart, sleepEnd)) {
            types.push('sleeping');
        } else {
            types.push('free');
        }
    }

    return types;
}

/**
 * Calculate the percentage of a given time in a day
 * @param date
 * @param timezone - IANA identifier
 * @returns percentage (0-100)
 */
export function getTimePercentage(date: Date, timezone: string): number {
    const givenTime = toZonedTime(date, timezone);
    const hour = givenTime.getHours();
    const minute = givenTime.getMinutes();

    const totalMinutes = hour * 60 + minute;
    return (totalMinutes / (24 * 60)) * 100;
}

/**
 * Calculate the corresponding time based on a given percentage in a day
 * @param percentage
 * @param baseDate - the base date to calculate from
 * @param timezone - IANA identifier
 * @returns the calculated date
 */
export function getTimeFromPercentage(
    percentage: number,
    baseDate: Date,
    timezone: string
): Date {
    // round to whole minutes so repeated conversions don't drift by floating-point error
    const totalMinutes = Math.round((percentage / 100) * 24 * 60);
    const dayStart = startOfDay(toZonedTime(baseDate, timezone));
    const localTime = addMinutes(dayStart, totalMinutes);

    // Convert the local time back to UTC to ensure correct global time representation
    return fromZonedTime(localTime, timezone);
}

/**
 * Get the current IANA identifier of the user's timezone
 * @returns IANA identifier e.g., "America/New_York"
 */
export function getUserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Calculate the UTC offset in minutes for a given timezone at a specific date
 * @param timezone - IANA identifier
 * @param date - the date to calculate
 * @returns offset from UTC in minutes
 */
export function getUtcOffset(timezone: string, date: Date = new Date()): number {
    return getTimezoneOffset(timezone, date) / (1000 * 60);
}

/**
 * Get the hour of a moment in a given timezone
 * @param date - the moment to check
 * @param timezone - IANA identifier
 * @returns hour (0-23)
 */
export function getHourInTimezone(date: Date, timezone: string): number {
    return Number(formatInTimeZone(date, timezone, 'H'));
}


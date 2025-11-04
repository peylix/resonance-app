import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { differenceInMinutes, addMinutes, startOfDay } from 'date-fns';

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
 * Obtain the label for a date
 * @param date - the date to check
 * @param timezone - IANA identifier for the target timezone 
 * @param referenceTimezone - IANA identifier for the reference timezone (usually user's local timezone)
 * @returns a string of date label
 */
export function getDateLabel(
    date: Date,
    timezone: string,
    referenceTimezone: string
): string {
    // get the local date for two timezones
    const targetDate = toZonedTime(date, timezone);
    const refDate = toZonedTime(date, referenceTimezone);

    // compare date
    const targetDay = startOfDay(targetDate).getTime();
    const refDay = startOfDay(refDate).getTime();

    const dayDiff = (targetDay - refDay) / (1000 * 60 * 60 * 24);

    return dayDiff === 0 ? ''
        : dayDiff === 1 ? 'tomorrow'
        : dayDiff === -1 ? 'yesterday'
        : dayDiff > 1 ? `in ${Math.floor(dayDiff)} days`
        : `${Math.abs(Math.floor(dayDiff))} days ago`
}

/**
 * Calculate the UTC offset difference (using human language)
 * @param timezone - IANA identifier for the target timezone
 * @param referenceTimezone - IANA identifier for the reference timezone (usually user's local timezone)
 * @returns discription of the offset difference (e.g., "+3 hours", "-30 minutes", "same time")
 */
export function getTimeDifference(
    timezone: string,
    referenceTimezone: string,
    currentTime: Date = new Date()
): string {
    const targetTime = toZonedTime(currentTime, timezone);
    const refTime = toZonedTime(currentTime, referenceTimezone);

    const diffMinutes = differenceInMinutes(targetTime, refTime);

    if (diffMinutes === 0) return 'Same time!';

    const hours = Math.abs(diffMinutes / 60);
    const isAhead = diffMinutes > 0;

    // if the diff is in full hours
    if (Number.isInteger(hours))
        return isAhead ? `+${hours} h` : `-${hours} h`;

    // if the diff is not in full hours
    const fullHours = Math.floor(hours);
    const minutes = Math.abs(diffMinutes % 60);

    if (fullHours === 0)
        return isAhead ? `+${minutes} m` : `-${minutes} m`;

    return isAhead
        ? `+${fullHours} h ${minutes} m`
        : `-${fullHours} h ${minutes} m`;
}

/**
 * determine if a given hour is in worktime (9:00 - 18:00 by default)
 * @param hour - how many hours (0-23)
 * @param workStart - work start hour (default 9)
 * @param workEnd - work end hour (default 18)
 * @returns whether it is work time
 */
export function isWorkingHours(
    hour: number,
    workStart: number = 9,
    workEnd: number = 18
): boolean {
    return hour >= workStart && hour < workEnd;
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
    return hour >= sleepStart && hour < sleepEnd || hour >= 23;
}

/**
 * determine if a given hour is a reasonable time (9:00 - 22:00 by default)
 * @param hour - how many hours (0-23)
 * @param sleepStart - sleep start hour (default 0)
 * @param sleepEnd - sleep end hour (default 7)
 * @returns whether it is a reasonable time
 */
export function isReasonableHours(
    hour: number,
    sleepStart: number = 9,
    sleepEnd: number = 22
): boolean {
    return hour >= sleepStart && hour < sleepEnd;
}

/**
 * Get the type for every hours in a day cycle (24 hrs)
 * @param workStart - work start hour (default 9)
 * @param workEnd - work end hour (default 18)
 * @param sleepStart - sleep start hour (default 0)
 * @param sleepEnd - sleep end hour (default 7)
 * @returns an array of 24 elements indicating the type of each hour
 */
export function getHourTypes(
    workStart: number = 9,
    workEnd: number = 18,
    sleepStart: number = 0,
    sleepEnd: number = 7
): ('working' | 'sleeping' | 'free')[] {
    const types: ('working' | 'sleeping' | 'free')[] = [];

    for (let hour = 0; hour < 24; hour++) {
        if (isWorkingHours(hour, workStart, workEnd)) {
            types.push('working');
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
    const totalMinutes = (percentage / 100) * 24 * 60;
    const dayStart = startOfDay(toZonedTime(baseDate, timezone));

    return addMinutes(dayStart, totalMinutes);
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
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));

    return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
}


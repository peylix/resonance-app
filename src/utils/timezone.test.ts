import { describe, test, expect } from 'bun:test';
import {
    isActiveHours,
    isSleepHours,
    getHourTypes,
    getDayDifference,
    getTimeDifference,
    getUtcOffset,
    getHourInTimezone,
    getTimePercentage,
    getTimeFromPercentage,
    formatTime,
} from './timezone';

describe('isActiveHours / isSleepHours', () => {
    test('normal range includes start and excludes end', () => {
        expect(isActiveHours(9, 9, 18)).toBe(true);
        expect(isActiveHours(17, 9, 18)).toBe(true);
        expect(isActiveHours(18, 9, 18)).toBe(false);
        expect(isActiveHours(8, 9, 18)).toBe(false);
    });

    test('range wrapping past midnight', () => {
        expect(isSleepHours(23, 23, 7)).toBe(true);
        expect(isSleepHours(0, 23, 7)).toBe(true);
        expect(isSleepHours(6, 23, 7)).toBe(true);
        expect(isSleepHours(7, 23, 7)).toBe(false);
        expect(isSleepHours(12, 23, 7)).toBe(false);
    });
});

describe('getHourTypes', () => {
    test('classifies all 24 hours with defaults', () => {
        const types = getHourTypes();
        expect(types).toHaveLength(24);
        expect(types[0]).toBe('sleeping');
        expect(types[7]).toBe('free');
        expect(types[9]).toBe('active');
        expect(types[18]).toBe('free');
    });

    test('active hours take precedence over overlapping sleep hours', () => {
        const types = getHourTypes(6, 10, 0, 8);
        expect(types[6]).toBe('active');
        expect(types[5]).toBe('sleeping');
    });
});

describe('getDayDifference', () => {
    // 2026-03-09 06:30 UTC is 23:30 on Mar 8 in Los Angeles, the day US DST starts (a 23-hour day)
    const dstDay = new Date('2026-03-09T06:30:00Z');

    test('reports tomorrow and yesterday on a DST transition day', () => {
        expect(getDayDifference(dstDay, 'Asia/Tokyo', 'America/Los_Angeles')).toBe(1);
        expect(getDayDifference(dstDay, 'America/Los_Angeles', 'Asia/Tokyo')).toBe(-1);
    });

    test('same calendar day is 0', () => {
        expect(getDayDifference(dstDay, 'America/Los_Angeles', 'America/Los_Angeles')).toBe(0);
        expect(getDayDifference(new Date('2026-07-01T12:00:00Z'), 'Europe/London', 'Asia/Tokyo')).toBe(0);
    });
});

describe('getTimeDifference', () => {
    const summer = new Date('2026-07-01T12:00:00Z');

    test('whole-hour and fractional offsets', () => {
        expect(getTimeDifference('Asia/Tokyo', 'UTC', summer)).toBe(9 * 60);
        expect(getTimeDifference('Asia/Kolkata', 'UTC', summer)).toBe(5 * 60 + 30);
        expect(getTimeDifference('Asia/Kathmandu', 'Asia/Kolkata', summer)).toBe(15);
        expect(getTimeDifference('America/New_York', 'Europe/London', summer)).toBe(-5 * 60);
    });
});

describe('getUtcOffset', () => {
    test('follows DST', () => {
        expect(getUtcOffset('America/New_York', new Date('2026-07-01T12:00:00Z'))).toBe(-4 * 60);
        expect(getUtcOffset('America/New_York', new Date('2026-01-01T12:00:00Z'))).toBe(-5 * 60);
    });

    test('handles 45-minute offsets', () => {
        expect(getUtcOffset('Asia/Kathmandu', new Date('2026-07-01T12:00:00Z'))).toBe(5 * 60 + 45);
    });
});

describe('getHourInTimezone', () => {
    test('returns the local hour', () => {
        const date = new Date('2026-07-01T23:30:00Z');
        expect(getHourInTimezone(date, 'UTC')).toBe(23);
        expect(getHourInTimezone(date, 'Asia/Kolkata')).toBe(5);
        expect(getHourInTimezone(date, 'America/New_York')).toBe(19);
    });
});

describe('getTimePercentage / getTimeFromPercentage', () => {
    const base = new Date('2026-07-01T12:00:00Z');

    test('percentage of the local day', () => {
        // 12:00 UTC is 21:00 in Tokyo
        expect(getTimePercentage(base, 'Asia/Tokyo')).toBeCloseTo(87.5);
    });

    test('every 15-minute step converts to an exact minute', () => {
        for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
            const date = getTimeFromPercentage((minutes / (24 * 60)) * 100, base, 'Asia/Kathmandu');
            const expected = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
            expect(formatTime(date, 'Asia/Kathmandu')).toBe(expected);
            expect(date.getUTCSeconds()).toBe(0);
            expect(date.getUTCMilliseconds()).toBe(0);
        }
    });

    test('round-trips through the percentage', () => {
        const date = new Date('2026-07-01T08:45:00Z');
        const pct = getTimePercentage(date, 'Europe/Berlin');
        expect(getTimeFromPercentage(pct, date, 'Europe/Berlin').getTime()).toBe(date.getTime());
    });
});

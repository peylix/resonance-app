import { useTimezoneStore } from "../store/timezoneStore";
import { useMemo } from "react";
import type { Timezone } from "../types/timezone";
import { isActiveHours, isSleepHours, getHourInTimezone } from "../utils/timezone";
import { toZonedTime } from "date-fns-tz";
import { addHours, startOfDay } from "date-fns";
import { useTranslation } from "../hooks/useTranslation";

interface TimeSlot {
    hour: number; // Hour in reference timezone (0-23)
    status: 'all-active' | 'some-free' | 'some-sleeping';
    freeTimezones: string[]; // Translation keys for cities in free time
    sleepingTimezones: string[]; // Translation keys for cities in sleeping time
    activeCount: number; // Number of timezones in active hours
}

/**
 * Classify each hour of the reference day by how many timezones are active, free or sleeping.
 * @param dayStart - start of the day in the reference timezone (ms timestamp)
 */
function calculateResonanceSlots(
    timezones: Timezone[],
    dayStart: number,
    activeStart: number,
    activeEnd: number,
    sleepStart: number,
    sleepEnd: number
): TimeSlot[] {
    const slots: TimeSlot[] = [];

    // Iterate through 24 hours
    for (let hour = 0; hour < 24; hour++) {
        const freeTimezones: string[] = [];
        const sleepingTimezones: string[] = [];
        let activeCount = 0;

        // Calculate the absolute time for this hour in reference timezone
        const timeAtHour = addHours(dayStart, hour);

        // Check each timezone at this hour
        timezones.forEach(tz => {
            // Convert this absolute moment to the target timezone's hour
            const tzHour = getHourInTimezone(timeAtHour, tz.timezone);

            if (isActiveHours(tzHour, activeStart, activeEnd)) {
                activeCount++;
            } else if (isSleepHours(tzHour, sleepStart, sleepEnd)) {
                sleepingTimezones.push(tz.cityKey);
            } else {
                freeTimezones.push(tz.cityKey);
            }
        });

        // Determine status
        let status: TimeSlot['status'];
        if (activeCount === timezones.length) {
            status = 'all-active';
        } else if (sleepingTimezones.length > 0) {
            status = 'some-sleeping';
        } else {
            status = 'some-free';
        }

        slots.push({
            hour,
            status,
            freeTimezones,
            sleepingTimezones,
            activeCount
        });
    }

    return slots;
}

export function ResonanceSlot() {
    const timezones = useTimezoneStore((state) => state.timezones);
    const currentTime = useTimezoneStore((state) => state.timeState.currentTime);
    const referenceTimezone = useTimezoneStore((state) => state.referenceTimezone);
    const activeStart = useTimezoneStore((state) => state.activeStart);
    const activeEnd = useTimezoneStore((state) => state.activeEnd);
    const sleepStart = useTimezoneStore((state) => state.sleepStart);
    const sleepEnd = useTimezoneStore((state) => state.sleepEnd);
    const setCurrentTime = useTimezoneStore((state) => state.setCurrentTime);

    const { t } = useTranslation();

    // Get the start of the current day in the reference timezone.
    // Slots only change when the day (or settings) change, not every live tick.
    const dayStart = startOfDay(toZonedTime(currentTime, referenceTimezone)).getTime();
    const timeSlots = useMemo(
        () => calculateResonanceSlots(timezones, dayStart, activeStart, activeEnd, sleepStart, sleepEnd),
        [timezones, dayStart, activeStart, activeEnd, sleepStart, sleepEnd]
    );

    // If no timezones added, show placeholder
    if (timezones.length === 0) {
        return (
            <section>
                <header className="border-b border-neutral-900 pb-3">
                    <h2 className="eyebrow text-neutral-900!">{t('resonanceSlotsTitle')}</h2>
                </header>
                <p className="mt-4 text-sm text-neutral-500">
                    {t('resonanceSlotsDescription')}
                </p>
            </section>
        );
    }


    // Find continuous resonance slots (all active)
    const findResonanceRanges = () => {
        const ranges: { start: number; end: number }[] = [];
        let rangeStart: number | null = null;

        timeSlots.forEach((slot) => {
            if (slot.status === 'all-active') {
                if (rangeStart === null) {
                    rangeStart = slot.hour;
                }
            } else {
                if (rangeStart !== null) {
                    ranges.push({ start: rangeStart, end: slot.hour });
                    rangeStart = null;
                }
            }
        });

        // Handle case where last slot is active
        if (rangeStart !== null) {
            ranges.push({ start: rangeStart, end: 24 });
        }

        // Merge a range ending at midnight with one starting at midnight (e.g., 22-24 + 0-2 => 22-2)
        const first = ranges[0];
        const last = ranges[ranges.length - 1];
        if (ranges.length > 1 && first && last && first.start === 0 && last.end === 24) {
            ranges.pop();
            ranges[0] = { start: last.start, end: first.end };
        }

        return ranges;
    };

    const resonanceRanges = findResonanceRanges();

    // Get color for time slot
    const getSlotColor = (status: TimeSlot['status']) => {
        switch (status) {
            case 'all-active':
                return 'bg-active';
            case 'some-free':
                return 'bg-free';
            case 'some-sleeping':
                return 'bg-sleep';
            default:
                return '';
        }
    };

    const formatHour = (hour: number) => {
        return `${hour.toString().padStart(2, '0')}:00`;
    };

    // Ranges wrapping past midnight have end < start
    const getRangeDuration = (range: { start: number; end: number }) => {
        return range.end > range.start ? range.end - range.start : range.end + 24 - range.start;
    };

    // Handle clicking on a time slot to set the time
    const handleSlotClick = (hour: number) => {
        // Set the time to the clicked hour of the current reference day
        const newTime = addHours(dayStart, hour);

        setCurrentTime(newTime);
    };

    const legend: { status: TimeSlot['status']; label: string }[] = [
        { status: 'all-active', label: t('resonanceSlotsAllActive') },
        { status: 'some-free', label: t('resonanceSlotsSomeFree') },
        { status: 'some-sleeping', label: t('resonanceSlotsSomeSleeping') },
    ];

    return (
        <section>
            <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-neutral-900 pb-3">
                <h2 className="eyebrow text-neutral-900!">{t('resonanceSlotsTitle')}</h2>

                {/* Legend */}
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                    {legend.map(({ status, label }) => (
                        <li key={status} className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 ${getSlotColor(status)}`} aria-hidden="true" />
                            {label}
                        </li>
                    ))}
                </ul>
            </header>

            {/* Resonance Ranges Summary */}
            <div className="mt-6">
                <h3 className="eyebrow mb-3">{t('resonanceSlotsPerfectTime')}</h3>
                {resonanceRanges.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {resonanceRanges.map((range, index) => (
                            <div
                                key={index}
                                className="border border-neutral-200 border-l-2 border-l-active px-4 py-2.5"
                            >
                                <span className="text-lg font-medium tracking-tight tabular-nums">
                                    {formatHour(range.start)}–{formatHour(range.end)}
                                </span>
                                <span className="ml-3 text-xs text-neutral-500">
                                    {getRangeDuration(range) === 1
                                        ? t('resonanceSlotsHour')
                                        : t('resonanceSlotsHours', { n: getRangeDuration(range) })}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="border-l-2 border-free bg-neutral-50 px-4 py-2.5 text-sm text-neutral-600">
                        {t('resonanceSlotsNoPerfectTime')}
                    </p>
                )}
            </div>

            {/* 24-hour Timeline */}
            <div className="mt-8">
                <h3 className="eyebrow mb-3">{t('resonanceSlotsTimeline')}</h3>
                <div className="grid grid-cols-24 gap-px">
                    {timeSlots.map((slot) => {
                        const activeText = t('resonanceSlotsActiveCount', { active: slot.activeCount, total: timezones.length });
                        const freeText = slot.freeTimezones.length > 0
                            ? t('resonanceSlotsFreeList', { cities: slot.freeTimezones.map(key => t(key)).join(', ') })
                            : '';
                        const sleepingText = slot.sleepingTimezones.length > 0
                            ? t('resonanceSlotsSleepingList', { cities: slot.sleepingTimezones.map(key => t(key)).join(', ') })
                            : '';
                        const label = [formatHour(slot.hour), activeText, freeText, sleepingText, t('resonanceSlotsClickToSet')]
                            .filter(Boolean)
                            .join(', ');

                        return (
                            <button
                                key={slot.hour}
                                type="button"
                                onClick={() => handleSlotClick(slot.hour)}
                                aria-label={label}
                                className={`block w-full h-10 ${getSlotColor(slot.status)} relative group cursor-pointer hover:shadow-[inset_0_0_0_999px_rgb(255_255_255/0.3)] focus-visible:z-20`}
                            >
                                {/* Tooltip on hover or keyboard focus (the button's aria-label carries the same text) */}
                                <span aria-hidden="true" className="hidden group-hover:block group-focus-visible:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 w-48 bg-neutral-900 text-white text-xs text-left py-2 px-3">
                                    <span className="block font-medium tabular-nums mb-1">{formatHour(slot.hour)}</span>
                                    <span className="block text-neutral-300">{activeText}</span>
                                    {freeText && <span className="block text-neutral-300 mt-1">{freeText}</span>}
                                    {sleepingText && <span className="block text-neutral-300 mt-1">{sleepingText}</span>}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {/* Hour labels */}
                <div className="grid grid-cols-24 gap-px mt-1.5">
                    {[0, 6, 12, 18].map(hour => (
                        <div
                            key={hour}
                            className="text-[10px] tabular-nums text-neutral-400"
                            style={{ gridColumn: `${hour + 1} / span 1` }}
                        >
                            {hour.toString().padStart(2, '0')}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

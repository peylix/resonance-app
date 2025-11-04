import { useTimezoneStore } from "../store/timezoneStore";
import { isWorkingHours, isSleepHours } from "../utils/timezone";
import { toZonedTime } from "date-fns-tz";
import { addHours, startOfDay } from "date-fns";
import { FcIdea } from "react-icons/fc";

interface TimeSlot {
    hour: number; // Hour in reference timezone (0-23)
    status: 'all-working' | 'some-free' | 'some-sleeping' | 'no-overlap';
    freeTimezones: string[]; // Cities in free time
    sleepingTimezones: string[]; // Cities in sleeping time
    workingCount: number; // Number of timezones in working hours
}

export function ResonanceSlot() {
    const {
        timezones,
        timeState,
        referenceTimezone,
        workStart,
        workEnd,
        sleepStart,
        sleepEnd,
        setCurrentTime
    } = useTimezoneStore();

    // If no timezones added, show placeholder
    if (timezones.length === 0) {
        return (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <FcIdea /> Resonance Slots
                </h2>
                <p className="text-sm text-gray-600">
                    Add timezones to see when everyone can work together
                </p>
            </div>
        );
    }

    // Calculate time slots for the current day
    const calculateResonanceSlots = (): TimeSlot[] => {
        const slots: TimeSlot[] = [];
        const { currentTime } = timeState;

        // Get the base date in reference timezone at start of day
        // This serves as the anchor point for hour calculations
        const baseDate = startOfDay(toZonedTime(currentTime, referenceTimezone));

        // Iterate through 24 hours
        for (let hour = 0; hour < 24; hour++) {
            const freeTimezones: string[] = [];
            const sleepingTimezones: string[] = [];
            let workingCount = 0;

            // Calculate the absolute time for this hour in reference timezone
            const timeAtHour = addHours(baseDate, hour);

            // Check each timezone at this hour
            timezones.forEach(tz => {
                // Convert this absolute moment to the target timezone's hour
                const tzHour = new Date(
                    timeAtHour.toLocaleString('en-US', { timeZone: tz.timezone })
                ).getHours();

                if (isWorkingHours(tzHour, workStart, workEnd)) {
                    workingCount++;
                } else if (isSleepHours(tzHour, sleepStart, sleepEnd)) {
                    sleepingTimezones.push(tz.city);
                } else {
                    freeTimezones.push(tz.city);
                }
            });

            // Determine status
            let status: TimeSlot['status'];
            if (workingCount === timezones.length) {
                status = 'all-working';
            } else if (sleepingTimezones.length > 0) {
                status = 'some-sleeping';
            } else if (freeTimezones.length > 0) {
                status = 'some-free';
            } else {
                status = 'no-overlap';
            }

            slots.push({
                hour,
                status,
                freeTimezones,
                sleepingTimezones,
                workingCount
            });
        }

        return slots;
    };

    const timeSlots = calculateResonanceSlots();

    // Find continuous resonance slots (all working)
    const findResonanceRanges = () => {
        const ranges: { start: number; end: number }[] = [];
        let rangeStart: number | null = null;

        timeSlots.forEach((slot, index) => {
            if (slot.status === 'all-working') {
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

        // Handle case where last slot is working
        if (rangeStart !== null) {
            ranges.push({ start: rangeStart, end: 24 });
        }

        return ranges;
    };

    const resonanceRanges = findResonanceRanges();

    // Get color for time slot
    const getSlotColor = (status: TimeSlot['status']) => {
        switch (status) {
            case 'all-working':
                return 'bg-green-500';
            case 'some-free':
                return 'bg-yellow-400';
            case 'some-sleeping':
                return 'bg-red-400';
            default:
                return 'bg-gray-300';
        }
    };

    const formatHour = (hour: number) => {
        return `${hour.toString().padStart(2, '0')}:00`;
    };

    // Handle clicking on a time slot to set the time
    const handleSlotClick = (hour: number) => {
        const { currentTime } = timeState;

        // Get the base date in reference timezone at start of day
        const baseDate = startOfDay(toZonedTime(currentTime, referenceTimezone));

        // Set the time to the clicked hour
        const newTime = addHours(baseDate, hour);

        setCurrentTime(newTime);
    };

    return (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <FcIdea /> Resonance Slots
            </h2>

            {/* Resonance Ranges Summary */}
            {resonanceRanges.length > 0 ? (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-green-700 mb-2">
                        Perfect Collaboration Time
                    </h3>
                    <div className="space-y-2">
                        {resonanceRanges.map((range, index) => (
                            <div
                                key={index}
                                className="bg-green-100 border border-green-300 rounded-lg px-4 py-2"
                            >
                                <span className="font-mono font-bold text-green-900">
                                    {formatHour(range.start)} - {formatHour(range.end)}
                                </span>
                                <span className="text-sm text-green-700 ml-2">
                                    ({range.end - range.start} hours)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mb-6 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-3">
                    <p className="text-sm text-yellow-800">
                        No perfect overlap found. Check partial availability below.
                    </p>
                </div>
            )}

            {/* 24-hour Timeline */}
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">24-Hour Overview</h3>
                <div className="grid grid-cols-24 gap-0.5">
                    {timeSlots.map((slot) => (
                        <div
                            key={slot.hour}
                            onClick={() => handleSlotClick(slot.hour)}
                            className={`h-8 ${getSlotColor(slot.status)} relative group cursor-pointer transition-all hover:scale-110`}
                            title={`${formatHour(slot.hour)} - ${slot.workingCount}/${timezones.length} working - Click to set time`}
                        >
                            {/* Tooltip on hover */}
                            <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 w-48 bg-gray-900 text-white text-xs rounded py-2 px-3 shadow-lg">
                                <div className="font-bold mb-1">{formatHour(slot.hour)}</div>
                                <div className="text-green-300">
                                    {slot.workingCount}/{timezones.length} working
                                </div>
                                {slot.freeTimezones.length > 0 && (
                                    <div className="text-yellow-300 mt-1">
                                        Free: {slot.freeTimezones.join(', ')}
                                    </div>
                                )}
                                {slot.sleepingTimezones.length > 0 && (
                                    <div className="text-red-300 mt-1">
                                        Sleeping: {slot.sleepingTimezones.join(', ')}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Hour labels */}
                <div className="grid grid-cols-24 gap-0.5 mt-1">
                    {[0, 6, 12, 18].map(hour => (
                        <div
                            key={hour}
                            className="text-xs text-gray-600 text-center"
                            style={{ gridColumn: `${hour + 1} / span 1` }}
                        >
                            {hour}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-700">All Working</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-gray-700">Some Free</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                    <span className="text-gray-700">Some Sleeping</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span className="text-gray-700">No Working</span>
                </div>
            </div>
        </div>
    );
}

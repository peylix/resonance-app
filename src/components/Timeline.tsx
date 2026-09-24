import type { Timezone } from '../types/timezone';
import { useTimezoneStore } from '../store/timezoneStore';
import { useRef, useState, useEffect } from 'react';
import { getTimePercentage, getTimeFromPercentage, getHourTypes, formatTime } from '../utils/timezone';
import { useTranslation } from '../hooks/useTranslation';

const MINUTES_PER_DAY = 24 * 60;

interface TimelineProps {
    timezone: Timezone;
}

export function Timeline({ timezone }: TimelineProps) {
    const currentTime = useTimezoneStore((state) => state.timeState.currentTime);
    const setCurrentTime = useTimezoneStore((state) => state.setCurrentTime);
    const setLiveMode = useTimezoneStore((state) => state.setLiveMode);
    const activeStart = useTimezoneStore((state) => state.activeStart);
    const activeEnd = useTimezoneStore((state) => state.activeEnd);
    const sleepStart = useTimezoneStore((state) => state.sleepStart);
    const sleepEnd = useTimezoneStore((state) => state.sleepEnd);

    const { t } = useTranslation();

    const timelineRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercentage, setDragPercentage] = useState<number | null>(null);

    // get the percentage of the current time in the day for the given timezone
    // use dragPercentage when dragging to avoid precision loss from time conversion
    const calculatedPercentage = getTimePercentage(currentTime, timezone.timezone);
    const percentage = isDragging && dragPercentage !== null ? dragPercentage : calculatedPercentage;

    // handle dragging start event
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        setLiveMode(false);
        handleDrag(e);
    };

    // handle dragging event
    const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!timelineRef.current) return;

        const rect = timelineRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;

        const x = clientX - rect.left;
        const newPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        // update drag percentage for immediate visual feedback
        setDragPercentage(newPercentage);

        // read the latest time from the store, since document listeners hold an old closure
        const latestTime = useTimezoneStore.getState().timeState.currentTime;
        const newTime = getTimeFromPercentage(newPercentage, latestTime, timezone.timezone);
        setCurrentTime(newTime);
    };

    // handle dragging end event
    const handleDragEnd = () => {
        setIsDragging(false);
        setDragPercentage(null);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (e: MouseEvent | TouchEvent) => {
            handleDrag(e as any);
        };

        const handleEnd = () => {
            handleDragEnd();
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);


    // keyboard control: arrows move 15 minutes, Page Up/Down move 1 hour, Home/End jump to the day's edges
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const currentMinutes = Math.round((percentage / 100) * MINUTES_PER_DAY);
        const steps: Record<string, number> = {
            ArrowRight: 15,
            ArrowUp: 15,
            ArrowLeft: -15,
            ArrowDown: -15,
            PageUp: 60,
            PageDown: -60,
        };

        let targetMinutes: number;
        if (e.key in steps) {
            targetMinutes = currentMinutes + (steps[e.key] ?? 0);
        } else if (e.key === 'Home') {
            targetMinutes = 0;
        } else if (e.key === 'End') {
            targetMinutes = MINUTES_PER_DAY - 1;
        } else {
            return;
        }
        e.preventDefault();

        targetMinutes = Math.max(0, Math.min(MINUTES_PER_DAY - 1, targetMinutes));
        const latestTime = useTimezoneStore.getState().timeState.currentTime;
        setCurrentTime(getTimeFromPercentage((targetMinutes / MINUTES_PER_DAY) * 100, latestTime, timezone.timezone));
    };

    const hourTypes = getHourTypes(activeStart, activeEnd, sleepStart, sleepEnd);

    const getHourColor = (type: 'active' | 'sleeping' | 'free') => {
        switch (type) {
            case 'active':
                return 'bg-active/30';
            case 'sleeping':
                return 'bg-sleep/25';
            case 'free':
                return 'bg-free/35';
        }
    };

    return (
        <div className="w-full">
            {/* timeline container */}
            <div
                ref={timelineRef}
                role="slider"
                tabIndex={0}
                aria-label={t('timelineLabel', { city: t(timezone.cityKey) })}
                aria-valuemin={0}
                aria-valuemax={MINUTES_PER_DAY - 1}
                aria-valuenow={Math.round((percentage / 100) * MINUTES_PER_DAY)}
                aria-valuetext={formatTime(currentTime, timezone.timezone)}
                className="relative h-8 cursor-pointer touch-none select-none"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onKeyDown={handleKeyDown}
            >
                {/* hour segments */}
                <div className="absolute inset-0 flex">
                    {hourTypes.map((type, index) => (
                        <div
                            key={index}
                            className={`flex-1 ${getHourColor(type)}`}
                            title={`${index}:00 - ${type}`}
                        />
                    ))}
                </div>

                {/* indicator for current time */}
                <div
                    className={`absolute -top-1 -bottom-1 w-0.5 -translate-x-1/2 bg-neutral-900 ${isDragging ? '' : 'transition-[left] duration-150'}`}
                    style={{ left: `${percentage}%` }}
                    aria-hidden="true"
                >
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-2 h-1.5 bg-neutral-900" />
                </div>
            </div>

            {/* time label */}
            <div className="flex justify-between mt-2 text-[10px] tabular-nums text-neutral-400">
                <span>00</span>
                <span>06</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
            </div>
        </div>
    );
}

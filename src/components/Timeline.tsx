import type { Timezone } from '../types/timezone';
import { useTimezoneStore } from '../store/timezoneStore';
import { useRef, useState, useEffect } from 'react';
import { getTimePercentage, getTimeFromPercentage, getHourTypes } from '../utils/timezone';

interface TimelineProps {
    timezone: Timezone;
}

export function Timeline({ timezone }: TimelineProps) {
    const {
        timeState,
        setCurrentTime,
        setLiveMode,
        workStart,
        workEnd,
        sleepStart,
        sleepEnd
    } = useTimezoneStore();

    const timelineRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // get the percentage of the current time in the day for the given timezone
    const percentage = getTimePercentage(timeState.currentTime, timezone.timezone);

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

        const newTime = getTimeFromPercentage(newPercentage, timeState.currentTime, timezone.timezone);
        setCurrentTime(newTime);
    };

    // handle dragging end event
    const handleDragEnd = () => {
        setIsDragging(false);
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


    const hourTypes = getHourTypes(workStart, workEnd, sleepStart, sleepEnd);

    const getHourColor = (type: 'working' | 'sleeping' | 'free') => {
        switch (type) {
            case 'working':
                return 'bg-green-500/30';
            case 'sleeping':
                return 'bg-blue-500/30';
            case 'free':
                return 'bg-yellow-500/30';
            default:
                return '';

        }
    };

    return (
        <div className="w-full">
            {/* timeline container */}
            <div
                ref={timelineRef}
                className="relative h-12 bg-gray-800/50 rounded-lg cursor-pointer overflow-hidden"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                {/* hour segments */}
                <div className="absolute inset-0 flex">
                    {hourTypes.map((type, index) => (
                        <div
                            key={index}
                            className={`flex-1 ${getHourColor(type)} border-r border-gray-700/50`}
                            title={`${index}:00 - ${type}`}
                        />
                    ))}
                </div>

                {/* indicator for current time */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all"
                    style={{ left: `${percentage}%` }}
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                </div>
            </div>

            {/* time label */}
            <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>0:00</span>
                <span>6:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
            </div>
        </div>
    );
}

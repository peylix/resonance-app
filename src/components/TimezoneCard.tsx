import type { Timezone } from '../types/timezone';
import { useTimezoneStore } from '../store/timezoneStore';
import { formatTime, getDateLabel, getTimeDifference } from '../utils/timezone';
import { isWorkingHours, isSleepHours } from '../utils/timezone';


interface TimezoneCardProps {
    timezone: Timezone;
}

export function TimezoneCard({ timezone }: TimezoneCardProps) {
    const {
        timeState,
        referenceTimezone,
        removeTimezone,
        workStart,
        workEnd,
        sleepStart,
        sleepEnd
    } = useTimezoneStore();
    const { currentTime } = timeState;

    const time = formatTime(currentTime, timezone.timezone);
    const dateLabel = getDateLabel(currentTime, timezone.timezone, referenceTimezone);
    const timeDiff = getTimeDifference(timezone.timezone, referenceTimezone, currentTime);
    const hour = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone.timezone })).getHours();

    const getTimeColor = () => {
        if (isWorkingHours(hour, workStart, workEnd)) {
            return 'border-gray-900 bg-gray-50'; // 工作时间
        }
        if (isSleepHours(hour, sleepStart, sleepEnd)) {
            return 'border-gray-400 bg-gray-100'; // 睡眠时间
        }
        return 'border-gray-600 bg-white'; // 自由时间
    };

    const getTimeLabel = () => {
        if (isWorkingHours(hour, workStart, workEnd)) {
            return '💼 Working';
        }
        if (isSleepHours(hour, sleepStart, sleepEnd)) {
            return '😴 Sleeping';
        }
        return '🌟 Free';
    };

    return (
        <div className={`relative rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-xl ${getTimeColor()}`}>
            {/* 删除按钮 */}
            <button
                onClick={() => removeTimezone(timezone.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Remove timezone"
            >
                ✕
            </button>

            {/* 城市信息 */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    {timezone.emoji && <span className="text-2xl">{timezone.emoji}</span>}
                    <h3 className="text-xl font-bold text-gray-900">{timezone.city}</h3>
                </div>
                <p className="text-sm text-gray-600">{timezone.country}</p>
            </div>

            {/* 时间显示 */}
            <div className="mb-3">
                <div className="text-4xl font-mono font-bold mb-1 text-gray-900">{time}</div>
                <div className="flex items-center gap-2">
                    {dateLabel && (
                        <span className="text-sm text-gray-600 italic">{dateLabel}</span>
                    )}
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                        {getTimeLabel()}
                    </span>
                </div>
            </div>

            {/* 时间差显示 */}
            <div className="text-sm text-gray-600">
                {timeDiff}
            </div>
        </div>
    );
};

import type { Timezone } from '../types/timezone';
import { useTimezoneStore } from '../store/timezoneStore';
import { formatTime, getDateLabel, getTimeDifference } from '../utils/timezone';
import { isActiveHours, isSleepHours } from '../utils/timezone';
import { FaSun, FaMoon, FaStar } from "react-icons/fa6";
import { useTranslation } from '../hooks/useTranslation';


interface TimezoneCardProps {
    timezone: Timezone;
}

export function TimezoneCard({ timezone }: TimezoneCardProps) {
    const {
        timeState,
        referenceTimezone,
        removeTimezone,
        activeStart,
        activeEnd,
        sleepStart,
        sleepEnd
    } = useTimezoneStore();
    const { currentTime } = timeState;
    const { t } = useTranslation();

    const time = formatTime(currentTime, timezone.timezone);
    const dateLabel = getDateLabel(currentTime, timezone.timezone, referenceTimezone);
    const timeDiff = getTimeDifference(timezone.timezone, referenceTimezone, currentTime);
    const hour = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone.timezone })).getHours();

    const getTimeColor = () => {
        if (isActiveHours(hour, activeStart, activeEnd)) {
            return 'border-gray-900 bg-gray-50'; // active time
        }
        if (isSleepHours(hour, sleepStart, sleepEnd)) {
            return 'border-gray-400 bg-gray-100'; // sleep time
        }
        return 'border-gray-600 bg-white'; // free time
    };

    const getTimeLabel = () => {
        if (isActiveHours(hour, activeStart, activeEnd)) {
            return (
                <span className="flex items-center gap-1">
                    <FaSun /> {t('timezoneCardActive')}
                </span>
            );
        }
        if (isSleepHours(hour, sleepStart, sleepEnd)) {
            return (
                <span className="flex items-center gap-1">
                    <FaMoon /> {t('timezoneCardSleeping')}
                </span>
            );
        }
        return (
            <span className="flex items-center gap-1">
                <FaStar /> {t('timezoneCardFree')}
            </span>
        );
    };

    return (
        <div className={`relative rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-xl ${getTimeColor()}`}>
            {/* delete button */}
            <button
                onClick={() => removeTimezone(timezone.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Remove timezone"
            >
                ✕
            </button>

            {/* city info */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    {timezone.emoji && <span className="text-2xl">{timezone.emoji}</span>}
                    <h3 className="text-xl font-bold text-gray-900">{t(timezone.cityKey as any)}</h3>
                </div>
                <p className="text-sm text-gray-600">{t(timezone.regionKey as any)}</p>
            </div>

            {/* time display */}
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

            {/* time difference display */}
            <div className="text-sm text-gray-600">
                {timeDiff}
            </div>
        </div>
    );
};

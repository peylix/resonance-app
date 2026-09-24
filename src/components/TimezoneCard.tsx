import type { Timezone } from '../types/timezone';
import { useTimezoneStore } from '../store/timezoneStore';
import { formatTime, getDayDifference, getTimeDifference, getHourInTimezone } from '../utils/timezone';
import { isActiveHours, isSleepHours } from '../utils/timezone';
import { IoClose } from "react-icons/io5";
import { useTranslation } from '../hooks/useTranslation';


interface TimezoneCardProps {
    timezone: Timezone;
}

export function TimezoneCard({ timezone }: TimezoneCardProps) {
    const currentTime = useTimezoneStore((state) => state.timeState.currentTime);
    const referenceTimezone = useTimezoneStore((state) => state.referenceTimezone);
    const removeTimezone = useTimezoneStore((state) => state.removeTimezone);
    const activeStart = useTimezoneStore((state) => state.activeStart);
    const activeEnd = useTimezoneStore((state) => state.activeEnd);
    const sleepStart = useTimezoneStore((state) => state.sleepStart);
    const sleepEnd = useTimezoneStore((state) => state.sleepEnd);
    const { t } = useTranslation();

    const time = formatTime(currentTime, timezone.timezone);
    const dayDiff = getDayDifference(currentTime, timezone.timezone, referenceTimezone);
    const diffMinutes = getTimeDifference(timezone.timezone, referenceTimezone, currentTime);
    const hour = getHourInTimezone(currentTime, timezone.timezone);

    const getDateLabel = () => {
        if (dayDiff === 0) return '';
        if (dayDiff === 1) return t('dateTomorrow');
        if (dayDiff === -1) return t('dateYesterday');
        return dayDiff > 1
            ? t('dateInDays', { n: dayDiff })
            : t('dateDaysAgo', { n: -dayDiff });
    };

    const getTimeDiffLabel = () => {
        if (diffMinutes === 0) return t('diffSameTime');

        const sign = diffMinutes > 0 ? '+' : '-';
        const hours = Math.floor(Math.abs(diffMinutes) / 60);
        const minutes = Math.abs(diffMinutes) % 60;

        const parts: string[] = [];
        if (hours > 0) parts.push(t('diffHours', { n: hours }));
        if (minutes > 0) parts.push(t('diffMinutes', { n: minutes }));

        return `${sign}${parts.join(' ')}`;
    };

    const dateLabel = getDateLabel();

    // Current status of this city: color swatch and label
    const status = isActiveHours(hour, activeStart, activeEnd)
        ? { color: 'bg-active', label: t('timezoneCardActive') }
        : isSleepHours(hour, sleepStart, sleepEnd)
            ? { color: 'bg-sleep', label: t('timezoneCardSleeping') }
            : { color: 'bg-free', label: t('timezoneCardFree') };

    return (
        <div className="relative">
            {/* status bar */}
            <div className={`h-0.5 ${status.color}`} aria-hidden="true" />

            <div className="p-5">
                {/* city info and delete button */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight truncate">{t(timezone.cityKey)}</h3>
                        <p className="text-xs text-neutral-500 truncate">{t(timezone.regionKey)}</p>
                    </div>
                    <button
                        onClick={() => removeTimezone(timezone.id)}
                        className="-mr-2 -mt-1.5 w-8 h-8 shrink-0 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                        aria-label={t('ariaRemoveCity', { city: t(timezone.cityKey) })}
                    >
                        <IoClose size={16} />
                    </button>
                </div>

                {/* time display */}
                <div className="mt-6 text-5xl font-light tracking-tight tabular-nums leading-none">{time}</div>

                {/* status, date and time difference */}
                <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-1.5 font-medium uppercase tracking-[0.14em] text-neutral-700">
                        <span className={`w-2 h-2 ${status.color}`} aria-hidden="true" />
                        {status.label}
                    </span>
                    <span className="text-neutral-500 tabular-nums text-right">
                        {dateLabel && <span className="italic">{dateLabel} · </span>}
                        {getTimeDiffLabel()}
                    </span>
                </div>
            </div>
        </div>
    );
}

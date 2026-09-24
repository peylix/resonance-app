import { useTimezoneStore } from '../store/timezoneStore';
import { TimezoneCardWithTimeline } from './TimezoneCardWithTimeline';
import { useTranslation } from '../hooks/useTranslation';

export function TimezoneList() {
    const timezones = useTimezoneStore((state) => state.timezones);
    const { t } = useTranslation();

    if (timezones.length === 0) {
        return (
            <div className="border border-dashed border-neutral-300 px-6 py-16 text-center">
                <p className="text-sm font-medium text-neutral-700">
                    {t('timezoneListPlaceholder')}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                    {t('timezoneListHint')}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {timezones.map((timezone) => (
                <TimezoneCardWithTimeline key={timezone.id} timezone={timezone} />
            ))}
        </div>
    )
}

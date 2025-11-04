import type { Timezone } from '../types/timezone';
import { TimezoneCard } from './TimezoneCard';
import { Timeline } from './Timeline';

interface TimezoneCardWithTimelineProps {
    timezone: Timezone;
}

export function TimezoneCardWithTimeline({ timezone }: TimezoneCardWithTimelineProps) {
    return (
        <div className="space-y-4">
            <TimezoneCard timezone={timezone} />
            <Timeline timezone={timezone} />
        </div>
    )
}

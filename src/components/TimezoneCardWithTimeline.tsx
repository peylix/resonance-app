import type { Timezone } from '../types/timezone';
import { TimezoneCard } from './TimezoneCard';
import { Timeline } from './Timeline';

interface TimezoneCardWithTimelineProps {
    timezone: Timezone;
}

export function TimezoneCardWithTimeline({ timezone }: TimezoneCardWithTimelineProps) {
    return (
        <article className="border border-neutral-200 bg-white hover:border-neutral-400 transition-colors">
            <TimezoneCard timezone={timezone} />
            <div className="px-5 pb-5">
                <Timeline timezone={timezone} />
            </div>
        </article>
    )
}

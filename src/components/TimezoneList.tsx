import { useTimezoneStore } from '../store/timezoneStore';
import { TimezoneCardWithTimeline } from './TimezoneCardWithTimeline';

export function TimezoneList() {
    const {timezones} = useTimezoneStore();

    if (timezones.length === 0) {
        return (
        <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">🌍</div>
            <p className="text-xl">No cities added yet.</p>
            <p className="text-sm mt-2"> Use the search above to add cities to your list.</p>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timezones.map((timezone) => (
                <TimezoneCardWithTimeline key={timezone.id} timezone={timezone} />
            ))}
        </div>
    )
}

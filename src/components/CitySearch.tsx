import { useState } from 'react';
import { useTimezoneStore } from '../store/timezoneStore'
import { searchCities } from '../utils/cityData';
import type { CityData } from '../types/timezone';
import { getUtcOffset } from '../utils/timezone';
import { useTranslation } from '../hooks/useTranslation';
import { IoSearch, IoClose } from 'react-icons/io5';

export function CitySearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const addTimezone = useTimezoneStore((state) => state.addTimezone);
    const timezones = useTimezoneStore((state) => state.timezones);
    const { t } = useTranslation();

    const searchResults = query.trim() ? searchCities(query) : [];

    const handleSelectCity = (city: CityData) => {
        const alreadyAdded = timezones.some(tz => tz.cityKey === city.nameKey);
        if (alreadyAdded) return;

        const newTimezone = {
            id: `${city.timezone}-${Date.now()}`,
            cityKey: city.nameKey,
            regionKey: city.regionKey,
            timezone: city.timezone,
            offset: getUtcOffset(city.timezone),
        };

        addTimezone(newTimezone);
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* search box (above the click-outside overlay so it stays clickable) */}
            <div className="relative z-10">
                <IoSearch
                    aria-hidden="true"
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') setIsOpen(false);
                    }}
                    aria-label={t('searchLabel')}
                    placeholder={t('searchPlaceholder')}
                    className="w-full h-10 pl-9 pr-10 border border-neutral-300 bg-white text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        aria-label={t('ariaClearSearch')}
                        className="absolute right-0 top-0 w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-neutral-900"
                    >
                        <IoClose size={16} />
                    </button>
                )}
            </div>

            {/* list of search results */}
            {isOpen && query.trim() && (
                <div className="absolute z-10 w-full -mt-px bg-white border border-neutral-900 max-h-72 overflow-y-auto">
                    {searchResults.length > 0 ? (
                        searchResults.map((city) => {
                            const alreadyAdded = timezones.some(tz =>
                                tz.cityKey === city.nameKey);
                            return (
                                <button
                                    key={city.nameKey}
                                    onClick={() => handleSelectCity(city)}
                                    disabled={alreadyAdded}
                                    className="w-full px-3 py-2.5 flex items-center justify-between gap-3 text-left border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                >
                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium truncate">{t(city.nameKey)}</span>
                                        <span className="block text-xs text-neutral-500 truncate">{t(city.regionKey)}</span>
                                    </span>
                                    {alreadyAdded && <span className="eyebrow shrink-0">{t('searchAdded')}</span>}
                                </button>
                            );
                        })
                    ) : (
                        <div className="px-3 py-3 text-sm text-neutral-500">
                            {t('searchNoResults')}
                        </div>
                    )}
                </div>
            )}

            {/* click other places to close the list */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

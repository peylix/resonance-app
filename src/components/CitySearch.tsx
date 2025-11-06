import { useState } from 'react';
import { useTimezoneStore } from '../store/timezoneStore'
import { searchCities } from '../utils/cityData';
import type { CityData } from '../types/timezone';
import { getUtcOffset } from '../utils/timezone';
import { useTranslation } from '../hooks/useTranslation';

export function CitySearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { addTimezone, timezones } = useTimezoneStore();
    const { t } = useTranslation();

    const searchResults = query.trim() ? searchCities(query) : [];

    const handleSelectCity = (city: CityData) => {
        const alreadyAdded = timezones.some(tz => tz.timezone === city.timezone);
        if (alreadyAdded) return;

        const newTimezone = {
            id: `${city.timezone}-${Date.now()}`,
            cityKey: city.nameKey,
            regionKey: city.regionKey,
            timezone: city.timezone,
            offset: getUtcOffset(city.timezone),
            emoji: city.emoji
        };

        addTimezone(newTimezone);
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-md">
            {/* search box */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* list of search results */}
            {isOpen && query.trim() && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {searchResults.length > 0 ? (
                        searchResults.map((city) => {
                            const alreadyAdded = timezones.some(tz =>
                                tz.timezone === city.timezone);
                            return (
                                <button
                                    key={city.timezone}
                                    onClick={() => handleSelectCity(city)}
                                    disabled={alreadyAdded}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-300/50 transition-colors border-b border-gray-700/50
                                                last:border-b-0 ${alreadyAdded ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                >
                                <div className="flex items-center gap-2">
                                          {city.emoji && <span className="text-xl">{city.emoji}</span>}
                                          <div>
                                              <div className="font-semibold">
                                                  {t(city.nameKey as any)}
                                                  {alreadyAdded && <span className="ml-2 text-xs text-gray-400">(Added)</span>}
                                              </div>
                                              <div className="text-sm text-gray-400">{t(city.regionKey as any)}</div>
                                          </div>
                                      </div>
                                  </button>
                              );
                          })
                      ) : (
                          <div className="px-4 py-3 text-gray-400 text-center">
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

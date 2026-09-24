import { useTimezoneStore, createTimezoneFromCity } from './store/timezoneStore';
import { useEffect } from 'react';
import './index.css';
import { ControlPanel } from './components/ControlPanel';
import { CitySearch } from './components/CitySearch';
import { TimezoneList } from './components/TimezoneList';
import { ResonanceSlot } from './components/ResonanceSlot';
import { FaGithub } from 'react-icons/fa6';
import { useTranslation } from './hooks/useTranslation';
import { getUserTimezone } from './utils/timezone';
import { getCityByTimezone } from './utils/cityData';

export function App() {
  const tick = useTimezoneStore((state) => state.tick);
  const addTimezone = useTimezoneStore((state) => state.addTimezone);
  const timezoneCount = useTimezoneStore((state) => state.timezones.length);
  const hasAutoAddedTimezone = useTimezoneStore((state) => state.hasAutoAddedTimezone);
  const markTimezoneAutoAdded = useTimezoneStore((state) => state.markTimezoneAutoAdded);
  const { t } = useTranslation();

  // Auto-detect and add user's timezone on first visit
  useEffect(() => {
    if (hasAutoAddedTimezone) return;

    if (timezoneCount === 0) {
      const userTimezone = getUserTimezone();
      const city = getCityByTimezone(userTimezone);

      if (city) {
        const timezone = createTimezoneFromCity(userTimezone);
        if (timezone) {
          addTimezone(timezone);
        }
      }
    }
    markTimezoneAutoAdded();
  }, [addTimezone, markTimezoneAutoAdded, hasAutoAddedTimezone, timezoneCount]);

  // Single clock for the app: updates the real time, and the displayed time when live
  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* sidebar */}
      <aside className="border-b border-neutral-200 lg:border-b-0 lg:border-r lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-80 lg:overflow-y-auto">
        <div className="px-6 py-8 lg:px-8 lg:py-10 space-y-8">
          {/* header */}
          <header>
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('appTitle')}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              {t('appSubtitle')}
            </p>
          </header>

          {/* control panel */}
          <ControlPanel />

          {/* search cities */}
          <CitySearch />
        </div>
      </aside>

      {/* right side */}
      <main className="lg:ml-80 flex-1 flex flex-col px-6 py-8 lg:px-10 lg:py-10">
        <div className="flex-1 space-y-12">
          {/* Resonance Slots */}
          <ResonanceSlot />

          {/* Timezone Cards */}
          <TimezoneList />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-5 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <p>{t('madeBy')}</p>
          <a
            href="https://github.com/peylix/resonance-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label={t('ariaViewOnGithub')}
          >
            <FaGithub className="w-4 h-4" />
          </a>
        </footer>
      </main>
    </div>
  );
}

import { useTimezoneStore } from './store/timezoneStore';
import { useEffect } from 'react';
import './index.css';
import { ControlPanel } from './components/ControlPanel';
import { CitySearch } from './components/CitySearch';
import { TimezoneList } from './components/TimezoneList';
import { ResonanceSlot } from './components/ResonanceSlot';
import { FaGithub } from 'react-icons/fa6';
import { useTranslation } from './hooks/useTranslation';

export function App() {
  const { updateTime, timeState } = useTimezoneStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!timeState.isLive) return;

    const interval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [timeState.isLive, updateTime]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* sidebar */}
      <div className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-96 lg:border-r lg:border-gray-200 lg:bg-gray-50 lg:overflow-y-auto">
        <div className="p-6 lg:p-8">
          {/* header */}
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              {t('appTitle')}
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              {t('appSubtitle')}
            </p>
          </header>

          {/* control panel */}
          <div className="mb-6">
            <ControlPanel />
          </div>

          {/* search cities */}
          <div className="mb-8">
            <CitySearch />
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="lg:ml-96 p-6 lg:p-8 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Resonance Slots */}
          <div className="mb-8">
            <ResonanceSlot />
          </div>

          {/* Timezone Cards */}
          <TimezoneList />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/peylix/resonance-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="View on GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <p className="text-sm text-gray-600">{t('madeBy')}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

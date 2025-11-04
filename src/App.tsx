import { useTimezoneStore } from './store/timezoneStore';
import { useEffect } from 'react';
import './index.css';
import { ControlPanel } from './components/ControlPanel';
import { CitySearch } from './components/CitySearch';
import { TimezoneList } from './components/TimezoneList';
import { ResonanceSlot } from './components/ResonanceSlot';

export function App() {
  const { updateTime, timeState } = useTimezoneStore();

  useEffect(() => {
    if (!timeState.isLive) return;

    const interval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [timeState.isLive, updateTime]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* sidebar */}
      <div className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-96 lg:border-r lg:border-gray-200 lg:bg-gray-50 lg:overflow-y-auto">
        <div className="p-6 lg:p-8">
          {/* header */}
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              Resonance
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Coordinate time across timezones effortlessly
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
      <div className="lg:ml-96 p-6 lg:p-8">
        {/* Resonance Slots */}
        <div className="mb-8">
          <ResonanceSlot />
        </div>

        {/* Timezone Cards */}
        <TimezoneList />
      </div>
    </div>
  );
}

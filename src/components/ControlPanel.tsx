import { useTimezoneStore } from "../store/timezoneStore";
import { useState } from "react";
import { createPortal } from "react-dom";

export function ControlPanel() {
    const {
        timeState,
        setLiveMode,
        workStart,
        workEnd,
        sleepStart,
        sleepEnd,
        setWorkingHours,
        setSleepHours

    } = useTimezoneStore();

    const [showSettings, setShowSettings] = useState(false);
    const [tempWorkStart, setTempWorkStart] = useState(workStart);
    const [tempWorkEnd, setTempWorkEnd] = useState(workEnd);
    const [tempSleepStart, setTempSleepStart] = useState(sleepStart);
    const [tempSleepEnd, setTempSleepEnd] = useState(sleepEnd);

    const handleSaveSettings = () => {
        setWorkingHours(tempWorkStart, tempWorkEnd);
        setSleepHours(tempSleepStart, tempSleepEnd);
        setShowSettings(false);
    };

    const handleCancelSettings = () => {
        setTempWorkStart(workStart);
        setTempWorkEnd(workEnd);
        setTempSleepStart(sleepStart);
        setTempSleepEnd(sleepEnd);
        setShowSettings(false);
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            {/* Live mode switch button */}
            <button
                onClick={() => setLiveMode(!timeState.isLive)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${timeState.isLive
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                        : 'bg-gray-600 text-gray-100 hover:bg-gray-700'
                    }`}
            >
                {timeState.isLive ? '🔴 Live' : '⏸ Paused'}
            </button>

            {/* Settings button */}
            <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 rounded-lg font-semibold bg-blue-200
  text-gray-700 hover:bg-blue-300 transition-all"
            >
                ⚙ Settings
            </button>

            {/* Current time display */}
            <div className="text-sm text-gray-400">
                {timeState.isLive ? 'Current Time' : 'Selected Time'}: {' '}
                <span className="font-mono text-gray-600">
                    {/* use 24-hour format */}
                    {timeState.currentTime.toLocaleTimeString('en-GB', { hour12: false })}
                </span>
            </div>

            {/* Settings Modal */}
            {showSettings && createPortal(
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
                    onClick={handleCancelSettings}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full border border-gray-300 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Time Preferences</h2>

                        {/* Work time setting */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-green-600">💼 Working Hours</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">Start</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempWorkStart}
                                        onChange={(e) => setTempWorkStart(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">End</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempWorkEnd}
                                        onChange={(e) => setTempWorkEnd(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {tempWorkStart}:00 - {tempWorkEnd}:00
                            </p>
                        </div>

                        {/* Sleep time setting */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600">😴 Sleep Hours</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">Start</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempSleepStart}
                                        onChange={(e) => setTempSleepStart(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">End</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempSleepEnd}
                                        onChange={(e) => setTempSleepEnd(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {tempSleepStart}:00 - {tempSleepEnd}:00
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveSettings}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelSettings}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

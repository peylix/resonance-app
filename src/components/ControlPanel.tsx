import { useTimezoneStore } from "../store/timezoneStore";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaPlay, FaPause, FaSun, FaMoon } from "react-icons/fa6";
import { IoSettingsSharp, IoLanguage } from "react-icons/io5";
import { useTranslation } from "../hooks/useTranslation";
import { languages } from '../i18n/translations';

export function ControlPanel() {
    const {
        timeState,
        setLiveMode,
        activeStart,
        activeEnd,
        sleepStart,
        sleepEnd,
        setActiveHours,
        setSleepHours,
        setLanguage

    } = useTimezoneStore();

    const { t, language } = useTranslation();

    const [showSettings, setShowSettings] = useState(false);
    const [tempActiveStart, setTempActiveStart] = useState(activeStart);
    const [tempActiveEnd, setTempActiveEnd] = useState(activeEnd);
    const [tempSleepStart, setTempSleepStart] = useState(sleepStart);
    const [tempSleepEnd, setTempSleepEnd] = useState(sleepEnd);
    const [validationError, setValidationError] = useState<string>('');
    const [currentRealTime, setCurrentRealTime] = useState(new Date());

    // Update real-time clock independently of live mode
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRealTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSaveSettings = () => {
        // Clear previous errors
        setValidationError('');

        const values = [tempActiveStart, tempActiveEnd, tempSleepStart, tempSleepEnd];

        // Validate that values are valid numbers
        if (values.some(isNaN)) {
            setValidationError(t('errorAllFieldsRequired'));
            return;
        }

        // Validate that values are in valid range (0-23)
        if (values.some(v => v < 0 || v > 23)) {
            setValidationError(t('errorInvalidRange'));
            return;
        }

        // Validate that active/sleep start/end times are not the same
        if (tempActiveStart === tempActiveEnd || tempSleepStart === tempSleepEnd) {
            setValidationError(t('errorSameTime'));
            return;
        }

        // If all validations passed
        setActiveHours(tempActiveStart, tempActiveEnd);
        setSleepHours(tempSleepStart, tempSleepEnd);
        setShowSettings(false);
    };

    const handleCancelSettings = () => {
        setTempActiveStart(activeStart);
        setTempActiveEnd(activeEnd);
        setTempSleepStart(sleepStart);
        setTempSleepEnd(sleepEnd);
        setValidationError('');
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
                {timeState.isLive ? <FaPlay size={20}/> : <FaPause size={20}/>}
            </button>

            {/* Settings button */}
            <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 rounded-lg font-semibold bg-blue-200
  text-gray-700 hover:bg-blue-300 transition-all"
            >
                <IoSettingsSharp size={20} />
            </button>

            {/* Current time display */}
            <div className="text-sm text-gray-400">
                {t('currentTime')}: {' '}
                <span className="font-mono text-gray-600">
                    {/* use 24-hour format */}
                    {currentRealTime.toLocaleTimeString('en-GB', { hour12: false })}
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
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('settings')}</h2>

                        {/* Active time setting */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-green-600 flex items-center gap-2">
                                <FaSun /> {t('activeHours')}
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">{t('start')}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempActiveStart}
                                        onChange={(e) => setTempActiveStart(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">{t('end')}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempActiveEnd}
                                        onChange={(e) => setTempActiveEnd(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {tempActiveStart}:00 - {tempActiveEnd}:00
                            </p>
                        </div>

                        {/* Sleep time setting */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600 flex items-center gap-2">
                                <FaMoon /> {t('sleepHours')}
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">{t('start')}</label>
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
                                    <label className="block text-sm text-gray-600 mb-1">{t('end')}</label>
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

                        {/* Divider */}
                        <div className="my-6 border-t border-gray-200"></div>

                        {/* Language selector */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-600 flex items-center gap-2">
                                <IoLanguage /> {t('language')}
                            </h3>
                            <select
                                id="language-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as any)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded
                                           text-gray-700 hover:border-gray-400 focus:outline-none
                                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                           cursor-pointer transition-all"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.nativeName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Validation error message */}
                        {validationError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{validationError}</p>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveSettings}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                                {t('save')}
                            </button>
                            <button
                                onClick={handleCancelSettings}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

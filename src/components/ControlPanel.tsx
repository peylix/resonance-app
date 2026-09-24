import { useTimezoneStore } from "../store/timezoneStore";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoSettingsOutline, IoChevronDown } from "react-icons/io5";
import { useTranslation } from "../hooks/useTranslation";
import { languages } from '../i18n/translations';

export function ControlPanel() {
    const isLive = useTimezoneStore((state) => state.timeState.isLive);
    const setLiveMode = useTimezoneStore((state) => state.setLiveMode);
    const activeStart = useTimezoneStore((state) => state.activeStart);
    const activeEnd = useTimezoneStore((state) => state.activeEnd);
    const sleepStart = useTimezoneStore((state) => state.sleepStart);
    const sleepEnd = useTimezoneStore((state) => state.sleepEnd);
    const setActiveHours = useTimezoneStore((state) => state.setActiveHours);
    const setSleepHours = useTimezoneStore((state) => state.setSleepHours);
    const setLanguage = useTimezoneStore((state) => state.setLanguage);
    const currentRealTime = useTimezoneStore((state) => state.now);

    const { t, language } = useTranslation();

    const [showSettings, setShowSettings] = useState(false);
    const [tempActiveStart, setTempActiveStart] = useState(activeStart);
    const [tempActiveEnd, setTempActiveEnd] = useState(activeEnd);
    const [tempSleepStart, setTempSleepStart] = useState(sleepStart);
    const [tempSleepEnd, setTempSleepEnd] = useState(sleepEnd);
    const [validationError, setValidationError] = useState<string>('');

    const settingsButtonRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const wasSettingsOpen = useRef(false);

    // Move focus into the dialog when it opens, and back to the settings button when it closes
    useEffect(() => {
        if (showSettings) {
            dialogRef.current?.querySelector<HTMLElement>('input, select, button')?.focus();
        } else if (wasSettingsOpen.current) {
            settingsButtonRef.current?.focus();
        }
        wasSettingsOpen.current = showSettings;
    }, [showSettings]);

    // Close on Escape and keep Tab focus inside the dialog
    const handleDialogKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            handleCancelSettings();
            return;
        }
        if (e.key !== 'Tab' || !dialogRef.current) return;

        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

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

    const inputClass = "w-full h-9 px-3 border border-neutral-300 bg-white text-sm tabular-nums focus:outline-none focus:border-neutral-900 transition-colors";
    const iconButtonClass = "w-10 h-10 flex items-center justify-center border transition-colors";

    return (
        <div className="flex items-center gap-2">
            {/* Live mode switch button */}
            <button
                onClick={() => setLiveMode(!isLive)}
                aria-label={isLive ? t('ariaPauseLive') : t('ariaResumeLive')}
                title={isLive ? t('ariaPauseLive') : t('ariaResumeLive')}
                className={`${iconButtonClass} ${isLive
                    ? 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
                    : 'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700'
                    }`}
            >
                {isLive ? <FaPause size={13} /> : <FaPlay size={13} />}
            </button>

            {/* Settings button */}
            <button
                ref={settingsButtonRef}
                onClick={() => setShowSettings(!showSettings)}
                aria-label={t('settings')}
                title={t('settings')}
                aria-haspopup="dialog"
                className={`${iconButtonClass} border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900`}
            >
                <IoSettingsOutline size={17} />
            </button>

            {/* Current time display */}
            <div className="ml-3 leading-tight">
                <div className="eyebrow">{t('currentTime')}</div>
                <div className="text-sm font-medium tabular-nums">
                    {/* use 24-hour format */}
                    {currentRealTime.toLocaleTimeString('en-GB', { hour12: false })}
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && createPortal(
                <div
                    className="fixed inset-0 bg-neutral-900/40 flex items-center justify-center z-[9999] p-4"
                    onClick={handleCancelSettings}
                >
                    <div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="settings-title"
                        onKeyDown={handleDialogKeyDown}
                        className="bg-white w-full max-w-sm border border-neutral-900 p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="settings-title" className="text-lg font-semibold tracking-tight mb-6">{t('settings')}</h2>

                        {/* Active time setting */}
                        <div className="mb-6" role="group" aria-labelledby="settings-active-title">
                            <h3 id="settings-active-title" className="eyebrow mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-active" aria-hidden="true" /> {t('activeHours')}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1" htmlFor="settings-active-start">{t('start')}</label>
                                    <input
                                        id="settings-active-start"
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempActiveStart}
                                        onChange={(e) => setTempActiveStart(parseInt(e.target.value))}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1" htmlFor="settings-active-end">{t('end')}</label>
                                    <input
                                        id="settings-active-end"
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempActiveEnd}
                                        onChange={(e) => setTempActiveEnd(parseInt(e.target.value))}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sleep time setting */}
                        <div className="mb-6" role="group" aria-labelledby="settings-sleep-title">
                            <h3 id="settings-sleep-title" className="eyebrow mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-sleep" aria-hidden="true" /> {t('sleepHours')}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1" htmlFor="settings-sleep-start">{t('start')}</label>
                                    <input
                                        id="settings-sleep-start"
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempSleepStart}
                                        onChange={(e) => setTempSleepStart(parseInt(e.target.value))}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1" htmlFor="settings-sleep-end">{t('end')}</label>
                                    <input
                                        id="settings-sleep-end"
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={tempSleepEnd}
                                        onChange={(e) => setTempSleepEnd(parseInt(e.target.value))}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Language selector */}
                        <div className="pt-6 mb-6 border-t border-neutral-200">
                            <h3 id="settings-language-title" className="eyebrow mb-3">
                                {t('language')}
                            </h3>
                            <div className="relative">
                                <select
                                    id="language-select"
                                    aria-labelledby="settings-language-title"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as any)}
                                    className="w-full h-9 pl-3 pr-9 appearance-none border border-neutral-300 bg-white text-sm cursor-pointer focus:outline-none focus:border-neutral-900 transition-colors"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.nativeName}
                                        </option>
                                    ))}
                                </select>
                                <IoChevronDown
                                    aria-hidden="true"
                                    size={14}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                                />
                            </div>
                        </div>

                        {/* Validation error message */}
                        {validationError && (
                            <div role="alert" className="mb-4 border-l-2 border-sleep bg-neutral-50 px-3 py-2">
                                <p className="text-sm text-neutral-700">{validationError}</p>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancelSettings}
                                className="flex-1 h-10 border border-neutral-300 text-sm font-medium hover:border-neutral-900 transition-colors"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handleSaveSettings}
                                className="flex-1 h-10 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
                            >
                                {t('save')}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

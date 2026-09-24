import { useTimezoneStore } from '../store/timezoneStore';
import { translations } from '../i18n/translations';
import type { TranslationKey } from '../i18n/translations';

export function useTranslation() {
    const language = useTimezoneStore((state) => state.language);

    // Replace `{name}` placeholders in the translated string with the given params
    const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
        const text = translations[language][key] || key;
        if (!params) return text;
        return text.replace(/\{(\w+)\}/g, (match, name) =>
            name in params ? String(params[name]) : match
        );
    };

    return { t, language };
}

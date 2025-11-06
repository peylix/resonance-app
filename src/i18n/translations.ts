export type Language = 'en' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '汉语' },
];

export const translations: Record<Language, Record<string, string>> = {
    en: {
        // header
        appTitle: "Resonance",
        appSubtitle: "Coordinate time across the seven seas and resonate with your friends",

        // control panel
        currentTime: "Current Time",
        selectedTime: "Selected Time",
        language: "Language",

        // Settings Modal
        settings: "Settings",
        activeHours: "Active Hours",
        sleepHours: "Sleep Hours",
        start: "Start",
        end: "End",
        save: "Save",
        cancel: "Cancel",

        // Validation errors
        errorAllFieldsRequired: "All time values must be filled",
        errorInvalidRange: "All time values must be between 0 and 23",
        errorSameTime: "Start and end times cannot be the same",

        // City Search
        searchPlaceholder: "Search cities or regions...",
        searchNoResults: "No cities or regions found",

        // Resonance Slots
        resonanceSlotsTitle: "Resonance Slots",
        resonanceSlotsDescription: "Add timezones to see when everyone is available.",
        resonanceSlotsPerfectTime: "Perfect Collaboration Time",
        resonanceSlotsNoPerfectTime: "No perfect overlap found. Check partial availability below.",
        resonanceSlotsTimeline: "24-Hour Overview",
        resonanceSlotsAllActive: "All Active",
        resonanceSlotsSomeFree: "Some Free",
        resonanceSlotsSomeSleeping: "Some Sleeping",

        // Timezone List
        timezoneListPlaceholder: "No cities added yet.",
        timezoneListHint: "Use the search box to add cities to your list.",

        // Timezone Card
        timezoneCardActive: "Active",
        timezoneCardSleeping: "Sleeping",
        timezoneCardFree: "Free",

        // Footer
        madeBy: "Made by Peylix",

        // Cities
        cityBeijing: "Beijing",
        cityHongKong: "Hong Kong",
        citySeattle: "Seattle",
        cityNewYork: "New York",
        cityLondon: "London",
        cityQueensland: "Queensland",

        // Regions
        regionCN: "Mainland China",
        regionHK: "Hong Kong SAR",
        regionUS: "United States",
        regionUK: "United Kingdom",
        regionAUS: "Australia",

    },

    zh: {
        // header
        appTitle: "共鸣钟",
        appSubtitle: "即便远在大洋之外，我们依旧可以共鸣",

        // control panel
        currentTime: "当前时间",
        selectedTime: "选定时间",
        language: "语言",

        // Settings Modal
        settings: "设置",
        activeHours: "活跃时间",
        sleepHours: "睡眠时间",
        start: "开始",
        end: "结束",
        save: "保存",
        cancel: "取消",

        // Validation errors
        errorAllFieldsRequired: "请填写所有时间值",
        errorInvalidRange: "所有时间值必须在 0 到 23 之间",
        errorSameTime: "开始和结束时间不能相同",

        // City Search
        searchPlaceholder: "搜索城市或地区……",
        searchNoResults: "没有找到对应城市或地区",

        // Resonance Slots
        resonanceSlotsTitle: "共鸣时段",
        resonanceSlotsDescription: "添加时区以查看大家何时都在线。",
        resonanceSlotsPerfectTime: "完美协作时间",
        resonanceSlotsNoPerfectTime: "未找到完美重叠时间。请查看下方的部分可用时间。",
        resonanceSlotsTimeline: "24 小时概览",
        resonanceSlotsAllActive: "都处于活跃时间",
        resonanceSlotsSomeFree: "有人处于空闲时间",
        resonanceSlotsSomeSleeping: "有人处于睡眠时间",

        // Timezone List
        timezoneListPlaceholder: "尚未添加任何城市。",
        timezoneListHint: "使用搜索框可以把城市添加到列表中。",

        // Timezone Card
        timezoneCardActive: "活跃时间",
        timezoneCardSleeping: "睡觉时间",
        timezoneCardFree: "空闲时间",

        // Footer
        madeBy: "由 Peylix 制作",

        // Cities
        cityBeijing: "北京",
        cityHongKong: "香港",
        citySeattle: "西雅图",
        cityNewYork: "纽约",
        cityLondon: "伦敦",
        cityQueensland: "昆士兰",

        // Regions
        regionCN: "中国大陆",
        regionHK: "香港特别行政区",
        regionUS: "美国",
        regionUK: "英国",
        regionAUS: "澳大利亚",
    },

} as const;

export type TranslationKey = keyof typeof translations.en;

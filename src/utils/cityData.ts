import type { CityData } from '../types/timezone';

/**
 * Preset city data.
 * Includes common cities around the world for timezone selection.
 */
export const CITY_DATA: CityData[] = [
    {
        name: 'Beijing',
        timezone: 'Asia/Shanghai',
        country: 'Mainland China',
        emoji: '🇨🇳',
        searchTerms: ['beijing', 'bj', 'china', 'cn', 'asia', 'shanghai', '北京', '中国', '上海']
    },
    {
        name: 'Hong Kong',
        timezone: 'Asia/Hong_Kong',
        country: 'Hong Kong SAR',
        emoji: '🇭🇰',
        searchTerms: ['hong kong', 'hk', 'china', 'cn', 'asia', '香港', '中国']
    },
    {
        name: 'Seattle',
        timezone: 'America/Los_Angeles',
        country: 'United States',
        emoji: '🇺🇸',
        searchTerms: ['seattle', 'wa', 'usa', 'us', 'america', 'north america', '美国', '西雅图']
    },
    {
        name: 'New York',
        timezone: 'America/New_York',
        country: 'United States',
        emoji: '🇺🇸',
        searchTerms: ['new york', 'nyc', 'usa', 'us', 'america', 'north america', '纽约', '美国']
    },
    {
        name: 'London',
        timezone: 'Europe/London',
        country: 'United Kingdom',
        emoji: '🇬🇧',
        searchTerms: ['london', 'uk', 'gb', 'united kingdom', 'europe', '欧洲', '伦敦', '英国']
    },
    {
        name: 'Queensland',
        timezone: 'Australia/Brisbane',
        country: 'Australia',
        emoji: '🇦🇺',
        searchTerms: ['queensland', 'brisbane', 'australia', 'au', 'oceania', '大洋洲', '澳大利亚', '昆士兰', '布里斯班']
    }
];

/**
 * Search for cities matching the query.
 * @param query - Key words to search for.
 * @returns cities that match the query.
 */
export function searchCities(query: string): CityData[] {
    if (!query.trim()) return CITY_DATA;

    const lowerQuery = query.toLowerCase().trim();

    return CITY_DATA.filter(city =>
        // match the city names
        city.name.toLowerCase().includes(lowerQuery) ||

        // match the country names
        city.country.toLowerCase().includes(lowerQuery) ||

        // match the search terms
        city.searchTerms?.some(term => term.includes(lowerQuery))
    );
}

/**
 * Get city data by timezone identifier.
 * @param timezone - IANA identifier.
 * @returns City data or undefined if not found.
 */
export function getCityByTimezone(timezone: string): CityData | undefined {
    return CITY_DATA.find(city => city.timezone === timezone);
}

import type { CityData } from '../types/timezone';
import { translations } from '../i18n/translations';

/**
 * Preset city data.
 * Includes major cities around the world for timezone selection.
 * Translated city and region names are searchable automatically,
 * so `searchTerms` only needs aliases, abbreviations and continents.
 * When several cities share a timezone, the first one is used for auto-detection.
 */
export const CITY_DATA: CityData[] = [
    // ===== Asia =====
    {
        nameKey: 'cityBeijing',
        timezone: 'Asia/Shanghai',
        regionKey: 'regionCN',
        searchTerms: ['bj', 'china', 'cn', 'asia', 'peking', '亚洲']
    },
    {
        nameKey: 'cityShanghai',
        timezone: 'Asia/Shanghai',
        regionKey: 'regionCN',
        searchTerms: ['sh', 'china', 'cn', 'asia', '亚洲']
    },
    {
        nameKey: 'cityGuangzhou',
        timezone: 'Asia/Shanghai',
        regionKey: 'regionCN',
        searchTerms: ['gz', 'canton', 'china', 'cn', 'asia', '亚洲']
    },
    {
        nameKey: 'cityShenzhen',
        timezone: 'Asia/Shanghai',
        regionKey: 'regionCN',
        searchTerms: ['sz', 'china', 'cn', 'asia', '亚洲']
    },
    {
        nameKey: 'cityHongKong',
        timezone: 'Asia/Hong_Kong',
        regionKey: 'regionHK',
        searchTerms: ['hk', 'china', 'cn', 'asia', '中国', '亚洲']
    },
    {
        nameKey: 'cityMacau',
        timezone: 'Asia/Macau',
        regionKey: 'regionMO',
        searchTerms: ['macao', 'mo', 'china', 'cn', 'asia', '中国', '亚洲']
    },
    {
        nameKey: 'cityTaipei',
        timezone: 'Asia/Taipei',
        regionKey: 'regionTW',
        searchTerms: ['tw', 'asia', '臺北', '臺灣', '亚洲']
    },
    {
        nameKey: 'cityTokyo',
        timezone: 'Asia/Tokyo',
        regionKey: 'regionJP',
        searchTerms: ['jp', 'asia', '亚洲']
    },
    {
        nameKey: 'cityOsaka',
        timezone: 'Asia/Tokyo',
        regionKey: 'regionJP',
        searchTerms: ['jp', 'asia', '亚洲']
    },
    {
        nameKey: 'citySeoul',
        timezone: 'Asia/Seoul',
        regionKey: 'regionKR',
        searchTerms: ['kr', 'korea', 'asia', '汉城', '亚洲']
    },
    {
        nameKey: 'cityUlaanbaatar',
        timezone: 'Asia/Ulaanbaatar',
        regionKey: 'regionMN',
        searchTerms: ['ulan bator', 'mn', 'asia', '亚洲']
    },
    {
        nameKey: 'citySingapore',
        timezone: 'Asia/Singapore',
        regionKey: 'regionSG',
        searchTerms: ['sg', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityKualaLumpur',
        timezone: 'Asia/Kuala_Lumpur',
        regionKey: 'regionMY',
        searchTerms: ['kl', 'my', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityBangkok',
        timezone: 'Asia/Bangkok',
        regionKey: 'regionTH',
        searchTerms: ['th', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityHoChiMinh',
        timezone: 'Asia/Ho_Chi_Minh',
        regionKey: 'regionVN',
        searchTerms: ['saigon', 'hcmc', 'vn', 'asia', 'southeast asia', '西贡', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityHanoi',
        timezone: 'Asia/Ho_Chi_Minh',
        regionKey: 'regionVN',
        searchTerms: ['vn', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityJakarta',
        timezone: 'Asia/Jakarta',
        regionKey: 'regionID',
        searchTerms: ['id', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityBali',
        timezone: 'Asia/Makassar',
        regionKey: 'regionID',
        searchTerms: ['denpasar', 'id', 'asia', 'southeast asia', '登巴萨', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityManila',
        timezone: 'Asia/Manila',
        regionKey: 'regionPH',
        searchTerms: ['ph', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityYangon',
        timezone: 'Asia/Yangon',
        regionKey: 'regionMM',
        searchTerms: ['rangoon', 'burma', 'mm', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityPhnomPenh',
        timezone: 'Asia/Phnom_Penh',
        regionKey: 'regionKH',
        searchTerms: ['kh', 'asia', 'southeast asia', '亚洲', '东南亚']
    },
    {
        nameKey: 'cityNewDelhi',
        timezone: 'Asia/Kolkata',
        regionKey: 'regionIN',
        searchTerms: ['delhi', 'in', 'ist', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityMumbai',
        timezone: 'Asia/Kolkata',
        regionKey: 'regionIN',
        searchTerms: ['bombay', 'in', 'ist', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityBangalore',
        timezone: 'Asia/Kolkata',
        regionKey: 'regionIN',
        searchTerms: ['bengaluru', 'in', 'ist', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityKarachi',
        timezone: 'Asia/Karachi',
        regionKey: 'regionPK',
        searchTerms: ['pk', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityDhaka',
        timezone: 'Asia/Dhaka',
        regionKey: 'regionBD',
        searchTerms: ['dacca', 'bd', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityColombo',
        timezone: 'Asia/Colombo',
        regionKey: 'regionLK',
        searchTerms: ['lk', 'ceylon', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityKathmandu',
        timezone: 'Asia/Kathmandu',
        regionKey: 'regionNP',
        searchTerms: ['np', 'asia', 'south asia', '亚洲', '南亚']
    },
    {
        nameKey: 'cityKabul',
        timezone: 'Asia/Kabul',
        regionKey: 'regionAF',
        searchTerms: ['af', 'asia', '亚洲']
    },
    {
        nameKey: 'cityAlmaty',
        timezone: 'Asia/Almaty',
        regionKey: 'regionKZ',
        searchTerms: ['kz', 'asia', 'central asia', '亚洲', '中亚']
    },
    {
        nameKey: 'cityTashkent',
        timezone: 'Asia/Tashkent',
        regionKey: 'regionUZ',
        searchTerms: ['uz', 'asia', 'central asia', '亚洲', '中亚']
    },
    {
        nameKey: 'cityDubai',
        timezone: 'Asia/Dubai',
        regionKey: 'regionAE',
        searchTerms: ['uae', 'ae', 'emirates', 'asia', 'middle east', '亚洲', '中东']
    },
    {
        nameKey: 'cityAbuDhabi',
        timezone: 'Asia/Dubai',
        regionKey: 'regionAE',
        searchTerms: ['uae', 'ae', 'emirates', 'asia', 'middle east', '亚洲', '中东']
    },
    {
        nameKey: 'cityRiyadh',
        timezone: 'Asia/Riyadh',
        regionKey: 'regionSA',
        searchTerms: ['ksa', 'sa', 'asia', 'middle east', '亚洲', '中东']
    },
    {
        nameKey: 'cityDoha',
        timezone: 'Asia/Qatar',
        regionKey: 'regionQA',
        searchTerms: ['qa', 'asia', 'middle east', '亚洲', '中东']
    },
    {
        nameKey: 'cityTehran',
        timezone: 'Asia/Tehran',
        regionKey: 'regionIR',
        searchTerms: ['ir', 'persia', 'asia', 'middle east', '亚洲', '中东']
    },
    {
        nameKey: 'cityBaghdad',
        timezone: 'Asia/Baghdad',
        regionKey: 'regionIQ',
        searchTerms: ['iq', 'asia', 'middle east', '亚洲', '中东']
    },
    {
        nameKey: 'cityTelAviv',
        timezone: 'Asia/Jerusalem',
        regionKey: 'regionIL',
        searchTerms: ['il', 'jerusalem', 'asia', 'middle east', '耶路撒冷', '亚洲', '中东']
    },
    {
        nameKey: 'cityIstanbul',
        timezone: 'Europe/Istanbul',
        regionKey: 'regionTR',
        searchTerms: ['tr', 'turkey', 'ankara', 'europe', 'asia', 'middle east', '安卡拉', '欧洲', '亚洲', '中东']
    },

    // ===== Europe =====
    {
        nameKey: 'cityLondon',
        timezone: 'Europe/London',
        regionKey: 'regionUK',
        searchTerms: ['uk', 'gb', 'britain', 'england', 'gmt', 'bst', 'europe', '欧洲', '英格兰']
    },
    {
        nameKey: 'cityDublin',
        timezone: 'Europe/Dublin',
        regionKey: 'regionIE',
        searchTerms: ['ie', 'europe', '欧洲']
    },
    {
        nameKey: 'cityLisbon',
        timezone: 'Europe/Lisbon',
        regionKey: 'regionPT',
        searchTerms: ['pt', 'europe', '欧洲']
    },
    {
        nameKey: 'cityReykjavik',
        timezone: 'Atlantic/Reykjavik',
        regionKey: 'regionIS',
        searchTerms: ['is', 'europe', '欧洲']
    },
    {
        nameKey: 'cityParis',
        timezone: 'Europe/Paris',
        regionKey: 'regionFR',
        searchTerms: ['fr', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityBerlin',
        timezone: 'Europe/Berlin',
        regionKey: 'regionDE',
        searchTerms: ['de', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityMunich',
        timezone: 'Europe/Berlin',
        regionKey: 'regionDE',
        searchTerms: ['münchen', 'muenchen', 'de', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityAmsterdam',
        timezone: 'Europe/Amsterdam',
        regionKey: 'regionNL',
        searchTerms: ['nl', 'holland', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityBrussels',
        timezone: 'Europe/Brussels',
        regionKey: 'regionBE',
        searchTerms: ['be', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityMadrid',
        timezone: 'Europe/Madrid',
        regionKey: 'regionES',
        searchTerms: ['es', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityBarcelona',
        timezone: 'Europe/Madrid',
        regionKey: 'regionES',
        searchTerms: ['es', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityRome',
        timezone: 'Europe/Rome',
        regionKey: 'regionIT',
        searchTerms: ['it', 'roma', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityMilan',
        timezone: 'Europe/Rome',
        regionKey: 'regionIT',
        searchTerms: ['it', 'milano', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityZurich',
        timezone: 'Europe/Zurich',
        regionKey: 'regionCH',
        searchTerms: ['zürich', 'geneva', 'ch', 'cet', 'europe', '日内瓦', '欧洲']
    },
    {
        nameKey: 'cityVienna',
        timezone: 'Europe/Vienna',
        regionKey: 'regionAT',
        searchTerms: ['wien', 'at', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityStockholm',
        timezone: 'Europe/Stockholm',
        regionKey: 'regionSE',
        searchTerms: ['se', 'cet', 'europe', 'nordic', '欧洲', '北欧']
    },
    {
        nameKey: 'cityOslo',
        timezone: 'Europe/Oslo',
        regionKey: 'regionNO',
        searchTerms: ['no', 'cet', 'europe', 'nordic', '欧洲', '北欧']
    },
    {
        nameKey: 'cityCopenhagen',
        timezone: 'Europe/Copenhagen',
        regionKey: 'regionDK',
        searchTerms: ['dk', 'cet', 'europe', 'nordic', '欧洲', '北欧']
    },
    {
        nameKey: 'cityHelsinki',
        timezone: 'Europe/Helsinki',
        regionKey: 'regionFI',
        searchTerms: ['fi', 'eet', 'europe', 'nordic', '欧洲', '北欧']
    },
    {
        nameKey: 'cityWarsaw',
        timezone: 'Europe/Warsaw',
        regionKey: 'regionPL',
        searchTerms: ['warszawa', 'pl', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityPrague',
        timezone: 'Europe/Prague',
        regionKey: 'regionCZ',
        searchTerms: ['praha', 'cz', 'czech republic', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityBudapest',
        timezone: 'Europe/Budapest',
        regionKey: 'regionHU',
        searchTerms: ['hu', 'cet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityAthens',
        timezone: 'Europe/Athens',
        regionKey: 'regionGR',
        searchTerms: ['gr', 'eet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityBucharest',
        timezone: 'Europe/Bucharest',
        regionKey: 'regionRO',
        searchTerms: ['ro', 'eet', 'europe', '欧洲']
    },
    {
        nameKey: 'cityKyiv',
        // "Europe/Kiev" is still the name most browsers support and report
        timezone: 'Europe/Kiev',
        regionKey: 'regionUA',
        searchTerms: ['kiev', 'ua', 'eet', 'europe', '基辅', '欧洲']
    },
    {
        nameKey: 'cityMoscow',
        timezone: 'Europe/Moscow',
        regionKey: 'regionRU',
        searchTerms: ['ru', 'msk', 'europe', '欧洲']
    },
    {
        nameKey: 'cityVladivostok',
        timezone: 'Asia/Vladivostok',
        regionKey: 'regionRU',
        searchTerms: ['ru', 'asia', 'far east', '海参崴', '亚洲', '远东']
    },

    // ===== Africa =====
    {
        nameKey: 'cityCairo',
        timezone: 'Africa/Cairo',
        regionKey: 'regionEG',
        searchTerms: ['eg', 'africa', 'middle east', '非洲', '中东']
    },
    {
        nameKey: 'cityCasablanca',
        timezone: 'Africa/Casablanca',
        regionKey: 'regionMA',
        searchTerms: ['ma', 'rabat', 'africa', '拉巴特', '非洲']
    },
    {
        nameKey: 'cityLagos',
        timezone: 'Africa/Lagos',
        regionKey: 'regionNG',
        searchTerms: ['ng', 'abuja', 'africa', 'wat', '阿布贾', '非洲']
    },
    {
        nameKey: 'cityAccra',
        timezone: 'Africa/Accra',
        regionKey: 'regionGH',
        searchTerms: ['gh', 'africa', '非洲']
    },
    {
        nameKey: 'cityNairobi',
        timezone: 'Africa/Nairobi',
        regionKey: 'regionKE',
        searchTerms: ['ke', 'eat', 'africa', '非洲']
    },
    {
        nameKey: 'cityAddisAbaba',
        timezone: 'Africa/Addis_Ababa',
        regionKey: 'regionET',
        searchTerms: ['et', 'eat', 'africa', '非洲']
    },
    {
        nameKey: 'cityJohannesburg',
        timezone: 'Africa/Johannesburg',
        regionKey: 'regionZA',
        searchTerms: ['za', 'joburg', 'sast', 'africa', '非洲']
    },
    {
        nameKey: 'cityCapeTown',
        timezone: 'Africa/Johannesburg',
        regionKey: 'regionZA',
        searchTerms: ['za', 'sast', 'africa', '非洲']
    },

    // ===== North America =====
    {
        nameKey: 'citySeattle',
        timezone: 'America/Los_Angeles',
        regionKey: 'regionUS',
        searchTerms: ['wa', 'usa', 'us', 'america', 'pst', 'pdt', 'pacific', 'north america', '北美']
    },
    {
        nameKey: 'cityLosAngeles',
        timezone: 'America/Los_Angeles',
        regionKey: 'regionUS',
        searchTerms: ['la', 'ca', 'california', 'usa', 'us', 'america', 'pst', 'pdt', 'pacific', 'north america', '加州', '北美']
    },
    {
        nameKey: 'citySanFrancisco',
        timezone: 'America/Los_Angeles',
        regionKey: 'regionUS',
        searchTerms: ['sf', 'bay area', 'silicon valley', 'ca', 'california', 'usa', 'us', 'america', 'pst', 'pdt', 'pacific', 'north america', '硅谷', '加州', '北美']
    },
    {
        nameKey: 'cityDenver',
        timezone: 'America/Denver',
        regionKey: 'regionUS',
        searchTerms: ['co', 'usa', 'us', 'america', 'mst', 'mdt', 'mountain', 'north america', '北美']
    },
    {
        nameKey: 'cityPhoenix',
        timezone: 'America/Phoenix',
        regionKey: 'regionUS',
        searchTerms: ['az', 'arizona', 'usa', 'us', 'america', 'mst', 'mountain', 'north america', '亚利桑那', '凤凰城', '北美']
    },
    {
        nameKey: 'cityChicago',
        timezone: 'America/Chicago',
        regionKey: 'regionUS',
        searchTerms: ['il', 'usa', 'us', 'america', 'cst', 'cdt', 'central', 'north america', '北美']
    },
    {
        nameKey: 'cityHouston',
        timezone: 'America/Chicago',
        regionKey: 'regionUS',
        searchTerms: ['tx', 'texas', 'dallas', 'austin', 'usa', 'us', 'america', 'cst', 'cdt', 'central', 'north america', '德州', '达拉斯', '奥斯汀', '北美']
    },
    {
        nameKey: 'cityNewYork',
        timezone: 'America/New_York',
        regionKey: 'regionUS',
        searchTerms: ['nyc', 'ny', 'usa', 'us', 'america', 'est', 'edt', 'eastern', 'north america', '北美']
    },
    {
        nameKey: 'cityWashington',
        timezone: 'America/New_York',
        regionKey: 'regionUS',
        searchTerms: ['dc', 'washington dc', 'usa', 'us', 'america', 'est', 'edt', 'eastern', 'north america', '北美']
    },
    {
        nameKey: 'cityBoston',
        timezone: 'America/New_York',
        regionKey: 'regionUS',
        searchTerms: ['ma', 'usa', 'us', 'america', 'est', 'edt', 'eastern', 'north america', '北美']
    },
    {
        nameKey: 'cityMiami',
        timezone: 'America/New_York',
        regionKey: 'regionUS',
        searchTerms: ['fl', 'florida', 'usa', 'us', 'america', 'est', 'edt', 'eastern', 'north america', '佛罗里达', '北美']
    },
    {
        nameKey: 'cityAnchorage',
        timezone: 'America/Anchorage',
        regionKey: 'regionUS',
        searchTerms: ['ak', 'alaska', 'usa', 'us', 'america', 'akst', 'north america', '阿拉斯加', '北美']
    },
    {
        nameKey: 'cityHonolulu',
        timezone: 'Pacific/Honolulu',
        regionKey: 'regionUS',
        searchTerms: ['hi', 'hawaii', 'usa', 'us', 'america', 'hst', 'oceania', '夏威夷', '大洋洲']
    },
    {
        nameKey: 'cityVancouver',
        timezone: 'America/Vancouver',
        regionKey: 'regionCA',
        searchTerms: ['bc', 'british columbia', 'pst', 'pacific', 'north america', '北美']
    },
    {
        nameKey: 'cityCalgary',
        timezone: 'America/Edmonton',
        regionKey: 'regionCA',
        searchTerms: ['edmonton', 'alberta', 'mst', 'mountain', 'north america', '埃德蒙顿', '北美']
    },
    {
        nameKey: 'cityToronto',
        timezone: 'America/Toronto',
        regionKey: 'regionCA',
        searchTerms: ['ottawa', 'ontario', 'est', 'eastern', 'north america', '渥太华', '北美']
    },
    {
        nameKey: 'cityMontreal',
        timezone: 'America/Toronto',
        regionKey: 'regionCA',
        searchTerms: ['montréal', 'quebec', 'est', 'eastern', 'north america', '魁北克', '北美']
    },
    {
        nameKey: 'cityHalifax',
        timezone: 'America/Halifax',
        regionKey: 'regionCA',
        searchTerms: ['nova scotia', 'ast', 'atlantic', 'north america', '北美']
    },
    {
        nameKey: 'cityStJohns',
        timezone: 'America/St_Johns',
        regionKey: 'regionCA',
        searchTerms: ['st. john\'s', 'saint john\'s', 'newfoundland', 'nst', 'north america', '纽芬兰', '北美']
    },
    {
        nameKey: 'cityMexicoCity',
        timezone: 'America/Mexico_City',
        regionKey: 'regionMX',
        searchTerms: ['mx', 'cdmx', 'latin america', 'north america', '拉美', '北美']
    },

    // ===== South America =====
    {
        nameKey: 'cityBogota',
        timezone: 'America/Bogota',
        regionKey: 'regionCO',
        searchTerms: ['bogotá', 'co', 'latin america', 'south america', '拉美', '南美']
    },
    {
        nameKey: 'cityLima',
        timezone: 'America/Lima',
        regionKey: 'regionPE',
        searchTerms: ['pe', 'latin america', 'south america', '拉美', '南美']
    },
    {
        nameKey: 'cityCaracas',
        timezone: 'America/Caracas',
        regionKey: 'regionVE',
        searchTerms: ['ve', 'latin america', 'south america', '拉美', '南美']
    },
    {
        nameKey: 'citySantiago',
        timezone: 'America/Santiago',
        regionKey: 'regionCL',
        searchTerms: ['cl', 'latin america', 'south america', '拉美', '南美']
    },
    {
        nameKey: 'cityBuenosAires',
        timezone: 'America/Argentina/Buenos_Aires',
        regionKey: 'regionAR',
        searchTerms: ['ar', 'latin america', 'south america', '拉美', '南美']
    },
    {
        nameKey: 'citySaoPaulo',
        timezone: 'America/Sao_Paulo',
        regionKey: 'regionBR',
        searchTerms: ['são paulo', 'br', 'brasil', 'latin america', 'south america', '拉美', '南美']
    },
    {
        nameKey: 'cityRioDeJaneiro',
        timezone: 'America/Sao_Paulo',
        regionKey: 'regionBR',
        searchTerms: ['rio', 'br', 'brasil', 'latin america', 'south america', '里约', '拉美', '南美']
    },

    // ===== Oceania =====
    {
        nameKey: 'cityQueensland',
        timezone: 'Australia/Brisbane',
        regionKey: 'regionAUS',
        searchTerms: ['brisbane', 'au', 'aest', 'oceania', '大洋洲', '布里斯班']
    },
    {
        nameKey: 'citySydney',
        timezone: 'Australia/Sydney',
        regionKey: 'regionAUS',
        searchTerms: ['au', 'nsw', 'canberra', 'aest', 'aedt', 'oceania', '堪培拉', '大洋洲']
    },
    {
        nameKey: 'cityMelbourne',
        timezone: 'Australia/Melbourne',
        regionKey: 'regionAUS',
        searchTerms: ['au', 'victoria', 'aest', 'aedt', 'oceania', '大洋洲']
    },
    {
        nameKey: 'cityAdelaide',
        timezone: 'Australia/Adelaide',
        regionKey: 'regionAUS',
        searchTerms: ['au', 'acst', 'acdt', 'oceania', '大洋洲']
    },
    {
        nameKey: 'cityDarwin',
        timezone: 'Australia/Darwin',
        regionKey: 'regionAUS',
        searchTerms: ['au', 'northern territory', 'acst', 'oceania', '大洋洲']
    },
    {
        nameKey: 'cityPerth',
        timezone: 'Australia/Perth',
        regionKey: 'regionAUS',
        searchTerms: ['au', 'awst', 'oceania', '大洋洲']
    },
    {
        nameKey: 'cityAuckland',
        timezone: 'Pacific/Auckland',
        regionKey: 'regionNZ',
        searchTerms: ['nz', 'wellington', 'nzst', 'oceania', '惠灵顿', '大洋洲']
    },
    {
        nameKey: 'citySuva',
        timezone: 'Pacific/Fiji',
        regionKey: 'regionFJ',
        searchTerms: ['fj', 'oceania', '大洋洲']
    },

    // ===== Universal =====
    {
        nameKey: 'cityUTC',
        timezone: 'UTC',
        regionKey: 'regionUTC',
        searchTerms: ['utc', 'gmt', 'zulu', 'universal', '世界时', '格林尼治']
    }
];

/**
 * Legacy IANA names that some browsers still report for the user's timezone,
 * mapped to the identifiers used in CITY_DATA.
 */
const TIMEZONE_ALIASES: Record<string, string> = {
    'Asia/Calcutta': 'Asia/Kolkata',
    'Asia/Saigon': 'Asia/Ho_Chi_Minh',
    'Asia/Katmandu': 'Asia/Kathmandu',
    'Asia/Rangoon': 'Asia/Yangon',
    'Asia/Macao': 'Asia/Macau',
    'Asia/Ujung_Pandang': 'Asia/Makassar',
    'Asia/Chongqing': 'Asia/Shanghai',
    'Asia/Harbin': 'Asia/Shanghai',
    'PRC': 'Asia/Shanghai',
    'Europe/Kyiv': 'Europe/Kiev',
    'America/Buenos_Aires': 'America/Argentina/Buenos_Aires',
    'America/Montreal': 'America/Toronto',
    'US/Pacific': 'America/Los_Angeles',
    'US/Mountain': 'America/Denver',
    'US/Arizona': 'America/Phoenix',
    'US/Central': 'America/Chicago',
    'US/Eastern': 'America/New_York',
    'US/Alaska': 'America/Anchorage',
    'US/Hawaii': 'Pacific/Honolulu',
    'Etc/UTC': 'UTC',
    'Etc/GMT': 'UTC',
    'GMT': 'UTC',
};

// Lowercased search terms for every city, including its translated names in all languages.
const SEARCH_INDEX = CITY_DATA.map(city => ({
    city,
    terms: [
        ...(city.searchTerms ?? []),
        ...Object.values(translations).flatMap(dict => [dict[city.nameKey], dict[city.regionKey]]),
    ]
        .filter((term): term is string => Boolean(term))
        .map(term => term.toLowerCase()),
}));

/**
 * Search for cities matching the query.
 * @param query - Key words to search for.
 * @returns cities that match the query.
 */
export function searchCities(query: string): CityData[] {
    if (!query.trim()) return CITY_DATA;

    const lowerQuery = query.toLowerCase().trim();

    return SEARCH_INDEX
        // match the search terms
        .filter(({ terms }) => terms.some(term => term.includes(lowerQuery)))
        .map(({ city }) => city);
}

/**
 * Get city data by timezone identifier.
 * @param timezone - IANA identifier.
 * @returns City data or undefined if not found.
 */
export function getCityByTimezone(timezone: string): CityData | undefined {
    const canonical = TIMEZONE_ALIASES[timezone] ?? timezone;
    return CITY_DATA.find(city => city.timezone === canonical);
}

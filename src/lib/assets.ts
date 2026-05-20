// DWEX — 1,500+ Trading Assets Database
// Organized by category: Forex, Stocks, Crypto, Commodities, Indices, ETFs, Synthetics

export type AssetCategory = 'forex' | 'stocks' | 'crypto' | 'commodities' | 'indices' | 'etfs' | 'synthetics'
export type AssetPhase = 'Deriv Phase' | 'Wise Phase' | 'Eversend Phase' | 'Binance Phase' | 'Exness Phase' | 'XM Phase' | 'FBS Phase' | 'OctaFX Phase' | 'IC Markets Phase' | 'HFM Phase' | 'Chipper Cash Phase' | 'Bamboo Phase' | 'Chaka Phase' | 'Risevest Phase' | 'Revolut Phase' | 'Bybit Phase' | 'KuCoin Phase' | 'OKX Phase' | 'Multi-Phase'

export interface Asset {
  symbol: string
  name: string
  category: AssetCategory
  phases: AssetPhase[]
  price: number
  change: number
  volume?: string
}

export const assetCategories = [
  { id: 'forex', name: 'Forex', icon: '💱', count: 85 },
  { id: 'stocks', name: 'Stocks', icon: '📈', count: 500 },
  { id: 'crypto', name: 'Crypto', icon: '₿', count: 200 },
  { id: 'commodities', name: 'Commodities', icon: '🛢️', count: 60 },
  { id: 'indices', name: 'Indices', icon: '📊', count: 50 },
  { id: 'etfs', name: 'ETFs', icon: '📦', count: 350 },
  { id: 'synthetics', name: 'Synthetics', icon: '🎲', count: 50 },
]

export const phases = [
  { id: 'deriv', name: 'Deriv Phase', color: '#00A88A', assetCount: 200, rawtin: '₦1,650/$', status: 'active', description: 'Forex, Synthetics, Crypto' },
  { id: 'wise', name: 'Wise Phase', color: '#3B82F6', assetCount: 50, rawtin: '₦1,620/$', status: 'active', description: 'Fiat transfers, Multi-currency' },
  { id: 'eversend', name: 'Eversend Phase', color: '#E5940A', assetCount: 30, rawtin: '₦1,635/$', status: 'active', description: 'African currencies, Wallet' },
  { id: 'binance', name: 'Binance Phase', color: '#B8860B', assetCount: 350, rawtin: '₦1,640/$', status: 'active', description: 'Crypto exchange, Futures' },
  { id: 'exness', name: 'Exness Phase', color: '#8B5CF6', assetCount: 120, rawtin: '₦1,655/$', status: 'active', description: 'Forex, Commodities, Indices' },
  { id: 'xm', name: 'XM Phase', color: '#EC4899', assetCount: 100, rawtin: '₦1,650/$', status: 'coming', description: 'Forex, Stocks, Indices' },
  { id: 'fbs', name: 'FBS Phase', color: '#EF4444', assetCount: 80, rawtin: '₦1,660/$', status: 'coming', description: 'Forex, Commodities' },
  { id: 'octafx', name: 'OctaFX Phase', color: '#F97316', assetCount: 60, rawtin: '₦1,645/$', status: 'coming', description: 'Forex, Indices' },
  { id: 'icmarkets', name: 'IC Markets Phase', color: '#06B6D4', assetCount: 90, rawtin: '₦1,650/$', status: 'coming', description: 'Forex, CFDs' },
  { id: 'hfm', name: 'HFM Phase', color: '#14B8A6', assetCount: 70, rawtin: '₦1,655/$', status: 'coming', description: 'Forex, Stocks' },
  { id: 'chipper', name: 'Chipper Cash Phase', color: '#84CC16', assetCount: 25, rawtin: '₦1,630/$', status: 'coming', description: 'African currencies, Crypto' },
  { id: 'bamboo', name: 'Bamboo Phase', color: '#22C55E', assetCount: 40, rawtin: '₦1,625/$', status: 'coming', description: 'US Stocks, ETFs' },
  { id: 'chaka', name: 'Chaka Phase', color: '#A855F7', assetCount: 35, rawtin: '₦1,640/$', status: 'coming', description: 'Nigerian & US Stocks' },
  { id: 'risevest', name: 'Risevest Phase', color: '#F43F5E', assetCount: 30, rawtin: '₦1,635/$', status: 'coming', description: 'US Stocks, ETFs' },
  { id: 'revolut', name: 'Revolut Phase', color: '#6366F1', assetCount: 60, rawtin: '₦1,620/$', status: 'coming', description: 'Forex, Stocks, Crypto' },
  { id: 'bybit', name: 'Bybit Phase', color: '#F59E0B', assetCount: 200, rawtin: '₦1,640/$', status: 'coming', description: 'Crypto, Futures' },
  { id: 'kucoin', name: 'KuCoin Phase', color: '#10B981', assetCount: 180, rawtin: '₦1,645/$', status: 'coming', description: 'Altcoins, Crypto' },
  { id: 'okx', name: 'OKX Phase', color: '#8B5CF6', assetCount: 150, rawtin: '₦1,648/$', status: 'coming', description: 'Crypto, Commodities' },
]

// Deterministic seeded PRNG — replaces Math.random() to avoid hydration mismatch
function createSeededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}
const rand = createSeededRandom(42)
const rand2 = createSeededRandom(137)
const rand3 = createSeededRandom(256)
const rand4 = createSeededRandom(999)
const rand5 = createSeededRandom(1337)
const rand6 = createSeededRandom(2048)
const rand7 = createSeededRandom(3141)

// Helper to generate assets programmatically
function fx(s: string, n: string, p: number, c: number, ph: AssetPhase[], v?: string): Asset {
  return { symbol: s, name: n, category: 'forex', phases: ph, price: p, change: c, volume: v }
}
function st(s: string, n: string, p: number, c: number, ph: AssetPhase[], v?: string): Asset {
  return { symbol: s, name: n, category: 'stocks', phases: ph, price: p, change: c, volume: v }
}
function cr(s: string, n: string, p: number, c: number, ph: AssetPhase[], v?: string): Asset {
  return { symbol: s, name: n, category: 'crypto', phases: ph, price: p, change: c, volume: v }
}
function co(s: string, n: string, p: number, c: number, ph: AssetPhase[], v?: string): Asset {
  return { symbol: s, name: n, category: 'commodities', phases: ph, price: p, change: c, volume: v }
}
function idx(s: string, n: string, p: number, c: number, ph: AssetPhase[], v?: string): Asset {
  return { symbol: s, name: n, category: 'indices', phases: ph, price: p, change: c, volume: v }
}
function et(s: string, n: string, p: number, c: number, ph: AssetPhase[], v?: string): Asset {
  return { symbol: s, name: n, category: 'etfs', phases: ph, price: p, change: c, volume: v }
}
function sy(s: string, n: string, p: number, c: number, ph: AssetPhase[]): Asset {
  return { symbol: s, name: n, category: 'synthetics', phases: ph, price: p, change: c }
}

const D = 'Deriv Phase', W = 'Wise Phase', E = 'Eversend Phase', B = 'Binance Phase'
const EX = 'Exness Phase', XM = 'XM Phase', FBS = 'FBS Phase', OCT = 'OctaFX Phase'
const IC = 'IC Markets Phase', HFM = 'HFM Phase', CC = 'Chipper Cash Phase'
const BM = 'Bamboo Phase', CH = 'Chaka Phase', RV = 'Risevest Phase', REV = 'Revolut Phase'
const BY = 'Bybit Phase', KC = 'KuCoin Phase', OK = 'OKX Phase', MP = 'Multi-Phase'

// ═══════════════════════════════════════════════════════
// FOREX — 85+ pairs
// ═══════════════════════════════════════════════════════
const forexAssets: Asset[] = [
  // Major pairs
  fx('EUR/USD','Euro / US Dollar',1.0842,-0.12,[D,EX,XM,FBS,OCT,IC,HFM,REV,MP],'2.1B'),
  fx('GBP/USD','British Pound / US Dollar',1.2654,0.08,[D,EX,XM,FBS,IC,HFM,REV,MP],'1.5B'),
  fx('USD/JPY','US Dollar / Japanese Yen',154.32,-0.34,[D,EX,XM,FBS,OCT,IC,HFM,REV,MP],'1.8B'),
  fx('USD/CHF','US Dollar / Swiss Franc',0.8912,0.22,[D,EX,XM,IC,HFM],'890M'),
  fx('AUD/USD','Australian Dollar / US Dollar',0.6523,0.45,[D,EX,XM,FBS,IC,HFM],'760M'),
  fx('USD/CAD','US Dollar / Canadian Dollar',1.3687,-0.18,[D,EX,XM,FBS,IC,HFM],'650M'),
  fx('NZD/USD','New Zealand Dollar / US Dollar',0.6012,0.32,[D,EX,XM,IC],'340M'),
  // Minor pairs
  fx('EUR/GBP','Euro / British Pound',0.8570,-0.15,[D,EX,XM,IC],'520M'),
  fx('EUR/JPY','Euro / Japanese Yen',167.28,0.21,[D,EX,XM,IC,MP],'480M'),
  fx('GBP/JPY','British Pound / Japanese Yen',195.35,0.56,[D,EX,XM,IC],'390M'),
  fx('EUR/AUD','Euro / Australian Dollar',1.6625,-0.42,[D,EX,XM],'210M'),
  fx('EUR/CAD','Euro / Canadian Dollar',1.4838,0.12,[D,EX,XM],'180M'),
  fx('EUR/CHF','Euro / Swiss Franc',0.9665,0.08,[D,EX,XM],'160M'),
  fx('GBP/AUD','British Pound / Australian Dollar',1.9402,-0.35,[D,EX,XM],'140M'),
  fx('GBP/CAD','British Pound / Canadian Dollar',1.7312,0.28,[D,EX,XM],'120M'),
  fx('GBP/CHF','British Pound / Swiss Franc',1.1280,0.15,[D,EX,XM],'110M'),
  fx('AUD/JPY','Australian Dollar / Japanese Yen',100.62,0.78,[D,EX,XM],'200M'),
  fx('NZD/JPY','New Zealand Dollar / Japanese Yen',92.85,0.65,[D,EX,XM],'90M'),
  fx('AUD/NZD','Australian Dollar / New Zealand Dollar',1.0850,0.12,[D,EX],'75M'),
  fx('CAD/JPY','Canadian Dollar / Japanese Yen',112.78,-0.45,[D,EX],'130M'),
  fx('CHF/JPY','Swiss Franc / Japanese Yen',173.12,0.32,[D,EX],'95M'),
  // Exotic pairs
  fx('USD/TRY','US Dollar / Turkish Lira',32.45,0.85,[D,EX,FBS],'180M'),
  fx('USD/ZAR','US Dollar / South African Rand',18.52,-0.42,[D,EX,E,XM,FBS],'220M'),
  fx('USD/SGD','US Dollar / Singapore Dollar',1.3485,0.08,[D,EX,XM],'150M'),
  fx('USD/HKD','US Dollar / Hong Kong Dollar',7.8245,0.01,[D,W,EX],'130M'),
  fx('USD/NOK','US Dollar / Norwegian Krone',10.8234,-0.25,[D,EX,XM],'120M'),
  fx('USD/SEK','US Dollar / Swedish Krona',10.6512,-0.18,[D,EX,XM],'110M'),
  fx('USD/DKK','US Dollar / Danish Krone',6.9215,0.05,[D,EX],'85M'),
  fx('USD/PLN','US Dollar / Polish Zloty',3.9856,-0.32,[D,EX,FBS],'95M'),
  fx('USD/CZK','US Dollar / Czech Koruna',23.1245,-0.15,[D,EX],'65M'),
  fx('USD/HUF','US Dollar / Hungarian Forint',368.52,0.22,[D,EX],'55M'),
  fx('USD/MXN','US Dollar / Mexican Peso',17.1523,-0.55,[D,EX,FBS],'160M'),
  fx('USD/BRL','US Dollar / Brazilian Real',5.0823,0.35,[D,EX,FBS],'140M'),
  fx('USD/ARS','US Dollar / Argentine Peso',875.50,1.25,[D,EX],'45M'),
  fx('USD/CLP','US Dollar / Chilean Peso',928.35,-0.18,[D,EX],'40M'),
  fx('USD/COP','US Dollar / Colombian Peso',3912.50,0.42,[D,EX],'38M'),
  fx('USD/EGP','US Dollar / Egyptian Pound',48.25,-0.65,[D,EX,E],'72M'),
  fx('USD/KES','US Dollar / Kenyan Shilling',153.45,-0.28,[D,W,E,CC],'85M'),
  fx('USD/GHS','US Dollar / Ghanaian Cedi',14.85,-0.55,[D,W,E,CC],'65M'),
  fx('USD/UGX','US Dollar / Ugandan Shilling',3785.20,0.18,[D,W,E,CC],'42M'),
  fx('USD/TZS','US Dollar / Tanzanian Shilling',2618.50,-0.22,[D,W,E,CC],'38M'),
  fx('USD/GMD','US Dollar / Gambian Dalasi',72.15,0.08,[D,W,E],'22M'),
  fx('USD/XOF','US Dollar / West African CFA',612.35,-0.12,[D,W,E],'35M'),
  fx('USD/XAF','US Dollar / Central African CFA',612.80,-0.15,[D,W,E],'28M'),
  // African pairs
  fx('USD/NGN','US Dollar / Nigerian Naira',1550.00,0.45,[D,W,E,CC,MP],'320M'),
  fx('EUR/NGN','Euro / Nigerian Naira',1681.25,0.32,[W,E,CC],'48M'),
  fx('GBP/NGN','British Pound / Nigerian Naira',1962.80,0.55,[W,E,CC],'52M'),
  fx('NGN/USD','Nigerian Naira / US Dollar',0.000645,-0.45,[W,E],'15M'),
  fx('ZAR/USD','South African Rand / US Dollar',0.054,-0.38,[E,CC],'18M'),
  fx('KES/USD','Kenyan Shilling / US Dollar',0.0065,-0.25,[E,CC],'12M'),
  fx('GHS/USD','Ghanaian Cedi / US Dollar',0.067,-0.52,[E,CC],'10M'),
  // More crosses
  fx('EUR/TRY','Euro / Turkish Lira',35.18,0.72,[D,EX],'55M'),
  fx('EUR/ZAR','Euro / South African Rand',20.05,-0.28,[D,EX],'48M'),
  fx('EUR/NOK','Euro / Norwegian Krone',11.75,-0.15,[D,EX],'42M'),
  fx('EUR/SEK','Euro / Swedish Krona',11.55,-0.12,[D,EX],'38M'),
  fx('EUR/PLN','Euro / Polish Zloty',4.32,-0.22,[D,EX],'35M'),
  fx('EUR/HUF','Euro / Hungarian Forint',399.50,0.18,[D,EX],'28M'),
  fx('EUR/CZK','Euro / Czech Koruna',25.08,-0.08,[D,EX],'25M'),
  fx('GBP/TRY','British Pound / Turkish Lira',41.02,0.85,[D,EX],'32M'),
  fx('GBP/ZAR','British Pound / South African Rand',23.40,0.15,[D,EX],'28M'),
  fx('GBP/AUD','British Pound / Australian Dollar',1.94,-0.35,[D,EX],'22M'),
  fx('AUD/SGD','Australian Dollar / Singapore Dollar',0.8795,0.28,[D,EX],'18M'),
  fx('NZD/SGD','New Zealand Dollar / Singapore Dollar',0.8105,0.22,[D,EX],'12M'),
  fx('USD/CNH','US Dollar / Chinese Yuan Offshore',7.2515,-0.08,[D,W,EX],'180M'),
  fx('USD/INR','US Dollar / Indian Rupee',83.45,0.02,[D,EX],'150M'),
  fx('USD/THB','US Dollar / Thai Baht',36.18,0.12,[D,EX],'45M'),
  fx('USD/PHP','US Dollar / Philippine Peso',57.82,-0.18,[D,EX],'35M'),
  fx('USD/IDR','US Dollar / Indonesian Rupiah',15985.00,0.08,[D,EX],'42M'),
  fx('USD/MYR','US Dollar / Malaysian Ringgit',4.7215,-0.12,[D,EX],'38M'),
  fx('USD/VND','US Dollar / Vietnamese Dong',25120.00,0.02,[D,EX],'25M'),
  fx('EUR/SGD','Euro / Singapore Dollar',1.4625,0.15,[D,EX],'22M'),
  fx('GBP/SGD','British Pound / Singapore Dollar',1.7058,0.08,[D,EX],'18M'),
  fx('CHF/SGD','Swiss Franc / Singapore Dollar',1.5085,0.12,[D,EX],'15M'),
  fx('CAD/SGD','Canadian Dollar / Singapore Dollar',0.9815,-0.22,[D,EX],'12M'),
  fx('AUD/CHF','Australian Dollar / Swiss Franc',0.5815,0.65,[D,EX],'28M'),
  fx('NZD/CHF','New Zealand Dollar / Swiss Franc',0.5365,0.52,[D,EX],'15M'),
  fx('NZD/CAD','New Zealand Dollar / Canadian Dollar',0.8225,0.42,[D,EX],'12M'),
]

// ═══════════════════════════════════════════════════════
// STOCKS — 500+ (generated with major global stocks)
// ═══════════════════════════════════════════════════════

const stockList: [string, string, number, number, AssetPhase[]][] = [
  // Technology
  ['AAPL','Apple Inc.',189.72,1.23,[W,BM,CH,RV,REV,XM,MP]],
  ['MSFT','Microsoft Corporation',425.52,0.85,[W,BM,CH,RV,REV,XM,MP]],
  ['GOOGL','Alphabet Inc.',178.35,1.45,[W,BM,CH,RV,REV,XM]],
  ['AMZN','Amazon.com Inc.',186.48,0.92,[W,BM,CH,RV,REV,XM]],
  ['TSLA','Tesla Inc.',248.50,-0.87,[W,BM,CH,RV,REV,XM,MP]],
  ['META','Meta Platforms Inc.',502.30,1.65,[W,BM,CH,RV,REV,XM]],
  ['NVDA','NVIDIA Corporation',875.28,2.35,[W,BM,CH,RV,REV,XM,MP]],
  ['BRK.B','Berkshire Hathaway',411.85,0.42,[W,BM,CH,RV]],
  ['JPM','JPMorgan Chase & Co.',198.52,0.78,[W,BM,CH,RV]],
  ['V','Visa Inc.',280.15,0.55,[W,BM,CH,RV]],
  ['JNJ','Johnson & Johnson',156.82,-0.22,[W,BM,CH,RV]],
  ['WMT','Walmart Inc.',168.45,0.32,[W,BM,CH,RV]],
  ['PG','Procter & Gamble Co.',162.28,0.18,[W,BM,CH,RV]],
  ['UNH','UnitedHealth Group',512.85,-0.45,[W,BM,CH,RV]],
  ['HD','The Home Depot Inc.',345.62,0.62,[W,BM,CH,RV]],
  ['MA','Mastercard Inc.',462.18,0.88,[W,BM,CH,RV]],
  ['DIS','The Walt Disney Co.',112.35,-1.15,[W,BM,CH]],
  ['NFLX','Netflix Inc.',628.45,1.82,[W,BM,CH,RV]],
  ['PYPL','PayPal Holdings Inc.',65.82,2.45,[W,BM,CH,RV]],
  ['INTC','Intel Corporation',31.25,-1.85,[W,BM,CH]],
  ['CSCO','Cisco Systems Inc.',49.52,0.42,[W,BM,CH]],
  ['PFE','Pfizer Inc.',27.85,-0.65,[W,BM,CH]],
  ['ADBE','Adobe Inc.',575.62,1.35,[W,BM,CH,RV]],
  ['CRM','Salesforce Inc.',272.45,1.15,[W,BM,CH,RV]],
  ['ORCL','Oracle Corporation',125.82,0.95,[W,BM,CH,RV]],
  ['IBM','IBM Corporation',182.35,0.52,[W,BM,CH]],
  ['QCOM','Qualcomm Inc.',172.28,1.25,[W,BM,CH]],
  ['TXN','Texas Instruments Inc.',168.45,-0.35,[W,BM,CH]],
  ['AVGO','Broadcom Inc.',1342.50,1.85,[W,BM,CH,RV]],
  ['AMD','Advanced Micro Devices',168.25,2.15,[W,BM,CH,RV,MP]],
  ['SBUX','Starbucks Corp.',78.52,-0.82,[W,BM,CH]],
  ['NKE','Nike Inc.',94.35,-1.25,[W,BM,CH]],
  ['BA','Boeing Co.',178.62,-2.15,[W,BM,CH]],
  ['GS','Goldman Sachs Group',425.85,1.42,[W,BM,CH]],
  ['MS','Morgan Stanley',95.28,0.88,[W,BM,CH]],
  ['C','Citigroup Inc.',56.82,1.15,[W,BM,CH]],
  ['BAC','Bank of America Corp.',35.25,0.68,[W,BM,CH]],
  ['WFC','Wells Fargo & Co.',58.45,0.92,[W,BM,CH]],
  ['CVX','Chevron Corp.',155.82,-0.45,[W,BM,CH]],
  ['XOM','Exxon Mobil Corp.',112.35,0.78,[W,BM,CH]],
  ['COP','ConocoPhillips',115.62,0.55,[W,BM,CH]],
  ['TMO','Thermo Fisher Scientific',585.28,0.42,[W,BM,CH]],
  ['LLY','Eli Lilly and Co.',782.45,1.85,[W,BM,CH,RV]],
  ['ABBV','AbbVie Inc.',168.35,0.32,[W,BM,CH]],
  ['MRK','Merck & Co.',125.82,-0.25,[W,BM,CH]],
  ['T','AT&T Inc.',17.85,0.55,[W,BM,CH]],
  ['VZ','Verizon Communications',40.62,0.22,[W,BM,CH]],
  ['CMCSA','Comcast Corp.',42.15,0.35,[W,BM,CH]],
  ['NEE','NextEra Energy Inc.',62.45,-0.65,[W,BM,CH]],
  ['COST','Costco Wholesale Corp.',725.82,0.88,[W,BM,CH]],
  ['PEP','PepsiCo Inc.',172.25,0.28,[W,BM,CH]],
  ['KO','Coca-Cola Co.',60.82,0.12,[W,BM,CH]],
  ['MCD','McDonalds Corp.',282.45,-0.42,[W,BM,CH]],
  ['CME','CME Group Inc.',212.35,0.72,[W,BM,CH]],
  ['SPGI','S&P Global Inc.',485.62,1.15,[W,BM,CH]],
  ['CAT','Caterpillar Inc.',342.85,0.95,[W,BM,CH]],
  ['DE','Deere & Company',388.25,-0.78,[W,BM,CH]],
  ['HON','Honeywell International',198.45,0.52,[W,BM,CH]],
  ['GE','General Electric Co.',165.82,1.25,[W,BM,CH]],
  ['MMM','3M Company',98.25,-0.88,[W,BM,CH]],
  ['AXP','American Express Co.',225.62,0.68,[W,BM,CH]],
  ['BLK','BlackRock Inc.',812.45,1.15,[W,BM,CH]],
  ['SCHW','Charles Schwab Corp.',65.82,1.42,[W,BM,CH]],
  ['CB','Chubb Ltd.',252.35,0.32,[W,BM,CH]],
  ['MMC','Marsh & McLennan',228.85,0.45,[W,BM,CH]],
  ['UPS','United Parcel Service',148.52,-1.25,[W,BM,CH]],
  ['FDX','FedEx Corp.',285.62,0.78,[W,BM,CH]],
  ['RTX','RTX Corporation',98.45,0.95,[W,BM,CH]],
  ['LMT','Lockheed Martin Corp.',452.85,0.22,[W,BM,CH]],
  ['NOC','Northrop Grumman Corp.',465.25,-0.35,[W,BM,CH]],
  ['AMGN','Amgen Inc.',285.45,-0.55,[W,BM,CH]],
  ['GILD','Gilead Sciences Inc.',72.35,0.88,[W,BM,CH]],
  ['BIIB','Biogen Inc.',235.62,1.25,[W,BM,CH]],
  ['REGN','Regeneron Pharmaceuticals',985.25,1.85,[W,BM,CH]],
  ['VRTX','Vertex Pharmaceuticals',425.82,0.65,[W,BM,CH]],
  ['ISRG','Intuitive Surgical Inc.',385.25,1.42,[W,BM,CH]],
  ['ZTS','Zoetis Inc.',168.45,0.22,[W,BM,CH]],
  // More tech
  ['UBER','Uber Technologies Inc.',72.85,1.55,[W,BM,CH,RV]],
  ['SQ','Block Inc.',78.45,2.25,[W,BM,CH,RV]],
  ['SHOP','Shopify Inc.',68.25,1.85,[W,BM,CH,RV]],
  ['SPOT','Spotify Technology',285.62,0.95,[W,BM,CH]],
  ['SNAP','Snap Inc.',11.85,-2.15,[W,BM,CH]],
  ['PINS','Pinterest Inc.',35.25,1.65,[W,BM,CH]],
  ['ROKU','Roku Inc.',62.45,2.85,[W,BM,CH]],
  ['ZM','Zoom Video Comm.',65.82,-1.25,[W,BM,CH]],
  ['CRWD','CrowdStrike Holdings',342.85,2.45,[W,BM,CH,RV]],
  ['PANW','Palo Alto Networks',325.62,1.85,[W,BM,CH,RV]],
  ['SNOW','Snowflake Inc.',162.45,2.15,[W,BM,CH,RV]],
  ['PLTR','Palantir Technologies',22.85,3.25,[W,BM,CH,RV]],
  ['NET','Cloudflare Inc.',78.25,1.95,[W,BM,CH]],
  ['DDOG','Datadog Inc.',125.62,1.55,[W,BM,CH,RV]],
  ['MDB','MongoDB Inc.',285.45,-0.85,[W,BM,CH]],
  ['TEAM','Atlassian Corp.',178.25,1.35,[W,BM,CH]],
  ['DOCU','DocuSign Inc.',58.82,1.15,[W,BM,CH]],
  ['OKTA','Okta Inc.',85.62,2.05,[W,BM,CH]],
  ['TWLO','Twilio Inc.',62.85,-1.45,[W,BM,CH]],
  ['COIN','Coinbase Global Inc.',225.45,3.85,[W,BM,CH,B]],
  ['RBLX','Roblox Corp.',42.25,-2.25,[W,BM,CH]],
  ['ABNB','Airbnb Inc.',148.62,0.85,[W,BM,CH]],
  ['COUP','Coupa Software',78.45,1.25,[W,BM,CH]],
  ['BILL','Bill Holdings Inc.',62.82,-1.55,[W,BM,CH]],
  ['HUBS','HubSpot Inc.',585.25,1.65,[W,BM,CH]],
  ['VEEV','Veeva Systems',198.45,0.75,[W,BM,CH]],
  ['TTD','The Trade Desk Inc.',82.35,2.15,[W,BM,CH]],
  ['MAR','Marriott International',225.62,0.88,[W,BM,CH]],
  ['HLT','Hilton Worldwide',205.85,0.65,[W,BM,CH]],
  ['LULU','Lululemon Athletica',342.25,-1.85,[W,BM,CH]],
  ['TGT','Target Corp.',148.52,-0.95,[W,BM,CH]],
  ['LOW','Lowees Companies',232.85,0.78,[W,BM,CH]],
  ['TJX','TJX Companies',98.65,0.52,[W,BM,CH]],
  ['DLTR','Dollar Tree Inc.',135.25,-1.25,[W,BM,CH]],
  ['EL','Estee Lauder Cos.',152.85,-2.15,[W,BM,CH]],
  ['CL','Colgate-Palmolive Co.',88.45,0.35,[W,BM,CH]],
  ['PM','Philip Morris Intl.',95.82,0.28,[W,BM,CH]],
  ['MO','Altria Group Inc.',42.15,0.22,[W,BM,CH]],
  ['MDLZ','Mondelez International',72.85,0.42,[W,BM,CH]],
  ['CLX','Clorox Co.',148.25,-0.55,[W,BM,CH]],
  ['KMB','Kimberly-Clark Corp.',122.35,0.18,[W,BM,CH]],
  ['GIS','General Mills Inc.',68.45,0.32,[W,BM,CH]],
  ['HSY','Hershey Co.',198.62,-0.85,[W,BM,CH]],
  // Financial
  ['BK','Bank of New York Mellon',52.85,0.65,[W,BM,CH]],
  ['STT','State Street Corp.',82.45,0.82,[W,BM,CH]],
  ['NTRS','Northern Trust Corp.',88.25,0.45,[W,BM,CH]],
  ['ICE','Intercontinental Exchange',128.62,0.95,[W,BM,CH]],
  ['NDAQ','Nasdaq Inc.',58.45,1.25,[W,BM,CH]],
  ['CBOE','Cboe Global Markets',182.85,0.78,[W,BM,CH]],
  ['AIG','American Intl. Group',72.35,0.55,[W,BM,CH]],
  ['MET','MetLife Inc.',68.82,0.42,[W,BM,CH]],
  ['PRU','Prudential Financial',98.25,0.65,[W,BM,CH]],
  ['ALL','Allstate Corp.',168.45,0.32,[W,BM,CH]],
  ['PGR','Progressive Corp.',225.62,1.15,[W,BM,CH]],
  ['TRV','Travelers Companies',212.85,0.48,[W,BM,CH]],
  ['AFL','Aflac Inc.',82.35,0.28,[W,BM,CH]],
  ['AMP','Ameriprise Financial',385.25,1.25,[W,BM,CH]],
  ['TROW','T. Rowe Price Group',112.45,-0.85,[W,BM,CH]],
  ['BEN','Franklin Resources',28.52,-1.25,[W,BM,CH]],
  ['IVZ','Invesco Ltd.',18.85,0.95,[W,BM,CH]],
  // Energy
  ['SLB','Schlumberger Ltd.',48.25,0.85,[W,BM,CH]],
  ['EOG','EOG Resources',128.52,0.62,[W,BM,CH]],
  ['OXY','Occidental Petroleum',62.85,-0.45,[W,BM,CH]],
  ['VLO','Valero Energy Corp.',148.62,1.15,[W,BM,CH]],
  ['MPC','Marathon Petroleum',168.25,0.82,[W,BM,CH]],
  ['PSX','Phillips 66',158.45,0.55,[W,BM,CH]],
  ['FANG','Diamondback Energy',185.25,0.78,[W,BM,CH]],
  ['PXD','Pioneer Natural Resources',252.85,0.42,[W,BM,CH]],
  ['DVN','Devon Energy Corp.',48.62,0.95,[W,BM,CH]],
  ['HAL','Halliburton Co.',38.45,1.25,[W,BM,CH]],
  // Healthcare
  ['CI','Cigna Group',325.62,0.85,[W,BM,CH]],
  ['HUM','Humana Inc.',365.85,-1.15,[W,BM,CH]],
  ['CNC','Centene Corp.',72.45,0.65,[W,BM,CH]],
  ['ELV','Elevance Health',485.25,0.42,[W,BM,CH]],
  ['CVS','CVS Health Corp.',58.82,0.78,[W,BM,CH]],
  ['RAD','Rite Aid Corp.',0.52,-5.25,[W,BM,CH]],
  ['WBA','Walgreens Boots Alliance',18.85,-2.15,[W,BM,CH]],
  ['DHR','Danaher Corp.',232.45,-0.55,[W,BM,CH]],
  ['ABT','Abbott Laboratories',112.85,0.35,[W,BM,CH]],
  ['SYK','Stryker Corp.',348.25,0.88,[W,BM,CH]],
  ['BSX','Boston Scientific Corp.',68.45,1.65,[W,BM,CH]],
  ['EW','Edwards Lifesciences',82.35,-1.45,[W,BM,CH]],
  ['MDT','Medtronic plc',82.62,-0.55,[W,BM,CH]],
  ['CI','Cigna Group',325.62,0.85,[W,BM,CH]],
  // Industrial
  ['EMR','Emerson Electric Co.',105.82,0.65,[W,BM,CH]],
  ['ETN','Eaton Corp. plc',325.45,1.25,[W,BM,CH]],
  ['TT','Trane Technologies plc',348.85,0.95,[W,BM,CH]],
  ['PH','Parker-Hannifin Corp.',485.25,0.78,[W,BM,CH]],
  ['ROK','Rockwell Automation',285.62,-0.45,[W,BM,CH]],
  ['LHX','L3Harris Technologies',198.45,0.55,[W,BM,CH]],
  ['GD','General Dynamics Corp.',285.25,0.32,[W,BM,CH]],
  ['BAH','Booz Allen Hamilton',148.85,0.85,[W,BM,CH]],
  ['JCI','Johnson Controls Intl.',62.45,0.42,[W,BM,CH]],
  ['CARR','Carrier Global Corp.',58.82,0.95,[W,BM,CH]],
  ['OTIS','Otis Worldwide Corp.',92.35,0.28,[W,BM,CH]],
  // More consumer
  ['YUM','Yum! Brands Inc.',138.25,0.55,[W,BM,CH]],
  ['CMG','Chipotle Mexican Grill',2852.45,1.85,[W,BM,CH]],
  ['DPZ','Dominos Pizza Inc.',385.62,0.42,[W,BM,CH]],
  ['SBUX','Starbucks Corp.',78.52,-0.82,[W,BM,CH]],
  ['GM','General Motors Co.',45.25,1.55,[W,BM,CH]],
  ['F','Ford Motor Co.',12.85,0.95,[W,BM,CH]],
  ['RIVN','Rivian Automotive',15.62,-2.85,[W,BM,CH]],
  ['LCID','Lucid Group Inc.',3.25,-3.45,[W,BM,CH]],
  ['NIO','NIO Inc.',5.85,-1.55,[W,BM,CH]],
  ['XPEV','XPeng Inc.',8.45,-1.25,[W,BM,CH]],
  ['LI','Li Auto Inc.',25.62,0.85,[W,BM,CH]],
  ['STLA','Stellantis N.V.',28.45,0.65,[W,BM,CH]],
  ['TM','Toyota Motor Corp.',185.25,0.42,[W,BM,CH]],
  ['HMC','Honda Motor Co.',35.82,0.55,[W,BM,CH]],
  ['RACE','Ferrari N.V.',385.62,1.15,[W,BM,CH]],
  // Nigerian stocks
  ['DANGCEM','Dangote Cement',290.50,2.15,[CH]],
  ['GTCO','Guaranty Trust Holding',32.85,1.25,[CH]],
  ['AIRTELAFRI','Airtel Africa',1850.00,-0.85,[CH]],
  ['MTNN','MTN Nigeria',195.25,0.65,[CH]],
  ['ZENITHBANK','Zenith Bank',27.50,1.85,[CH]],
  ['NESTLE','Nestle Nigeria',925.00,-0.45,[CH]],
  ['BUACEMENT','BUA Cement',72.35,0.95,[CH]],
  ['SEPLAT','Seplat Energy',1450.00,1.55,[CH]],
  ['FBNH','First Bank Nigeria',18.25,2.35,[CH]],
  ['UBA','United Bank for Africa',22.50,1.75,[CH]],
  ['ACCESS','Access Holdings',17.85,1.55,[CH]],
  ['OANDO','Oando PLC',8.45,3.25,[CH]],
  ['DANGSUGAR','Dangote Sugar',42.15,-0.85,[CH]],
  ['FLOURMILL','Flour Mills Nigeria',32.50,0.65,[CH]],
  ['NB','Nigerian Breweries',28.75,0.45,[CH]],
  ['UNILEVER','Unilever Nigeria',12.35,-1.25,[CH]],
  ['CADBURY','Cadbury Nigeria',15.50,0.85,[CH]],
  ['INTBREW','International Breweries',5.25,-2.15,[CH]],
  ['JAIZBANK','Jaiz Bank',2.85,1.45,[CH]],
  ['STERLING','Sterling Bank',3.75,2.85,[CH]],
]

// Additional stocks generated programmatically
const additionalStocks: [string, string, number, number, AssetPhase[]][] = [
  ['MDB','MongoDB Inc.',178.25,-0.65,[W,BM,CH,RV]],
  ['ZS','Zscaler Inc.',185.62,1.85,[W,BM,CH]],
  ['CRWD','CrowdStrike',342.85,2.15,[W,BM,CH,RV]],
  ['MRVL','Marvell Technology',62.45,1.95,[W,BM,CH]],
  ['ON','ON Semiconductor',68.82,1.25,[W,BM,CH]],
  ['MCHP','Microchip Technology',82.35,0.85,[W,BM,CH]],
  ['LRCX','Lam Research',885.25,1.15,[W,BM,CH]],
  ['KLAC','KLA Corporation',625.82,0.95,[W,BM,CH]],
  ['ASML','ASML Holding NV',885.62,1.85,[W,BM,CH]],
  ['SNPS','Synopsys Inc.',485.25,0.75,[W,BM,CH]],
  ['CDNS','Cadence Design Systems',285.45,1.15,[W,BM,CH]],
  ['PANW','Palo Alto Networks',325.62,1.55,[W,BM,CH,RV]],
  ['FTNT','Fortinet Inc.',58.85,1.25,[W,BM,CH]],
  ['MNDY','Monday.com',198.25,2.15,[W,BM,CH]],
  ['S','SentinelOne Inc.',22.45,2.85,[W,BM,CH]],
  ['GDDY','GoDaddy Inc.',125.62,0.85,[W,BM,CH]],
  ['EA','Electronic Arts Inc.',138.25,0.45,[W,BM,CH]],
  ['TTWO','Take-Two Interactive',148.85,0.65,[W,BM,CH]],
  ['ATVI','Activision Blizzard',92.35,0.15,[W,BM,CH]],
  ['SOXI','SOXX Semiconductor ETF',48.25,1.55,[W,BM]],
]

// Generate more stocks to reach 500+
const moreStockNames = [
  // Energy
  'WYNN','MLCO','LVS','HST','PK','HLT','MAR','CHH','XOM','CVX','COP','EOG','SLB','OXY','VLO','MPC','PSX','FANG','DVN','HAL',
  'APA','MRO','OKE','WMB','KMI','ET','EPD','ENB','TRP','PBA','E','CEG','VST','NRG','AES','D','NEE','DUK','SO','DTE',
  'AEP','EXC','PEG','WEC','ES','XEL','ED','PPL','FE','D','CNX','BTU','ARCH','CEIX','AMR','TECK','FCX','NUE','STLD','CLF',
  'GFL','WM','RSG','VST','CWST','RNST','FNB','HWC','OZK','PFG','AFL','UNM','LNC','PRU','MET','AIG','ALL','TRV','PGR','CB',
  'AON','MMC','WTW','WTW','BRO','EFX','ADP','PAYX','CTSH','INFY','WIT','ACN','IT','LDOS','SAIC','BAH','MAN','KELYA','TBI','HSII',
  'SOLV','COR','OMC','IPG','MEC','WPP','VZIO','PARA','WBD','DISCA','CMCSA','CHTR','T','TMUS','USM','CTS','SHEN','BCE','TTEC','SPB',
  'MIDD','SWK','CZR','RCL','NCLH','CARN','LUV','DAL','UAL','AAL','ALK','HA','JBLU','SAVE','SKYW','CPA','VLRS','ALKS','AMRN','ARNA',
  'ARWR','BCRX','BMRN','CRBP','CRSP','EDIT','NTLA','RVMD','SGMO','SRPT','VKTX','VRNA','VTGN','XFOR','ZYNL','ABSI','ACCD','AFIB','AORT','BCAB',
  'BMEA','BWAT','CDAK','CDMO','CERE','CGEM','CNTX','CRBU','CRGX','CTLT','CVAC','DAWN','DCBO','DNLI','DYN','EDIT','EOLS','EPRS','ESPR','EVLO',
  'FATE','FONR','FRLN','GTHX','HCM','ICCC','IMCR','INBX','INSM','IONQ','IRTC','KURA','LCID','MCRB','MDGL','MNKD','MOR','MRVI','NBIX','NBTX',
  'NKTX','NMRA','NVAX','NVEI','NXST','ODT','OMER','ONCR','OPRA','ORGO','PAVM','PCVX','PGEN','PGNY','PRTA','PRQR','PSTX','PTCT','QBTS','RCEL',
  'RCMT','RDNT','REPL','RGNX','RNDS','RPTX','RRX','RSKD','RXRX','SAVA','SDGR','SERV','SGTX','SHPW','SMWB','SNSE','SNYX','SPRB','SRPT','STOK',
  'TCRT','THRD','TLIS','TNXP','TSHA','TNDX','TRDA','TSHA','TTGT','TXG','ULCC','VACC','VCEL','VERA','VKTX','VRDN','VTRS','VTYX','WVE','XBIT',
  'XHR','YMAB','ZNTL','ZURA','AACG','ABCL','ABEO','ABSI','ACAB','ACAH','ACAX','ACBA','ACBI','ACMR','ACRS','ACTG','ADAG','ADIL','ADMA','ADN',
  'ADTX','AEHR','AEHL','AEMD','AENT','AEYE','AFIB','AFRM','AGEN','AGGH','AGL','AGRI','AHPI','AIAI','AIRE','AISP','AKAN','AKBA','AKER','AKRO',
  'ALGM','ALGR','ALNA','ALPN','ALRM','ALTR','AMAL','AMRK','AMST','AMTB','AMWL','ANEB','ANIP','ANIX','ANNX','AONC','AOSL','APCX','APEI','APLS',
  'APM','APOG','APOP','APPF','APPH','APTO','AQMS','AQST','ARAV','ARBB','ARCT','ARDX','AREC','ARGX','ARHS','ARLP','ARMP','AROW','ARTL','ARVN',
  'ASLE','ASND','ASPN','ASPU','ASTL','ASXT','ATAT','ATCX','ATEC','ATHA','ATHX','ATIF','ATLO','ATNF','ATOS','ATRA','ATRC','ATRI','ATRM','ATRS',
  'ATSX','AUB','AUVI','AVDL','AVEO','AVIR','AVXL','AWRE','AXGN','AXLA','AXSM','AYLA','AYRO','AZEK','AZPN','BANY','BATRA','BBIG','BCEL','BMA',
  // Extra stocks batch 1 (A-Z)
  'AACG','AAB','AADR','AAIC','AALI','AAME','AAOI','AAP','AAT','AAWW','AB','ABCB','ABCL','ABCM','ABCW','ABIO','ABST','ABT','ABUS','ACAD',
  'ACAX','ACBI','ACB','ACC','ACCO','ACEL','ACET','ACG','ACHC','ACHV','ACIW','ACLS','ACM','ACMR','ACN','ACNB','ACOR','ACP','ACRE','ACRS',
  'ACV','ADAP','ADB','ADBE','ADC','ADCO','ADD','ADEA','ADES','ADI','ADM','ADMA','ADMP','ADN','ADNT','ADOC','ADP','ADSK','ADTN','ADUS',
  'ADV','ADVM','AE','AEE','AEG','AEEI','AEHR','AEIS','AEL','AEM','AENZ','AEO','AEP','AER','AERI','AES','AET','AEY','AFB','AFG',
  'AFI','AFL','AFMD','AFRM','AG','AGCO','AGD','AGE','AGEN','AGFS','AGG','AGGY','AGIO','AGLE','AGM','AGMH','AGNC','AGO','AGR','AGRO',
  'AGRX','AGT','AGYS','AHC','AHH','AHT','AI','AID','AIF','AIG','AIH','AIL','AIM','AIN','AINV','AIO','AIR','AIRG','AIRI','AIRT',
  'AIS','AIT','AIV','AIZ','AJAX','AJG','AJRD','AKAM','AKBA','AKER','AKR','AKRO','AKTS','AL','ALC','ALCO','ALDX','ALE','ALEC','ALGM',
  'ALGN','ALGR','ALGT','ALK','ALKS','ALL','ALLE','ALLK','ALLO','ALLT','ALNY','ALOT','ALPN','ALR','ALRM','ALRS','ALS','ALT','ALTR','ALV',
  'ALVR','ALX','ALXO','AM','AMAL','AMAT','AMBA','AMBC','AMC','AMCR','AMD','AME','AMED','AMG','AMGP','AMH','AMKR','AMLB','AMMP','AMN',
  'AMNB','AMOT','AMP','AMPH','AMR','AMRC','AMRK','AMRN','AMRS','AMRX','AMSC','AMSF','AMST','AMSW','AMT','AMTD','AMTI','AMTK','AMTM','AMWD',
  'AMX','AMZN','AN','ANAB','ANAT','ANDA','ANDE','ANET','ANF','ANGI','ANGO','ANH','ANI','ANN','ANPC','ANTE','ANTX','AOS','AOSL','AOUT',
  'APAM','APD','APE','APEI','APG','APH','APLE','APLS','AMPO','APPN','APR','APT','APTO','APTV','APTX','APWC','AQ','AQMS','AQST','AR',
  // Extra stocks batch 2
  'BABA','BAC','BAH','BAND','BANF','BANR','BANX','BAP','BASI','BATS','BHF','BHVN','BIG','BIO','BIOX','BIT','BK','BKNG','BLK','BLMH',
  'BMR','BMRN','BMI','BMO','BND','BNFT','BNS','BOH','BOKF','BOW','BPOP','BOX','BR','BRC','BRFS','BRKL','BRKR','BRO','BROG','BSX',
  'BTAI','BTE','BTG','BTWN','BURL','BW','BWA','BWFG','BX','BXMT','BXP','BYD','CABA','CACC','CACI','CADL','CAE','CAF','CAL','CALL',
  'CALM','CAMP','CAKE','CALX','CASH','CASS','CATM','CBAN','CBB','CBC','CBE','CBRE','CBT','CBZ','CC','CCA','CCK','CCL','CCO','CCRN',
  'CDE','CDK','CDNS','CDW','CE','CEA','CECE','CEIX','CELH','CENX','CEOP','CERE','CERT','CETX','CF','CFG','CFR','CFX','CG','CGBD',
  'CGNX','CHCO','CHD','CHDN','CHE','CHEF','CHH','CHK','CHKP','CHRS','CHRW','CHS','CHSCO','CHT','CHTR','CHUY','CI','CIA','CIG','CIGI',
  // Extra stocks batch 3
  'DKNG','DLB','DLR','DLTH','DM','DMAC','DMLP','DMO','DMRC','DNLI','DNP','DOC','DOCS','DOV','DOW','DOX','DPZ','DQ','DRH','DRI',
  'DRQ','DSGX','DSWL','DTE','DUK','DUN','DVA','DVN','DWAC','DX','DXCM','DXC','DY','DYNT','EAT','EB','EBAY','EBS','EBSB','EC',
  'ECHO','ECL','ECOL','ECPG','EDIT','EDR','EEFT','EEM','EFX','EGBN','EGLE','EGO','EGP','EGRX','EHTH','EIG','EIX','EL','ELAN',
  'ELF','ELMD','ELON','ELP','ELS','ELV','EMN','EMO','EMP','EMR','ENB','ENLC','ENOV','ENPH','ENS','ENTG','ENV','ENZ','EOG','EP',
  'EPAM','EPAY','EPD','EPC','EPI','EPRT','EPSN','EQT','EQIX','ERAS','ERF','ERIC','ERIE','ERJ','ES','ESCA','ESC','ESGR','ESHG','ESNT',
  'ESPR','ESQ','ESS','ESTA','ESTC','ET','ETN','ETON','ETR','ETRN','ETSY','EVA','EVR','EVRG','EW','EWC','EWD','EWG','EWH','EWI',
  'EWJ','EWK','EWL','EWM','EWN','EWO','EWP','EWQ','EWS','EWT','EWU','EWY','EWZ','EXAS','EXC','EXEL','EXP','EXPD','EXPE','EXR',
  'F','FANG','FARM','FATE','FBHS','FCFS','FCN','FCNCA','FCPT','FDP','FDX','FE','FELE','FET','FF','FFBC','FFIN','FFNW','FGBI','FG',
]

const stockPrices: [string, string, number][] = moreStockNames.map(t => [t, `${t} Corp.`, Math.round((5 + rand() * 500) * 100) / 100])
const stockAssets: Asset[] = stockPrices.map(([sym, name, price]) => st(sym, name, price, Math.round((rand2() * 6 - 3) * 100) / 100, [W, BM, CH], `${Math.round(rand3() * 50)}M`))

const stocksData: Asset[] = [
  ...stockList.map(([s, n, p, c, ph]) => st(s, n, p, c, ph)),
  ...additionalStocks.map(([s, n, p, c, ph]) => st(s, n, p, c, ph)),
  ...stockAssets,
]

// ═══════════════════════════════════════════════════════
// CRYPTO — 200+
// ═══════════════════════════════════════════════════════
const cryptoList: [string, string, number, number, AssetPhase[]][] = [
  ['BTC/USD','Bitcoin',67245.30,2.14,[D,B,BY,KC,OK,REV,CC,MP]],
  ['ETH/USD','Ethereum',3521.80,1.87,[D,B,BY,KC,OK,REV,MP]],
  ['SOL/USD','Solana',172.30,3.42,[B,BY,KC,OK,MP]],
  ['BNB/USD','BNB',598.45,1.25,[B,BY,KC,OK]],
  ['XRP/USD','XRP',0.5245,0.85,[B,BY,KC,OK]],
  ['ADA/USD','Cardano',0.4515,1.65,[B,BY,KC,OK]],
  ['DOGE/USD','Dogecoin',0.1528,4.25,[B,BY,KC,OK]],
  ['DOT/USD','Polkadot',7.25,-0.85,[B,BY,KC,OK]],
  ['AVAX/USD','Avalanche',38.52,2.15,[B,BY,KC,OK]],
  ['MATIC/USD','Polygon',0.7125,1.45,[B,BY,KC]],
  ['LINK/USD','Chainlink',14.85,0.95,[B,BY,KC,OK]],
  ['UNI/USD','Uniswap',7.82,1.25,[B,BY,KC]],
  ['ATOM/USD','Cosmos',8.95,-1.15,[B,BY,KC]],
  ['LTC/USD','Litecoin',82.45,0.55,[B,BY,KC,OK]],
  ['BCH/USD','Bitcoin Cash',485.25,1.85,[B,BY,KC]],
  ['XLM/USD','Stellar',0.1125,0.42,[B,BY,KC]],
  ['ALGO/USD','Algorand',0.1825,-0.95,[B,BY,KC]],
  ['VET/USD','VeChain',0.0312,1.55,[B,KC]],
  ['ICX/USD','ICON',0.2158,-1.25,[B,KC]],
  ['FTM/USD','Fantom',0.4525,2.85,[B,BY,KC]],
  ['SAND/USD','The Sandbox',0.4258,-2.15,[B,KC]],
  ['MANA/USD','Decentraland',0.3815,1.65,[B,KC]],
  ['AXS/USD','Axie Infinity',7.85,-1.85,[B,KC]],
  ['CRV/USD','Curve DAO',0.3512,0.95,[B,KC]],
  ['AAVE/USD','Aave',92.45,1.25,[B,BY,KC]],
  ['MKR/USD','Maker',2852.00,0.85,[B,BY,KC]],
  ['COMP/USD','Compound',52.85,-0.65,[B,KC]],
  ['SNX/USD','Synthetix',2.85,1.45,[B,KC]],
  ['YFI/USD','Yearn.finance',8525.00,0.42,[B,KC]],
  ['NEAR/USD','NEAR Protocol',6.52,2.25,[B,BY,KC,OK]],
  ['FLOW/USD','Flow',0.7815,0.85,[B,KC]],
  ['FIL/USD','Filecoin',5.82,-1.25,[B,BY,KC]],
  ['HBAR/USD','Hedera',0.0825,1.15,[B,KC]],
  ['EGLD/USD','MultiversX',42.25,0.65,[B,KC]],
  ['XTZ/USD','Tezos',0.9525,-0.45,[B,KC]],
  ['THETA/USD','Theta Network',1.82,1.95,[B,KC]],
  ['RUNE/USD','THORChain',4.85,2.45,[B,BY,KC]],
  ['GRT/USD','The Graph',0.2512,0.78,[B,KC]],
  ['1INCH/USD','1inch Network',0.3515,-0.85,[B,KC]],
  ['ENJ/USD','Enjin Coin',0.2815,1.25,[B,KC]],
  ['CHZ/USD','Chiliz',0.0825,0.65,[B,KC]],
  ['ZIL/USD','Zilliqa',0.0225,-1.55,[B,KC]],
  ['IOTA/USD','IOTA',0.2518,0.45,[B,KC]],
  ['ONE/USD','Harmony',0.0152,-2.15,[KC]],
  ['KSM/USD','Kusama',25.85,-0.85,[B,KC]],
  ['CELO/USD','Celo',0.6815,1.35,[B,KC]],
  ['STX/USD','Stacks',2.15,3.25,[B,BY,KC]],
  ['IMX/USD','Immutable',2.45,1.85,[B,KC]],
  ['APE/USD','ApeCoin',1.25,-2.45,[B,KC]],
  ['LDO/USD','Lido DAO',2.15,0.95,[B,KC]],
  ['OP/USD','Optimism',2.85,2.15,[B,BY,KC]],
  ['ARB/USD','Arbitrum',1.15,1.55,[B,BY,KC]],
  ['SUI/USD','Sui',1.08,2.85,[B,BY,KC,OK]],
  ['SEI/USD','Sei',0.4525,1.95,[B,KC,OK]],
  ['TIA/USD','Celestia',8.52,3.15,[B,BY,KC]],
  ['JUP/USD','Jupiter',0.8525,2.25,[B,KC]],
  ['WIF/USD','dogwifhat',2.45,5.85,[B,BY,KC]],
  ['PEPE/USD','Pepe',0.0000085,4.25,[B,BY,KC,OK]],
  ['BONK/USD','Bonk',0.0000225,3.45,[B,BY,KC]],
  ['FLOKI/USD','Flok Inu',0.0001525,2.85,[B,BY,KC]],
  ['SHIB/USD','Shiba Inu',0.0000252,1.95,[B,BY,KC,OK]],
  ['INJ/USD','Injective',25.85,2.15,[B,BY,KC]],
  ['RNDR/USD','Render Token',8.52,1.65,[B,BY,KC]],
  ['AKT/USD','Akash Network',3.85,2.45,[B,KC]],
  ['FET/USD','Fetch.ai',2.15,3.25,[B,BY,KC]],
  ['AGIX/USD','SingularityNET',0.8515,2.85,[B,KC]],
  ['OCEAN/USD','Ocean Protocol',0.6825,1.55,[B,KC]],
  ['BLUR/USD','Blur',0.3525,-1.85,[B,KC]],
  ['DYDX/USD','dYdX',1.85,-0.95,[B,KC]],
  ['GMX/USD','GMX',38.52,0.85,[B,KC]],
  ['PENDLE/USD','Pendle',4.85,2.15,[B,KC]],
  ['PYTH/USD','Pyth Network',0.3215,1.25,[B,KC]],
  ['JTO/USD','Jito',3.25,1.75,[B,KC]],
  ['STRK/USD','Starknet',1.15,-2.15,[B,KC]],
  ['MANTA/USD','Manta Network',1.85,0.95,[B,KC]],
  ['DYM/USD','Dymension',3.15,1.45,[B,KC]],
  ['ALT/USD','AltLayer',0.1252,2.25,[KC]],
  ['PIXEL/USD','Pixels',0.4515,-1.55,[B,KC]],
  ['PORTAL/USD','Portal',0.5825,1.85,[B,KC]],
  ['APT/USD','Aptos',8.85,1.55,[B,BY,KC]],
  ['SVM/USD','Solv Protocol',0.1258,0.85,[KC]],
  ['MEME/USD','Memecoin',0.0125,3.45,[B,KC]],
  ['ORDI/USD','ORDI',52.85,2.15,[B,BY,KC]],
  ['SATS/USD','SATS',0.00000025,4.85,[B,BY,KC]],
  ['RATS/USD','RATS',0.0000015,2.65,[B,KC]],
  ['1000SATS/USD','1000SATS',0.2525,3.15,[B,KC]],
  ['TRB/USD','Tellor Tributes',52.15,-2.85,[B,KC]],
  ['KAVA/USD','Kava',0.9515,0.65,[B,KC]],
  ['ROSE/USD','Oasis Network',0.0815,1.15,[B,KC]],
  ['API3/USD','API3',2.15,0.85,[B,KC]],
  ['SSV/USD','SSV Network',32.85,-1.25,[B,KC]],
  ['LQTY/USD','Liquity',1.15,0.55,[B,KC]],
  ['PERP/USD','Perpetual Protocol',0.8525,1.45,[B,KC]],
  ['CVX/USD','Convex Finance',3.85,-0.85,[B,KC]],
  ['BAL/USD','Balancer',2.52,0.95,[B,KC]],
  ['SUSHI/USD','SushiSwap',0.9825,1.25,[B,KC]],
  ['ANKR/USD','Ankr Network',0.0325,0.65,[B,KC]],
  ['COTI/USD','COTI',0.0815,-0.45,[B,KC]],
  ['SPELL/USD','Spell Token',0.000525,1.85,[B,KC]],
]

// More altcoins
const altcoinNames = [
  'KAS','TON','BGB','LEO','BGB','OKB','CRO','FTT','MX','GT','KCS','BNX','WOO','HFT','BSW',
  'HOOK','MAGIC','TWT','CKB','BEAM','GAS','ORDI','COMBO','MAV','ARKM','BICO','AUDIO','BAND','BEL','BETA',
  'BOND','BURGER','CELR','CHR','CITY','CVP','DAR','DENT','DGB','DODO','DUSK','ELF','EPX','ERN','FARM',
  'FLM','FOR','FORTH','GTC','HARD','HIGH','HOT','ID','IOST','IOTX','IRIS','JASMY','JOE','KEY','KNC',
  'LIT','LOKA','LSK','LUNC','MASK','MDT','MINA','MOBILE','MULTI','NKN','NMR','NULS','OGN','OMG','OM',
  'ONT','OXT','PHB','POWR','PROS','PNT','QKC','QTUM','QUICK','RAD','RARE','REEF','REQ','RGV','RLC',
  'ROOK','RSR','RVN','SANTOS','SC','SFP','SKL','SLP','SNT','SNX','SOLO','SPELL','SRM','STORJ','SUPER',
  'SXP','SYS','TFUEL','TKO','TLM','TOMO','TRX','TWT','UMA','UNFI','VIB','VIDT','VOXEL','VTHO','WAXP',
  'WIN','WNXM','WTC','XEC','XEM','XNO','XVG','YGG','ZEN','ZRX','IDEX','LOKA','ONG','WAXL','BNT',
  'BADGER','COVA','CVC','FIDA','FRONT','GHST','INDEX','LYRA','MATH','MCRT','MED','MIR','MLN','PAN',
  'PERP','POLS','POOL','PORT','PROM','PRO','QSP','RGT','RIF','SHPING','SPARTA','SRN','STND','SUKU',
  'SUN','SWRV','SYS','TEL','TNB','TRAC','TRIBE','TRU','TRXB','TWT','UBT','UFT','UP','UTK','VEGA',
  'VET','VIA','VIBE','VLX','VOX','VPN','VSP','VTHO','WAN','WAX','WINGS','WPR','WTC','XAS','XCUR',
  'XDC','XEM','XHV','XLM','XMR','XEM','XNO','XOR','XTZ','XVG','XYO','YCC','YOYO','ZCN','ZIL','ZRX',
]

const cryptoAssets: Asset[] = [
  ...cryptoList.map(([s, n, p, c, ph]) => cr(s, n, p, c, ph)),
  ...altcoinNames.map(t => cr(`${t}/USD`, `${t} Token`, Math.round((0.001 + rand4() * 50) * 10000) / 10000, Math.round((rand5() * 10 - 5) * 100) / 100, [B, KC], `${Math.round(rand6() * 200)}M`)),
]

// ═══════════════════════════════════════════════════════
// COMMODITIES — 60+
// ═══════════════════════════════════════════════════════
const commoditiesAssets: Asset[] = [
  co('XAU/USD','Gold',2341.50,0.45,[D,EX,XM,FBS,IC,OK,MP]),
  co('XAG/USD','Silver',28.52,0.85,[D,EX,XM,FBS,IC]),
  co('XPT/USD','Platinum',985.25,0.22,[D,EX,XM,IC]),
  co('XPD/USD','Palladium',1025.85,-0.55,[D,EX,XM]),
  co('WTI/USD','Crude Oil WTI',78.52,-0.85,[D,EX,XM,FBS,IC,HFM,MP]),
  co('BRENT/USD','Crude Oil Brent',82.35,-0.65,[D,EX,XM,FBS,IC,HFM]),
  co('NG/USD','Natural Gas',2.15,1.25,[D,EX,XM,FBS,IC]),
  co('COPPER/USD','Copper',4.25,0.65,[D,EX,XM,IC]),
  co('WHEAT/USD','Wheat',5.82,-1.15,[D,EX,XM,FBS]),
  co('CORN/USD','Corn',4.35,-0.85,[D,EX,XM,FBS]),
  co('SOYBEAN/USD','Soybeans',11.52,0.45,[D,EX,XM,FBS]),
  co('COFFEE/USD','Coffee',185.25,2.85,[D,EX,XM]),
  co('SUGAR/USD','Sugar',0.2215,-0.65,[D,EX,XM]),
  co('COCOA/USD','Cocoa',8252.00,5.25,[D,EX]),
  co('COTTON/USD','Cotton',0.8215,0.35,[D,EX,XM]),
  co('LUMBER/USD','Lumber',545.00,-1.25,[D,EX]),
  co('RICE/USD','Rice',17.25,0.15,[D,EX]),
  co('OAT/USD','Oats',3.45,-0.85,[D,EX]),
  co('BARLEY/USD','Barley',5.25,0.22,[D,EX]),
  co('CANOLA/USD','Canola',625.50,-0.55,[D,EX]),
  co('SOYMEAL/USD','Soybean Meal',325.25,0.85,[D,EX]),
  co('SOYOIL/USD','Soybean Oil',0.4815,0.45,[D,EX]),
  co('ALUMINUM/USD','Aluminum',2258.00,0.65,[D,EX,XM,IC]),
  co('ZINC/USD','Zinc',2515.00,-0.35,[D,EX,XM]),
  co('NICKEL/USD','Nickel',16285.00,1.15,[D,EX,XM]),
  co('LEAD/USD','Lead',2125.00,0.22,[D,EX]),
  co('TIN/USD','Tin',28525.00,-0.45,[D,EX]),
  co('STEEL/USD','Steel HRC',785.50,0.35,[D,EX]),
  co('IRON/USD','Iron Ore',112.85,-0.85,[D,EX,XM]),
  co('RUBBER/USD','Rubber TSR20',1.52,0.65,[D,EX]),
  co('PALLADIUM/USD','Palladium',1025.85,-0.55,[D,EX,XM]),
  co('GASOLINE/USD','RBOB Gasoline',2.45,-0.45,[D,EX]),
  co('HEATING/USD','Heating Oil',2.62,-0.35,[D,EX]),
  co('ETHANOL/USD','Ethanol',1.58,0.85,[D,EX]),
  co('URANIUM/USD','Uranium',85.25,2.15,[D,EX]),
  co('LITHIUM/USD','Lithium Carbonate',14250.00,-2.85,[D,EX]),
  co('COBALT/USD','Cobalt',28525.00,-1.25,[D,EX]),
  co('MANGANESE/USD','Manganese',4.85,0.45,[D,EX]),
  co('MOLYBDENUM/USD','Molybdenum',42.15,0.85,[D,EX]),
  co('SILICON/USD','Silicon Metal',2515.00,-0.65,[D,EX]),
  co('CATTLE/USD','Live Cattle',178.52,0.55,[D,EX]),
  co('FEEDER/USD','Feeder Cattle',252.85,0.35,[D,EX]),
  co('LEANHOG/USD','Lean Hogs',82.15,-1.25,[D,EX]),
  co('MILK/USD','Class III Milk',18.25,0.25,[D,EX]),
  co('BUTTER/USD','Butter',2.85,0.15,[D,EX]),
  co('CHEESE/USD','Cheese',1.82,0.35,[D,EX]),
  co('EGGS/USD','Eggs',2.45,-0.85,[D,EX]),
  co('WOOL/USD','Wool',12.85,0.45,[D,EX]),
  co('TALLOW/USD','Tallow',0.5525,-0.25,[D,EX]),
  co('PALMOIL/USD','Palm Oil',3852.00,0.85,[D,EX]),
  co('COCONUT/USD','Coconut Oil',1825.00,-0.55,[D,EX]),
  co('OLIVE/USD','Olive Oil',8250.00,1.25,[D,EX]),
  co('SUNFLOWER/USD','Sunflower Oil',985.50,-0.35,[D,EX]),
  co('RAPESEED/USD','Rapeseed',525.25,0.45,[D,EX]),
  co('COCOA/USD','Cocoa (ICE)',8252.00,5.25,[D,EX]),
  co('SUGAR11/USD','Sugar #11',0.2215,-0.65,[D,EX]),
  co('SUGAR16/USD','Sugar #16',0.2525,-0.45,[D,EX]),
  co('ORANGE/USD','Orange Juice',4.25,1.85,[D,EX]),
  co('COCOA/USD','Cocoa (ICE)',8252.00,5.25,[D,EX]),
  co('COTTON2/USD','Cotton #2',0.8215,0.35,[D,EX]),
  co('LUMBER2/USD','Random Length Lumber',545.00,-1.25,[D,EX]),
]

// ═══════════════════════════════════════════════════════
// INDICES — 50+
// ═══════════════════════════════════════════════════════
const indicesAssets: Asset[] = [
  idx('SPX500','S&P 500 Index',5278.40,0.56,[D,EX,XM,OCT,IC,HFM,MP]),
  idx('NAS100','NASDAQ 100 Index',18525.62,1.25,[D,EX,XM,OCT,IC,HFM,MP]),
  idx('DJI30','Dow Jones 30',39125.85,0.32,[D,EX,XM,IC,HFM]),
  idx('FTSE100','FTSE 100 Index',8285.25,-0.15,[D,EX,XM,IC]),
  idx('DAX40','DAX 40 Index',18525.85,0.45,[D,EX,XM,IC]),
  idx('CAC40','CAC 40 Index',8125.52,-0.25,[D,EX,XM]),
  idx('NIKKEI225','Nikkei 225',38525.62,0.85,[D,EX,XM]),
  idx('HSI','Hang Seng Index',16852.25,-1.25,[D,EX]),
  idx('SSEC','Shanghai Composite',3085.25,-0.65,[D,EX]),
  idx('ASX200','S&P/ASX 200',7825.52,0.35,[D,EX]),
  idx('NIFTY50','Nifty 50 Index',22852.85,0.55,[D,EX]),
  idx('SENSEX30','BSE Sensex',73825.25,0.42,[D,EX]),
  idx('IBEX35','IBEX 35 Index',10852.25,-0.85,[D,EX,XM]),
  idx('SMI','Swiss Market Index',11825.85,0.15,[D,EX,XM]),
  idx('AEX25','AEX 25 Index',825.52,0.25,[D,EX]),
  idx('BEL20','BEL 20 Index',3852.25,-0.35,[D,EX]),
  idx('OMX30','OMX Stockholm 30',2525.85,0.45,[D,EX]),
  idx('OBX25','OBX Oslo 25',1285.25,0.55,[D,EX]),
  idx('KOSPI200','KOSPI 200',385.52,-0.25,[D,EX]),
  idx('TAIEX','TAIEX Index',19852.25,0.85,[D,EX]),
  idx('STI','Straits Times Index',3285.85,-0.15,[D,EX]),
  idx('JCI','Jakarta Composite',7285.25,0.35,[D,EX]),
  idx('PSEI','Philippine SE Index',6852.85,-0.45,[D,EX]),
  idx('SET','SET Index',1385.25,0.55,[D,EX]),
  idx('VNINDEX','VN-Index',1285.52,0.65,[D,EX]),
  idx('JSE40','JSE Top 40 Index',72852.00,-0.85,[D,EX,E]),
  idx('NGSE30','NGSE 30 Index',52585.25,1.25,[E,CH]),
  idx('EGX30','EGX 30 Index',28525.85,-0.55,[D,EX,E]),
  idx('NSE20','NSE 20 Index',3852.25,0.35,[E,CC]),
  idx('GSECI','GSE Composite',3285.52,0.85,[E,CC]),
  idx('DSEI','DSE Index',5285.25,-0.25,[E]),
  idx('ISEQ20','ISEQ 20 Index',1285.85,0.45,[D,EX]),
  idx('WIG20','WIG 20 Index',1852.25,-0.65,[D,EX]),
  idx('BUX','BUX Index',62852.00,0.75,[D,EX]),
  idx('PX','PX Index',1285.25,-0.35,[D,EX]),
  idx('MICEX','MOEX Russia Index',2852.85,1.85,[D,EX]),
  idx('BIST100','BIST 100 Index',8525.25,-1.55,[D,EX]),
  idx('ATX','Austrian ATX Index',3852.25,0.25,[D,EX]),
  idx('PSI20','PSI 20 Index',3852.85,-0.55,[D,EX]),
  idx('MIB40','FTSE MIB 40',32852.00,0.35,[D,EX,XM]),
  idx('EUROSTOXX50','Euro Stoxx 50',4852.25,0.42,[D,EX,XM]),
  idx('SP400','S&P 400 Mid Cap',2852.85,0.35,[D,EX]),
  idx('SP600','S&P 600 Small Cap',1285.25,0.55,[D,EX]),
  idx('RUSSELL2000','Russell 2000',2085.52,-0.25,[D,EX,XM]),
  idx('WILSHIRE5000','Wilshire 5000',42852.00,0.45,[D,EX]),
  idx('MSCIWORLD','MSCI World Index',3285.25,0.35,[D,EX,XM]),
  idx('MSCIEM','MSCI Emerging Mkts',1185.52,-0.45,[D,EX,XM]),
  idx('VIX','CBOE Volatility Index',14.25,-3.25,[D,EX,IC,MP]),
  idx('US2000','US 2000 Index',2085.85,-0.25,[D,EX,XM]),
  idx('JPN225','Japan 225 Index',38525.62,0.85,[D,EX,XM]),
  idx('AUS200','Australia 200 Index',7825.52,0.35,[D,EX]),
  idx('UK100','UK 100 Index',8285.25,-0.15,[D,EX,XM]),
  idx('FRA40','France 40 Index',8125.52,-0.25,[D,EX,XM]),
  idx('GER40','Germany 40 Index',18525.85,0.45,[D,EX,XM]),
  idx('ESP35','Spain 35 Index',10852.25,-0.85,[D,EX]),
]

// ═══════════════════════════════════════════════════════
// ETFs — 350+
// ═══════════════════════════════════════════════════════
const etfList: [string, string, number, number, AssetPhase[]][] = [
  // Major broad market
  ['SPY','SPDR S&P 500 ETF',525.62,0.55,[W,BM,RV,MP]],
  ['QQQ','Invesco QQQ Trust',485.25,1.15,[W,BM,RV,MP]],
  ['VOO','Vanguard S&P 500 ETF',485.82,0.55,[W,BM,RV]],
  ['VTI','Vanguard Total Stock Market',252.85,0.45,[W,BM,RV]],
  ['IVV','iShares Core S&P 500',525.25,0.52,[W,BM,RV]],
  ['DIA','SPDR Dow Jones ETF',392.62,0.32,[W,BM,RV]],
  ['IWM','iShares Russell 2000',208.85,-0.25,[W,BM,RV]],
  ['EFA','iShares MSCI EAFE',72.85,-0.15,[W,BM]],
  ['VEA','Vanguard FTSE Developed',48.52,-0.12,[W,BM]],
  ['VWO','Vanguard FTSE Emerging',42.25,-0.45,[W,BM]],
  // Sector ETFs
  ['XLF','Financial Select SPDR',42.15,0.65,[W,BM,RV]],
  ['XLE','Energy Select SPDR',88.25,-0.45,[W,BM]],
  ['XLK','Technology Select SPDR',205.85,1.25,[W,BM,RV]],
  ['XLV','Health Care Select SPDR',138.52,0.22,[W,BM]],
  ['XLY','Consumer Disc. Select SPDR',178.25,0.85,[W,BM]],
  ['XLP','Consumer Staples SPDR',72.35,0.12,[W,BM]],
  ['XLI','Industrial Select SPDR',125.62,0.55,[W,BM]],
  ['XLB','Materials Select SPDR',88.45,-0.35,[W,BM]],
  ['XLU','Utilities Select SPDR',68.85,0.42,[W,BM]],
  ['XLRE','Real Estate Select SPDR',42.25,-0.85,[W,BM]],
  ['XLC','Communication Services SPDR',78.52,0.95,[W,BM]],
  // Bond ETFs
  ['AGG','iShares Core US Aggregate',98.25,-0.12,[W,BM]],
  ['BND','Vanguard Total Bond Market',72.85,-0.08,[W,BM]],
  ['TLT','iShares 20+ Year Treasury',92.52,-0.45,[W,BM]],
  ['IEF','iShares 7-10 Year Treasury',98.85,-0.15,[W,BM]],
  ['SHY','iShares 1-3 Year Treasury',82.15,0.02,[W,BM]],
  ['LQD','iShares Investment Grade Corp',112.35,-0.22,[W,BM]],
  ['HYG','iShares High Yield Corp',78.52,0.12,[W,BM]],
  ['MUB','iShares National Muni Bond',108.25,0.05,[W,BM]],
  ['TIP','iShares TIPS Bond',112.85,0.15,[W,BM]],
  ['BNDX','Vanguard Total Intl Bond',52.25,-0.05,[W,BM]],
  // Commodity ETFs
  ['GLD','SPDR Gold Shares',218.52,0.45,[W,BM,RV]],
  ['SLV','iShares Silver Trust',25.85,0.82,[W,BM]],
  ['USO','United States Oil Fund',78.25,-0.85,[W,BM]],
  ['UNG','United States Natural Gas',12.52,1.25,[W,BM]],
  ['DBA','Invesco DB Agriculture Fund',22.85,-0.55,[W,BM]],
  ['DBB','Invesco DB Base Metals Fund',18.25,0.35,[W,BM]],
  ['DJP','iPath Bloomberg Commodity',32.15,0.22,[W,BM]],
  ['GSG','iShares S&P GSCI Commodity',22.52,0.15,[W,BM]],
  // Growth/Tech ETFs
  ['VGT','Vanguard Info Technology',485.25,1.45,[W,BM,RV]],
  ['QQQM','Invesco NASDAQ 100 ETF',198.52,1.15,[W,BM,RV]],
  ['SCHG','Schwab US Growth ETF',82.35,1.25,[W,BM,RV]],
  ['VUG','Vanguard Growth ETF',285.62,1.15,[W,BM,RV]],
  ['IWF','iShares Russell 1000 Growth',325.85,1.05,[W,BM]],
  ['IWY','iShares Russell Top 200 Growth',128.52,0.95,[W,BM]],
  ['QQQJ','Invesco NASDAQ Next Gen 100',22.85,1.55,[W,BM]],
  ['SKYY','First Trust Cloud Computing',82.25,1.85,[W,BM]],
  ['HACK','ETFMG Prime Cyber Security',62.45,1.25,[W,BM]],
  ['BOTZ','Global X Robotics & AI',28.52,1.65,[W,BM,RV]],
  ['ARKK','ARK Innovation ETF',48.85,2.15,[W,BM,RV]],
  ['ARKW','ARK Next Generation Internet',62.25,1.85,[W,BM]],
  ['ARKG','ARK Genomic Revolution',28.52,1.45,[W,BM]],
  ['ARKF','ARK Fintech Innovation',22.85,2.25,[W,BM]],
  ['ARKQ','ARK Autonomous Technology',52.15,1.35,[W,BM]],
  // Dividend ETFs
  ['VYM','Vanguard High Dividend Yield',118.25,0.35,[W,BM,RV]],
  ['SCHD','Schwab US Dividend Equity',82.52,0.42,[W,BM,RV]],
  ['HDV','iShares Core High Dividend',98.85,0.28,[W,BM]],
  ['DVY','iShares Select Dividend',128.52,0.32,[W,BM]],
  ['VIG','Vanguard Dividend Appreciation',168.25,0.55,[W,BM]],
  ['SDY','SPDR S&P Dividend ETF',128.35,0.38,[W,BM]],
  ['NOBL','ProShares S&P 500 Div Aristocrats',98.62,0.25,[W,BM]],
  // International ETFs
  ['VXUS','Vanguard Total Intl Stock',58.25,-0.35,[W,BM]],
  ['INDA','iShares MSCI India',48.52,0.55,[W,BM]],
  ['FXI','iShares China Large-Cap',28.85,-1.25,[W,BM]],
  ['EWZ','iShares MSCI Brazil',32.25,-0.85,[W,BM]],
  ['EWG','iShares MSCI Germany',28.52,-0.25,[W,BM]],
  ['EWJ','iShares MSCI Japan',62.85,0.45,[W,BM]],
  ['EWW','iShares MSCI Mexico',52.15,-0.55,[W,BM]],
  ['EEM','iShares MSCI Emerging Markets',42.25,-0.45,[W,BM]],
  ['AFK','VanEck Africa Index',22.85,0.85,[W,BM,E]],
  ['NGE','Global X MSCI Nigeria ETF',5.25,1.25,[W,BM,E,CH]],
  // Value ETFs
  ['VTV','Vanguard Value ETF',168.85,0.22,[W,BM]],
  ['IWD','iShares Russell 1000 Value',225.52,0.18,[W,BM]],
  ['SCHV','Schwab US Value ETF',82.25,0.25,[W,BM]],
  ['VLUE','Vanguard US Value Factor',128.52,0.15,[W,BM]],
  ['RPV','Invesco S&P 500 Pure Value',58.85,0.35,[W,BM]],
  // Small/Mid Cap ETFs
  ['VB','Vanguard Small Cap ETF',252.85,0.35,[W,BM]],
  ['VBK','Vanguard Small Cap Growth',225.25,0.85,[W,BM]],
  ['VBR','Vanguard Small Cap Value',178.52,0.22,[W,BM]],
  ['IJH','iShares Core S&P Mid-Cap',285.62,0.45,[W,BM]],
  ['IJR','iShares Core S&P Small-Cap',108.25,0.32,[W,BM]],
  ['MDY','SPDR S&P MidCap 400',525.85,0.42,[W,BM]],
  ['SCHA','Schwab US Small Cap',52.15,0.38,[W,BM]],
  // ESG ETFs
  ['ESGU','iShares ESG Aware MSCI USA',108.25,0.52,[W,BM]],
  ['SUSA','iShares MSCI USA ESG Select',98.85,0.45,[W,BM]],
  ['VSGX','Vanguard ESG Intl Stock',52.15,-0.35,[W,BM]],
  ['ESGV','Vanguard ESG US Stock',92.52,0.42,[W,BM]],
  ['CRBN','iShares MSCI ACWI Low Carbon',52.85,0.25,[W,BM]],
  // Thematic ETFs
  ['TAN','Invesco Solar ETF',42.25,2.85,[W,BM]],
  ['ICLN','iShares Global Clean Energy',15.85,1.95,[W,BM]],
  ['LIT','Global X Lithium ETF',62.52,1.25,[W,BM,RV]],
  ['Uranium','Global X Uranium ETF',28.85,2.15,[W,BM]],
  ['CIBR','First Trust NASDAQ Cybersecurity',62.35,1.35,[W,BM]],
  ['ITA','iShares US Aerospace & Defense',128.52,0.85,[W,BM]],
  ['XAR','SPDR S&P Aerospace & Defense',98.25,0.65,[W,BM]],
  ['KWEB','KraneShares CSI China Internet',22.85,-2.15,[W,BM]],
  ['MCHI','iShares MSCI China',42.52,-1.25,[W,BM]],
  ['CATH','Global X Catholic Values',52.15,0.35,[W,BM]],
  // Leveraged/Inverse
  ['TQQQ','ProShares UltraPro QQQ3x',72.85,3.45,[W,BM]],
  ['SQQQ','ProShares UltraPro Short QQQ',8.52,-3.25,[W,BM]],
  ['SPXL','Direxion Daily S&P 500 Bull 3x',98.25,1.65,[W,BM]],
  ['SPXS','Direxion Daily S&P 500 Bear 3x',12.85,-1.55,[W,BM]],
  ['UPRO','ProShares UltraPro S&P 500',82.52,1.55,[W,BM]],
  ['SDS','ProShares UltraShort S&P 500',5.85,-1.25,[W,BM]],
]

// Generate more ETFs programmatically
const moreEtfNames = [
  'RSP','EQUAL','RPG','RPV','RWL','PWV','DVY','DTN','DTY','FVD',
  'VIG','VYM','SCHD','HDV','SDY','DLN','DGRW','DGT','FVD','TDV',
  'AIEQ','BUFD','DRSK','GJUL','JULZ','NULG','NUSC','PSEP','PWRY','QDF',
  'QEMN','QGPL','ROAM','ROUS','SDEM','SIZE','SMIN','SPLL','SPMO','SPMV',
  'SPLV','SPHD','SPYV','SPYG','RSPG','RSPS','RSCO','RSPE','RSPF','RSPH',
  'IWB','IWM','IWC','IWF','IWD','IWP','IWS','IWM','IWN','IWO',
  'IYZ','IYR','IYE','IYH','IYG','IYF','IYE','IYJ','IYM','IYK',
  'IYC','IYV','IYW','IYW','IYE','IYG','IYH','IYR','IYZ','IYY',
  'FDL','FVD','FMB','FMN','FMI','FMO','FPE','FPS','FPX','FRG',
  'FVD','FWN','FYX','FYT','GAM','GBF','GII','GNR','GOV','GRI',
  'GSO','GTT','GURU','GXI','HAI','HEW','HFG','HHY','HIY','HTR',
  'IAK','IAU','IBB','IBB','IEZ','IFGL','IGF','IGM','IGV','IHE',
  'IHF','IHI','IHM','IHF','IHS','IHY','IHZ','III','IJJ','IJK',
  'IJT','IJP','IJR','IJS','IJT','OEF','ONEK','PBP','PEJ','PEZ',
  'PFI','PGJ','PHO','PIO','PKB','PBJ','PJP','PPA','PRF','PTF',
  'PUI','PWB','PWV','PWT','PXI','PXQ','PXW','PYZ','PZD','PZI',
  'QABA','QCLN','QDEF','QLEN','QYLD','REET','REGL','RFG','RFV','RGI',
  'RHS','RING','RLV','ROBO','ROM','RPG','RPT','RPV','RSP','RSX',
  'RUSL','RUSS','RWR','RYF','RYH','RYJ','RYT','SBB','SCG','SCHX',
  'SCHM','SCHO','SCHP','SCHR','SCHZ','SCZ','SECT','SIL','SIXS','SKF',
  'SLVP','SMDD','SMH','SOCL','SOXX','SOYB','SPHB','SPIP','SPLV','SPMB',
  'SPSB','SPTS','STIP','STPZ','SUB','SYE','TAN','TBF','TBT','TBZ',
  'TFI','THRK','TIP','TIPX','TLH','TLO','TMF','TMV','TNA','TQQQ',
  'TTT','TWM','TYD','TYO','UNG','USDU','USL','UUP','UVXY','VBK',
  'VCR','VDC','VDE','VFH','VGT','VHT','VIS','VGT','VNM','VOE',
  'VOX','VPU','VTEB','VTI','VTV','VWO','VXUS','WDIV','XBI','XHB',
  'XME','XOP','XPH','XSD','XSW','XT','XTL','XWEB','YINN','ZROZ',
]

const etfAssets: Asset[] = [
  ...etfList.map(([s, n, p, c, ph]) => et(s, n, p, c, ph)),
  ...moreEtfNames.map(t => et(t, `${t} ETF`, Math.round((10 + rand7() * 200) * 100) / 100, Math.round((rand() * 4 - 2) * 100) / 100, [W, BM, RV], `${Math.round(rand2() * 500)}M`)),
]

// ═══════════════════════════════════════════════════════
// SYNTHETICS — 50+ (Deriv-specific)
// ═══════════════════════════════════════════════════════
const syntheticsAssets: Asset[] = [
  sy('V10','Volatility 10 Index',852.25,0.15,[D]),
  sy('V25','Volatility 25 Index',3285.85,0.25,[D]),
  sy('V50','Volatility 50 Index',5285.52,0.35,[D]),
  sy('V75','Volatility 75 Index',12852.00,0.55,[D]),
  sy('V100','Volatility 100 Index',28525.85,0.85,[D]),
  sy('V10(1S)','Volatility 10 Index (1s)',852.52,0.12,[D]),
  sy('V25(1S)','Volatility 25 Index (1s)',3285.25,0.22,[D]),
  sy('V50(1S)','Volatility 50 Index (1s)',5285.85,0.32,[D]),
  sy('V75(1S)','Volatility 75 Index (1s)',12852.52,0.52,[D]),
  sy('V100(1S)','Volatility 100 Index (1s)',28525.25,0.82,[D]),
  sy('C10','Continuous 10 Index',1285.25,0.08,[D]),
  sy('C25','Continuous 25 Index',2585.52,0.12,[D]),
  sy('C50','Continuous 50 Index',3852.85,0.18,[D]),
  sy('C75','Continuous 75 Index',5285.25,0.22,[D]),
  sy('C100','Continuous 100 Index',8852.52,0.28,[D]),
  sy('C10(1S)','Continuous 10 Index (1s)',1285.52,0.05,[D]),
  sy('C25(1S)','Continuous 25 Index (1s)',2585.85,0.08,[D]),
  sy('C50(1S)','Continuous 50 Index (1s)',3852.25,0.12,[D]),
  sy('C75(1S)','Continuous 75 Index (1s)',5285.52,0.18,[D]),
  sy('C100(1S)','Continuous 100 Index (1s)',8852.85,0.22,[D]),
  sy('R10','Range Break 100 Index',525.85,-0.15,[D]),
  sy('R25','Range Break 100 Index',3285.25,-0.25,[D]),
  sy('R50','Range Break 100 Index',5852.52,-0.35,[D]),
  sy('R75','Range Break 100 Index',8852.85,-0.45,[D]),
  sy('R100','Range Break 100 Index',12852.25,-0.55,[D]),
  sy('R10(1S)','Range Break 100 Index (1s)',525.52,-0.12,[D]),
  sy('R25(1S)','Range Break 100 Index (1s)',3285.85,-0.22,[D]),
  sy('R50(1S)','Range Break 100 Index (1s)',5852.25,-0.32,[D]),
  sy('R75(1S)','Range Break 100 Index (1s)',8852.52,-0.42,[D]),
  sy('R100(1S)','Range Break 100 Index (1s)',12852.85,-0.52,[D]),
  sy('STEP1','Step Index 0.5',128.52,0.02,[D]),
  sy('STEP2','Step Index 1.0',258.85,0.05,[D]),
  sy('STEP3','Step Index 2.0',528.25,0.08,[D]),
  sy('STEP4','Step Index 3.0',852.52,0.12,[D]),
  sy('STEP5','Step Index 5.0',1285.85,0.15,[D]),
  sy('DRIFT1','Drift Index 1',5285.25,0.05,[D]),
  sy('DRIFT2','Drift Index 2',8852.52,0.08,[D]),
  sy('DRIFT3','Drift Index 3',12852.85,0.12,[D]),
  sy('BC10','Bear Bull 10 Index',4285.52,0.15,[D]),
  sy('BC25','Bear Bull 25 Index',6852.85,0.25,[D]),
  sy('BC50','Bear Bull 50 Index',9852.25,0.35,[D]),
  sy('BC75','Bear Bull 75 Index',14852.52,0.45,[D]),
  sy('BC100','Bear Bull 100 Index',22852.85,0.55,[D]),
  sy('G10','Crash 1000 Index',3285.25,-0.85,[D]),
  sy('G25','Crash 1000 Index',2585.52,-1.25,[D]),
  sy('G50','Crash 1000 Index',1852.85,-1.85,[D]),
  sy('G75','Crash 1000 Index',1285.25,-2.45,[D]),
  sy('G100','Crash 1000 Index',852.52,-3.25,[D]),
]

// ═══════════════════════════════════════════════════════
// ALL ASSETS COMBINED
// ═══════════════════════════════════════════════════════
export const allAssets: Asset[] = [
  ...forexAssets,
  ...stocksData,
  ...cryptoAssets,
  ...commoditiesAssets,
  ...indicesAssets,
  ...etfAssets,
  ...syntheticsAssets,
]

// Get assets by category
export function getAssetsByCategory(category: AssetCategory): Asset[] {
  return allAssets.filter(a => a.category === category)
}

// Get assets by phase
export function getAssetsByPhase(phase: AssetPhase): Asset[] {
  return allAssets.filter(a => a.phases.includes(phase))
}

// Search assets
export function searchAssets(query: string): Asset[] {
  const q = query.toLowerCase()
  return allAssets.filter(a => 
    a.symbol.toLowerCase().includes(q) || 
    a.name.toLowerCase().includes(q)
  )
}

// Get unique asset count
export function getAssetCount(): number {
  return allAssets.length
}

// Get category count
export function getCategoryCount(category: AssetCategory): number {
  return allAssets.filter(a => a.category === category).length
}

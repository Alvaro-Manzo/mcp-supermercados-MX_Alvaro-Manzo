export type MarketId = "mx" | "cl";

export interface MarketConfig {
  id: MarketId;
  countryName: string;
  currencyCode: "MXN" | "CLP";
  thousandSeparator: "." | ",";
}

const MARKET_CONFIG: Record<MarketId, MarketConfig> = {
  mx: {
    id: "mx",
    countryName: "México",
    currencyCode: "MXN",
    thousandSeparator: ",",
  },
  cl: {
    id: "cl",
    countryName: "Chile",
    currencyCode: "CLP",
    thousandSeparator: ".",
  },
};

export function resolveMarket(raw = process.env.SUPERMERCADOS_MARKET): MarketId {
  return raw?.toLowerCase() === "cl" ? "cl" : "mx";
}

export function getMarketConfig(raw = process.env.SUPERMERCADOS_MARKET): MarketConfig {
  return MARKET_CONFIG[resolveMarket(raw)];
}

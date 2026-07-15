import { describe, expect, it } from "vitest";
import { getMarketConfig, resolveMarket } from "../../src/core/market.js";

describe("market config", () => {
  it("usa México como fallback", () => {
    expect(resolveMarket(undefined)).toBe("mx");
    expect(getMarketConfig(undefined).currencyCode).toBe("MXN");
  });

  it("permite Chile explícito", () => {
    expect(resolveMarket("cl")).toBe("cl");
    expect(getMarketConfig("cl").currencyCode).toBe("CLP");
  });
});

import { getMarketConfig } from "./market.js";

/**
 * Formato de cara al usuario. Las tools devuelven números crudos
 * para que el modelo calcule, pero incluir también el texto formateado ayuda a
 * que responda parejo ("$12,345" en vez de 12345, ahorro en %).
 */

/** Entero en moneda local a texto: 12345 -> "$12,345" (MX) / "$12.345" (CL). */
export function formatClp(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "—";
  const n = Math.round(value);
  const { thousandSeparator } = getMarketConfig();
  const sign = n < 0 ? "-" : "";
  const digits = Math.abs(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  return `${sign}$${digits}`;
}

/** Porcentaje de ahorro sobre un total, redondeado. 0 si no aplica. */
export function savingPct(saving: number, base: number): number {
  if (base <= 0 || saving <= 0) return 0;
  return Math.round((saving / base) * 100);
}

export interface PriceScopeInfo {
  priceScope: "sucursal" | "nacional";
  priceScopeNote?: string;
}

/**
 * Alcance de los precios según si la consulta llevó sucursal. Viaja dentro de
 * la respuesta (no solo en el schema) para que el modelo repita el caveat al
 * usuario en vez de afirmar precios exactos que su sucursal puede no tener.
 */
export function priceScopeInfo(branchId?: string): PriceScopeInfo {
  if (branchId) return { priceScope: "sucursal" };
  return {
    priceScope: "nacional",
    priceScopeNote:
      "Precios de catálogo nacional (sin sucursal): el precio en la sucursal del usuario puede ser " +
      "distinto. Advertirlo al recomendar. Para precios exactos, obtener la sucursal con discover_branch " +
      "(o el prompt conectar_sesion) y repetir la consulta con branchId.",
  };
}

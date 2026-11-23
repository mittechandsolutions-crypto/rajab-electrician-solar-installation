export interface SolarCalculationInput {
  monthlyBillPKR: number;
  ratePerWatt?: number;
  avgUnitCost?: number;
  netMeteringCost?: number;
}

export interface SolarCalculationResult {
  monthlyBillPKR: number;
  estimatedUnits: number;
  recommendedKw: number;
  panelCount: number;
  spaceRequiredSqFt: number;
  systemCostPKR: number;
  netMeteringCostPKR: number;
  totalInvestmentPKR: number;
  monthlySavingsPKR: number;
  annualSavingsPKR: number;
  paybackPeriodYears: number;
  lifetimeSavings25YearsPKR: number;
  co2OffsetTonsPerYear: number;
}

export function calculateSolarRequirements(input: SolarCalculationInput): SolarCalculationResult {
  const avgUnitCost = input.avgUnitCost || Number(process.env.DEFAULT_AVG_UNIT_COST) || 62;
  const ratePerWatt = input.ratePerWatt || Number(process.env.DEFAULT_SOLAR_RATE_PER_WATT) || 120;
  const netMeteringCost = input.netMeteringCost || Number(process.env.DEFAULT_NET_METERING_COST) || 85000;

  // Monthly electricity consumption estimate in kWh (units)
  const estimatedUnits = Math.round(input.monthlyBillPKR / avgUnitCost);

  // In Faisalabad, average peak sun hours yield approx 120 kWh per 1 kW system per month
  const unitsPerKwMonth = 120;
  const exactKw = estimatedUnits / unitsPerKwMonth;

  // Round to realistic residential & commercial standard sizes (e.g., 3kW, 5kW, 7kW, 10kW, 15kW, 20kW, 30kW...)
  let recommendedKw = Math.ceil(exactKw);
  if (recommendedKw < 3) recommendedKw = 3;

  // Modern Tier-1 bifacial panels typically ~585W to 600W
  const panelWattage = 585;
  const panelCount = Math.ceil((recommendedKw * 1000) / panelWattage);

  // Each panel requires approx 30 sq ft including clearance and maintenance path
  const spaceRequiredSqFt = panelCount * 28;

  // Estimated system cost (Panels + Inverter + Elevated Structure + Cables + AC/DC DBs)
  const systemCostPKR = recommendedKw * 1000 * ratePerWatt;
  const totalInvestmentPKR = systemCostPKR + (recommendedKw >= 5 ? netMeteringCost : 0);

  // Solar generation offsets approx 90% of electricity bill on net metering
  const monthlySavingsPKR = Math.round(input.monthlyBillPKR * 0.9);
  const annualSavingsPKR = monthlySavingsPKR * 12;

  const paybackPeriodYears = Number((totalInvestmentPKR / annualSavingsPKR).toFixed(1));
  const lifetimeSavings25YearsPKR = (annualSavingsPKR * 25) - totalInvestmentPKR;

  // 1 kW solar in Pakistan offsets approximately 1.1 metric tons of CO2 per year
  const co2OffsetTonsPerYear = Number((recommendedKw * 1.1).toFixed(1));

  return {
    monthlyBillPKR: input.monthlyBillPKR,
    estimatedUnits,
    recommendedKw,
    panelCount,
    spaceRequiredSqFt,
    systemCostPKR,
    netMeteringCostPKR: recommendedKw >= 5 ? netMeteringCost : 0,
    totalInvestmentPKR,
    monthlySavingsPKR,
    annualSavingsPKR,
    paybackPeriodYears,
    lifetimeSavings25YearsPKR,
    co2OffsetTonsPerYear,
  };
}

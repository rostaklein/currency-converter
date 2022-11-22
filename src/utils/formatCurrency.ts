export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  }).format(amount);

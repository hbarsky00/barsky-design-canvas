const PROMO_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "by",
  "for",
  "from",
  "how",
  "in",
  "into",
  "of",
  "on",
  "the",
  "to",
  "with",
  "without",
]);

const getPromoTokens = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[%↑↓×]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !PROMO_STOP_WORDS.has(token));
};

export const shouldShowPromoImpact = (
  title: string,
  description: string,
  impact?: string,
) => {
  if (!impact?.trim()) return false;

  const impactTokens = Array.from(new Set(getPromoTokens(impact)));
  if (impactTokens.length === 0) return false;

  const contextTokens = new Set([
    ...getPromoTokens(title),
    ...getPromoTokens(description),
  ]);

  const overlapCount = impactTokens.filter((token) => contextTokens.has(token)).length;

  return overlapCount / impactTokens.length < 0.6;
};
/** Normalize Arabic spelling and accents without changing stored content. */
export function normalizeSearch(value: string): string {
  return value.toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
export function scoreSearchItem(item: { title: string; description: string; keywords: string }, query: string): number {
  const q = normalizeSearch(query);
  if (!q) return 0;
  const title = normalizeSearch(item.title), keywords = normalizeSearch(item.keywords), description = normalizeSearch(item.description);
  const tokens = [...new Set(q.split(/\s+/))];
  let score = 0;
  for (const token of tokens) {
    const weight = title.includes(token) ? 10 : keywords.includes(token) ? 6 : description.includes(token) ? 2 : 0;
    if (!weight) return 0;
    score += weight;
  }
  return score + (title === q ? 100 : title.includes(q) ? 30 : 0);
}

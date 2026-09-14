const FAQ_HEADINGS = ["Frequently Asked Questions", "الأسئلة الشائعة"];

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

export type FaqPair = { question: string; answer: string };

/**
 * Every guide's MDX body follows the same authored convention: a
 * "## Frequently Asked Questions" (or Arabic equivalent) section containing
 * "**Question?**\nAnswer" pairs. Extracting these lets us emit FAQPage
 * structured data without maintaining a second copy of the content.
 */
export function extractFaqPairs(content: string): FaqPair[] {
  const headingPattern = new RegExp(`^##\\s+(${FAQ_HEADINGS.join("|")})\\s*$`, "m");
  const headingMatch = headingPattern.exec(content);
  if (!headingMatch) return [];

  const afterHeading = content.slice(headingMatch.index + headingMatch[0].length);
  const nextHeadingIndex = afterHeading.search(/^##\s+/m);
  const section = nextHeadingIndex === -1 ? afterHeading : afterHeading.slice(0, nextHeadingIndex);

  const pairPattern = /\*\*(.+?)\*\*\s*\n([\s\S]+?)(?=\n\s*\n\*\*|\n*$)/g;
  const pairs: FaqPair[] = [];
  let match: RegExpExecArray | null;
  while ((match = pairPattern.exec(section)) !== null) {
    const question = stripMarkdown(match[1].trim());
    const answer = stripMarkdown(match[2].trim().replace(/\s+/g, " "));
    if (question && answer) pairs.push({ question, answer });
  }
  return pairs;
}

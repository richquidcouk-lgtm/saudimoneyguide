export type ArticleNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: ArticleNode[] };
export type ContentsItem = { id: string; title: string; depth: number };
export type ArticleLink = { title: string; href: string };
export function collectArticleNavigation(tree: ArticleNode) {
  const headings: ContentsItem[] = [];
  const sources: ArticleLink[] = [];
  const toolSlugs: string[] = [];
  const seen = new Set<string>();
  const text = (node: ArticleNode): string => node.type === 'text' ? node.value ?? '' : (node.children ?? []).map(text).join('');
  function visit(node: ArticleNode) {
    if (node.type === 'element') {
      if (['h2', 'h3'].includes(node.tagName ?? '') && typeof node.properties?.id === 'string') {
        headings.push({ id: node.properties.id, title: text(node), depth: node.tagName === 'h2' ? 2 : 3 });
      }
      if (node.tagName === 'a' && typeof node.properties?.href === 'string') {
        const href = node.properties.href;
        const tool = href.match(/^\/(?:en\/|ar\/)?tools\/([a-z0-9-]+)(?:[#?].*)?$/);
        if (tool && !toolSlugs.includes(tool[1])) toolSlugs.push(tool[1]);
        if (href.startsWith('https://') && !seen.has(href)) {
          try { const url = new URL(href); if (!url.username && !url.password) { sources.push({ title: text(node) || url.hostname, href }); seen.add(href); } } catch { /* Ignore malformed authored URLs. */ }
        }
      }
    }
    node.children?.forEach(visit);
  }
  visit(tree);
  const words = text(tree).trim().split(/\s+/u).filter(Boolean).length;
  return { headings, sources, toolSlugs, readingMinutes: Math.max(1, Math.ceil(words / 200)) };
}

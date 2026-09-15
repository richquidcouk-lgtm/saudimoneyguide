import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getMdxComponents } from '@/components/mdx-components';
import { collectArticleNavigation, type ArticleNode } from '@/lib/article-navigation';
import type { Locale } from '@/i18n/routing';

export async function prepareArticle(source: string, locale: Locale) {
  let navigation = collectArticleNavigation({ type: 'root' });
  function collect() { return (tree: ArticleNode) => { navigation = collectArticleNavigation(tree); }; }
  const { content } = await compileMDX({ source, components: getMdxComponents(locale), options: {
    // Repository-authored MDX uses object props for the existing diagrams.
    blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, collect] },
  } });
  return { content, ...navigation };
}

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../lib/article-navigation.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
const exports = {};
vm.runInNewContext(outputText, { exports, URL });
const { collectArticleNavigation } = exports;
const text = value => ({ type: 'text', value });
const element = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
test('contents preserve renderer IDs for Arabic, repeated headings and inline emphasis', () => {
  const result = collectArticleNavigation({ type: 'root', children: [element('h2', { id: 'حساب-الراتب' }, [text('حساب '), element('strong', {}, [text('الراتب')])]), element('h2', { id: 'حساب-الراتب-1' }, [text('حساب الراتب')])] });
  assert.equal(result.headings[0].title, 'حساب الراتب');
  assert.equal(result.headings.map(h => h.id).join(','), 'حساب-الراتب,حساب-الراتب-1');
});
test('references deduplicate and ignore unsafe or malformed URLs; tools retain locale paths', () => {
  const links = [element('a', {href:'https://example.org/source'}, [text('Original source')]), element('a', {href:'https://example.org/source'}, [text('Again')]), element('a', {href:'javascript:alert(1)'}, []), element('a', {href:'https://'}, []), element('a', {href:'/ar/tools/salary-calculator#result'}, [])];
  const result = collectArticleNavigation({type:'root', children:links});
  assert.equal(result.sources.length,1);
  assert.equal(result.sources[0].title,'Original source');
  assert.equal(result.toolSlugs.join(','),'salary-calculator');
});
test('empty articles still show a bounded approximate reading time', () => {
  assert.equal(collectArticleNavigation({type:'root'}).readingMinutes,1);
});

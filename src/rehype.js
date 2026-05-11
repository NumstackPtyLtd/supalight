import { createHighlighter } from 'shiki';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const darkTheme = require('./themes/dark.json');
const lightTheme = require('./themes/light.json');

let highlighterPromise = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [darkTheme, lightTheme],
      langs: [
        'javascript', 'typescript', 'jsx', 'tsx',
        'json', 'bash', 'shell', 'sh',
        'html', 'css', 'yaml', 'yml',
        'python', 'go', 'rust', 'sql',
        'markdown', 'mdx', 'dockerfile',
        'diff', 'graphql', 'toml', 'xml',
      ],
    });
  }
  return highlighterPromise;
}

export default function rehypeSupalight() {
  return async function (tree) {
    const highlighter = await getHighlighter();
    const { visit } = await import('unist-util-visit');
    const { fromHtml } = await import('hast-util-from-html');

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre') return;

      const code = node.children?.[0];
      if (!code || code.tagName !== 'code') return;

      const classNames = code.properties?.className || [];
      const langClass = classNames.find(c => typeof c === 'string' && c.startsWith('language-'));
      const lang = langClass ? langClass.replace('language-', '') : 'text';

      const text = getTextContent(code);
      if (!text.trim()) return;

      const resolvedLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

      const html = highlighter.codeToHtml(text, {
        lang: resolvedLang,
        themes: {
          dark: 'supalight-dark',
          light: 'supalight-light',
        },
        defaultColor: false,
      });

      // Parse the HTML string into hast nodes (MDX-compatible)
      const fragment = fromHtml(html, { fragment: true });
      if (fragment.children?.length > 0) {
        parent.children.splice(index, 1, ...fragment.children);
      }
    });
  };
}

function getTextContent(node) {
  if (node.type === 'text') return node.value || '';
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}

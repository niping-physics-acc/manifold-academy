import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * 递归或者通过正则渲染指定 DOM 元素内的数学公式
 * 支持:
 *  - 独立块公式: $$ ... $$
 *  - 行内公式: $ ... $
 *  - 带有 data-tex 属性的专属节点
 */
export function renderMathInElement(container) {
  if (!container) return;

  // 1. 处理显式带有 data-tex 的容器
  const texNodes = container.querySelectorAll('[data-tex]');
  texNodes.forEach(node => {
    const tex = node.getAttribute('data-tex');
    const displayMode = node.getAttribute('data-display') === 'true';
    try {
      katex.render(tex, node, {
        displayMode,
        throwOnError: false,
        strict: false
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
    }
  });

  // 2. 遍历文本节点，替换 $$ ... $$ 和 $ ... $
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // 排除 script, style, pre, code 和已经渲染过的 katex 元素
        const parentTag = node.parentElement?.tagName.toLowerCase();
        if (['script', 'style', 'textarea'].includes(parentTag)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.parentElement?.closest('.katex') || node.parentElement?.closest('code')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.nodeValue.includes('$')) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentNode;
    if (!parent) continue;

    const rawText = textNode.nodeValue;
    // 匹配 $$ ... $$ 或 $ ... $
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    if (!regex.test(rawText)) continue;

    regex.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(rawText)) !== null) {
      // 匹配项之前的纯文本
      if (match.index > lastIdx) {
        fragment.appendChild(document.createTextNode(rawText.slice(lastIdx, match.index)));
      }

      const matchStr = match[0];
      const isDisplay = matchStr.startsWith('$$');
      const mathCode = isDisplay ? matchStr.slice(2, -2) : matchStr.slice(1, -1);

      const span = document.createElement(isDisplay ? 'div' : 'span');
      if (isDisplay) span.className = 'math-block';
      else span.className = 'math-inline';

      try {
        katex.render(mathCode, span, {
          displayMode: isDisplay,
          throwOnError: false,
          strict: false
        });
      } catch (e) {
        span.textContent = matchStr;
      }

      fragment.appendChild(span);
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < rawText.length) {
      fragment.appendChild(document.createTextNode(rawText.slice(lastIdx)));
    }

    parent.replaceChild(fragment, textNode);
  }
}

/**
 * 直接渲染一段 TeX 为 HTML 字符串
 */
export function formatTex(tex, displayMode = false) {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false
    });
  } catch (err) {
    return tex;
  }
}

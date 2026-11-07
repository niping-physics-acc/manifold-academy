const LEVELS = ['基础', '进阶', '挑战', '专题'];
export const exerciseLevel = hw => LEVELS.includes(hw.difficulty) ? hw.difficulty : '专题';

export function renderSectionPractice(section, homework) {
  const related = homework.filter(hw => hw.sectionId === section.id);
  return related.length ? `<nav class="section-practice" aria-label="本节配套练习"><h3>读完这一节，动手练一练</h3><ul>${related.map(hw => `<li><span class="badge badge-cyan">${exerciseLevel(hw)}</span> <a href="#card-${hw.id}">${hw.title}</a></li>`).join('')}</ul></nav>` : '';
}

export function renderPracticeSet(chapter, completed) {
  const levels = LEVELS.filter(level => chapter.homework.some(hw => exerciseLevel(hw) === level));
  return `<section class="homework-section lesson-extra-page" id="homework-section">
    <h2>分层练习 · ${chapter.homework.length} 题</h2>
    <p>先独立尝试，再逐个展开提示。基础题练操作，进阶题连接概念，挑战题检验条件与推导；专题题延续原有研讨。看懂答案后，建议合上解答再独立做一次。</p>
    <div class="practice-controls"><label>选择难度 <select data-practice-filter><option value="all">全部难度</option>${levels.map(level => `<option value="${level}">${level}（${chapter.homework.filter(hw => exerciseLevel(hw) === level).length} 题）</option>`).join('')}</select></label>
      <label><input type="checkbox" data-practice-remaining> 只看未掌握</label><span data-practice-progress role="status"></span></div>
    <p data-practice-empty hidden>当前筛选下没有题目。可以切换难度或取消“只看未掌握”。</p>
    ${chapter.homework.map((hw, i) => {
      const done = completed.includes(hw.id);
      const section = chapter.sections.find(s => s.id === hw.sectionId);
      return `<article class="problem-card glass-panel ${done ? 'completed' : ''}" id="card-${hw.id}" data-practice-level="${exerciseLevel(hw)}">
        <div class="problem-top"><h3>${i + 1}. ${hw.title}</h3><button class="problem-check-btn ${done ? 'checked' : ''}" data-hw-id="${hw.id}" aria-pressed="${done}">${done ? '✓ 已掌握' : '标记已掌握'}</button></div>
        <div class="practice-meta"><span class="badge badge-purple">${exerciseLevel(hw)}</span>${section ? `<a href="#${section.id}">回看正文 § ${section.number}</a>` : '<span>综合专题研讨</span>'}</div>
        <div class="problem-body">${hw.statement}</div>
        <div class="problem-hints-area">${hw.hints.map((hint, j) => `<details class="hint-box"><summary>提示 ${j + 1}</summary><div>${hint}</div></details>`).join('')}
          <details class="solution-box proof-card"><summary>展开解答与分步推导</summary><div class="proof-body">${hw.solution}</div></details></div>
      </article>`;
    }).join('')}
  </section>`;
}

export function mountPracticeSet(root) {
  const slot = root.querySelector('#homework-section');
  if (!slot) return { refresh() {}, reveal() {}, cleanup() {} };
  const controller = new AbortController();
  const difficulty = slot.querySelector('[data-practice-filter]');
  const remaining = slot.querySelector('[data-practice-remaining]');
  const cards = [...slot.querySelectorAll('[data-practice-level]')];
  function refresh() {
    let shown = 0, done = 0;
    cards.forEach(card => {
      const isDone = card.classList.contains('completed');
      if (isDone) done++;
      card.hidden = (difficulty.value !== 'all' && difficulty.value !== card.dataset.practiceLevel) || (remaining.checked && isDone);
      if (!card.hidden) shown++;
    });
    slot.querySelector('[data-practice-progress]').textContent = `显示 ${shown} / ${cards.length} 题 · 已掌握 ${done} 题`;
    slot.querySelector('[data-practice-empty]').hidden = shown !== 0;
  }
  difficulty.addEventListener('change', refresh, { signal: controller.signal });
  remaining.addEventListener('change', refresh, { signal: controller.signal });
  refresh();
  return { refresh,
    reveal(target) {
      const card = target.closest('[data-practice-level]');
      if (card?.hidden) { difficulty.value = 'all'; remaining.checked = false; refresh(); }
    },
    cleanup() { controller.abort(); }
  };
}

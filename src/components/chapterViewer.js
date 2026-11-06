import { DISCIPLINES, CHAPTERS } from '../data/curriculum.js';
import { LEARNING_PATH, getLearningRoute } from '../data/learningPath.js';
import { renderMathInElement } from '../utils/katexRenderer.js';
import { getCompletedChapters, toggleChapterCompleted, getCompletedHomework, toggleHomeworkCompleted, getReadingPosition, saveReadingPosition } from '../utils/storage.js';
import { mountLessonLabs } from '../labs/lessonLabs.js';
import { createSymplecticLab } from '../labs/symplecticLab.js';
import { createActionLab } from '../labs/actionLab.js';
import { createBakerMapLab } from '../labs/bakerMapLab.js';
import { createDiffGeomLab, createRadiationLab, createSpinorLab, createWavePacketLab } from '../labs/extraLabs.js';

const labFactories = { hamiltonian: createSymplecticLab, lagrangian: createActionLab, 'stat-mech': createBakerMapLab,
  'diff-geom': createDiffGeomLab, electrodynamics: createRadiationLab, 'lie-groups': createSpinorLab, quantum: createWavePacketLab };
const lessonLink = (id, label, section = '') => `<a href="#chapter-${id}${section ? '/' + section : ''}" data-lesson-chapter="${id}" data-lesson-section="${section}">${label}</a>`;

export function createChapterViewer(chapterId, onNavigate, initialTarget = null) {
  const chapter = CHAPTERS[chapterId] || CHAPTERS['calculus-bridge'];
  const discipline = DISCIPLINES.find(d => d.id === chapter.disciplineId);
  const route = getLearningRoute(chapter.id);
  const routeIndex = LEARNING_PATH.indexOf(route);
  const ordered = route?.firstRead ? route.firstRead.map(id => chapter.sections.find(s => s.id === id)) : chapter.sections;
  const completed = getCompletedChapters(), completedHW = getCompletedHomework();
  const hasLab = Boolean(labFactories[chapter.disciplineId]);
  const pages = ordered.map(s => ({ id: s.id, label: `${s.number} ${s.heading}` }));
  if (hasLab) pages.push({ id: 'inline-lab-slot', label: '专题互动实验室' });
  if (chapter.homework.length) pages.push({ id: 'homework-section', label: '课后研讨与推导' });
  const wrapper = document.createElement('div');
  wrapper.className = 'content-view container';
  const controller = new AbortController();
  const listen = (el, type, fn) => el.addEventListener(type, fn, { signal: controller.signal });
  const readerControls = `<div class="lesson-reader-controls"><button class="btn btn-secondary btn-sm" data-reader-prev>← 上一节</button><span data-reader-position aria-live="polite"></span><button class="btn btn-secondary btn-sm" data-reader-next>下一节 →</button></div>`;
  wrapper.innerHTML = `<div class="layout-sidebar-main">
    <aside class="sidebar glass-panel">
      <div class="sidebar-title" id="sidebar-header-toggle"><span>学习路线 · ${LEARNING_PATH.length} 门课</span><button type="button" class="sidebar-mobile-toggle" id="btn-sidebar-mobile-toggle" aria-expanded="false" aria-controls="lesson-nav-tree">展开目录 ▾</button></div>
      <nav class="nav-tree" id="lesson-nav-tree" aria-label="课程目录">${LEARNING_PATH.map((r, i) => `<div class="tree-group ${r.chapterId === chapter.id ? 'active-group' : ''}">
        <a class="tree-item ${r.chapterId === chapter.id ? 'active' : ''}" href="#chapter-${r.chapterId}" data-lesson-chapter="${r.chapterId}"><span class="tree-status-dot ${completed.includes(r.chapterId) ? 'completed' : ''}"></span><span>${i + 1}. ${r.title}</span></a>
        ${r.chapterId === chapter.id ? `<div class="tree-sub-list">${pages.map(p => `<a href="#${p.id}" class="tree-sub-item" data-target="${p.id}"><span class="tree-sub-dot"></span><span>${p.label}</span></a>`).join('')}</div>` : ''}
      </div>`).join('')}</nav>
    </aside>
    <main class="main-content">
      <header class="article-header"><div class="article-breadcrumbs"><span>${discipline.title}</span><span>/</span><span>${chapter.level}</span></div>
        <h1 class="article-title">${chapter.title}</h1><p class="article-subtitle">${chapter.subtitle}</p>
        <div class="article-meta"><span class="badge badge-cyan">${chapter.readingTime}</span><span class="badge badge-amber">${chapter.sections.length} 节</span><button class="btn btn-secondary btn-sm" id="btn-toggle-chapter-done">${completed.includes(chapter.id) ? '✓ 本课已完成' : '标记本课已完成'}</button></div>
      </header>
      <div class="lesson-guide"><span class="lesson-eyebrow">${route?.stage || '专题研读'} · 本课要解决的问题</span><p>${route?.goal || chapter.summary}</p>
        <p class="learning-prereqs">先修：${route?.prerequisites.length ? route.prerequisites.map(id => lessonLink(id, CHAPTERS[id].title.split('：')[0])).join(' · ') : '一元微积分与中学代数'}</p>
        ${route?.preparation ? `<p>${lessonLink(route.preparation.chapterId, route.preparation.label, route.preparation.sectionId)}</p>` : ''}
        ${route?.note ? `<p>${route.note}</p>` : ''}<details><summary>课程概览</summary><p>${chapter.summary}</p></details>
      </div>
      <details class="lesson-index"><summary>本课目录 · 按推荐学习顺序排列</summary><nav class="chapter-toc-pillbox"><div class="toc-pills">${pages.map(p => `<a class="toc-pill" href="#${p.id}">${p.label}</a>`).join('')}</div></nav></details>
      <div class="lesson-reading-mode"><label><input type="checkbox" id="reader-all"> 整章阅读</label><span>默认一次读一节；进度自动保存在本机。</span></div>
      ${readerControls}
      <div class="prose" id="article-prose">${ordered.map(s => `<section class="chapter-sub-section" id="${s.id}"><div class="section-tag-bar"><span class="badge badge-cyan">§ ${s.number}</span></div><h2>${s.heading}</h2><div class="section-body">${s.content}</div></section>`).join('')}</div>
      ${hasLab ? '<section id="inline-lab-slot" class="lesson-extra-page" aria-label="专题互动实验室"></section>' : ''}
      ${chapter.homework.length ? `<section class="homework-section lesson-extra-page" id="homework-section"><h2>课后研讨与自我检验</h2><p>先独立尝试，再展开提示与解答。</p>${chapter.homework.map((hw, i) => `<div class="problem-card glass-panel ${completedHW.includes(hw.id) ? 'completed' : ''}" id="card-${hw.id}"><div class="problem-top"><h3>${i + 1}. ${hw.title}</h3><button class="problem-check-btn ${completedHW.includes(hw.id) ? 'checked' : ''}" data-hw-id="${hw.id}">${completedHW.includes(hw.id) ? '✓ 已掌握' : '标记已掌握'}</button></div><div class="problem-body">${hw.statement}</div><div class="problem-hints-area">${hw.hints.map((hint, j) => `<details class="hint-box"><summary>提示 ${j + 1}</summary><div>${hint}</div></details>`).join('')}<details class="solution-box"><summary>展开完整推导</summary><div>${hw.solution}</div></details></div></div>`).join('')}</section>` : ''}
      ${readerControls}
      <div class="lesson-exit"><h3>离开本课前，试着解释</h3><p>${route?.question || '你能用一个具体例子说明本课的核心结构吗？'}</p><nav class="lesson-course-nav">${routeIndex > 0 ? lessonLink(LEARNING_PATH[routeIndex - 1].chapterId, '← 上一门：' + LEARNING_PATH[routeIndex - 1].title) : ''}${routeIndex < LEARNING_PATH.length - 1 ? lessonLink(LEARNING_PATH[routeIndex + 1].chapterId, '下一门：' + LEARNING_PATH[routeIndex + 1].title + ' →') : ''}</nav></div>
    </main></div>`;

  const byId = id => [...wrapper.querySelectorAll('[id]')].find(el => el.id === id);
  const sidebar = wrapper.querySelector('.sidebar');
  const sidebarButton = wrapper.querySelector('#btn-sidebar-mobile-toggle');
  const setSidebarExpanded = expanded => {
    sidebar.classList.toggle('mobile-expanded', expanded);
    sidebarButton.setAttribute('aria-expanded', String(expanded));
    sidebarButton.textContent = expanded ? '收起目录 ▴' : '展开目录 ▾';
  };
  listen(wrapper.querySelector('#sidebar-header-toggle'), 'click', () => {
    if (window.innerWidth <= 1024) setSidebarExpanded(!sidebar.classList.contains('mobile-expanded'));
  });
  let currentIndex = 0, all = false, cleanupLab = null;
  const pageElements = pages.map(p => byId(p.id));
  function showTarget(id, scroll = true, updateUrl = true) {
    const target = byId(id) || pageElements[0];
    const page = target.closest('.chapter-sub-section, .lesson-extra-page') || pageElements[0];
    currentIndex = pages.findIndex(p => p.id === page.id);
    pageElements.forEach((el, i) => { el.hidden = !all && i !== currentIndex; });
    // Open containing disclosure cards before navigating to a nested definition.
    for (let el = target; el && el !== wrapper; el = el.parentElement) if (el.tagName === 'DETAILS') el.open = true;
    wrapper.querySelectorAll('[data-reader-position]').forEach(el => {
      el.textContent = `${currentIndex + 1} / ${pages.length} · ${pages[currentIndex].label}`;
      renderMathInElement(el);
    });
    wrapper.querySelectorAll('[data-reader-prev]').forEach(b => { b.disabled = currentIndex === 0; });
    wrapper.querySelectorAll('[data-reader-next]').forEach(b => { b.disabled = currentIndex === pages.length - 1; });
    wrapper.querySelectorAll('.tree-sub-item').forEach(link => {
      const active = link.dataset.target === page.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
    });
    saveReadingPosition(chapter.id, page.id);
    if (updateUrl) {
      const hash = `#chapter-${chapter.id}/${target.id}`;
      if (location.hash !== hash) history.pushState(null, '', hash);
    }
    if (hasLab) {
      const slot = byId('inline-lab-slot');
      if (!slot.hidden && !cleanupLab) {
        cleanupLab = labFactories[chapter.disciplineId](slot);
        renderMathInElement(slot);
      }
      else if (slot.hidden && cleanupLab) { cleanupLab(); cleanupLab = null; slot.innerHTML = ''; }
    }
    if (scroll) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
    }
  }
  listen(wrapper.querySelector('#reader-all'), 'change', e => { all = e.target.checked; showTarget(pages[currentIndex].id, false, false); });
  wrapper.querySelectorAll('[data-reader-prev]').forEach(b => listen(b, 'click', () => showTarget(pages[currentIndex - 1].id)));
  wrapper.querySelectorAll('[data-reader-next]').forEach(b => listen(b, 'click', () => showTarget(pages[currentIndex + 1].id)));
  listen(wrapper, 'click', e => {
    const link = e.target.closest('a');
    if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (link.dataset.lessonChapter) {
      e.preventDefault(); onNavigate('chapter', link.dataset.lessonChapter, link.dataset.lessonSection || null);
    } else if (link.getAttribute('href')?.startsWith('#') && byId(link.getAttribute('href').slice(1))) {
      e.preventDefault(); setSidebarExpanded(false); showTarget(link.getAttribute('href').slice(1));
    }
  });
  listen(wrapper.querySelector('#btn-toggle-chapter-done'), 'click', e => {
    const done = toggleChapterCompleted(chapter.id).includes(chapter.id);
    e.currentTarget.textContent = done ? '✓ 本课已完成' : '标记本课已完成';
    wrapper.querySelector('.tree-item.active .tree-status-dot').classList.toggle('completed', done);
  });
  wrapper.querySelectorAll('[data-hw-id]').forEach(btn => listen(btn, 'click', () => {
    const done = toggleHomeworkCompleted(btn.dataset.hwId).includes(btn.dataset.hwId);
    btn.classList.toggle('checked', done); btn.textContent = done ? '✓ 已掌握' : '标记已掌握';
    byId(`card-${btn.dataset.hwId}`).classList.toggle('completed', done);
  }));
  const cleanupLessons = mountLessonLabs(wrapper);
  const startTarget = initialTarget || getReadingPosition(chapter.id) || pages[0].id;
  // Layout-dependent labs and scrolling run after the viewer is attached.
  const timer = setTimeout(() => {
    renderMathInElement(wrapper); showTarget(startTarget, Boolean(initialTarget), false);
  }, 0);
  pageElements.forEach(el => { el.hidden = true; });
  wrapper.cleanup = () => { clearTimeout(timer); controller.abort(); cleanupLessons(); cleanupLab?.(); };
  return wrapper;
}

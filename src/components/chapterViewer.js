import { DISCIPLINES, CHAPTERS } from '../data/curriculum.js';
import { renderMathInElement } from '../utils/katexRenderer.js';
import { getCompletedChapters, toggleChapterCompleted, getCompletedHomework, toggleHomeworkCompleted } from '../utils/storage.js';

// 导入实验工厂函数
import { createSymplecticLab } from '../labs/symplecticLab.js';
import { createActionLab } from '../labs/actionLab.js';
import { createBakerMapLab } from '../labs/bakerMapLab.js';
import { createDiffGeomLab, createRadiationLab, createSpinorLab, createWavePacketLab } from '../labs/extraLabs.js';

export function createChapterViewer(chapterId, onNavigate) {
  const chapter = CHAPTERS[chapterId] || CHAPTERS['hamiltonian-01'];
  const discipline = DISCIPLINES.find(d => d.id === chapter.disciplineId) || DISCIPLINES[0];

  const wrapper = document.createElement('div');
  wrapper.className = 'content-view container';

  let currentCompletedChapters = getCompletedChapters();
  let currentCompletedHW = getCompletedHomework();
  const isChapterDone = currentCompletedChapters.includes(chapter.id);

  wrapper.innerHTML = `
    <div class="layout-sidebar-main">
      <!-- 左侧学科与章节目录导航树 -->
      <aside class="sidebar glass-panel">
        <div class="sidebar-title">学科大纲与章节索引</div>
        <div class="nav-tree">
          ${DISCIPLINES.map(d => {
            const isCurrentDisc = d.id === discipline.id;
            const isDone = currentCompletedChapters.includes(d.masterChapterId);
            return `
              <div class="tree-group">
                <div class="tree-group-title">
                  <span>${d.title}</span>
                  <span style="font-size: 0.68rem; color: var(--text-dim);">${d.topics.length} 核心点</span>
                </div>
                <div class="tree-item ${isCurrentDisc ? 'active' : ''}" data-chap="${d.masterChapterId}">
                  <span style="display:flex; align-items:center; gap:8px;">
                    <span class="tree-status-dot ${isDone ? 'completed' : ''}"></span>
                    <span>1.1 样板核心课</span>
                  </span>
                  <span style="font-size: 0.72rem; color: var(--accent-cyan); font-family: var(--font-mono);">
                    ${isDone ? '已完成' : '研读'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </aside>

      <!-- 右侧正文区 -->
      <main class="main-content">
        <article class="article-header">
          <div class="article-breadcrumbs">
            <span>${discipline.title}</span>
            <span>/</span>
            <span>${chapter.level}</span>
          </div>

          <h1 class="article-title">${chapter.title}</h1>
          <p class="article-subtitle">${chapter.subtitle}</p>

          <div class="article-meta">
            <span class="badge badge-purple">${discipline.tag}</span>
            <span class="badge badge-cyan">研读需时 ~${chapter.readingTime}</span>
            <span class="badge badge-amber">前置: ${chapter.prereqs.join(' · ')}</span>
            <button class="btn btn-secondary btn-sm" id="btn-toggle-chapter-done" style="margin-left: auto;">
              <span id="txt-chapter-done">${isChapterDone ? '✓ 本章已打卡掌握' : '标记已掌握本章'}</span>
            </button>
          </div>
        </article>

        <!-- 章节概要引言 -->
        <div class="callout callout-intuition">
          <div class="callout-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>章节主线与几何视界概览</span>
          </div>
          <p style="color: #cbd5e1; line-height: 1.75; font-size: 0.98rem;">
            ${chapter.summary}
          </p>
        </div>

        <!-- 核心小节正文 -->
        <div class="prose" id="article-prose">
          ${chapter.sections.map((sec, idx) => `
            <section style="margin-bottom: 36px;">
              <h2>
                <span class="step-number">${idx + 1}</span>
                <span>${sec.heading}</span>
              </h2>
              <div>${sec.content}</div>
            </section>
          `).join('')}
        </div>

        <!-- 原地嵌入的数字实验容器 -->
        <div id="inline-lab-slot"></div>

        <!-- 课后作业与严谨推导研讨 -->
        <section class="homework-section">
          <div class="homework-header">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom: 6px;">
              <span class="badge badge-amber">PROBLEM SET & DERIVATIONS</span>
            </div>
            <h2 style="font-size: 1.8rem; color: #fff; font-weight: 800;">课后研讨、深度推导与自我检验</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem;">
              动手推导是掌握现代几何理论物理的必由之路。每道题目配有分步提示与严谨完整的数学解析。
            </p>
          </div>

          <div id="homework-list">
            ${chapter.homework.map((hw, hIdx) => {
              const isHwDone = currentCompletedHW.includes(hw.id);
              return `
                <div class="problem-card glass-panel ${isHwDone ? 'completed' : ''}" id="card-${hw.id}">
                  <div class="problem-top">
                    <div class="problem-badge-title">
                      <span class="step-number" style="background: rgba(255, 183, 3, 0.15); color: var(--accent-amber);">${hIdx + 1}</span>
                      <h4 style="font-size: 1.12rem; color: #fff; font-weight: 700;">${hw.title}</h4>
                      <span class="badge badge-purple" style="font-size: 0.7rem;">${hw.difficulty}</span>
                    </div>
                    <button class="problem-check-btn ${isHwDone ? 'checked' : ''}" data-hw-id="${hw.id}">
                      <span>${isHwDone ? '✓ 已完全掌握' : '标记为已掌握'}</span>
                    </button>
                  </div>

                  <div class="problem-body">
                    ${hw.statement}
                  </div>

                  <div class="problem-hints-area">
                    ${hw.hints.map((hint, hintIdx) => `
                      <details class="hint-box" style="cursor: pointer;">
                        <summary style="font-weight: 600; color: #fde047; user-select: none;">
                          💡 启发提示 ${hintIdx + 1} (点击展开)
                        </summary>
                        <div style="margin-top: 8px; color: #cbd5e1;">${hint}</div>
                      </details>
                    `).join('')}

                    <details class="solution-box" style="cursor: pointer;">
                      <summary class="solution-title" style="user-select: none;">
                        <span>📐 查看严格数学推导与完整解答 (点击展开)</span>
                      </summary>
                      <div style="margin-top: 14px;">${hw.solution}</div>
                    </details>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      </main>
    </div>
  `;

  // 1. 侧边栏点击跳转
  wrapper.querySelectorAll('.tree-item').forEach(item => {
    item.addEventListener('click', () => {
      const chapId = item.getAttribute('data-chap');
      onNavigate('chapter', chapId);
    });
  });

  // 2. 本章打卡按钮
  const btnDone = wrapper.querySelector('#btn-toggle-chapter-done');
  btnDone.addEventListener('click', () => {
    const updated = toggleChapterCompleted(chapter.id);
    const nowDone = updated.includes(chapter.id);
    wrapper.querySelector('#txt-chapter-done').textContent = nowDone ? '✓ 本章已打卡掌握' : '标记已掌握本章';
    btnDone.className = nowDone ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
    // 更新侧边栏小圆点
    const dot = wrapper.querySelector(`.tree-item[data-chap="${chapter.id}"] .tree-status-dot`);
    if (dot) dot.className = `tree-status-dot ${nowDone ? 'completed' : ''}`;
  });

  // 3. 作业题打卡按钮
  wrapper.querySelectorAll('.problem-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const hwId = btn.getAttribute('data-hw-id');
      const updated = toggleHomeworkCompleted(hwId);
      const isDone = updated.includes(hwId);
      btn.className = `problem-check-btn ${isDone ? 'checked' : ''}`;
      btn.querySelector('span').textContent = isDone ? '✓ 已完全掌握' : '标记为已掌握';
      const card = wrapper.querySelector(`#card-${hwId}`);
      if (card) {
        if (isDone) card.classList.add('completed');
        else card.classList.remove('completed');
      }
    });
  });

  // 4. 挂载对应的互动实验室
  const labSlot = wrapper.querySelector('#inline-lab-slot');
  let cleanupLab = null;

  if (chapter.disciplineId === 'hamiltonian') {
    cleanupLab = createSymplecticLab(labSlot);
  } else if (chapter.disciplineId === 'lagrangian') {
    cleanupLab = createActionLab(labSlot);
  } else if (chapter.disciplineId === 'stat-mech') {
    cleanupLab = createBakerMapLab(labSlot);
  } else if (chapter.disciplineId === 'diff-geom') {
    cleanupLab = createDiffGeomLab(labSlot);
  } else if (chapter.disciplineId === 'electrodynamics') {
    cleanupLab = createRadiationLab(labSlot);
  } else if (chapter.disciplineId === 'lie-groups') {
    cleanupLab = createSpinorLab(labSlot);
  } else if (chapter.disciplineId === 'quantum') {
    cleanupLab = createWavePacketLab(labSlot);
  }

  // 5. 统一渲染 KaTeX 数学公式
  setTimeout(() => {
    renderMathInElement(wrapper);
  }, 10);

  // 提供清理回调
  wrapper.cleanup = () => {
    if (cleanupLab) cleanupLab();
  };

  return wrapper;
}

import { DISCIPLINES, CHAPTERS } from '../data/curriculum.js';
import { renderMathInElement } from '../utils/katexRenderer.js';
import { getCompletedChapters, toggleChapterCompleted, getCompletedHomework, toggleHomeworkCompleted } from '../utils/storage.js';

// 导入实验工厂函数
import { createSymplecticLab } from '../labs/symplecticLab.js';
import { createActionLab } from '../labs/actionLab.js';
import { createBakerMapLab } from '../labs/bakerMapLab.js';
import { createDiffGeomLab, createRadiationLab, createSpinorLab, createWavePacketLab } from '../labs/extraLabs.js';

const DISCIPLINE_CHAPTER_TITLES = {
  'diff-geom': '第 1 章 · 微分流形与外形式',
  'lagrangian': '第 2 章 · 切丛 TQ 与几何变分',
  'hamiltonian': '第 3 章 · 余切丛 T*Q 与束流动力学',
  'electrodynamics': '第 4 章 · 协变电动力学与规范场',
  'lie-groups': '第 5 章 · 连续李群与物理对称性',
  'stat-mech': '第 6 章 · 几何相空间与粗粒化熵增',
  'quantum': '第 7 章 · 现代几何量子力学'
};

export function createChapterViewer(chapterId, onNavigate) {
  const chapter = CHAPTERS[chapterId] || CHAPTERS['diff-geom-01'];
  const discipline = DISCIPLINES.find(d => d.id === chapter.disciplineId) || DISCIPLINES[0];

  const wrapper = document.createElement('div');
  wrapper.className = 'content-view container';

  let currentCompletedChapters = getCompletedChapters();
  let currentCompletedHW = getCompletedHomework();
  const isChapterDone = currentCompletedChapters.includes(chapter.id);

  wrapper.innerHTML = `
    <div class="layout-sidebar-main">
      <!-- 左侧学科与章节小节层级导航树 -->
      <aside class="sidebar glass-panel" style="position: sticky; top: 80px; max-height: calc(100vh - 100px); overflow-y: auto;">
        <div class="sidebar-title" style="display:flex; justify-content:space-between; align-items:center;">
          <span>课程层级索引</span>
          <span style="font-size:0.72rem; color:var(--accent-cyan); font-family:var(--font-mono);">7 学科体系</span>
        </div>
        <div class="nav-tree">
          ${DISCIPLINES.map(d => {
            const isCurrentDisc = d.id === discipline.id;
            const isDone = currentCompletedChapters.includes(d.masterChapterId);
            const chapTitle = DISCIPLINE_CHAPTER_TITLES[d.id] || d.title;

            if (isCurrentDisc) {
              return `
                <div class="tree-group active-group">
                  <div class="tree-group-title" style="color:var(--accent-cyan); font-weight:700;">
                    <span>${d.title}</span>
                    <span class="badge badge-cyan" style="font-size: 0.65rem;">当前研读</span>
                  </div>
                  
                  <div class="tree-item active" data-chap="${d.masterChapterId}">
                    <span style="display:flex; align-items:center; gap:8px;">
                      <span class="tree-status-dot ${isDone ? 'completed' : ''}"></span>
                      <strong style="color:#fff;">${chapTitle}</strong>
                    </span>
                    <span style="font-size: 0.72rem; color: var(--accent-cyan); font-family: var(--font-mono);">
                      ${isDone ? '已掌握' : chapter.sections.length + ' 节'}
                    </span>
                  </div>

                  <!-- 当前章节深度小节目录树 (Subsections TOC) -->
                  <div class="tree-sub-list">
                    ${chapter.sections.map((sec, sIdx) => {
                      const secId = sec.id || `sec-${sIdx + 1}`;
                      const shortHeading = sec.heading.split('：')[0].replace(/[\$]/g, '');
                      return `
                        <a href="#${secId}" class="tree-sub-item" data-target="${secId}">
                          <span class="tree-sub-dot"></span>
                          <span style="font-family:var(--font-mono); font-weight:700; color:var(--accent-cyan); font-size:0.72rem;">${sec.number || (sIdx + 1)}</span>
                          <span title="${sec.heading}">${shortHeading}</span>
                        </a>
                      `;
                    }).join('')}
                    
                    <a href="#inline-lab-slot" class="tree-sub-item lab-sub-item" data-target="inline-lab-slot">
                      <span class="tree-sub-dot" style="background:#a855f7;"></span>
                      <span style="color:#c084fc; font-weight:600;">⚛️ 交互仿真实验室</span>
                    </a>

                    <a href="#homework-section" class="tree-sub-item hw-sub-item" data-target="homework-section">
                      <span class="tree-sub-dot" style="background:#f59e0b;"></span>
                      <span style="color:#fbbf24; font-weight:600;">✏️ 研讨证明题 (${chapter.homework.length})</span>
                    </a>
                  </div>
                </div>
              `;
            } else {
              return `
                <div class="tree-group">
                  <div class="tree-item" data-chap="${d.masterChapterId}">
                    <span style="display:flex; align-items:center; gap:8px;">
                      <span class="tree-status-dot ${isDone ? 'completed' : ''}"></span>
                      <span>${chapTitle}</span>
                    </span>
                    <span style="font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-mono);">
                      ${isDone ? '✓ 已修' : '切换'}
                    </span>
                  </div>
                </div>
              `;
            }
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
            <span class="badge badge-amber">共 ${chapter.sections.length} 个核心专题</span>
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

        <!-- 顶部快速小节跳转导览条 -->
        <nav class="chapter-toc-pillbox">
          <div class="toc-pillbox-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px;"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            <span>本章知识架构快速直达索引：</span>
          </div>
          <div class="toc-pills">
            ${chapter.sections.map((sec, sIdx) => {
              const secId = sec.id || `sec-${sIdx + 1}`;
              const shortHeading = sec.heading.split('：')[0].replace(/[\$]/g, '');
              return `
                <a href="#${secId}" class="toc-pill">
                  <span class="toc-pill-num">${sec.number || (sIdx + 1)}</span>
                  <span class="toc-pill-text">${shortHeading}</span>
                </a>
              `;
            }).join('')}
            <a href="#inline-lab-slot" class="toc-pill lab-pill">⚛️ 互动实验室</a>
            <a href="#homework-section" class="toc-pill hw-pill">✏️ 课后研讨 (${chapter.homework.length})</a>
          </div>
        </nav>

        <!-- 核心小节正文 -->
        <div class="prose" id="article-prose">
          ${chapter.sections.map((sec, idx) => {
            const secId = sec.id || `sec-${idx + 1}`;
            return `
              <section class="chapter-sub-section" id="${secId}" style="margin-bottom: 52px; scroll-margin-top: 80px;">
                <div class="section-tag-bar" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                  <span class="badge badge-cyan" style="font-family:var(--font-mono); font-weight:700;">§ ${sec.number || (idx + 1)}</span>
                  <span style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.06em; font-family:var(--font-mono);">
                    Core Geometry Module
                  </span>
                </div>
                <h2 style="margin-top:0;">
                  <span>${sec.heading}</span>
                </h2>
                <div class="section-body">${sec.content}</div>
              </section>
            `;
          }).join('')}
        </div>

        <!-- 原地嵌入的数字实验容器 -->
        <div id="inline-lab-slot" style="scroll-margin-top: 80px;"></div>

        <!-- 课后作业与严谨推导研讨 -->
        <section class="homework-section" id="homework-section" style="scroll-margin-top: 80px;">
          <div class="homework-header">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom: 6px;">
              <span class="badge badge-amber">PROBLEM SET & RIGOROUS DERIVATIONS</span>
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

  // 1. 侧边栏跨学科点击跳转
  wrapper.querySelectorAll('.tree-item:not(.active)').forEach(item => {
    item.addEventListener('click', () => {
      const chapId = item.getAttribute('data-chap');
      if (chapId) {
        onNavigate('chapter', chapId);
      }
    });
  });

  // 2. 小节目录平滑滚动
  wrapper.querySelectorAll('.tree-sub-item, .toc-pill').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetEl = wrapper.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // 更新激活样式
          wrapper.querySelectorAll('.tree-sub-item').forEach(i => i.classList.remove('active'));
          const subItem = wrapper.querySelector(`.tree-sub-item[href="${href}"]`);
          if (subItem) subItem.classList.add('active');
        }
      }
    });
  });

  // 3. 页面滚动联动高亮 (ScrollSpy)
  const sectionsToObserve = wrapper.querySelectorAll('.chapter-sub-section, #inline-lab-slot, #homework-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        wrapper.querySelectorAll('.tree-sub-item').forEach(i => {
          if (i.getAttribute('href') === `#${id}`) {
            i.classList.add('active');
          } else {
            i.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  });

  sectionsToObserve.forEach(sec => observer.observe(sec));

  // 4. 本章打卡按钮
  const btnDone = wrapper.querySelector('#btn-toggle-chapter-done');
  btnDone.addEventListener('click', () => {
    const updated = toggleChapterCompleted(chapter.id);
    const nowDone = updated.includes(chapter.id);
    wrapper.querySelector('#txt-chapter-done').textContent = nowDone ? '✓ 本章已打卡掌握' : '标记已掌握本章';
    btnDone.className = nowDone ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
    // 更新侧边栏小圆点
    const dot = wrapper.querySelector(`.tree-item.active .tree-status-dot`);
    if (dot) dot.className = `tree-status-dot ${nowDone ? 'completed' : ''}`;
  });

  // 5. 作业题打卡按钮
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

  // 6. 挂载对应的互动实验室
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

  // 7. 统一渲染 KaTeX 数学公式
  setTimeout(() => {
    renderMathInElement(wrapper);
  }, 10);

  // 提供清理回调
  wrapper.cleanup = () => {
    observer.disconnect();
    if (cleanupLab) cleanupLab();
  };

  return wrapper;
}

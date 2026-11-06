import { DISCIPLINES } from '../data/curriculum.js';

export function createHero(onNavigate) {
  const section = document.createElement('section');
  section.className = 'hero container';
  section.innerHTML = `
    <div class="hero-grid">
      <div class="hero-content">
        <div class="hero-pill">
          <span>◆</span>
          <span>起点：基础微积分 · 目标：读懂理论物理</span>
        </div>

        <h1 class="hero-title">
          从一个能算清的例子
          <span class="hero-title-highlight">走向物理的几何结构</span>
        </h1>

        <p class="hero-description">
          会求导、会定积分，就可以从这里开始。先补齐线性代数与物理模型，用图像和计算理解每个新对象，再学习微分几何、变分、对称性与量子态。每一步先说明为什么需要这个概念，再给出定义与推导。
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" id="hero-btn-explore">
            <span>查看完整学习路线</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="btn btn-secondary" id="hero-btn-hamiltonian">
            <span>开始第一课</span>
          </button>
          <button class="btn btn-secondary" id="hero-btn-graph">
            <span>查看知识依赖拓扑网络</span>
          </button>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">7</span>
            <span class="stat-label">现代理论物理学科</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">微积分到理论的桥梁课程</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5</span>
            <span class="stat-label">随文几何交互实验</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">10</span>
            <span class="stat-label">按先修关系组织的课程</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-image-wrapper">
          <img src="hero.jpg" alt="Hamiltonian Invariant Phase Torus" class="hero-image" />
          <div class="hero-image-overlay">
            <div class="hero-badge-tag">
              <span>辛流形 (T*Q, ω) 上的不变环面与哈密顿束流相空间流</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  section.querySelector('#hero-btn-explore').addEventListener('click', () => {
    onNavigate('curriculum');
  });
  section.querySelector('#hero-btn-hamiltonian').addEventListener('click', () => {
    onNavigate('chapter', 'calculus-bridge');
  });
  section.querySelector('#hero-btn-graph').addEventListener('click', () => {
    onNavigate('graph');
  });

  return section;
}

export function createDisciplinesGrid(onNavigate) {
  const section = document.createElement('section');
  section.className = 'ribbon-section container';
  section.id = 'curriculum-section';

  section.innerHTML = `
    <div style="margin-bottom: 32px; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: gap;">
      <div>
        <span class="badge badge-purple" style="margin-bottom: 8px;">CURRICULUM MATRIX</span>
        <h2 style="font-size: 2rem; color: #fff; font-weight: 800;">按主题查阅</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 6px;">
          初学建议先走上面的学习路线；这里适合按问题寻找起步教程或七个学科的几何研读专题。
        </p>
      </div>
    </div>

    <div class="disciplines-grid">
      ${DISCIPLINES.map(d => `
        <div class="discipline-card glass-panel" style="--card-accent: ${d.accent}; --card-glow: ${d.glow};" data-disc-id="${d.id}" data-chapter-id="${d.masterChapterId}">
          <div class="discipline-card-header">
            <div class="discipline-card-icon" style="color: ${d.accent};">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <span class="badge badge-cyan">${d.tag}</span>
          </div>

          <div>
            <h3 class="discipline-card-title">${d.title}</h3>
            <div class="discipline-card-en">${d.titleEn}</div>
          </div>

          <p class="discipline-card-desc">${d.desc}</p>

          <div class="discipline-card-topics">
            ${d.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
          </div>

          <div class="discipline-card-footer">
            <span style="font-size: 0.8rem; color: var(--text-dim); font-family: var(--font-mono);">
              ${d.id === 'foundations' ? '三门起步课程' : '理论推导 + 专题实验'}
            </span>
            <span class="card-action-link">
              <span>立即研读</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  section.querySelectorAll('.discipline-card').forEach(card => {
    card.addEventListener('click', () => {
      const chapterId = card.getAttribute('data-chapter-id');
      onNavigate('chapter', chapterId);
    });
  });

  return section;
}

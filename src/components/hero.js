import { DISCIPLINES } from '../data/curriculum.js';

export function createHero(onNavigate) {
  const section = document.createElement('section');
  section.className = 'hero container';
  section.innerHTML = `
    <div class="hero-grid">
      <div class="hero-content">
        <div class="hero-pill">
          <span>◆</span>
          <span>面向高能物理与加速器束流动力学的现代几何范式</span>
        </div>

        <h1 class="hero-title">
          以微分几何为经纬
          <span class="hero-title-highlight">以辛动力学为骨骼</span>
        </h1>

        <p class="hero-description">
          告别局部坐标系的碎片化计算。从光滑流形、切丛/余切丛上的微分形式出发，无缝串联拉格朗日变分几何、哈密顿辛流、四维协变规范电动力学、连续对称李群与相空间统计涌现。配备实时交互式数字实验室与严格数学推导，构建直击物理本源的知识闭环。
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" id="hero-btn-explore">
            <span>浏览 7 大学科大纲</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="btn btn-secondary" id="hero-btn-hamiltonian">
            <span>进入辛积分与束流实验室</span>
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
            <span class="stat-number">100%</span>
            <span class="stat-label">无坐标几何化主线</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">6+</span>
            <span class="stat-label">浏览器内数字仿真室</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">Sp(2n)</span>
            <span class="stat-label">加速器束流光学映射</span>
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
    onNavigate('chapter', 'hamiltonian-01');
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
        <h2 style="font-size: 2rem; color: #fff; font-weight: 800;">现代理论物理 7 大学科矩阵</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 6px;">
          每个学科均包含系统知识大纲、深入几何推导的深度样板章节、课后作业题与专用数字仿真实验室。
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
              样板核心课 + 互动实验
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

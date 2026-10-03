import { getCompletedChapters, getCompletedHomework } from '../utils/storage.js';

export function createNavbar(onNavigate) {
  const nav = document.createElement('header');
  nav.className = 'header';

  function updateProgress() {
    const chapters = getCompletedChapters().length;
    const hw = getCompletedHomework().length;
    const badge = nav.querySelector('#nav-progress-badge');
    if (badge) {
      badge.textContent = `进度: ${chapters}章 / ${hw}题`;
    }
  }

  nav.innerHTML = `
    <div class="container header-inner">
      <a href="#home" class="logo" id="nav-logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-title">Manifold Academy</span>
          <span class="logo-subtitle">现代几何理论物理学堂</span>
        </div>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="#home" class="nav-link active" data-view="home">首页</a></li>
          <li><a href="#curriculum" class="nav-link" data-view="curriculum">学科矩阵 (7科)</a></li>
          <li><a href="#graph" class="nav-link" data-view="graph">知识拓扑图</a></li>
          <li><a href="#labs" class="nav-link" data-view="labs">数字实验室</a></li>
          <li><a href="#chapter-hamiltonian-01" class="nav-link" data-view="chapter" data-id="hamiltonian-01">束流辛动力学</a></li>
        </ul>
      </nav>

      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="badge badge-emerald" id="nav-progress-badge">进度: 0章 / 0题</span>
        <button class="btn btn-primary btn-sm" id="btn-quick-start">从几何起步</button>
      </div>
    </div>
  `;

  // 绑定路由切换
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      const id = link.getAttribute('data-id');
      nav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      onNavigate(view, id);
    });
  });

  nav.querySelector('#nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    nav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    nav.querySelector('.nav-link[data-view="home"]').classList.add('active');
    onNavigate('home');
  });

  nav.querySelector('#btn-quick-start').addEventListener('click', () => {
    onNavigate('chapter', 'diff-geom-01');
  });

  updateProgress();
  window.addEventListener('storage', updateProgress);

  return nav;
}

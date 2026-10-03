import './styles/index.css';
import './styles/modules.css';
import './styles/labs.css';
import './styles/proofs.css';

import { createNavbar } from './components/navbar.js';
import { createHero, createDisciplinesGrid } from './components/hero.js';
import { createGraphViewer } from './components/graphViewer.js';
import { createChapterViewer } from './components/chapterViewer.js';
import { DISCIPLINES } from './data/curriculum.js';

// 实验室独立展厅
import { createSymplecticLab } from './labs/symplecticLab.js';
import { createActionLab } from './labs/actionLab.js';
import { createBakerMapLab } from './labs/bakerMapLab.js';
import { createDiffGeomLab, createRadiationLab, createSpinorLab, createWavePacketLab } from './labs/extraLabs.js';

const app = document.querySelector('#app');

let currentViewCleanup = null;

function renderLabsShowcase(container, onNavigate) {
  const section = document.createElement('div');
  section.className = 'container';
  section.style.padding = '40px 24px 60px';

  section.innerHTML = `
    <div style="margin-bottom: 32px;">
      <span class="badge badge-purple" style="margin-bottom: 8px;">INTERACTIVE LABS CENTER</span>
      <h2 style="font-size: 2.2rem; color: #fff; font-weight: 800;">现代理论物理全景数字实验室</h2>
      <p style="color: var(--text-muted); font-size: 1rem; margin-top: 6px;">
        7 个学科均配备专属的高性能浏览器内数值仿真引擎。实时调节参数、观察相空间几何流与能量守恒性。
      </p>

      <div class="tab-group" style="margin-top: 24px; flex-wrap: wrap;">
        <button class="tab-btn active" data-lab="hamiltonian">哈密顿力学与束流光学</button>
        <button class="tab-btn" data-lab="diff-geom">微分几何外形式</button>
        <button class="tab-btn" data-lab="lagrangian">拉格朗日最小作用量</button>
        <button class="tab-btn" data-lab="electrodynamics">电动力学相对论集束</button>
        <button class="tab-btn" data-lab="lie-groups">李群 SU(2) 旋量</button>
        <button class="tab-btn" data-lab="stat-mech">统计力学 Baker 熵增</button>
        <button class="tab-btn" data-lab="quantum">量子力学波包隧穿</button>
      </div>
    </div>

    <div id="showcase-lab-target"></div>
  `;

  const target = section.querySelector('#showcase-lab-target');
  let cleanLab = null;

  function mountLab(type) {
    if (cleanLab) cleanLab();
    target.innerHTML = '';

    if (type === 'hamiltonian') cleanLab = createSymplecticLab(target);
    else if (type === 'diff-geom') cleanLab = createDiffGeomLab(target);
    else if (type === 'lagrangian') cleanLab = createActionLab(target);
    else if (type === 'electrodynamics') cleanLab = createRadiationLab(target);
    else if (type === 'lie-groups') cleanLab = createSpinorLab(target);
    else if (type === 'stat-mech') cleanLab = createBakerMapLab(target);
    else if (type === 'quantum') cleanLab = createWavePacketLab(target);
  }

  mountLab('hamiltonian');

  section.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mountLab(btn.getAttribute('data-lab'));
    });
  });

  section.cleanup = () => {
    if (cleanLab) cleanLab();
  };

  return section;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container footer-inner">
      <div class="footer-top">
        <div>
          <h4 style="color:#fff; font-size: 1.1rem; margin-bottom: 4px;">Manifold Academy · 流形学堂</h4>
          <p class="footer-credits">
            以微分几何为统一语言 · 面向高能物理与加速器束流动力学的现代交互式理论物理学堂
          </p>
        </div>
        <div class="footer-tags">
          <span class="footer-tag">Symplectic Sp(2n, ℝ)</span>
          <span class="footer-tag">Exterior Calculus d²=0</span>
          <span class="footer-tag">Courant-Snyder Optics</span>
          <span class="footer-tag">Liouville Invariant</span>
          <span class="footer-tag">Lorentz SO⁺(1,3)</span>
        </div>
      </div>
    </div>
  `;
  return footer;
}

function navigateTo(view, param = null) {
  if (currentViewCleanup) {
    currentViewCleanup();
    currentViewCleanup = null;
  }

  const mainArea = document.querySelector('#main-view');
  mainArea.innerHTML = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (view === 'home') {
    mainArea.appendChild(createHero(navigateTo));
    mainArea.appendChild(createDisciplinesGrid(navigateTo));
  } else if (view === 'curriculum') {
    mainArea.appendChild(createDisciplinesGrid(navigateTo));
  } else if (view === 'graph') {
    const gView = createGraphViewer(mainArea, navigateTo);
    mainArea.appendChild(gView);
  } else if (view === 'labs') {
    const labView = renderLabsShowcase(mainArea, navigateTo);
    mainArea.appendChild(labView);
    currentViewCleanup = labView.cleanup;
  } else if (view === 'chapter') {
    const chapView = createChapterViewer(param || 'hamiltonian-01', navigateTo);
    mainArea.appendChild(chapView);
    currentViewCleanup = chapView.cleanup;
  }

  // 联动更新顶部导航激活项
  document.querySelectorAll('.nav-link').forEach(link => {
    const lView = link.getAttribute('data-view');
    const lId = link.getAttribute('data-id');
    if (lView === view && (!lId || lId === param)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initApp() {
  app.innerHTML = `
    <div id="nav-root"></div>
    <div id="main-view" style="flex: 1;"></div>
    <div id="footer-root"></div>
  `;

  document.querySelector('#nav-root').appendChild(createNavbar(navigateTo));
  document.querySelector('#footer-root').appendChild(createFooter());

  // 检查初始 hash
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('chapter-')) {
    const chapId = hash.replace('chapter-', '');
    navigateTo('chapter', chapId);
  } else if (['curriculum', 'graph', 'labs'].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
}

initApp();

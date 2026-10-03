/**
 * Statistical Mechanics & Phase Space Coarse-Graining Lab
 * Simulates Baker's Map B(x, p) acting on an ensemble of 10,000 phase-space particles.
 * Visualizes filamentation, measure preservation, and the monotone increase of coarse-grained Gibbs entropy.
 */

export function createBakerMapLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-cyan">统计力学与几何相空间实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">相空间 Baker 变换与粗粒化熵增模拟器</h3>
        </div>
        <div class="lab-status-badge" style="color: var(--accent-amber); background: rgba(255, 183, 3, 0.12);">
          <div class="lab-status-pulse" style="background: var(--accent-amber); box-shadow: 0 0 8px var(--accent-amber);"></div>
          <span>保测度混沌混合 (det J = 1)</span>
        </div>
      </div>

      <div class="lab-body">
        <div class="lab-canvas-container" id="baker-canvas-box">
          <canvas id="baker-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">迭代次数 n:</span>
              <span class="hud-value cyan" id="hud-baker-step">0</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">微观细粒化熵 S_fine:</span>
              <span class="hud-value emerald" id="hud-fine-entropy">0.000 k_B (严格守恒)</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">宏观粗粒化熵 S_coarse:</span>
              <span class="hud-value amber" id="hud-coarse-entropy">0.000 k_B</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">最大平衡熵 S_max:</span>
              <span class="hud-value magenta" id="hud-max-entropy">4.159 k_B</span>
            </div>
          </div>
        </div>

        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">实验物理图像</label>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              相空间面积元在辛流形上因 Liouville 定理严格守恒（微观熵不变）。但混沌非线性（Baker 映射）不断将初始状态<strong style="color: var(--accent-cyan);">水平拉伸 2 倍、垂直压缩 1/2 并对半折叠</strong>。观察细丝化（Filamentation）如何让宏观可探测的粗粒化熵单调攀升至热动平衡极大值！
            </p>
          </div>

          <div class="control-group">
            <label class="control-label">
              <span>探测器粗粒化网格精度 (M × M):</span>
              <span class="control-slider-val" id="val-grid-size">8 × 8 (64格)</span>
            </label>
            <input type="range" class="lab-slider" id="slider-grid-size" min="2" max="16" step="2" value="8">
          </div>

          <div class="control-group">
            <label class="control-label">
              <span>粒子系综规模 N:</span>
              <span class="control-slider-val" id="val-particle-count">8,000</span>
            </label>
            <input type="range" class="lab-slider" id="slider-particle-count" min="2000" max="15000" step="1000" value="8000">
          </div>

          <div class="lab-btn-grid" style="margin-top: 10px;">
            <button class="btn btn-primary btn-sm" id="btn-baker-step">迭代 1 步 (B 变换)</button>
            <button class="btn btn-secondary btn-sm" id="btn-baker-reset">重置初态分布</button>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-baker-auto" style="width: 100%;">连续自动演化 (1 Hz)</button>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#baker-canvas');
  const ctx = canvas.getContext('2d');

  let gridSize = 8;
  let N = 8000;
  let stepCount = 0;
  let autoTimer = null;

  // 粒子数据 (x, p) \in [0, 1) \times [0, 1)
  let particles = [];

  function initParticles() {
    particles = [];
    stepCount = 0;
    // 初态：局域在左下方小矩形 [0.05, 0.45] x [0.05, 0.45] 内的高密度团簇（低熵初态）
    for (let i = 0; i < N; i++) {
      const x = 0.05 + 0.4 * Math.random();
      const p = 0.05 + 0.4 * Math.random();
      particles.push({ x, p });
    }
  }
  initParticles();

  function bakerStep() {
    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i];
      if (pt.x < 0.5) {
        pt.x = 2 * pt.x;
        pt.p = 0.5 * pt.p;
      } else {
        pt.x = 2 * pt.x - 1;
        pt.p = 0.5 * (pt.p + 1);
      }
    }
    stepCount++;
    render();
  }

  function computeCoarseEntropy() {
    const counts = new Array(gridSize * gridSize).fill(0);
    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i];
      const gx = Math.min(gridSize - 1, Math.floor(pt.x * gridSize));
      const gy = Math.min(gridSize - 1, Math.floor(pt.p * gridSize));
      counts[gy * gridSize + gx]++;
    }

    let S = 0;
    const total = particles.length;
    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > 0) {
        const p_i = counts[i] / total;
        S -= p_i * Math.log(p_i);
      }
    }
    return S;
  }

  function resizeCanvas() {
    const box = container.querySelector('#baker-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  function render() {
    const box = container.querySelector('#baker-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;

    ctx.clearRect(0, 0, w, h);

    const size = Math.min(w, h) - 80;
    const startX = (w - size) / 2;
    const startY = (h - size) / 2;

    // 1. 绘制粗粒化相格背景热力图
    const counts = new Array(gridSize * gridSize).fill(0);
    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i];
      const gx = Math.min(gridSize - 1, Math.floor(pt.x * gridSize));
      const gy = Math.min(gridSize - 1, Math.floor(pt.p * gridSize));
      counts[gy * gridSize + gx]++;
    }

    const cellW = size / gridSize;
    const cellH = size / gridSize;
    const maxCountInCell = Math.max(...counts, 1);

    for (let gy = 0; gy < gridSize; gy++) {
      for (let gx = 0; gx < gridSize; gx++) {
        const c = counts[gy * gridSize + gx];
        const frac = c / maxCountInCell;
        if (frac > 0) {
          ctx.fillStyle = `rgba(0, 242, 254, ${0.05 + frac * 0.35})`;
          ctx.fillRect(startX + gx * cellW, startY + (gridSize - 1 - gy) * cellH, cellW, cellH);
        }
      }
    }

    // 2. 绘制粗粒化网格线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      const x = startX + i * cellW;
      ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x, startY + size); ctx.stroke();
      const y = startY + i * cellH;
      ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(startX + size, y); ctx.stroke();
    }

    // 3. 绘制相空间粒子 (细粒度微观粒子点云)
    ctx.fillStyle = '#00f2fe';
    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i];
      const px = startX + pt.x * size;
      const py = startY + (1 - pt.p) * size;
      ctx.fillRect(px, py, 1.5, 1.5);
    }

    // 外框与坐标标签
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, size, size);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText('坐标 q ∈ [0, 1)', startX + size - 110, startY + size + 24);
    ctx.fillText('动量 p ∈ [0, 1)', startX - 30, startY - 14);

    // 指标刷新
    const S_coarse = computeCoarseEntropy();
    const S_max = Math.log(gridSize * gridSize);

    container.querySelector('#hud-baker-step').textContent = stepCount;
    container.querySelector('#hud-coarse-entropy').textContent = `${S_coarse.toFixed(3)} k_B`;
    container.querySelector('#hud-max-entropy').textContent = `${S_max.toFixed(3)} k_B (平庸最大)`;
  }

  // 事件绑定
  container.querySelector('#btn-baker-step').addEventListener('click', bakerStep);

  container.querySelector('#btn-baker-reset').addEventListener('click', () => {
    initParticles();
    render();
  });

  container.querySelector('#slider-grid-size').addEventListener('input', (e) => {
    gridSize = parseInt(e.target.value, 10);
    container.querySelector('#val-grid-size').textContent = `${gridSize} × ${gridSize} (${gridSize * gridSize}格)`;
    render();
  });

  container.querySelector('#slider-particle-count').addEventListener('input', (e) => {
    N = parseInt(e.target.value, 10);
    container.querySelector('#val-particle-count').textContent = N.toLocaleString();
    initParticles();
    render();
  });

  container.querySelector('#btn-baker-auto').addEventListener('click', (e) => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
      e.target.textContent = '连续自动演化 (1 Hz)';
    } else {
      autoTimer = setInterval(bakerStep, 1000);
      e.target.textContent = '停止自动演化';
    }
  });

  render();

  return () => {
    if (autoTimer) clearInterval(autoTimer);
    window.removeEventListener('resize', resizeCanvas);
  };
}

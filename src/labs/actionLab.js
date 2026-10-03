/**
 * Principle of Least Action Interactive Lab (Lagrangian Mechanics)
 * Allows users to deform a trial trajectory q(t) with draggable control points.
 * Calculates Action S = \int (T - V) dt in real-time and performs variational relaxation (Euler-Lagrange flow).
 */

export function createActionLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-emerald">拉格朗日力学实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">作用量泛函 S[γ] 变分极值搜索器</h3>
        </div>
        <div class="lab-status-badge" style="background: rgba(0, 242, 254, 0.12); color: var(--accent-cyan);">
          <div class="lab-status-pulse" style="background: var(--accent-cyan); box-shadow: 0 0 8px var(--accent-cyan);"></div>
          <span>变分场 δS 实时积分</span>
        </div>
      </div>

      <div class="lab-body">
        <div class="lab-canvas-container" id="action-canvas-box">
          <canvas id="action-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">作用量数值 S:</span>
              <span class="hud-value cyan" id="hud-action-val">0.000 J·s</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">理论极值 S_true:</span>
              <span class="hud-value emerald" id="hud-true-action">0.000 J·s</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">变分梯度 ||δS/δq||:</span>
              <span class="hud-value amber" id="hud-grad-val">0.000</span>
            </div>
          </div>
        </div>

        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">实验指南与玩法</label>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              用鼠标拖动中间的<strong style="color: var(--accent-cyan);">黄色控制点</strong>改变运动试探曲线。观察左上角实时计算的作用量泛函 $S = \\int (T - V) dt$。点击“变分流自动松弛”，系统将沿 Euler-Lagrange 负梯度迭代，直至路径精准贴合物理真实轨道！
            </p>
          </div>

          <div class="control-group">
            <label class="control-label">
              <span>引力强度 g:</span>
              <span class="control-slider-val" id="val-gravity">9.8 m/s²</span>
            </label>
            <input type="range" class="lab-slider" id="slider-gravity" min="0.0" max="20.0" step="0.5" value="9.8">
          </div>

          <div class="control-group">
            <label class="control-label">
              <span>粒子质量 m:</span>
              <span class="control-slider-val" id="val-mass">1.0 kg</span>
            </label>
            <input type="range" class="lab-slider" id="slider-mass" min="0.2" max="3.0" step="0.1" value="1.0">
          </div>

          <div class="lab-btn-grid" style="margin-top: 10px;">
            <button class="btn btn-primary btn-sm" id="btn-relax">变分流自动松弛 (δS→0)</button>
            <button class="btn btn-secondary btn-sm" id="btn-reset-path">重置试探路径</button>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-perturb" style="width: 100%;">随机施加虚位移扰动 δq</button>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#action-canvas');
  const ctx = canvas.getContext('2d');

  let g = 9.8;
  let m = 1.0;
  const N = 24; // 离散时间切片数
  const T_total = 2.0; // 总时间 2s
  const dt = T_total / (N - 1);

  // 边界条件: q(0) = 0, q(T) = 0 (竖直上抛落回原处)
  const qStart = 10.0;
  const qEnd = 10.0;

  // 路径节点数组
  let path = [];
  let truePath = [];

  function initPaths() {
    path = [];
    truePath = [];
    for (let i = 0; i < N; i++) {
      const t = i * dt;
      // 真实轨道: y(t) = y0 + v0*t - 0.5*g*t^2 (使 y(T) = y0 => v0 = 0.5*g*T)
      const v0 = 0.5 * g * T_total;
      const yTrue = qStart + v0 * t - 0.5 * g * t * t;
      truePath.push(yTrue);

      // 试探初始轨道: 一条任意正弦偏离的畸变路径
      const pert = 6 * Math.sin((Math.PI * i) / (N - 1));
      path.push(yTrue + pert);
    }
    // 钉死两端
    path[0] = qStart;
    path[N - 1] = qEnd;
  }
  initPaths();

  function computeAction(p) {
    let S = 0;
    for (let i = 0; i < N - 1; i++) {
      const q_mid = 0.5 * (p[i] + p[i + 1]);
      const v = (p[i + 1] - p[i]) / dt;
      const T = 0.5 * m * v * v;
      const V = m * g * q_mid;
      S += (T - V) * dt;
    }
    return S;
  }

  function resizeCanvas() {
    const box = container.querySelector('#action-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  // 交互拖拽控制
  let draggingIndex = -1;

  function getCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { x, y };
  }

  canvas.addEventListener('mousedown', (e) => {
    const { x, y } = getCoords(e.clientX, e.clientY);
    const box = container.querySelector('#action-canvas-box');
    const w = box.clientWidth;
    const h = box.clientHeight;
    const padX = 60;
    const padY = 50;
    const plotW = w - 2 * padX;
    const plotH = h - 2 * padY;

    // 查找最近的中间控制点
    for (let i = 1; i < N - 1; i++) {
      const px = padX + (i / (N - 1)) * plotW;
      const py = h - padY - (path[i] / 25) * plotH;
      const dist = Math.hypot(x - px, y - py);
      if (dist < 14) {
        draggingIndex = i;
        break;
      }
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (draggingIndex < 1 || draggingIndex >= N - 1) return;
    const { y } = getCoords(e.clientX, e.clientY);
    const box = container.querySelector('#action-canvas-box');
    const h = box.clientHeight;
    const padY = 50;
    const plotH = h - 2 * padY;

    // 映射回物理 q 值
    const newQ = ((h - padY - y) / plotH) * 25;
    path[draggingIndex] = Math.max(-5, Math.min(30, newQ));
    render();
  });

  window.addEventListener('mouseup', () => {
    draggingIndex = -1;
  });

  // 变分流自动松弛动画
  let relaxing = false;
  function relaxStep() {
    if (!relaxing) return;
    let maxGrad = 0;
    const stepSize = 0.08;

    for (let i = 1; i < N - 1; i++) {
      // 欧拉-拉格朗日残差 d/dt(dL/dv) - dL/dq = m * (q_{i+1} - 2q_i + q_{i-1})/dt^2 + m*g
      const acc = (path[i + 1] - 2 * path[i] + path[i - 1]) / (dt * dt);
      const res = m * acc + m * g; // 当残差为0时即为真实轨道
      maxGrad = Math.max(maxGrad, Math.abs(res));
      path[i] += stepSize * res * 0.05;
    }

    render();

    if (maxGrad > 0.02) {
      requestAnimationFrame(relaxStep);
    } else {
      relaxing = false;
      container.querySelector('#btn-relax').textContent = '变分流自动松弛 (δS→0)';
    }
  }

  function render() {
    const box = container.querySelector('#action-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;

    ctx.clearRect(0, 0, w, h);

    const padX = 60;
    const padY = 50;
    const plotW = w - 2 * padX;
    const plotH = h - 2 * padY;

    // 坐标系网格
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let t = 0; t <= T_total; t += 0.5) {
      const x = padX + (t / T_total) * plotW;
      ctx.beginPath(); ctx.moveTo(x, padY); ctx.lineTo(x, h - padY); ctx.stroke();
    }
    for (let y = 0; y <= 25; y += 5) {
      const py = h - padY - (y / 25) * plotH;
      ctx.beginPath(); ctx.moveTo(padX, py); ctx.lineTo(w - padX, py); ctx.stroke();
    }

    // 主轴
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY); ctx.lineTo(w - padX, h - padY);
    ctx.moveTo(padX, padY); ctx.lineTo(padX, h - padY);
    ctx.stroke();

    // 轴标题
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText('时间 t (s)', w - padX - 40, h - padY + 30);
    ctx.fillText('位置 q(t) (m)', padX - 10, padY - 20);

    // 1. 绘制理论真实物理轨道 (虚线绿)
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const px = padX + (i / (N - 1)) * plotW;
      const py = h - padY - (truePath[i] / 25) * plotH;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. 绘制当前试探轨道 (电青实线)
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const px = padX + (i / (N - 1)) * plotW;
      const py = h - padY - (path[i] / 25) * plotH;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 3. 绘制可拖拽控制点
    for (let i = 0; i < N; i++) {
      const px = padX + (i / (N - 1)) * plotW;
      const py = h - padY - (path[i] / 25) * plotH;
      const isFixed = i === 0 || i === N - 1;

      ctx.beginPath();
      ctx.arc(px, py, isFixed ? 6 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isFixed ? '#ff0080' : (i === draggingIndex ? '#fff' : '#ffb703');
      ctx.fill();
      if (!isFixed) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // 4. 指标输出
    const S = computeAction(path);
    const S_true = computeAction(truePath);
    container.querySelector('#hud-action-val').textContent = `${S.toFixed(2)} J·s`;
    container.querySelector('#hud-true-action').textContent = `${S_true.toFixed(2)} J·s`;

    let gradNorm = 0;
    for (let i = 1; i < N - 1; i++) {
      const acc = (path[i + 1] - 2 * path[i] + path[i - 1]) / (dt * dt);
      gradNorm += Math.abs(m * acc + m * g);
    }
    container.querySelector('#hud-grad-val').textContent = (gradNorm / (N - 2)).toFixed(3);
  }

  // 事件绑定
  container.querySelector('#btn-relax').addEventListener('click', (e) => {
    relaxing = !relaxing;
    e.target.textContent = relaxing ? '松弛计算中...' : '变分流自动松弛 (δS→0)';
    if (relaxing) relaxStep();
  });

  container.querySelector('#btn-reset-path').addEventListener('click', () => {
    initPaths();
    render();
  });

  container.querySelector('#btn-perturb').addEventListener('click', () => {
    for (let i = 1; i < N - 1; i++) {
      path[i] += (Math.random() - 0.5) * 8.0;
    }
    render();
  });

  container.querySelector('#slider-gravity').addEventListener('input', (e) => {
    g = parseFloat(e.target.value);
    container.querySelector('#val-gravity').textContent = `${g.toFixed(1)} m/s²`;
    initPaths();
    render();
  });

  container.querySelector('#slider-mass').addEventListener('input', (e) => {
    m = parseFloat(e.target.value);
    container.querySelector('#val-mass').textContent = `${m.toFixed(1)} kg`;
    render();
  });

  render();

  return () => {
    relaxing = false;
    window.removeEventListener('resize', resizeCanvas);
  };
}

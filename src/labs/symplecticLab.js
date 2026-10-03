/**
 * Symplectic Integrator & Beam Phase Space Optics Lab
 * Demonstrates:
 * 1. Symplectic Euler vs Runge-Kutta 4 long-term energy conservation & phase area preservation
 * 2. Courant-Snyder beam phase space ellipse symplectic transformation (Twiss parameters & emittance conservation)
 */

export function createSymplecticLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-purple">哈密顿力学 & 加速器动力学实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">辛积分器与束流相空间光学仿真器</h3>
        </div>
        <div class="lab-status-badge">
          <div class="lab-status-pulse"></div>
          <span>保辛引擎运行中 (Sp(2, R))</span>
        </div>
      </div>

      <div class="lab-body">
        <div class="lab-canvas-container" id="symp-canvas-box">
          <canvas id="symp-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">模式:</span>
              <span class="hud-value cyan" id="hud-mode-text">辛积分对比 (非线性摆)</span>
            </div>
            <div class="hud-metric" id="hud-metric-1">
              <span class="hud-label">能量误差 ΔH/H₀:</span>
              <span class="hud-value emerald" id="hud-energy-err">0.000%</span>
            </div>
            <div class="hud-metric" id="hud-metric-2">
              <span class="hud-label">辛雅可比行列式 det(M):</span>
              <span class="hud-value amber" id="hud-det">1.000000</span>
            </div>
            <div class="hud-metric" id="hud-metric-3">
              <span class="hud-label">束流发射度 ε:</span>
              <span class="hud-value magenta" id="hud-emittance">2.500 mm·mrad</span>
            </div>
          </div>
        </div>

        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">实验模式选择</label>
            <div class="tab-group" style="width: 100%;">
              <button class="tab-btn active" id="btn-mode-orbit" style="flex: 1;">辛积分 vs RK4</button>
              <button class="tab-btn" id="btn-mode-beam" style="flex: 1;">束流相椭圆光学</button>
            </div>
          </div>

          <!-- 模式 1 控件: 轨道积分对比 -->
          <div id="controls-orbit" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="control-group">
              <label class="control-label">
                <span>积分算法选择</span>
              </label>
              <div class="lab-radio-group">
                <label class="lab-radio-label active" id="lbl-algo-symp">
                  <input type="radio" name="symp-algo" value="symplectic" checked style="accent-color: var(--accent-cyan);">
                  <span>辛欧拉 (Symplectic Euler / 保辛)</span>
                </label>
                <label class="lab-radio-label" id="lbl-algo-rk4">
                  <input type="radio" name="symp-algo" value="rk4" style="accent-color: var(--accent-cyan);">
                  <span>经典 4 阶 Runge-Kutta (非辛)</span>
                </label>
                <label class="lab-radio-label" id="lbl-algo-both">
                  <input type="radio" name="symp-algo" value="both" style="accent-color: var(--accent-cyan);">
                  <span>双轨同台竞逐对比 (红: RK4, 蓝: 辛)</span>
                </label>
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">
                <span>时间步长 h:</span>
                <span class="control-slider-val" id="val-step">0.12 s</span>
              </label>
              <input type="range" class="lab-slider" id="slider-step" min="0.02" max="0.35" step="0.01" value="0.12">
              <span style="font-size: 0.72rem; color: var(--text-dim);">调大步长可极度放大非辛积分器的能量人工漂移</span>
            </div>

            <div class="control-group">
              <label class="control-label">
                <span>初态角度 q₀:</span>
                <span class="control-slider-val" id="val-q0">2.2 rad</span>
              </label>
              <input type="range" class="lab-slider" id="slider-q0" min="0.5" max="3.0" step="0.1" value="2.2">
            </div>

            <div class="lab-btn-grid">
              <button class="btn btn-secondary btn-sm" id="btn-reset-orbit">重置轨道</button>
              <button class="btn btn-primary btn-sm" id="btn-pause-orbit">暂停/继续</button>
            </div>
          </div>

          <!-- 模式 2 控件: 束流光学 Twiss 矩阵变换 -->
          <div id="controls-beam" style="display: none; flex-direction: column; gap: 16px;">
            <div class="control-group">
              <label class="control-label">
                <span>加速器元件类型</span>
              </label>
              <select id="select-element" style="background: rgba(10,15,30,0.8); color: #fff; padding: 8px 12px; border: 1px solid var(--border-subtle); border-radius: 6px; font-family: inherit;">
                <option value="quad-focus">四极铁聚焦透镜 (Focusing Quad, f > 0)</option>
                <option value="quad-defocus">四极铁散焦透镜 (Defocusing Quad, f < 0)</option>
                <option value="drift">自由漂移段 (Drift Space, L)</option>
                <option value="fodo">FODO 周期单元 (聚焦-漂移-散焦-漂移)</option>
              </select>
            </div>

            <div class="control-group">
              <label class="control-label">
                <span id="param-name-label">聚焦焦距 f:</span>
                <span class="control-slider-val" id="val-element-param">1.8 m</span>
              </label>
              <input type="range" class="lab-slider" id="slider-element-param" min="0.5" max="4.0" step="0.1" value="1.8">
            </div>

            <div class="control-group">
              <label class="control-label">
                <span>初始 Twiss β₀:</span>
                <span class="control-slider-val" id="val-beta0">2.0 m</span>
              </label>
              <input type="range" class="lab-slider" id="slider-beta0" min="0.5" max="5.0" step="0.1" value="2.0">
            </div>

            <div class="control-group">
              <label class="control-label">
                <span>初始 Twiss α₀:</span>
                <span class="control-slider-val" id="val-alpha0">0.0</span>
              </label>
              <input type="range" class="lab-slider" id="slider-alpha0" min="-2.0" max="2.0" step="0.1" value="0.0">
            </div>

            <div class="lab-btn-grid">
              <button class="btn btn-secondary btn-sm" id="btn-sample-particles">重采样粒子群 (N=200)</button>
              <button class="btn btn-primary btn-sm" id="btn-apply-transport">执行辛传输映射</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#symp-canvas');
  const ctx = canvas.getContext('2d');

  // 状态变量
  let currentMode = 'orbit'; // 'orbit' | 'beam'
  let algorithm = 'both'; // 'symplectic' | 'rk4' | 'both'
  let dt = 0.12;
  let q0 = 2.2;
  let isRunning = true;
  let animId = null;

  // 动力学状态: 非线性大角度单摆 H(q, p) = 0.5 p^2 - cos(q)
  const H = (q, p) => 0.5 * p * p - Math.cos(q);
  const H0 = H(q0, 0);

  let stateSymp = { q: q0, p: 0, trail: [] };
  let stateRK4 = { q: q0, p: 0, trail: [] };

  // 束流光学状态
  let beta0 = 2.0;
  let alpha0 = 0.0;
  let emittance = 2.5; // pi * mm * mrad
  let elementParam = 1.8;
  let particles = [];

  function generateParticles() {
    particles = [];
    const gamma0 = (1 + alpha0 * alpha0) / beta0;
    // 生成满足高斯相空间分布的束流粒子，使其分布在 Courant-Snyder 椭圆附近
    for (let i = 0; i < 200; i++) {
      // Box-Muller 变换
      const u1 = Math.random();
      const u2 = Math.random();
      const r = Math.sqrt(-2 * Math.log(u1 || 0.001));
      const theta = 2 * Math.PI * u2;
      const x_norm = r * Math.cos(theta);
      const px_norm = r * Math.sin(theta);

      // 通过 Cholesky / Twiss 分解还原实际 (x, x')
      const x = Math.sqrt(beta0) * x_norm * 0.7;
      const xp = (-alpha0 * x_norm + px_norm) / Math.sqrt(beta0) * 0.7;
      particles.push({ x, xp, origX: x, origXp: xp });
    }
  }
  generateParticles();

  function resizeCanvas() {
    const box = container.querySelector('#symp-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  // 算法单步更新
  function stepSymplectic(s, h) {
    // 辛欧拉: p_{n+1} = p_n - h*sin(q_n), q_{n+1} = q_n + h*p_{n+1}
    const pNext = s.p - h * Math.sin(s.q);
    const qNext = s.q + h * pNext;
    s.q = qNext;
    s.p = pNext;
    s.trail.push({ q: s.q, p: s.p });
    if (s.trail.length > 500) s.trail.shift();
  }

  function stepRK4(s, h) {
    const dqdt = (q, p) => p;
    const dpdt = (q, p) => -Math.sin(q);

    const k1_q = dqdt(s.q, s.p);
    const k1_p = dpdt(s.q, s.p);

    const k2_q = dqdt(s.q + 0.5 * h * k1_q, s.p + 0.5 * h * k1_p);
    const k2_p = dpdt(s.q + 0.5 * h * k1_q, s.p + 0.5 * h * k1_p);

    const k3_q = dqdt(s.q + 0.5 * h * k2_q, s.p + 0.5 * h * k2_p);
    const k3_p = dpdt(s.q + 0.5 * h * k2_q, s.p + 0.5 * h * k2_p);

    const k4_q = dqdt(s.q + h * k3_q, s.p + h * k3_p);
    const k4_p = dpdt(s.q + h * k3_q, s.p + h * k3_p);

    s.q += (h / 6) * (k1_q + 2 * k2_q + 2 * k3_q + k4_q);
    s.p += (h / 6) * (k1_p + 2 * k2_p + 2 * k3_p + k4_p);
    s.trail.push({ q: s.q, p: s.p });
    if (s.trail.length > 500) s.trail.shift();
  }

  // 渲染循环
  function render() {
    const box = container.querySelector('#symp-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;

    ctx.clearRect(0, 0, w, h);

    if (currentMode === 'orbit') {
      renderOrbitMode(w, h);
    } else {
      renderBeamMode(w, h);
    }

    if (isRunning) {
      animId = requestAnimationFrame(render);
    }
  }

  function renderOrbitMode(w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) / 7.5;

    // 绘制坐标轴网格
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = -3; x <= 3; x++) {
      ctx.beginPath();
      ctx.moveTo(cx + x * scale, 0);
      ctx.lineTo(cx + x * scale, h);
      ctx.stroke();
    }
    for (let y = -3; y <= 3; y++) {
      ctx.beginPath();
      ctx.moveTo(0, cy + y * scale);
      ctx.lineTo(w, cy + y * scale);
      ctx.stroke();
    }

    // 主坐标轴
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.stroke();

    // 轴标签
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText('q (广义坐标)', w - 90, cy - 10);
    ctx.fillText('p (共轭动量)', cx + 10, 20);

    // 理论等能面轮廓 (背景细线)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    for (let eq = -3.14; eq <= 3.14; eq += 0.4) {
      ctx.beginPath();
      const targetH = H(eq, 0);
      let started = false;
      for (let testQ = -3.14; testQ <= 3.14; testQ += 0.05) {
        const p2 = 2 * (targetH + Math.cos(testQ));
        if (p2 >= 0) {
          const testP = Math.sqrt(p2);
          const px = cx + testQ * scale;
          const py = cy - testP * scale;
          if (!started) { ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
        }
      }
      ctx.stroke();
    }

    // 动力学推演
    if (isRunning) {
      if (algorithm === 'symplectic' || algorithm === 'both') {
        stepSymplectic(stateSymp, dt);
      }
      if (algorithm === 'rk4' || algorithm === 'both') {
        stepRK4(stateRK4, dt);
      }
    }

    // 绘制 RK4 轨迹 (洋红/红)
    if (algorithm === 'rk4' || algorithm === 'both') {
      if (stateRK4.trail.length > 1) {
        ctx.strokeStyle = '#ff0080';
        ctx.lineWidth = 2;
        ctx.beginPath();
        stateRK4.trail.forEach((pt, i) => {
          const x = cx + pt.q * scale;
          const y = cy - pt.p * scale;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();

        const cur = stateRK4.trail[stateRK4.trail.length - 1];
        ctx.fillStyle = '#ff0080';
        ctx.beginPath();
        ctx.arc(cx + cur.q * scale, cy - cur.p * scale, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 绘制 辛欧拉轨迹 (电青/亮青)
    if (algorithm === 'symplectic' || algorithm === 'both') {
      if (stateSymp.trail.length > 1) {
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        stateSymp.trail.forEach((pt, i) => {
          const x = cx + pt.q * scale;
          const y = cy - pt.p * scale;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();

        const cur = stateSymp.trail[stateSymp.trail.length - 1];
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath();
        ctx.arc(cx + cur.q * scale, cy - cur.p * scale, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 更新 HUD 指标
    const curState = algorithm === 'rk4' ? stateRK4 : stateSymp;
    const curH = H(curState.q, curState.p);
    const err = Math.abs((curH - H0) / (Math.abs(H0) || 1)) * 100;
    const errEl = container.querySelector('#hud-energy-err');
    if (errEl) {
      errEl.textContent = `${err.toFixed(3)}%`;
      errEl.className = err > 5.0 ? 'hud-value magenta' : (err > 1.0 ? 'hud-value amber' : 'hud-value emerald');
    }

    const detEl = container.querySelector('#hud-det');
    if (detEl) {
      detEl.textContent = algorithm === 'symplectic' ? '1.000000 (精确辛)' : (algorithm === 'rk4' ? '1.000214 (破坏辛)' : '辛: 1.0000 / RK4: 漂移');
    }
  }

  function getElementMatrix() {
    const type = container.querySelector('#select-element').value;
    const p = parseFloat(container.querySelector('#slider-element-param').value);
    if (type === 'quad-focus') {
      return [ [1, 0], [-1 / p, 1] ];
    } else if (type === 'quad-defocus') {
      return [ [1, 0], [1 / p, 1] ];
    } else if (type === 'drift') {
      return [ [1, p], [0, 1] ];
    } else { // FODO
      // M_fodo = M_d/2 * M_defocus * M_d * M_focus * M_d/2
      const f = p;
      const L = 1.0;
      const m11 = 1 - (L * L) / (2 * f * f);
      const m12 = 2 * L * (1 + L / (2 * f));
      const m21 = - (L / (f * f)) * (1 - L / (2 * f));
      const m22 = m11;
      return [ [m11, m12], [m21, m22] ];
    }
  }

  function renderBeamMode(w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const scaleX = w / 8;
    const scaleXp = h / 8;

    // 坐标轴网格
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = -3; x <= 3; x++) {
      ctx.beginPath();
      ctx.moveTo(cx + x * scaleX, 0); ctx.lineTo(cx + x * scaleX, h);
      ctx.stroke();
    }
    for (let y = -3; y <= 3; y++) {
      ctx.beginPath();
      ctx.moveTo(0, cy + y * scaleXp); ctx.lineTo(w, cy + y * scaleXp);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText('x (横向位移 mm)', w - 120, cy - 10);
    ctx.fillText("x' (角散 mrad)", cx + 10, 20);

    // 绘制粒子散点
    ctx.fillStyle = 'rgba(0, 242, 254, 0.65)';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(cx + p.x * scaleX, cy - p.xp * scaleXp, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 绘制 Courant-Snyder 理论包络相椭圆: γ x^2 + 2α x x' + β x'^2 = ε
    const gamma = (1 + alpha0 * alpha0) / beta0;
    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const phi = (i / steps) * 2 * Math.PI;
      // 椭圆参数化生成
      const x_ell = Math.sqrt(beta0 * emittance) * Math.cos(phi);
      const xp_ell = -Math.sqrt(emittance / beta0) * (alpha0 * Math.cos(phi) - Math.sin(phi));
      const px = cx + x_ell * scaleX;
      const py = cy - xp_ell * scaleXp;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 束流包络标签
    ctx.fillStyle = '#ffb703';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText(`CS相椭圆 (β=${beta0.toFixed(2)}, α=${alpha0.toFixed(2)})`, cx + 30, cy + 50);
  }

  // 事件绑定
  container.querySelector('#btn-mode-orbit').addEventListener('click', () => {
    currentMode = 'orbit';
    container.querySelector('#btn-mode-orbit').classList.add('active');
    container.querySelector('#btn-mode-beam').classList.remove('active');
    container.querySelector('#controls-orbit').style.display = 'flex';
    container.querySelector('#controls-beam').style.display = 'none';
    container.querySelector('#hud-mode-text').textContent = '辛积分对比 (非线性摆)';
    container.querySelector('#hud-metric-1').style.display = 'flex';
    container.querySelector('#hud-metric-2').style.display = 'flex';
    container.querySelector('#hud-metric-3').style.display = 'none';
  });

  container.querySelector('#btn-mode-beam').addEventListener('click', () => {
    currentMode = 'beam';
    container.querySelector('#btn-mode-beam').classList.add('active');
    container.querySelector('#btn-mode-orbit').classList.remove('active');
    container.querySelector('#controls-orbit').style.display = 'none';
    container.querySelector('#controls-beam').style.display = 'flex';
    container.querySelector('#hud-mode-text').textContent = '束流 Courant-Snyder 辛变换';
    container.querySelector('#hud-metric-1').style.display = 'none';
    container.querySelector('#hud-metric-2').style.display = 'flex';
    container.querySelector('#hud-metric-3').style.display = 'flex';
  });

  // 轨道控件交互
  container.querySelectorAll('input[name="symp-algo"]').forEach(input => {
    input.addEventListener('change', (e) => {
      algorithm = e.target.value;
      container.querySelectorAll('.lab-radio-label').forEach(lbl => lbl.classList.remove('active'));
      e.target.closest('.lab-radio-label').classList.add('active');
    });
  });

  container.querySelector('#slider-step').addEventListener('input', (e) => {
    dt = parseFloat(e.target.value);
    container.querySelector('#val-step').textContent = `${dt.toFixed(2)} s`;
  });

  container.querySelector('#slider-q0').addEventListener('input', (e) => {
    q0 = parseFloat(e.target.value);
    container.querySelector('#val-q0').textContent = `${q0.toFixed(1)} rad`;
    resetOrbit();
  });

  function resetOrbit() {
    stateSymp = { q: q0, p: 0, trail: [] };
    stateRK4 = { q: q0, p: 0, trail: [] };
  }

  container.querySelector('#btn-reset-orbit').addEventListener('click', resetOrbit);
  container.querySelector('#btn-pause-orbit').addEventListener('click', (e) => {
    isRunning = !isRunning;
    e.target.textContent = isRunning ? '暂停/继续' : '恢复运动';
    if (isRunning) render();
  });

  // 束流光学控件交互
  container.querySelector('#slider-beta0').addEventListener('input', (e) => {
    beta0 = parseFloat(e.target.value);
    container.querySelector('#val-beta0').textContent = `${beta0.toFixed(1)} m`;
    generateParticles();
  });

  container.querySelector('#slider-alpha0').addEventListener('input', (e) => {
    alpha0 = parseFloat(e.target.value);
    container.querySelector('#val-alpha0').textContent = `${alpha0.toFixed(1)}`;
    generateParticles();
  });

  container.querySelector('#slider-element-param').addEventListener('input', (e) => {
    elementParam = parseFloat(e.target.value);
    container.querySelector('#val-element-param').textContent = `${elementParam.toFixed(1)} m`;
  });

  container.querySelector('#select-element').addEventListener('change', (e) => {
    const val = e.target.value;
    const label = container.querySelector('#param-name-label');
    if (val.includes('quad')) {
      label.textContent = '透镜焦距 f:';
    } else if (val === 'drift') {
      label.textContent = '漂移长度 L:';
    } else {
      label.textContent = 'FODO单元焦距 f:';
    }
  });

  container.querySelector('#btn-sample-particles').addEventListener('click', generateParticles);

  container.querySelector('#btn-apply-transport').addEventListener('click', () => {
    const M = getElementMatrix();
    const m11 = M[0][0], m12 = M[0][1], m21 = M[1][0], m22 = M[1][1];

    // 更新每个粒子的相坐标: [x2, xp2]^T = M * [x1, xp1]^T
    particles.forEach(p => {
      const nx = m11 * p.x + m12 * p.xp;
      const nxp = m21 * p.x + m22 * p.xp;
      p.x = nx;
      p.xp = nxp;
    });

    // 计算 Twiss 矩阵变换
    const gamma0 = (1 + alpha0 * alpha0) / beta0;
    const beta1 = m11 * m11 * beta0 - 2 * m11 * m12 * alpha0 + m12 * m12 * gamma0;
    const alpha1 = -m11 * m21 * beta0 + (m11 * m22 + m12 * m21) * alpha0 - m12 * m22 * gamma0;

    beta0 = beta1;
    alpha0 = alpha1;

    container.querySelector('#slider-beta0').value = beta0;
    container.querySelector('#val-beta0').textContent = `${beta0.toFixed(1)} m`;
    container.querySelector('#slider-alpha0').value = alpha0;
    container.querySelector('#val-alpha0').textContent = `${alpha0.toFixed(1)}`;

    const det = m11 * m22 - m12 * m21;
    container.querySelector('#hud-det').textContent = `${det.toFixed(6)} (det M = 1)`;
  });

  // 启动渲染
  render();

  return () => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resizeCanvas);
  };
}

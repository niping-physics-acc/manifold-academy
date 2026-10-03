/**
 * Extra Specialized Interactive Labs for Manifold Academy
 * Includes:
 * 1. Differential Geometry: 2-Form Wedge Product & Oriented Surface Area
 * 2. Electrodynamics: Relativistic Beaming & Doppler Cone (1/gamma)
 * 3. Lie Groups: SU(2) Spinor Rotation & 4pi Double Cover Homotopy
 * 4. Quantum Mechanics: Wavepacket Tunneling & Wigner Interference
 */

// 1. 微分几何外代数 2-形式实验
export function createDiffGeomLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-cyan">现代微分几何实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">外积 2-形式 u ∧ v 与有向微分微元可视化</h3>
        </div>
        <div class="lab-status-badge">
          <div class="lab-status-pulse"></div>
          <span>反对称性: u ∧ v = - v ∧ u</span>
        </div>
      </div>
      <div class="lab-body">
        <div class="lab-canvas-container" id="geom-canvas-box">
          <canvas id="geom-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">外形式代数面积 ω(u, v):</span>
              <span class="hud-value cyan" id="hud-area-val">+4.200</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">定向符号 (Sign of Area):</span>
              <span class="hud-value emerald" id="hud-sign-val">正向 (逆时针/右手定则)</span>
            </div>
          </div>
        </div>
        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">几何直观</label>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              在画板上拖动两个切向量 <strong style="color: var(--accent-cyan);">向量 u</strong> 和 <strong style="color: #ff0080;">向量 v</strong>。外积 $u \\wedge v$ 天然表示它们张成的有向平行四边形面积。当两者次序反转或交叉时，外形式的值变号，展示外微分如何将“几何微元定向”公理化。
            </p>
          </div>
          <div class="control-group">
            <label class="control-label">
              <span>坐标系旋转角 θ:</span>
              <span class="control-slider-val" id="val-geom-rot">0.0 rad</span>
            </label>
            <input type="range" class="lab-slider" id="slider-geom-rot" min="0" max="6.28" step="0.05" value="0">
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-swap-vectors" style="width: 100%;">对调向量次序 (验证反交换律)</button>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#geom-canvas');
  const ctx = canvas.getContext('2d');

  let u = { x: 120, y: -40 };
  let v = { x: 40, y: -110 };
  let rot = 0;

  function resizeCanvas() {
    const box = container.querySelector('#geom-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  function render() {
    const box = container.querySelector('#geom-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // 坐标轴
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.stroke();

    // 计算外积有向面积: det = u_x * v_y - u_y * v_x
    const det = (u.x * (-v.y) - (-u.y) * v.x) / 1000; // 考虑 Canvas Y 轴翻转
    const isPositive = det >= 0;

    // 绘制平行四边形面
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + u.x, cy + u.y);
    ctx.lineTo(cx + u.x + v.x, cy + u.y + v.y);
    ctx.lineTo(cx + v.x, cy + v.y);
    ctx.closePath();
    ctx.fillStyle = isPositive ? 'rgba(0, 242, 254, 0.25)' : 'rgba(255, 0, 128, 0.25)';
    ctx.fill();
    ctx.strokeStyle = isPositive ? '#00f2fe' : '#ff0080';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 绘制向量 u
    drawArrow(cx, cy, cx + u.x, cy + u.y, '#00f2fe', 'u');
    // 绘制向量 v
    drawArrow(cx, cy, cx + v.x, cy + v.y, '#ffb703', 'v');

    container.querySelector('#hud-area-val').textContent = (det >= 0 ? '+' : '') + det.toFixed(3);
    container.querySelector('#hud-sign-val').textContent = det >= 0 ? '正向 (逆时针 / 右手系)' : '反向 (顺时针 / 左手系)';
    container.querySelector('#hud-sign-val').className = det >= 0 ? 'hud-value emerald' : 'hud-value magenta';
  }

  function drawArrow(fromx, fromy, tox, toy, color, label) {
    const headlen = 10;
    const angle = Math.atan2(toy - fromy, tox - fromx);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fill();

    ctx.font = '14px JetBrains Mono';
    ctx.fillText(label, tox + 10 * Math.cos(angle), toy + 10 * Math.sin(angle));
  }

  // 鼠标交互控制向量
  let dragging = null;
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - canvas.clientWidth / 2;
    const my = e.clientY - rect.top - canvas.clientHeight / 2;
    if (Math.hypot(mx - u.x, my - u.y) < 25) dragging = 'u';
    else if (Math.hypot(mx - v.x, my - v.y) < 25) dragging = 'v';
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - canvas.clientWidth / 2;
    const my = e.clientY - rect.top - canvas.clientHeight / 2;
    if (dragging === 'u') { u.x = mx; u.y = my; }
    else if (dragging === 'v') { v.x = mx; v.y = my; }
    render();
  });

  window.addEventListener('mouseup', () => { dragging = null; });

  container.querySelector('#btn-swap-vectors').addEventListener('click', () => {
    const tmp = { ...u };
    u = { ...v };
    v = tmp;
    render();
  });

  render();
  return () => window.removeEventListener('resize', resizeCanvas);
}

// 2. 经典电动力学：超相对论集束与辐射锥
export function createRadiationLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-amber">经典电动力学实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">相对论运动电荷辐射锥 (1/γ) 与波前多普勒压缩</h3>
        </div>
        <div class="lab-status-badge" style="color: var(--accent-amber); background: rgba(255, 183, 3, 0.12);">
          <div class="lab-status-pulse" style="background: var(--accent-amber); box-shadow: 0 0 8px var(--accent-amber);"></div>
          <span>同步辐射模式激活</span>
        </div>
      </div>
      <div class="lab-body">
        <div class="lab-canvas-container" id="rad-canvas-box">
          <canvas id="rad-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">电子速度 β = v/c:</span>
              <span class="hud-value cyan" id="hud-beta-val">0.900</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">洛伦兹因子 γ:</span>
              <span class="hud-value amber" id="hud-gamma-val">2.294</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">辐射半角 θ_cone ≈ 1/γ:</span>
              <span class="hud-value magenta" id="hud-cone-val">24.9° (0.436 rad)</span>
            </div>
          </div>
        </div>
        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">物理直观</label>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              在静止系对称发射的球形电磁波，因向前运动的 Lorentz 变换多普勒效应，在实验室系中波前被极端挤压向正前方。当速度逼近光速（$\\beta \\to 1, \\gamma \\gg 1$）时，能量被高度汇聚为针状发射圆锥，这正是**同步辐射光源与自由电子激光超高空间亮度**的物理本源！
            </p>
          </div>
          <div class="control-group">
            <label class="control-label">
              <span>相对论速度 β:</span>
              <span class="control-slider-val" id="val-rad-beta">0.90 c</span>
            </label>
            <input type="range" class="lab-slider" id="slider-rad-beta" min="0.0" max="0.98" step="0.01" value="0.90">
          </div>
          <div class="control-group">
            <label class="control-label">加速模式</label>
            <select id="rad-mode-select" style="background: rgba(10,15,30,0.8); color: #fff; padding: 8px 12px; border: 1px solid var(--border-subtle); border-radius: 6px; font-family: inherit;">
              <option value="linear">直线加速 (Bremmsstrahlung / 韧致辐射)</option>
              <option value="circular">圆形环绕 (Synchrotron / 同步辐射)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#rad-canvas');
  const ctx = canvas.getContext('2d');

  let beta = 0.90;
  let mode = 'linear';
  let t = 0;
  let waveFronts = [];
  let animId = null;

  function resizeCanvas() {
    const box = container.querySelector('#rad-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  function render() {
    const box = container.querySelector('#rad-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const c = 2.0; // 光速比例
    const v = beta * c;

    t += 0.5;

    // 粒子当前位置
    let px = 0, py = 0;
    if (mode === 'linear') {
      px = (t * v) % (w - 100) + 50;
      py = h / 2;
    } else {
      const R = Math.min(w, h) * 0.28;
      const omega = v / R;
      px = w / 2 + R * Math.cos(omega * t);
      py = h / 2 + R * Math.sin(omega * t);
    }

    // 发射波前
    if (Math.floor(t) % 6 === 0) {
      waveFronts.push({ x: px, y: py, r: 0, opacity: 1.0 });
    }

    // 绘制与膨胀波前
    for (let i = waveFronts.length - 1; i >= 0; i--) {
      const wf = waveFronts[i];
      wf.r += c;
      wf.opacity -= 0.005;

      if (wf.opacity <= 0) {
        waveFronts.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = `rgba(255, 183, 3, ${wf.opacity * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(wf.x, wf.y, wf.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 绘制运动带电粒子
    ctx.fillStyle = '#00f2fe';
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 绘制 1/gamma 辐射锥辅助线
    const gamma = 1 / Math.sqrt(Math.max(0.001, 1 - beta * beta));
    const coneAngle = 1 / gamma;

    if (mode === 'linear') {
      ctx.strokeStyle = 'rgba(255, 0, 128, 0.45)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      const len = 140;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + len * Math.cos(coneAngle), py + len * Math.sin(coneAngle));
      ctx.moveTo(px, py);
      ctx.lineTo(px + len * Math.cos(-coneAngle), py + len * Math.sin(-coneAngle));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 更新 HUD
    container.querySelector('#hud-beta-val').textContent = beta.toFixed(3);
    container.querySelector('#hud-gamma-val').textContent = gamma.toFixed(3);
    const deg = (coneAngle * 180 / Math.PI).toFixed(1);
    container.querySelector('#hud-cone-val').textContent = `${deg}° (${coneAngle.toFixed(3)} rad)`;

    animId = requestAnimationFrame(render);
  }

  container.querySelector('#slider-rad-beta').addEventListener('input', (e) => {
    beta = parseFloat(e.target.value);
    container.querySelector('#val-rad-beta').textContent = `${beta.toFixed(2)} c`;
    waveFronts = [];
  });

  container.querySelector('#rad-mode-select').addEventListener('change', (e) => {
    mode = e.target.value;
    waveFronts = [];
  });

  render();
  return () => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resizeCanvas);
  };
}

// 3. 李群：SU(2) 旋量与双重覆盖拓扑
export function createSpinorLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-purple">李群与代数实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">SU(2) 旋量与 SO(3) 360°/720° 拓扑双重覆盖</h3>
        </div>
        <div class="lab-status-badge">
          <div class="lab-status-pulse"></div>
          <span>同伦等价 π₁(SO(3)) = Z₂</span>
        </div>
      </div>
      <div class="lab-body">
        <div class="lab-canvas-container" id="spin-canvas-box">
          <canvas id="spin-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">旋转角度 θ:</span>
              <span class="hud-value cyan" id="hud-spin-angle">0.0°</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">SO(3) 宏观刚体状态:</span>
              <span class="hud-value emerald" id="hud-so3-state">初始位</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">SU(2) 旋量态相因子:</span>
              <span class="hud-value magenta" id="hud-spin-phase">+1.000 (同相)</span>
            </div>
          </div>
        </div>
        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">拓扑物理图像</label>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              拖动滑块旋转三维刚体。旋转到 <strong style="color: var(--accent-cyan);">360°</strong> 时，宏观物体已复位，但微观费米子旋量态 $U = \\exp(-i \\frac{\\theta}{2} \\sigma_z)$ 积累了奇偶性符号 <strong style="color: #ff0080;">-1</strong>！唯有转满 <strong style="color: var(--accent-emerald);">720° (4π)</strong>，闭环路才能在李群空间收缩为一点。
            </p>
          </div>
          <div class="control-group">
            <label class="control-label">
              <span>连续旋转角 θ (0 到 4π):</span>
              <span class="control-slider-val" id="val-spin-theta">0.0°</span>
            </label>
            <input type="range" class="lab-slider" id="slider-spin-theta" min="0" max="720" step="5" value="0">
          </div>
          <div class="lab-btn-grid">
            <button class="btn btn-secondary btn-sm" id="btn-spin-360">旋转 360° (2π)</button>
            <button class="btn btn-primary btn-sm" id="btn-spin-720">旋转 720° (4π)</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#spin-canvas');
  const ctx = canvas.getContext('2d');

  let thetaDeg = 0;

  function resizeCanvas() {
    const box = container.querySelector('#spin-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  function render() {
    const box = container.querySelector('#spin-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const rad = thetaDeg * (Math.PI / 180);

    // 绘制 3D 刚体线框 (立方体透视投影)
    ctx.save();
    ctx.translate(cx, cy);

    // 旋转立方体
    const size = 65;
    const nodes = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];

    const edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    const rotatedNodes = nodes.map(pt => {
      // 绕 Y 轴旋转 rad
      const x1 = pt[0] * Math.cos(rad) + pt[2] * Math.sin(rad);
      const z1 = -pt[0] * Math.sin(rad) + pt[2] * Math.cos(rad);
      // 绕 X 轴轻微俯视
      const pitch = 0.4;
      const y2 = pt[1] * Math.cos(pitch) - z1 * Math.sin(pitch);
      const z2 = pt[1] * Math.sin(pitch) + z1 * Math.cos(pitch);
      return [x1 * size, y2 * size];
    });

    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    edges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(rotatedNodes[i][0], rotatedNodes[i][1]);
      ctx.lineTo(rotatedNodes[j][0], rotatedNodes[j][1]);
      ctx.stroke();
    });

    // 突出刚体某一特征面 (证明 SO(3) 复位)
    ctx.fillStyle = 'rgba(255, 183, 3, 0.4)';
    ctx.beginPath();
    ctx.moveTo(rotatedNodes[4][0], rotatedNodes[4][1]);
    ctx.lineTo(rotatedNodes[5][0], rotatedNodes[5][1]);
    ctx.lineTo(rotatedNodes[6][0], rotatedNodes[6][1]);
    ctx.lineTo(rotatedNodes[7][0], rotatedNodes[7][1]);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // 计算旋量相位 factor = cos(theta/2)
    const spinorPhase = Math.cos(rad / 2);
    container.querySelector('#hud-spin-angle').textContent = `${thetaDeg.toFixed(0)}° (${(rad / Math.PI).toFixed(2)}π)`;

    const modDeg = thetaDeg % 360;
    container.querySelector('#hud-so3-state').textContent = (modDeg === 0) ? '完全复位 (R = I)' : `偏转 ${modDeg.toFixed(0)}°`;

    const phaseText = spinorPhase >= 0.999 ? '+1.000 (同相复位)' : (spinorPhase <= -0.999 ? '-1.000 (严格反号 -|ψ⟩!)' : spinorPhase.toFixed(3));
    container.querySelector('#hud-spin-phase').textContent = phaseText;
    container.querySelector('#hud-spin-phase').className = spinorPhase <= -0.9 ? 'hud-value magenta' : 'hud-value emerald';
  }

  container.querySelector('#slider-spin-theta').addEventListener('input', (e) => {
    thetaDeg = parseFloat(e.target.value);
    container.querySelector('#val-spin-theta').textContent = `${thetaDeg.toFixed(0)}°`;
    render();
  });

  container.querySelector('#btn-spin-360').addEventListener('click', () => {
    thetaDeg = 360;
    container.querySelector('#slider-spin-theta').value = 360;
    container.querySelector('#val-spin-theta').textContent = '360°';
    render();
  });

  container.querySelector('#btn-spin-720').addEventListener('click', () => {
    thetaDeg = 720;
    container.querySelector('#slider-spin-theta').value = 720;
    container.querySelector('#val-spin-theta').textContent = '720°';
    render();
  });

  render();
  return () => window.removeEventListener('resize', resizeCanvas);
}

// 4. 量子力学：波包隧穿与相空间演化
export function createWavePacketLab(container) {
  container.innerHTML = `
    <div class="lab-section">
      <div class="lab-header">
        <div class="lab-title-area">
          <span class="badge badge-purple">现代量子力学实验</span>
          <h3 style="font-size: 1.15rem; color: #fff;">1D 薛定谔波包势垒隧穿与相空间 Wigner 分解</h3>
        </div>
        <div class="lab-status-badge">
          <div class="lab-status-pulse"></div>
          <span>时间演化 iℏ ∂ψ/∂t = Ĥ ψ</span>
        </div>
      </div>
      <div class="lab-body">
        <div class="lab-canvas-container" id="qm-canvas-box">
          <canvas id="qm-canvas" class="lab-canvas"></canvas>
          <div class="lab-hud">
            <div class="hud-metric">
              <span class="hud-label">透射系数 T (Tunneling):</span>
              <span class="hud-value cyan" id="hud-trans-val">18.4%</span>
            </div>
            <div class="hud-metric">
              <span class="hud-label">反射系数 R:</span>
              <span class="hud-value amber" id="hud-refl-val">81.6%</span>
            </div>
          </div>
        </div>
        <div class="lab-controls-panel">
          <div class="control-group">
            <label class="control-label">实验物理图像</label>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              高斯相干波包撞击有限高势垒（中央洋红矩形）。由于波函数的空间干涉与波动性，一部分波包穿透经典禁区形成透射波包，另一部分反弹发生复杂的駐波干涉，这在相空间 Wigner 拟概率分布上表现为强烈的非经典负值震荡！
            </p>
          </div>
          <div class="control-group">
            <label class="control-label">
              <span>势垒高度 V₀:</span>
              <span class="control-slider-val" id="val-barrier-v0">1.5 eV</span>
            </label>
            <input type="range" class="lab-slider" id="slider-barrier-v0" min="0.5" max="3.0" step="0.1" value="1.5">
          </div>
          <div class="control-group">
            <label class="control-label">
              <span>入射波包平均动能 E:</span>
              <span class="control-slider-val" id="val-packet-e">1.2 eV</span>
            </label>
            <input type="range" class="lab-slider" id="slider-packet-e" min="0.5" max="2.5" step="0.1" value="1.2">
          </div>
          <div class="lab-btn-grid">
            <button class="btn btn-secondary btn-sm" id="btn-reset-qm">重发波包</button>
            <button class="btn btn-primary btn-sm" id="btn-pause-qm">暂停/继续</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#qm-canvas');
  const ctx = canvas.getContext('2d');

  let V0 = 1.5;
  let E = 1.2;
  let isRunning = true;
  let animId = null;

  const N = 200;
  let psiReal = new Float32Array(N);
  let psiImag = new Float32Array(N);

  function initWave() {
    const x0 = 40;
    const sigma = 10;
    const k0 = Math.sqrt(2 * E) * 0.45;
    for (let i = 0; i < N; i++) {
      const g = Math.exp(-Math.pow(i - x0, 2) / (2 * sigma * sigma));
      psiReal[i] = g * Math.cos(k0 * i) * 0.4;
      psiImag[i] = g * Math.sin(k0 * i) * 0.4;
    }
  }
  initWave();

  function resizeCanvas() {
    const box = container.querySelector('#qm-canvas-box');
    if (!box) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = box.clientWidth * dpr;
    canvas.height = box.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 50);

  // 薛定谔波包单步演化 (有限差分交错网格)
  function stepQM() {
    const dt = 0.35;
    const barrierStart = 95;
    const barrierEnd = 110;

    // 实部更新
    for (let i = 1; i < N - 1; i++) {
      const pot = (i >= barrierStart && i <= barrierEnd) ? V0 : 0;
      const lap = psiImag[i + 1] - 2 * psiImag[i] + psiImag[i - 1];
      psiReal[i] += (-0.5 * lap + pot * psiImag[i]) * dt;
    }
    // 虚部更新
    for (let i = 1; i < N - 1; i++) {
      const pot = (i >= barrierStart && i <= barrierEnd) ? V0 : 0;
      const lap = psiReal[i + 1] - 2 * psiReal[i] + psiReal[i - 1];
      psiImag[i] -= (-0.5 * lap + pot * psiReal[i]) * dt;
    }
  }

  function render() {
    const box = container.querySelector('#qm-canvas-box');
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;
    ctx.clearRect(0, 0, w, h);

    if (isRunning) {
      stepQM();
    }

    const baseline = h - 60;
    const dx = w / N;

    // 绘制势垒 (洋红块)
    const barrierStart = 95 * dx;
    const barrierWidth = 15 * dx;
    const barrierH = V0 * 50;
    ctx.fillStyle = 'rgba(255, 0, 128, 0.2)';
    ctx.fillRect(barrierStart, baseline - barrierH, barrierWidth, barrierH);
    ctx.strokeStyle = '#ff0080';
    ctx.strokeRect(barrierStart, baseline - barrierH, barrierWidth, barrierH);

    ctx.fillStyle = '#ff0080';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText(`势垒 V₀ = ${V0.toFixed(1)} eV`, barrierStart - 10, baseline - barrierH - 8);

    // 绘制几率密度 |psi|^2
    ctx.fillStyle = 'rgba(0, 242, 254, 0.25)';
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, baseline);

    let transProb = 0;
    let reflProb = 0;

    for (let i = 0; i < N; i++) {
      const prob = psiReal[i] * psiReal[i] + psiImag[i] * psiImag[i];
      const y = baseline - prob * 400;
      ctx.lineTo(i * dx, y);

      if (i > 110) transProb += prob;
      else if (i < 95) reflProb += prob;
    }
    ctx.lineTo(w, baseline);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 更新透射/反射率
    const sum = transProb + reflProb || 1;
    container.querySelector('#hud-trans-val').textContent = `${((transProb / sum) * 100).toFixed(1)}%`;
    container.querySelector('#hud-refl-val').textContent = `${((reflProb / sum) * 100).toFixed(1)}%`;

    if (isRunning) {
      animId = requestAnimationFrame(render);
    }
  }

  container.querySelector('#slider-barrier-v0').addEventListener('input', (e) => {
    V0 = parseFloat(e.target.value);
    container.querySelector('#val-barrier-v0').textContent = `${V0.toFixed(1)} eV`;
  });

  container.querySelector('#slider-packet-e').addEventListener('input', (e) => {
    E = parseFloat(e.target.value);
    container.querySelector('#val-packet-e').textContent = `${E.toFixed(1)} eV`;
    initWave();
  });

  container.querySelector('#btn-reset-qm').addEventListener('click', initWave);
  container.querySelector('#btn-pause-qm').addEventListener('click', (e) => {
    isRunning = !isRunning;
    e.target.textContent = isRunning ? '暂停/继续' : '恢复演化';
    if (isRunning) render();
  });

  render();
  return () => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resizeCanvas);
  };
}

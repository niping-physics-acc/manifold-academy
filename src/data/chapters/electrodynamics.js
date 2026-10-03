/**
 * Covariant Electrodynamics & U(1) Bundles Master Chapter
 * Focuses on:
 * - Why 3-vector Maxwell equations fail in relativity (Motivation)
 * - 4-potential 1-form A and Faraday Curvature 2-form F = dA
 * - Hodge Duality * and complete coordinate derivation of Maxwell's Equations
 * - Gauge Invariance as U(1) Principal Fiber Bundle connection
 * - Relativistic Beaming and Doppler Cone 1/gamma in Synchrotron Radiation & FELs
 */

export const electrodynamicsChapter = {
  id: 'electrodynamics-01',
  disciplineId: 'electrodynamics',
  title: '微分形式 Maxwell 方程组与超相对论辐射锥',
  subtitle: 'Differential Forms in Electrodynamics, Hodge Duality, Gauge Invariance and Relativistic Beaming',
  level: 'Graduate Core / 四维协变场论',
  prereqs: ['狭义相对论四维张量', '微分形式与 Hodge 星算子'],
  readingTime: '60 min',
  summary: '将经典电动力学的电场与磁场完全统一为 4 维闵氏流形上的曲率 2-形式 F = dA。从外微分算子 d 与 Hodge 星对偶算子 ⋆ 出发，完整推导麦克斯韦方程组如何归结为两行极简几何等式 dF = 0 与 d⋆F = J。深入推导高能相对论电子在 Lorentz 速度变换下的空间辐射锥（θ ≈ 1/γ），打通同步辐射与自由电子激光高亮度的物理本质。',
  sections: [
    {
      heading: '一、概念诞生背景：为什么传统三维电磁学不是真正的相对论场论？',
      content: `
<div class="math-motivation">
  <strong>【三维矢量的相对论困局】</strong>：在赫兹与麦克斯韦时代，电场 $\\vec{E}$ 与磁场 $\\vec{B}$ 被视为三维欧氏空间中的独立矢量。然而爱因斯坦狭义相对论揭示：时间与空间不可分割地交织为 4 维时空流形 $\\mathcal{M}^4$。在参考系进行平移与 Lorentz 变换（Boost）时，纯电场会感应出磁场，纯磁场也会感应出电场！这意味着三维矢量 $\\vec{E}$ 和 $\\vec{B}$ 根本不是物理的独立客观实体，而是某个更高维几何张量在不同观察者时间轴上的投影截面！
</div>

1. **规范势的几何本质**：
   为了保证场方程局域因果性，必须引入电磁 4-标势 $A_\\mu = (\\phi/c, -\\vec{A})$。然而势场本身在规范变换 $A_\\mu \\to A_\\mu + \\partial_\\mu \\chi$ 下不可直接测量。这提示我们：电磁场本质上是一个 **$U(1)$ 主纤维丛上的联络（Connection 1-form）**，可观测的物理量必须具有规范不变性。

2. **微分几何的终极简化**：
   在微分形式下，8 个分量的偏微分方程组消失了，取而代之的是纯粹的外微分运算：一个关于几何封闭性（$dF = 0$），另一个关于源项边界（$d\\star F = J$）。
      `
    },
    {
      heading: '二、法拉第曲率 2-形式 $F = dA$ 与 Hodge 星对偶算子',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    <span>定义 4.1：电磁 4-势 1-形式与法拉第 2-形式</span>
  </div>
  <p>在闵可夫斯基时空 $(\\mathcal{M}^4, \\eta)$（度规符号记为 $\\eta_{\\mu\\nu} = \\text{diag}(1, -1, -1, -1)$）上，定义<strong>电磁 4-标势 1-形式 $A$</strong>：</p>
  $$A = A_\\mu dx^\\mu = c \\phi \\, dt - A_x dx - A_y dy - A_z dz$$
  <p>对其取外微分，定义<strong>法拉第电磁曲率 2-形式 $F$</strong>：</p>
  $$F = dA = \\frac{1}{2} F_{\\mu\\nu} dx^\\mu \\wedge dx^\\nu$$
  <p>在时空坐标下展开为：</p>
  $$F = (E_x dt \\wedge dx + E_y dt \\wedge dy + E_z dt \\wedge dz) - (B_x dy \\wedge dz + B_y dz \\wedge dx + B_z dx \\wedge dy)$$
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    <span>定义 4.2：时空 Hodge 星算子 (Hodge Star Operator)</span>
  </div>
  <p>在配备度规与定向体积形式 $\\eta_4 = c dt \\wedge dx \\wedge dy \\wedge dz$ 的 4 维流形上，Hodge 星算子是将 $k$-形式映射为 $(4-k)$-形式的同构映射 $\\star: \\Omega^k \\to \\Omega^{4-k}$：</p>
  $$\\star(dx^0 \\wedge dx^1) = - dx^2 \\wedge dx^3, \\quad \\star(dx^2 \\wedge dx^3) = dx^0 \\wedge dx^1$$
  <p>它在电磁场中执行将电场与磁场相互对偶置换的操作：$\\vec{E} \\to -c\\vec{B}, \\, \\vec{B} \\to \\vec{E}/c$。</p>
</div>
      `
    },
    {
      heading: '三、麦克斯韦方程组微分形式的严格还原证明',
      content: `
<div class="math-proof">
  <div class="math-proof-title">
    <span>【证明 4.1】齐次组 $dF = 0$ 还原为无磁单极与法拉第感应定律</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Exact Reduction</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>外微分幂零律的必然拓扑结果</strong>：<br/>
        因为 $F = dA$，由外微分算子公理 $d^2 = 0$，必然有：$$dF = d(dA) \\equiv 0$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>按三维空间微元展开 $dF$</strong>：<br/>
        将 $F = E_i dt \\wedge dx^i - \\frac{1}{2} \\epsilon_{ijk} B_k dx^i \\wedge dx^j$ 代入外微分：
        $$dF = \\left( \\frac{\\partial E_i}{\\partial x^j} dx^j \\wedge dt \\wedge dx^i \\right) - \\frac{1}{2} \\epsilon_{ijk} \\left( \\frac{\\partial B_k}{\\partial t} dt \\wedge dx^i \\wedge dx^j + \\frac{\\partial B_k}{\\partial x^l} dx^l \\wedge dx^i \\wedge dx^j \\right)$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>分量分离与经典方程对应</strong>：<br/>
        - 空间 3-形式分量（$dx \\wedge dy \\wedge dz$ 项）：
          $$\\frac{1}{2} \\epsilon_{ijk} \\frac{\\partial B_k}{\\partial x^l} dx^l \\wedge dx^i \\wedge dx^j = (\\nabla \\cdot \\vec{B}) \\, dx \\wedge dy \\wedge dz = 0 \\implies \\nabla \\cdot \\vec{B} = 0$$
        - 含有时间 $dt$ 的 3-形式分量：
          $$\\left( \\nabla \\times \\vec{E} + \\frac{\\partial \\vec{B}}{\\partial t} \\right)_k dt \\wedge dx^i \\wedge dx^j = 0 \\implies \\nabla \\times \\vec{E} + \\frac{\\partial \\vec{B}}{\\partial t} = 0$$
        两个齐次方程被 $dF = 0$ 一网打尽！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 齐次麦克斯韦方程证明完毕</div>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【证明 4.2】非齐次组 $d\\star F = \\mu_0 J$ 与四维电荷守恒</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Exact Reduction</span>
  </div>
  <p style="color:#cbd5e1; line-height: 1.8;">
    非齐次麦克斯韦方程组写为：$$d(\\star F) = \\mu_0 J$$
    其中源项 3-形式电流微元为 $J = c\\rho \\, dx \\wedge dy \\wedge dz - j_x c dt \\wedge dy \\wedge dz - \\dots$。<br/>
    计算 $d(\\star F)$ 并对比分量，精确给出**高斯定律** $\\nabla \\cdot \\vec{E} = \\rho/\\epsilon_0$ 与**安培-麦克斯韦定律** $\\nabla \\times \\vec{B} - \\frac{1}{c^2}\\frac{\\partial \\vec{E}}{\\partial t} = \\mu_0 \\vec{j}$。<br/>
    <br/>
    <strong>【电荷守恒的纯拓扑来源】</strong>：
    对非齐次方程两边再次取外微分：
    $$d(d(\\star F)) = \\mu_0 dJ$$
    因为左边 $d(d(\\cdot)) \\equiv 0$，立即强迫右边：$$dJ = 0$$
    展开 3-形式 $J$ 的外微分 $dJ = \\left( \\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot \\vec{j} \\right) c dt \\wedge dx \\wedge dy \\wedge dz = 0$！<br/>
    <strong>电荷守恒定律并不是麦克斯韦方程之外的额外附加假定，它是外微分算子幂零律 $d^2 = 0$ 的直接推论！</strong>
  </p>
  <div class="qed-symbol">■ Q.E.D.</div>
</div>
      `
    },
    {
      heading: '四、超相对论束流与辐射锥 (Relativistic Beaming) 严密渐近推导',
      content: `
<div class="math-motivation">
  <strong>【加速器物理的生命线：辐射锥半角 $1/\\gamma$ 从何而来？】</strong>：在能量回收型直线加速器（ERL）或第 4 代同步辐射光源中，电子以极接近光速运动（$\\gamma = E/(m_0 c^2) \\sim 10^3 \\sim 10^4$）。为什么运动电荷发射的辐射会被极端强烈地汇聚在向前运动方向的针状微锥内？
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【推导 4.3】相对论光行差与 $1/\\gamma$ 极窄发射锥严格渐近推导</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Relativistic Beaming Proof</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>静止系到实验室系的四维波矢变换</strong>：<br/>
        设粒子在静止坐标系 $K'$ 中发射一个角频率为 $\\omega'$ 的光子，与运动轴成 $\\theta'$ 角。<br/>
        四维光波矢为 $k'^{\\mu} = \\left( \\frac{\\omega'}{c}, k'_\\parallel, k'_\\perp \\right) = \\frac{\\omega'}{c} (1, \\cos\\theta', \\sin\\theta')$。<br/>
        施加沿平行方向速度为 $v = \\beta c$ 的逆 Lorentz 变换到实验室系 $K$：
        $$\\frac{\\omega}{c} = \\gamma \\left( \\frac{\\omega'}{c} + \\beta k'_\\parallel \\right) = \\gamma \\frac{\\omega'}{c} (1 + \\beta \\cos\\theta')$$
        $$k_\\parallel = \\gamma \\left( k'_\\parallel + \\beta \\frac{\\omega'}{c} \\right) = \\gamma \\frac{\\omega'}{c} (\\cos\\theta' + \\beta)$$
        $$k_\\perp = k'_\\perp = \\frac{\\omega'}{c} \\sin\\theta'$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>推导实验室系发射角 $\\theta$ 的严格公式</strong>：<br/>
        在实验室系中，光子发射角正切值为：
        $$\\tan \\theta = \\frac{k_\\perp}{k_\\parallel} = \\frac{\\sin\\theta'}{\\gamma (\\cos\\theta' + \\beta)}$$
        或者等价求正弦值：
        $$\\sin \\theta = \\frac{k_\\perp}{\\omega/c} = \\frac{\\sin\\theta'}{\\gamma (1 + \\beta \\cos\\theta')}$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>取超相对论极限 $\\gamma \\gg 1, \\beta = \\sqrt{1 - 1/\\gamma^2} \\approx 1 - \\frac{1}{2\\gamma^2}$</strong>：<br/>
        在静止系中，偶极辐射的半数能量发射在前半球 $\\theta' = \\pi/2$ 以内。<br/>
        将 $\\theta' = \\pi/2$ 代入实验室系角度：
        $$\\sin \\theta = \\frac{\\sin(\\pi/2)}{\\gamma (1 + \\beta \\cdot 0)} = \\frac{1}{\\gamma}$$
        因为当 $\\gamma \\gg 1$ 时 $\\theta \\ll 1$，由一阶泰勒展开 $\\sin \\theta \\approx \\theta$：
        $$\\theta_{\\text{cone}} \\approx \\frac{1}{\\gamma}$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 辐射锥公式推演完毕</div>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>💡 加速器光源应用：为什么 ERL 和 FEL 需要超小发射度？</span>
  </div>
  <p>
    一个 3 GeV 的电子，其洛伦兹因子高达 $\\gamma \\approx 5870$。<br/>
    其同步辐射向前辐射半角仅有：
    $$\\theta_{\\text{cone}} \\approx \\frac{1}{5870} \\text{ rad} \\approx 0.17 \\text{ mrad} \\approx 0.0097^\\circ$$
    所有的光子能量被高度集中在这样一个小如发丝的立体角内！<br/>
    但是，如果电子束流本身的固有相空间角散（Angular Spread）$\\sigma_{x'} = \\sqrt{\\epsilon / \\beta}$ 超过了 $1/\\gamma$，不同电子发射的光斑就会相互模糊叠加，使得 X 射线自由电子激光的横向空间相干性（Coherence）被彻底破坏！<br/>
    这正是为什么先进光源必须极度追求<strong>超低发射度（Diffraction-limited Emittance $\\epsilon \\le \\lambda / 4\\pi$）</strong>的根本电动力学原因！
  </p>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-em-01',
      title: '利用 Hodge 对偶分量严格推导安培-麦克斯韦定律',
      difficulty: 'Advanced',
      statement: '在闵氏空间 $\\mathbb{R}^{1,3}$ 中，已知电磁 2-形式 $F$。请严格写出 $\\star F$ 的 6 个独立分量，并计算外微分 $d(\\star F)$ 在分量 $dt \\wedge dx \\wedge dy$ 上的微商表达式，证明其严格等价于三维经典方程 $(\\nabla \\times \\vec{B})_z - \\frac{1}{c^2}\\frac{\\partial E_z}{\\partial t} = \\mu_0 j_z$。',
      hints: [
        '注意外积交换次序引入的符号：$dx \\wedge dt \\wedge dy = - dt \\wedge dx \\wedge dy$。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **写出 $\\star F$ 的显式展开**：
   已知法拉第形式为：
   $$F = \\sum_{i=1}^3 E_i dt \\wedge dx^i - (B_x dy \\wedge dz + B_y dz \\wedge dx + B_z dx \\wedge dy)$$
   根据闵氏度规特征 $\\eta = \\text{diag}(1, -1, -1, -1)$，体形式为 $\\eta_4 = c dt \\wedge dx \\wedge dy \\wedge dz$。
   - 对电场分量：$\\star(dt \\wedge dx) = - \\frac{1}{c} dy \\wedge dz$；
   - 对磁场分量：$\\star(dy \\wedge dz) = c dt \\wedge dx$。
   因此对偶 2-形式为：
   $$\\star F = - c (B_x dt \\wedge dx + B_y dt \\wedge dy + B_z dt \\wedge dz) - \\frac{1}{c} (E_x dy \\wedge dz + E_y dz \\wedge dx + E_z dx \\wedge dy)$$

2. **对其取外微分 $d(\\star F)$**：
   考虑所有产生基底 $dt \\wedge dx \\wedge dy$ 的微分项：
   - 来自第一部分：$-c B_z dt \\wedge dz$ 的外微分不含 $dt \\wedge dx \\wedge dy$；
     而 $-c B_x dt \\wedge dx$ 对 $y$ 求偏导：$-c \\frac{\\partial B_x}{\\partial y} dy \\wedge dt \\wedge dx = + c \\frac{\\partial B_x}{\\partial y} dt \\wedge dx \\wedge dy$；
     $-c B_y dt \\wedge dy$ 对 $x$ 求偏导：$-c \\frac{\\partial B_y}{\\partial x} dx \\wedge dt \\wedge dy = - c \\frac{\\partial B_y}{\\partial x} dt \\wedge dx \\wedge dy$；
   - 来自第二部分：$-\\frac{1}{c} E_z dx \\wedge dy$ 对时间 $t$ 求偏导：
     $$-\\frac{1}{c} \\frac{\\partial E_z}{\\partial t} dt \\wedge dx \\wedge dy$$

3. **合并同类项**：
   $$d(\\star F) \\supset - c \\left( \\frac{\\partial B_y}{\\partial x} - \\frac{\\partial B_x}{\\partial y} + \\frac{1}{c^2} \\frac{\\partial E_z}{\\partial t} \\right) dt \\wedge dx \\wedge dy = - c \\left( (\\nabla \\times \\vec{B})_z - \\frac{1}{c^2} \\frac{\\partial E_z}{\\partial t} \\right) dt \\wedge dx \\wedge dy$$

4. **与源项匹配**：
   源项形式为 $\\mu_0 J = - c \\mu_0 j_z dt \\wedge dx \\wedge dy$。
   两边系数严格相等：
   $$(\\nabla \\times \\vec{B})_z - \\frac{1}{c^2} \\frac{\\partial E_z}{\\partial t} = \\mu_0 j_z$$
   证毕。
      `
    }
  ]
};

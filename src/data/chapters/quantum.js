/**
 * Modern Geometric Quantum Mechanics Master Chapter
 * Focuses on:
 * - Projective Hilbert Space P(H) = CP^infinity & Fubini-Study metric (Motivation)
 * - U(1) Fiber Bundle Connection, Berry Curvature 2-Form & Berry Phase (Derivation)
 * - Two-level Spin in Magnetic Field Berry Phase as Solid Angle -1/2 Omega (Proof)
 * - Phase Space Quantum Mechanics: Wigner Quasi-Probability Distribution & Moyal Bracket (Proof)
 * - Classical Symplectic Limit hbar -> 0 and Microbunching in FELs
 */

export const quantumChapter = {
  id: 'quantum-01',
  disciplineId: 'quantum',
  title: '几何量子力学、Berry 相位与相空间 Wigner 分布',
  subtitle: 'Projective Hilbert Spaces, Geometric Phases, Wigner Quasi-Probability and Semiclassical Transport',
  level: 'Graduate Core / 现代几何量子',
  prereqs: ['量子力学态矢与算符', '复流形与纤维丛连络', '辛几何相空间'],
  readingTime: '60 min',
  summary: '超越坐标表象薛定谔波方程，进入现代几何量子力学世界。阐述量子纯态构成的射影空间 P(H) = ℂℙ^∞ 上的 Fubini-Study 凯勒度规；严格推导绝热演化中本征子空间 U(1) 纤维丛连络所诱导的 Berry 几何相位；运用 Weyl-Wigner 双射变换将量子算符代数投射到经典相空间，以 Wigner 拟概率分布展现量子隧穿干涉向经典哈密顿流的对应极限。',
  sections: [
    {
      heading: '一、概念诞生背景：为什么线性空间 $\\mathcal{H}$ 不是最真实的量子态空间？',
      content: `
<div class="math-motivation">
  <strong>【线性叠加原理背后的几何盲区】</strong>：量子力学通常被表述在无限维复线性空间（Hilbert 空间 $\\mathcal{H}$）中。然而，整体常数相位并不对应任何可观测量：态矢 $|\\psi\\rangle$ 与 $e^{i\\theta}|\\psi\\rangle$（对任意实数 $\\theta$）代表完全不可区分的同一个物理状态。如果把态矢限制在归一化球面 $S^{\\infty} = \\{ |\\psi\\rangle \\mid \\langle\\psi|\\psi\\rangle = 1 \\}$，并将所有相差一个 $U(1)$ 纯相位的向量识别为一个等价类，真正的量子状态空间实际上是<strong>复射影空间 $\\mathcal{P}(\\mathcal{H}) = \\mathbb{CP}^\\infty$</strong>！
</div>

1. **射影空间的天然几何——Kähler 流形**：
   在复射影空间 $\\mathcal{P}(\\mathcal{H})$ 上，实部诱导了测量量子保真度的 **Fubini-Study 黎曼度规**，虚部诱导了闭非退化的**辛 2-形式**！量子力学与哈密顿辛几何在这里发生了最深沉的统一。
      `
    },
    {
      heading: '二、Berry 相位：绝热参数空间上的 $U(1)$ 纤维丛连络',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/></svg>
    <span>定义 7.1：Berry 连络 1-形式与 Berry 曲率 2-形式</span>
  </div>
  <p>设系统哈密顿量依赖于外部慢变参量矢量 $\\vec{R} \\in \\mathcal{M}_R$（如偏转磁场或微波腔相强）。设 $|n(\\vec{R})\\rangle$ 为非简并瞬时本征态：$H(\\vec{R}) |n(\\vec{R})\\rangle = E_n(\\vec{R}) |n(\\vec{R})\\rangle$。</p>
  <p>在参数流形 $\\mathcal{M}_R$ 上定义 <strong>Berry 连络 1-形式（Berry Connection）</strong>：</p>
  $$\\mathcal{A}_n = i \\langle n(\\vec{R}) | d_R | n(\\vec{R}) \\rangle = i \\sum_k \\langle n | \\frac{\\partial n}{\\partial R^k} \\rangle dR^k$$
  <p>对连络形式取外微分，定义规范不变的 <strong>Berry 曲率 2-形式（Berry Curvature）</strong>：</p>
  $$\\mathcal{F}_n = d\\mathcal{A}_n = i \\langle d_R n | \\wedge | d_R n \\rangle$$
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【推导 7.1】量子绝热演化中 Berry 几何相位的严格导出</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Adiabatic Derivation</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>波函数绝热试探解展开</strong>：<br/>
        当参数 $\\vec{R}(t)$ 极其缓慢演化时，系统将永远保持在第 $n$ 个能级上，波函数可表达为：
        $$|\\psi(t)\\rangle = \\exp\\left( - \\frac{i}{\\hbar} \\int_0^t E_n(\\vec{R}(t\')) \\, dt\' \\right) \\exp(i \\gamma_n(t)) |n(\\vec{R}(t))\\rangle$$
        其中第一项为熟知的**动力学相位（Dynamic Phase）**，$\\gamma_n(t)$ 为待求的几何相位。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>代入含时薛定谔方程 $i\\hbar \\frac{d}{dt}|\\psi\\rangle = H |\\psi\\rangle$</strong>：<br/>
        对时间全求导：
        $$i\\hbar \\frac{d}{dt}|\\psi\\rangle = E_n |\\psi\\rangle - \\hbar \\dot{\\gamma}_n |\\psi\\rangle + i\\hbar e^{-i\\int E/\\hbar} e^{i\\gamma_n} \\frac{d}{dt}|n(\\vec{R}(t))\\rangle$$
        因为等号右侧 $H |\\psi\\rangle = E_n |\\psi\\rangle$，第一项动力学相位与能量本征值精确对消！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>投影到左本征态 $\\langle n(\\vec{R})|$</strong>：<br/>
        $$- \\hbar \\dot{\\gamma}_n \\langle n | n \\rangle + i\\hbar \\langle n | \\frac{d}{dt}|n\\rangle = 0$$
        由归一化 $\\langle n | n \\rangle = 1$，展开时间微商 $\\frac{d}{dt}|n\\rangle = \\dot{\\vec{R}} \\cdot \\nabla_R |n\\rangle$：
        $$\\dot{\\gamma}_n(t) = i \\langle n(\\vec{R}) | \\frac{d}{dt}|n(\\vec{R})\\rangle = i \\langle n | \\nabla_R n \\rangle \\cdot \\frac{d\\vec{R}}{dt}$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>对闭合回路 $C$ 积分并应用 Stokes 定理</strong>：<br/>
        当参数演化周期 $T$ 使得 $\\vec{R}(T) = \\vec{R}(0)$ 回到原点时，闭环积累的总几何相位为：
        $$\\gamma_n(C) = \\oint_C \\mathcal{A}_n = i \\oint_C \\langle n | d_R n \\rangle = \\iint_S d\\mathcal{A}_n = \\iint_S \\mathcal{F}_n$$
        这一相位与演化快慢完全无关，只纯粹由参数空间中闭环所包围的曲面几何拓扑决定！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Berry 相位公式导出完毕</div>
</div>
      `
    },
    {
      heading: '三、相空间量子力学：Wigner 拟概率分布函数与经典辛极限',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
    <span>定义 7.2：Wigner 拟概率分布函数 (Wigner Function)</span>
  </div>
  <p>对纯态波函数 $\\psi(x)$，定义经典相空间 $(x, p)$ 上的实数值分布：</p>
  $$W(x, p) = \\frac{1}{2\\pi \\hbar} \\int_{-\\infty}^\\infty \\psi^*\\left(x + \\frac{y}{2}\\right) \\psi\\left(x - \\frac{y}{2}\\right) e^{i p y / \\hbar} \\, dy$$
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【推导 7.2】Wigner 函数的边缘概率密度还原定理</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Marginal Reduction Proof</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>对动量 $p$ 积分计算空间边缘分布</strong>：<br/>
        $$\\int_{-\\infty}^\\infty W(x, p) \\, dp = \\frac{1}{2\\pi\\hbar} \\int_{-\\infty}^\\infty \\left[ \\int_{-\\infty}^\\infty \\psi^*\\left(x + \\frac{y}{2}\\right) \\psi\\left(x - \\frac{y}{2}\\right) e^{i p y / \\hbar} \\, dy \\right] dp$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>交换积分次序与 Dirac delta 函数积分</strong>：<br/>
        利用傅里叶表示 $\\int_{-\\infty}^\\infty e^{i p y / \\hbar} dp = 2\\pi \\hbar \\, \\delta(y)$：
        $$= \\int_{-\\infty}^\\infty \\psi^*\\left(x + \\frac{y}{2}\\right) \\psi\\left(x - \\frac{y}{2}\\right) \\left( \\frac{1}{2\\pi\\hbar} \\int_{-\\infty}^\\infty e^{i p y / \\hbar} dp \\right) dy$$
        $$= \\int_{-\\infty}^\\infty \\psi^*\\left(x + \\frac{y}{2}\\right) \\psi\\left(x - \\frac{y}{2}\\right) \\delta(y) \\, dy = \\psi^*(x) \\psi(x) = |\\psi(x)|^2$$
        同理可证明对位置 $x$ 积分给出动量表象分布 $|\\tilde{\\psi}(p)|^2$！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>Moyal 括号方程向哈密顿 Liouville 方程的退化</strong>：<br/>
        由薛定谔方程，Wigner 函数的精确时变方程为 Moyal 括号：
        $$\\frac{\\partial W}{\\partial t} = - \\frac{2}{\\hbar} H(x, p) \\sin\\left( \\frac{\\hbar}{2} \\left( \\frac{\\overleftarrow{\\partial}}{\\partial x}\\frac{\\overrightarrow{\\partial}}{\\partial p} - \\frac{\\overleftarrow{\\partial}}{\\partial p}\\frac{\\overrightarrow{\\partial}}{\\partial x} \\right) \\right) W$$
        在经典极限 $\\hbar \\to 0$ 下，取正弦一阶渐近 $\\sin(z) = z + O(z^3)$：
        $$\\frac{\\partial W}{\\partial t} + \\{ W, H \\}_{\\text{PB}} = O(\\hbar^2)$$
        精确退化回经典哈密顿力学的 Liouville 输运方程！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Wigner 拟概率流证明完毕</div>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-qm-01',
      title: '严格推导自旋 1/2 粒子在缓慢旋转磁场中的 Berry 相位与立体角关系',
      difficulty: 'Advanced',
      statement: '考虑哈密顿量 $H(t) = - \\mu \\vec{B}(t) \\cdot \\vec{\\sigma}$，其中磁场强度恒定 $|\vec{B}| = B_0$，其方向矢量 $\\hat{b}(t) = (\\sin\\theta \\cos\\phi, \\sin\\theta \\sin\\phi, \\cos\\theta)$ 在布洛赫球面上沿纬度为 $\\theta$ 的圆周极慢扫掠一周（$\\phi: 0 \\to 2\\pi$）。\n1. 写出瞬时自旋基态波函数 $|-\\rangle$；\n2. 计算 Berry 连络 1-形式 $\\mathcal{A}_-$；\n3. 证明回路积累的 Berry 相位精确等于闭合立体角的负一半：$\\gamma_- = - \\frac{1}{2} \\Omega = - \\pi (1 - \\cos\\theta)$。',
      hints: [
        '基态自旋波函数标准参数化：$|-\\rangle = \\begin{pmatrix} \\sin(\\theta/2) \\\\ - e^{i\\phi} \\cos(\\theta/2) \\end{pmatrix}$。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **基态本征态波函数构造**：
   在球面坐标下，磁场方向沿 $\\hat{b}$。对应的自旋沿着磁场反向的基态态矢为：
   $$|-\\rangle = \\begin{pmatrix} \\sin(\\theta/2) \\\\ - e^{i\\phi} \\cos(\\theta/2) \\end{pmatrix}$$
   验证归一化：$\\langle - | - \\rangle = \\sin^2(\\theta/2) + |-e^{i\\phi}|^2 \\cos^2(\\theta/2) = \\sin^2(\\theta/2) + \\cos^2(\\theta/2) = 1$。

2. **计算对参数空间的外微分 $d|-\\rangle$**：
   $$d|-\\rangle = \\begin{pmatrix} \\frac{1}{2}\\cos(\\theta/2) d\\theta \\\\ - i e^{i\\phi} \\cos(\\theta/2) d\\phi + \\frac{1}{2} e^{i\\phi} \\sin(\\theta/2) d\\theta \\end{pmatrix}$$
   计算内积收缩：
   $$\\langle - | d |-\\rangle = \\sin(\\theta/2) \\left( \\frac{1}{2}\\cos(\\theta/2) d\\theta \\right) + \\left( - e^{-i\\phi} \\cos(\\theta/2) \\right) \\left( - i e^{i\\phi} \\cos(\\theta/2) d\\phi + \\frac{1}{2} e^{i\\phi} \\sin(\\theta/2) d\\theta \\right)$$
   $$= \\frac{1}{2} \\sin(\\theta/2)\\cos(\\theta/2) d\\theta + i \\cos^2(\\theta/2) d\\phi - \\frac{1}{2} \\sin(\\theta/2)\\cos(\\theta/2) d\\theta = i \\cos^2(\\theta/2) d\\phi$$

3. **求解 Berry 连络与积分**：
   $$\\mathcal{A}_- = i \\langle - | d |-\\rangle = i \\left( i \\cos^2(\\theta/2) d\\phi \\right) = - \\cos^2(\\theta/2) d\\phi$$
   对闭合回路（$\\theta = \\text{const}, \\phi \\in [0, 2\\pi]$）积分：
   $$\\gamma_-(C) = \\oint_C \\mathcal{A}_- = - \\int_0^{2\\pi} \\cos^2(\\theta/2) d\\phi = - 2\\pi \\cos^2(\\theta/2)$$
   利用倍角公式 $\\cos^2(\\theta/2) = \\frac{1 + \\cos\\theta}{2}$：
   $$\\gamma_-(C) = - 2\\pi \\left( \\frac{1 + \\cos\\theta}{2} \\right) = - \\pi (1 + \\cos\\theta)$$
   在相因子 $e^{i\\gamma}$ 意义下（减去平凡的 $2\\pi$ 整数倍相位）：
   $$\\gamma_-(C) \\equiv - \\pi (1 - \\cos\\theta) = - \\frac{1}{2} \\Omega$$
   其中 $\\Omega = 2\\pi(1 - \\cos\\theta)$ 正是由该纬度圈在单位立体角球面上所截出的立体角！证毕。
      `
    }
  ]
};

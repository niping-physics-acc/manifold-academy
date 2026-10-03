/**
 * Modern Lagrangian Mechanics on Tangent Bundle TQ
 * Focuses on:
 * - Why Newton's F = ma fails with constraints (Motivation & d'Alembert Principle)
 * - Tangent bundle TQ and Geometric Action Functional S[gamma]
 * - First Variation Formula and Coordinate-Free Euler-Lagrange Equations
 * - Noether's Theorem from Lie Group Actions and Conserved Charges
 * - Busch's Theorem in Accelerator Solenoid Transport
 */

export const lagrangianChapter = {
  id: 'lagrangian-01',
  disciplineId: 'lagrangian',
  title: '切丛 TQ 上的变分几何与 Noether 守恒荷推演',
  subtitle: 'Calculus of Variations on Tangent Bundles, Invariant Lagrangians and Busch Theorem',
  level: 'Graduate Core / 变分几何精要',
  prereqs: ['光滑流形与切空间', '泛函极值与变分法初步'],
  readingTime: '60 min',
  summary: '跳出把速度单纯当成普通微商的初等视角，将拉格朗日量严格建立为位形流形切丛 TQ 上的光滑标量泛函。完整推导第一变分公式与 Euler-Lagrange 方程的坐标无关性，严密证明连续李群变换下的 Noether 守恒荷，并推导加速器螺线管聚焦中著名的 Busch 磁通角动量定理。',
  sections: [
    {
      heading: '一、概念诞生背景：为什么牛顿第二定律在约束系统下极其笨拙？',
      content: `
<div class="math-motivation">
  <strong>【牛顿力学的约束反力灾难】</strong>：牛顿方程 $\\vec{F} = m \\ddot{\\vec{r}}$ 是在假定空间为平直欧几里得空间的前提下写出的。如果系统受到几何约束（例如：带电粒子限制在真空管道的环状导轨上运动、双摆系统、空间刚体转动），牛顿方程必须把力拆分为“已知主动外力 $\\vec{F}_{\\text{ext}}$”和“未知约束反力 $\\vec{N}$”。为了求出轨道，必须联立列出几十个代数约束方程去反解毫无物理意义的约束力 $\\vec{N}$，这在复杂几何曲面上几乎是不可能完成的代数噩梦。
</div>

1. **d\'Alembert 虚功原理的几何直观**：
   达朗贝尔指出：光滑无摩擦约束力 $\\vec{N}$ 的物理本质，是它**与任何符合约束条件的可能位移（虚位移 $\\delta \\vec{r}$）处处几何正交**！即虚功为零：$\\sum \\vec{N}_i \\cdot \\delta \\vec{r}_i = 0$。

2. **几何学的跃迁：位形流形 $Q$**：
   既然粒子被限制在子流形上运动，与其在外围高维空间里被动计算约束力，不如**直接把约束曲面本身当成内蕴的弯曲位形流形 $Q$**！在位形流形内部，自由度数目恰好等于物理独立自由度 $n$，所有未知的约束反力在几何投影下自动消失于无形！
      `
    },
    {
      heading: '二、切丛 $TQ$ 与几何作用量泛函 $S[\\gamma]$',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
    <span>定义 3.1：拉格朗日量与自然速度提升 (Canonical Tangent Lift)</span>
  </div>
  <p>设 $Q$ 为 $n$ 维光滑位形流形，其切丛为 $TQ$。<strong>拉格朗日函数 $L$ 是切丛上的实光滑函数</strong>：</p>
  $$L: TQ \\times \\mathbb{R} \\to \\mathbb{R}, \\quad (q, v, t) \\mapsto L(q, v, t)$$
  <p>流形上的一条真实物理轨道为光滑曲线 $\\gamma: [t_0, t_1] \\to Q$。其在切丛中的自然速度提升为：</p>
  $$\\dot{\\gamma}(t) = \\left( \\gamma(t), \\frac{d\\gamma}{dt}(t) \\right) \\in T_{\\gamma(t)} Q$$
  <p>轨道 $\\gamma$ 的<strong>经典作用量泛函（Action Functional）</strong>定义为曲线提升在切丛上的积分：</p>
  $$S[\\gamma] = \\int_{t_0}^{t_1} L(\\gamma(t), \\dot{\\gamma}(t), t) \\, dt$$
</div>
      `
    },
    {
      heading: '三、第一变分公式与 Euler-Lagrange 方程的严格推导',
      content: `
<div class="math-proof">
  <div class="math-proof-title">
    <span>【推导 3.1】Hamilton 最小作用量原理与欧拉-拉格朗日方程</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Exact Variational Proof</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>变分族构造与固定端点条件</strong>：<br/>
        设 $\\gamma(t)$ 为真实极值轨道。考虑一个单参数光滑变分曲线族 $\\Gamma(t, \\epsilon): [t_0, t_1] \\times (-\\delta, \\delta) \\to Q$，满足 $\\Gamma(t, 0) = \\gamma(t)$。<br/>
        定义沿轨道的变分向量场（虚位移）为：$\\delta q(t) = \\left. \\frac{\\partial \\Gamma(t, \\epsilon)}{\\partial \\epsilon} \\right|_{\\epsilon=0} \\in T_{\\gamma(t)}Q$。<br/>
        因为固定起止两端点，边界条件严格为：$$\\delta q(t_0) = 0, \\quad \\delta q(t_1) = 0$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>对作用量微商施加链式法则</strong>：<br/>
        第一变分 $\\delta S$ 为：
        $$\\delta S = \\left. \\frac{d}{d\\epsilon} S[\\Gamma(\\cdot, \\epsilon)] \\right|_{\\epsilon=0} = \\int_{t_0}^{t_1} \\left. \\frac{\\partial}{\\partial \\epsilon} L\\left(\\Gamma, \\frac{\\partial \\Gamma}{\\partial t}, t\\right) \\right|_{\\epsilon=0} dt$$
        根据多元微积分链式法则展开：
        $$\\delta S = \\int_{t_0}^{t_1} \\left( \\frac{\\partial L}{\\partial q^i} \\left. \\frac{\\partial \\Gamma^i}{\\partial \\epsilon} \\right|_{\\epsilon=0} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\left. \\frac{\\partial^2 \\Gamma^i}{\\partial \\epsilon \\partial t} \\right|_{\\epsilon=0} \\right) dt$$
        利用平滑偏导数的 Clairaut 可交换性 $\\frac{\\partial^2 \\Gamma^i}{\\partial \\epsilon \\partial t} = \\frac{\\partial}{\\partial t}\\left( \\frac{\\partial \\Gamma^i}{\\partial \\epsilon} \\right) = \\frac{d}{dt}(\\delta q^i)$：
        $$\\delta S = \\int_{t_0}^{t_1} \\left( \\frac{\\partial L}{\\partial q^i} \\delta q^i + \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}(\\delta q^i) \\right) dt$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>分部积分与边界项消除</strong>：<br/>
        对第二项应用分部积分法：
        $$\\int_{t_0}^{t_1} \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}(\\delta q^i) \\, dt = \\left[ \\frac{\\partial L}{\\partial \\dot{q}^i} \\delta q^i \\right]_{t_0}^{t_1} - \\int_{t_0}^{t_1} \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) \\delta q^i \\, dt$$
        由固定边界条件 $\\delta q(t_0) = \\delta q(t_1) = 0$，首末边界项严格恒等于零！代回总式：
        $$\\delta S = \\int_{t_0}^{t_1} \\left( \\frac{\\partial L}{\\partial q^i} - \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) \\right) \\delta q^i \\, dt$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>变分学基本引理（du Bois-Reymond 引理）</strong>：<br/>
        物理极值要求：对**任意**在两端点消失的光滑测试变分场 $\\delta q(t)$，都必须有 $\\delta S = 0$。<br/>
        由连续函数的变分引理，被积括号中的表达式在时间区间内必须**处处严格为零**！
        $$\\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) - \\frac{\\partial L}{\\partial q^i} = 0, \\quad (i = 1, \\dots, n)$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Euler-Lagrange 方程严格导出</div>
</div>
      `
    },
    {
      heading: '四、Noether 定理的李代数几何严格证明',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
    <span>定义 3.2：连续李群作用下的拉格朗日对称性</span>
  </div>
  <p>设李群 $G$ 光滑作用于位形流形 $Q$。设 $\\xi \\in \\mathfrak{g} = T_e G$ 为李代数中的无穷小生成元，诱导流形上的<strong>单参数基本向量场</strong>：</p>
  $$X_\\xi(q) = \\left. \\frac{d}{ds} \\exp(s\\xi) \\cdot q \\right|_{s=0}$$
  <p>若系统的拉格朗日量在切丛自然提升流下不变，即沿该群变换流有：$$\\left. \\frac{\\partial}{\\partial s} L\\left( \\Phi_s(q), \\frac{d}{dt}\\Phi_s(q), t \\right) \\right|_{s=0} = 0$$</p>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【核心定理 3.1】Noether 第一定理的完整严格推导</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Theorem & Proof</span>
  </div>
  <p style="color:#e2e8f0; margin-bottom:12px;">
    <strong>定理结论</strong>：若系统具有上述李代数对称性，则沿真实 Euler-Lagrange 物理轨道，如下物理量必为严格的第一积分（时间守恒荷）：
    $$Q_\\xi = \\sum_{i=1}^n \\frac{\\partial L}{\\partial \\dot{q}^i} X_\\xi^i(q) = \\langle p, X_\\xi \\rangle = \\text{const}$$
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        展开对称性不变条件：令 $q_s(t) = \\Phi_s(q(t))$。根据假设 $\\left. \\frac{d}{ds} L(q_s, \\dot{q}_s, t) \\right|_{s=0} = 0$。<br/>
        利用链式法则：
        $$0 = \\frac{\\partial L}{\\partial q^i} \\left. \\frac{\\partial q_s^i}{\\partial s} \\right|_{s=0} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\left. \\frac{\\partial \\dot{q}_s^i}{\\partial s} \\right|_{s=0} = \\frac{\\partial L}{\\partial q^i} X_\\xi^i + \\frac{\\partial L}{\\partial \\dot{q}^i} \\left( \\frac{d}{dt} X_\\xi^i \\right)$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        沿真实轨道，代入欧拉-拉格朗日方程 $\\frac{\\partial L}{\\partial q^i} = \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right)$：
        $$0 = \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) X_\\xi^i + \\frac{\\partial L}{\\partial \\dot{q}^i} \\left( \\frac{d X_\\xi^i}{dt} \\right)$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        逆用普通微积分的乘积求导法则：
        $$0 = \\frac{d}{dt} \\left( \\frac{\\partial L}{\\partial \\dot{q}^i} X_\\xi^i \\right) \\iff \\frac{d}{dt} Q_\\xi = 0$$
        守恒荷 $Q_\\xi$ 对时间的导数严格为零！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Noether 定理证明完毕</div>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>⚡ 加速器前沿推演：Busch 定理与螺线管磁透镜角动量守恒</span>
  </div>
  <p>
    在能量回收型直线加速器（ERL）的光阴极高压电子枪（Photocathode Gun）出口，电子束流刚产生就被置于强轴向磁场的螺线管中聚焦。<br/>
    在柱坐标 $(r, \\theta, z)$ 下，轴对称矢量势为 $\\vec{A} = \\frac{1}{2} B_z(z) r \\hat{\\theta}$。<br/>
    拉格朗日量为：
    $$L = \\frac{1}{2} m (\\dot{r}^2 + r^2 \\dot{\\theta}^2 + \\dot{z}^2) + e \\vec{A} \\cdot \\vec{v} = \\frac{1}{2} m (\\dot{r}^2 + r^2 \\dot{\\theta}^2 + \\dot{z}^2) + \\frac{1}{2} e B_z r^2 \\dot{\\theta}$$
    因为系统关于方位角 $\\theta$ 具有严格的旋转对称性（生成元为 $X = \\frac{\\partial}{\\partial \\theta}$，$\\frac{\\partial L}{\\partial \\theta} = 0$），根据 Noether 定理，正则角动量守恒：
    $$p_\\theta = \\frac{\\partial L}{\\partial \\dot{\\theta}} = m r^2 \\dot{\\theta} + \\frac{1}{2} e B_z r^2 = \\text{const}$$
    <strong>这就是加速器物理中著名的 Busch 定理</strong>！<br/>
    如果电子在光阴极表面（磁场为 $B_0$）静止发射，其初态 $p_\\theta = \\frac{1}{2} e B_0 r_0^2$。当电子飞出螺线管进入无磁场区（$B_z = 0$）时，守恒性强迫其机械角速度必须跃变为 $\\dot{\\theta} = \\frac{e B_0 r_0^2}{2 m r^2}$！<br/>
    这导致束流天然具有角向旋转剪切，成为束流横向耦合与发射度增长的源头（Magnetized Beam），必须使用反向偏转磁铁或倾斜四极铁实施辛解耦！
  </p>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-lag-01',
      title: '证明欧拉-拉格朗日方程在任意微分同胚坐标变换下的严格协变性',
      difficulty: 'Advanced',
      statement: '设 $Q$ 上存在光滑双射坐标变换 $Q^a = Q^a(q^1, \\dots, q^n)$。记新速度为 $\\dot{Q}^a = \\frac{\\partial Q^a}{\\partial q^i} \\dot{q}^i$，新拉格朗日量为 $\\tilde{L}(Q, \\dot{Q}) = L(q(Q), \\dot{q}(Q, \\dot{Q}))$。利用多变量微积分链式法则，严格证明：\n$$\\frac{d}{dt}\\left( \\frac{\\partial \\tilde{L}}{\\partial \\dot{Q}^a} \\right) - \\frac{\\partial \\tilde{L}}{\\partial Q^a} = \\frac{\\partial q^i}{\\partial Q^a} \\left[ \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) - \\frac{\\partial L}{\\partial q^i} \\right]$$\n从而证明欧拉-拉格朗日形式与坐标系选取完全无关（即其几何本质是切丛上的 1-形式微元）。',
      hints: [
        '注意计算 $\\frac{\\partial \\dot{q}^i}{\\partial \\dot{Q}^a} = \\frac{\\partial q^i}{\\partial Q^a}$。',
        '计算 $\\frac{\\partial \\tilde{L}}{\\partial Q^a}$ 时，对旧坐标 $q$ 和旧速度 $\\dot{q}$ 都要施加链式法则。'
      ],
      solution: `
**【详细解答与严格推导】**：
1. **速度变换的 Jacobi 关系**：
   旧坐标与新坐标的微分关系为：$q^i = q^i(Q)$。
   对时间求全导数：$\\dot{q}^i = \\frac{\\partial q^i}{\\partial Q^b} \\dot{Q}^b$。
   由此可得偏导数关系：
   $$\\frac{\\partial \\dot{q}^i}{\\partial \\dot{Q}^a} = \\frac{\\partial q^i}{\\partial Q^a}$$
   以及对位置求偏导：
   $$\\frac{\\partial \\dot{q}^i}{\\partial Q^a} = \\frac{\\partial^2 q^i}{\\partial Q^a \\partial Q^b} \\dot{Q}^b = \\frac{d}{dt}\\left( \\frac{\\partial q^i}{\\partial Q^a} \\right)$$

2. **计算对新速度的偏导数项**：
   $$\\frac{\\partial \\tilde{L}}{\\partial \\dot{Q}^a} = \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{\\partial \\dot{q}^i}{\\partial \\dot{Q}^a} = \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{\\partial q^i}{\\partial Q^a}$$
   对其求全时间导数：
   $$\\frac{d}{dt}\\left( \\frac{\\partial \\tilde{L}}{\\partial \\dot{Q}^a} \\right) = \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) \\frac{\\partial q^i}{\\partial Q^a} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}\\left( \\frac{\\partial q^i}{\\partial Q^a} \\right)$$

3. **计算对新位置的偏导数项**：
   根据复合求导法则（注意 $q$ 和 $\\dot{q}$ 均显含 $Q$）：
   $$\\frac{\\partial \\tilde{L}}{\\partial Q^a} = \\frac{\\partial L}{\\partial q^i} \\frac{\\partial q^i}{\\partial Q^a} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{\\partial \\dot{q}^i}{\\partial Q^a} = \\frac{\\partial L}{\\partial q^i} \\frac{\\partial q^i}{\\partial Q^a} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}\\left( \\frac{\\partial q^i}{\\partial Q^a} \\right)$$

4. **两项相减与精确对消**：
   $$\\frac{d}{dt}\\left( \\frac{\\partial \\tilde{L}}{\\partial \\dot{Q}^a} \\right) - \\frac{\\partial \\tilde{L}}{\\partial Q^a} = \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) \\frac{\\partial q^i}{\\partial Q^a} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}\\left( \\frac{\\partial q^i}{\\partial Q^a} \\right) - \\left[ \\frac{\\partial L}{\\partial q^i} \\frac{\\partial q^i}{\\partial Q^a} + \\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}\\left( \\frac{\\partial q^i}{\\partial Q^a} \\right) \\right]$$
   注意含有高阶混合偏导项 $\\frac{\\partial L}{\\partial \\dot{q}^i} \\frac{d}{dt}\\left( \\frac{\\partial q^i}{\\partial Q^a} \\right)$ 精准对消！提取公因子：
   $$= \\left[ \\frac{d}{dt}\\left( \\frac{\\partial L}{\\partial \\dot{q}^i} \\right) - \\frac{\\partial L}{\\partial q^i} \\right] \\frac{\\partial q^i}{\\partial Q^a}$$
   证毕。这表明 Euler-Lagrange 表达式在新旧坐标系下只是乘以了一个可逆的 Jacobi 变换矩阵 $\\frac{\\partial q^i}{\\partial Q^a}$，只要在旧坐标下为零，在新坐标下必然恒为零！
      `
    }
  ]
};

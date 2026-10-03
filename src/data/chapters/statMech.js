/**
 * Statistical Mechanics & Phase Space Coarse-Graining Master Chapter
 * Focuses on:
 * - Loschmidt Reversibility Paradox vs Thermodynamics (Motivation)
 * - Invariant Phase Space Measure & Fine-grained Gibbs Entropy Conservation (Proof)
 * - Poincaré Recurrence Theorem (Measure-theoretic Proof)
 * - Coarse-Graining, Baker Map Filamentation & Monotone Entropy Growth (Proof)
 * - Accelerator Beam Emittance Dilution through Non-linear Decoherence
 */

export const statMechChapter = {
  id: 'stat-mech-01',
  disciplineId: 'stat-mech',
  title: '相空间辛测度、Poincaré 复现与粗粒化不可逆熵增',
  subtitle: 'Measure Preservation, Poincaré Recurrence, Coarse-Graining and Beam Emittance Dilution',
  level: 'Graduate Core / 宏观涌现与统计基础',
  prereqs: ['哈密顿力学 Liouville 定理', '测度论初步与凸函数 Jensen 不等式'],
  readingTime: '60 min',
  summary: '直面理论物理最深刻的核心谜题之一：微观力学方程具有严格的时间反演对称性与保辛体积性，宏观系统为何会表现出不可逆的时间箭头与熵增？给出微观 Gibbs 细粒熵守恒与 Poincaré 复现定理的严密测度论证明，通过粗粒化投影与 Baker 映射阐明相空间混沌丝状化（Filamentation）如何单调涌现宏观熵增，并揭示加速器中发射度稀释的本质。',
  sections: [
    {
      heading: '一、概念诞生背景：洛施密特可逆性悖论 (Loschmidt Paradox)',
      content: `
<div class="math-motivation">
  <strong>【两百年的物理学佯谬】</strong>：牛顿方程与哈密顿方程是完全时间反演对称的（$t \\to -t, p \\to -p$ 依然是有效物理轨道）。而且由 Liouville 定理，相空间体积形式 $\\Omega = d^n q \\wedge d^n p$ 沿相流分毫不差地守恒。那么，孤立系统的热力学第二定律（熵单调增加 $\\Delta S > 0$、热传导不可逆扩散）究竟从何而来？如果微观动力学完全可逆，时间箭头是一场幻觉吗？
</div>
      `
    },
    {
      heading: '二、微观细粒化 Gibbs 熵的时间守恒性定理',
      content: `
<div class="math-proof">
  <div class="math-proof-title">
    <span>【定理 6.1】微观细粒化 Gibbs 熵沿哈密顿相流严格守恒</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Theorem & Proof</span>
  </div>
  <p style="color:#e2e8f0; margin-bottom:12px;">
    定义微观连续概率密度为 $\\rho(q, p, t)$。细粒化 Gibbs 熵为：
    $$S_{\\text{fine}}(t) = - k_B \\int_\\Gamma \\rho(z, t) \\ln \\rho(z, t) \\, dz, \\quad (z = (q, p))$$
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>相流拉回与全时间求导</strong>：<br/>
        由 Liouville 方程，微观分布函数沿轨道切向量的全微商为零：
        $$\\frac{d\\rho}{dt} = \\frac{\\partial \\rho}{\\partial t} + \\{ \\rho, H \\} = 0$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>对细粒度熵求时间导数</strong>：<br/>
        $$\\frac{d S_{\\text{fine}}}{dt} = - k_B \\int_\\Gamma \\left[ \\frac{\\partial \\rho}{\\partial t} \\ln \\rho + \\frac{\\partial \\rho}{\\partial t} \\right] dz = - k_B \\int_\\Gamma \\frac{\\partial \\rho}{\\partial t} (1 + \\ln \\rho) \\, dz$$
        代入 $\\frac{\\partial \\rho}{\\partial t} = - \\{ \\rho, H \\} = - \\nabla_z \\cdot (\\rho X_H)$（因为相流无散度 $\\text{div} X_H = 0$）：
        $$\\frac{d S_{\\text{fine}}}{dt} = k_B \\int_\\Gamma \\nabla_z \\cdot (\\rho X_H) (1 + \\ln \\rho) \\, dz$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>分部积分与通量消失</strong>：<br/>
        在相空间边界处假设概率密度 $\\rho \\to 0$。分部积分将空间散度转移：
        $$\\frac{d S_{\\text{fine}}}{dt} = - k_B \\int_\\Gamma \\rho X_H \\cdot \\nabla_z (1 + \\ln \\rho) \\, dz = - k_B \\int_\\Gamma \\rho X_H \\cdot \\left( \\frac{1}{\\rho} \\nabla_z \\rho \\right) dz = - k_B \\int_\\Gamma X_H \\cdot \\nabla_z \\rho \\, dz$$
        再分部积分一次：
        $$= k_B \\int_\\Gamma (\\nabla_z \\cdot X_H) \\rho \\, dz = 0$$
        因为由辛几何 Liouville 定理 $\\text{div} X_H \\equiv 0$！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 细粒化熵严格守恒 dS_fine/dt ≡ 0</div>
</div>
      `
    },
    {
      heading: '三、Poincaré 复现定理的完整测度论证明',
      content: `
<div class="math-proof">
  <div class="math-proof-title">
    <span>【核心定理 6.2】Poincaré 复现定理 (Poincaré Recurrence Theorem)</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Measure-Theoretic Proof</span>
  </div>
  <p style="color:#e2e8f0; margin-bottom:12px;">
    <strong>定理条件</strong>：设变换 $g: \\Gamma \\to \\Gamma$ 保持有限测度 $\\mu$（$\\mu(g(A)) = \\mu(A)$ 且 $\\mu(\\Gamma) < \\infty$）。设 $A \\subset \\Gamma$ 为任意正测度集合（$\\mu(A) > 0$）。<br/>
    <strong>结论</strong>：几乎所有点 $x \\in A$，在反复迭代下必定会无限多次重新落入集合 $A$ 内！
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>构造永不返回点集</strong>：<br/>
        考虑在 $A$ 中出发、且**未来任何一步迭代都再也不返回 $A$** 的点集，记为 $B$：
        $$B = \\{ x \\in A \\mid g^n(x) \\notin A, \\quad \\forall n \\ge 1 \\}$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>证明象集两两不相交</strong>：<br/>
        考察集合 $B$ 的正向像族：$B, g(B), g^2(B), \\dots, g^k(B), \\dots$。<br/>
        假设存在 $k > l \\ge 0$ 使得 $g^k(B) \\cap g^l(B) \\neq \\emptyset$。<br/>
        因为 $g$ 是单射变换，两边作用 $g^{-l}$：
        $$g^{k-l}(B) \\cap B \\neq \\emptyset$$
        这意味着存在 $y \\in B$，使得 $g^{k-l}(y) \\in B \\subset A$。<br/>
        但这直接违背了 $B$ 的定义（$B$ 中点的任何正向像绝不可能再次进入 $A$！）。矛盾！<br/>
        因此，集合族 $\\{ g^n(B) \\}_{n=0}^\\infty$ <strong>彼此两两完全互不相交</strong>！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>利用总测度有限性得出矛盾</strong>：<br/>
        由于 $g$ 保持测度不变，对任意 $n$，有 $\\mu(g^n(B)) = \\mu(B)$。<br/>
        因为它们互不相交，其并集的测度为：
        $$\\mu\\left( \\bigcup_{n=0}^\\infty g^n(B) \\right) = \\sum_{n=0}^\\infty \\mu(g^n(B)) = \\sum_{n=0}^\\infty \\mu(B)$$
        因为所有这些集合都在总相空间 $\\Gamma$ 内部，其并集测度绝不能超过总容积：
        $$\\sum_{n=0}^\\infty \\mu(B) \\le \\mu(\\Gamma) < \\infty$$
        一个非负实数求和无穷多次依然有限，**唯一的可能是：$$\\mu(B) = 0$$**！<br/>
        这意味着“永不返回的点”在测度意义上概率精确为零！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Poincaré 复现定理严格获证</div>
</div>
      `
    },
    {
      heading: '四、粗粒化 (Coarse-Graining) 投影与不可逆熵增的几何涌现',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
    <span>定义 6.1：相空间粗粒化算符与粗粒化 Gibbs 熵</span>
  </div>
  <p>将连续相空间划分为有限体积极小的微元测量格点网格 $\\{C_i\\}_{i=1}^M$（每个格点体积为 $\\Delta V$）。定义<strong>粗粒化概率密度 $\\bar{\\rho}$</strong> 为每个格子内的平均值：</p>
  $$\\bar{\\rho}(z) = \\frac{1}{\\Delta V} \\int_{C_i} \\rho(z\') \\, dz\', \\quad \\forall z \\in C_i$$
  <p>粗粒化 Gibbs 熵定义为：$$S_{\\text{coarse}} = - k_B \\int_\\Gamma \\bar{\\rho} \\ln \\bar{\\rho} \\, dz = - k_B \\sum_{i=1}^M P_i \\ln P_i + \\text{const}$$</p>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【严格证明 6.3】粗粒化熵永不小于微观熵：$S_{\\text{coarse}} \\ge S_{\\text{fine}}$</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Jensen's Inequality Proof</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>凸函数性质与 Jensen 不等式</strong>：<br/>
        考虑函数 $f(x) = x \\ln x$。计算二阶导数：$f\'\'(x) = \\frac{1}{x} > 0$（对任意 $x > 0$），因此 $f(x)$ 是严格下凸函数（Strictly Convex Function）。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>在单个小网格 $C_i$ 内求积分</strong>：<br/>
        根据连续形式的 Jensen 不等式，下凸函数的平均值必不小于平均值的函数值：
        $$\\frac{1}{\\Delta V} \\int_{C_i} \\rho \\ln \\rho \\, dz \\ge \\left( \\frac{1}{\\Delta V} \\int_{C_i} \\rho \\, dz \\right) \\ln \\left( \\frac{1}{\\Delta V} \\int_{C_i} \\rho \\, dz \\right) = \\bar{\\rho}_i \\ln \\bar{\\rho}_i$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>对所有网格累加求和</strong>：<br/>
        $$\\int_\\Gamma \\rho \\ln \\rho \\, dz = \\sum_i \\int_{C_i} \\rho \\ln \\rho \\, dz \\ge \\sum_i \\Delta V (\\bar{\\rho}_i \\ln \\bar{\\rho}_i) = \\int_\\Gamma \\bar{\\rho} \\ln \\bar{\\rho} \\, dz$$
        在两边同时乘以负常数 $-k_B$（不等号反向）：
        $$- k_B \\int_\\Gamma \\bar{\\rho} \\ln \\bar{\\rho} \\, dz \\ge - k_B \\int_\\Gamma \\rho \\ln \\rho \\, dz \\iff S_{\\text{coarse}} \\ge S_{\\text{fine}}$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 熵增不等式严格得证</div>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>⚛️ 加速器物理终极映射：束流丝状化与发射度不可逆稀释</span>
  </div>
  <p>
    在加速器储存环或自由电子激光的输运线中，束流发射度稀释（Emittance Dilution）是粒子物理学家最大的梦魇：<br/>
    1. **微观保辛**：每个电子都是哈密顿粒子，受 Liouville 定理约束，高维微观相空间体积 $dq dp$ 绝对守恒；<br/>
    2. **非线性解相干（Decoherence）与丝状化**：由于磁铁高阶场（六极铁、空间电荷力），不同振幅的粒子 Betatron 振荡频率产生微小差异（振幅相关频移 $\\Delta \\nu \\propto J_x$）。经过几万圈后，原本紧致的相椭圆被撕扯缠绕成如丝线般的同心分形涡旋；<br/>
    3. **宏观测量退化**：我们现实中的探测器（BPM、丝扫描仪、荧光靶）空间分辨率是有限的（对应于粗粒化网格 $\\Delta x$）。探测器测量的是包含这些丝线外轮廓的**等效二次矩有效发射度（RMS Emittance）**：
       $$\\epsilon_{\\text{rms}} = \\sqrt{\\langle x^2 \\rangle \\langle x\'^2 \\rangle - \\langle x x\' \\rangle^2}$$
    外接椭圆的面积急剧增大，束流相空间有效亮度断崖式下跌！这就是微观可逆动力学在宏观探测下的不可逆热力学发射度退化！
  </p>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-stat-01',
      title: '利用 Baker 映射完整解析计算相空间粗粒化熵的单调激增过程',
      difficulty: 'Advanced',
      statement: '考虑相空间单位正方形 $[0, 1) \\times [0, 1)$ 上的 Baker 映射：\n$$B(x, p) = \\begin{cases} (2x, p/2) & 0 \\le x < 1/2 \\\\ (2x - 1, (p+1)/2) & 1/2 \\le x < 1 \\end{cases}$$\n1. 计算单步 Jacobi 矩阵，严格证明其严格保辛测度；\n2. 初始时刻概率均匀分布于左半区 $0 \\le x < 1/2$。将相空间粗粒化为 $2 \\times 2$ 个等面积网格，计算初态粗粒化熵 $S_0$ 与一次迭代后的粗粒化熵 $S_1$；\n3. 推广证明经过 $k$ 步迭代后，粗粒化熵如何严格单调收敛至极大熵 $S_{\\text{max}} = k_B \\ln 4$。',
      hints: [
        '分别计算 4 个相格在每一步迭代后的占有几率 $P_i = \\int_{C_i} \\rho(x, p) \\, dx dp$。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **保测度验证**：
   在分支 1（$0 \\le x < 1/2$）：$J_1 = \\begin{pmatrix} 2 & 0 \\\\ 0 & 1/2 \\end{pmatrix} \\implies \\det J_1 = 2 \\times (1/2) = 1$。
   在分支 2（$1/2 \\le x < 1$）：$J_2 = \\begin{pmatrix} 2 & 0 \\\\ 0 & 1/2 \\end{pmatrix} \\implies \\det J_2 = 1$。
   因此 Baker 映射严格保相空间面积元 $dx dp$。

2. **初始状态粗粒化熵计算**：
   网格划分：
   - $C_{11} = [0, 1/2) \\times [0, 1/2)$，面积 $1/4$；
   - $C_{12} = [0, 1/2) \\times [1/2, 1)$，面积 $1/4$；
   - $C_{21} = [1/2, 1) \\times [0, 1/2)$，面积 $1/4$；
   - $C_{22} = [1/2, 1) \\times [1/2, 1)$，面积 $1/4$。
   初始状态概率全在左半区 $x < 1/2$（密度 $\\rho_0 = 2$）：
   - $P(C_{11}) = 2 \\times (1/4) = 1/2$；
   - $P(C_{12}) = 2 \\times (1/4) = 1/2$；
   - $P(C_{21}) = 0, P(C_{22}) = 0$。
   初始粗粒化熵为：
   $$S_0 = - k_B \\left( \\frac{1}{2} \\ln \\frac{1}{2} + \\frac{1}{2} \\ln \\frac{1}{2} + 0 + 0 \\right) = k_B \\ln 2$$

3. **迭代 1 次后的概率分布与熵计算**：
   原左半区矩形 $[0, 1/2) \\times [0, 1)$ 被横向拉伸 2 倍、纵向压缩一半，映射为扁平矩形 $[0, 1) \\times [0, 1/2)$。
   重新积分各网格中的概率：
   - $C_{11}$ 占有该扁平矩形的左半部分，面积占比一半：$P(C_{11}) = 1/2$；
   - $C_{21}$ 占有该扁平矩形的右半部分，面积占比一半：$P(C_{21}) = 1/2$；
   - 上半区两格未被覆盖：$P(C_{12}) = 0, P(C_{22}) = 0$。
   此时 $S_1 = k_B \\ln 2$。

4. **迭代 2 次后的宏观分布演化**：
   再次迭代：原位于下半区的扁平矩形在第二步中被截断分成两半：
   左半被拉伸横跨整个底部；右半被拉伸并向上平移至上半部！
   此时所有 4 个格子里都有了厚度为 $1/4$ 的交替薄带：
   $$P(C_{11}) = 1/4, \\quad P(C_{12}) = 1/4, \\quad P(C_{21}) = 1/4, \\quad P(C_{22}) = 1/4$$
   此时粗粒化熵为：
   $$S_2 = - k_B \\sum_{i=1}^4 \\frac{1}{4} \\ln \\frac{1}{4} = k_B \\ln 4 = 2 k_B \\ln 2$$
   粗粒化熵单调严格增加 $\\Delta S = k_B \\ln 2 > 0$，并在两步之内完全饱和至系统在当前探测精度下的极大平衡熵！
      `
    }
  ]
};

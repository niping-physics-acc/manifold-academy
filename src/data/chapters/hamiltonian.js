/**
 * Hamiltonian Mechanics & Symplectic Dynamics Master Chapter
 * Focuses on:
 * - Why cotangent bundle T*Q is fundamentally natural (Motivation)
 * - Canonical 1-form theta and Canonical symplectic 2-form omega (Coordinate-free definition)
 * - Hamiltonian Vector Field X_H and Symplectic Gradient (Derivation)
 * - Liouville Volume Theorem & Invariant Phase Measure (Proof)
 * - Courant-Snyder Theory in Accelerator Beam Dynamics (Full Mathematical Derivation & Twiss Invariant)
 * - Symplectic Integrators vs Runge-Kutta Backward Error Analysis
 */

export const hamiltonianChapter = {
  id: 'hamiltonian-01',
  disciplineId: 'hamiltonian',
  title: '辛流形 (T*Q, ω)、Liouville 定理与束流 Courant-Snyder 辛变换',
  subtitle: 'Canonical Symplectic Geometry, Hamiltonian Vector Fields, Beam Phase Space Optics and Invariant Emittance',
  level: 'Graduate Core / 加速器束流动力学重器',
  prereqs: ['微分形式与李导数', '拉格朗日力学与切丛 TQ', '线性常微分方程理论'],
  readingTime: '70 min',
  summary: '系统阐述现代哈密顿力学的本质并非单纯将二阶方程降为一阶，而是相空间余切丛 T*Q 上非退化闭 2-形式诱导的辛几何演化。完整推导典范辛形式、哈密顿相流保测度李维尔定理，并从底层微分方程严格推导出加速器物理核心基石——Hill 方程的 Floquet 变换、Twiss 参数传输律、Courant-Snyder 椭圆辛不变量与发射度守恒，彻底讲透辛积分器长程守恒的逆误差分析机制。',
  sections: [
    {
      heading: '一、概念诞生背景：为什么力学必须从切丛 $TQ$ 跃迁到余切丛 $T^*Q$？',
      content: `
<div class="math-motivation">
  <strong>【拉格朗日力学的局限性】</strong>：在拉格朗日体系中，状态空间是切丛 $TQ$（位置 $q$ 与速度 $\\dot{q}$）。然而，切丛上并不存在由流形拓扑内生决定的自然几何结构：要想在 $TQ$ 上谈论能量守恒和轨道几何，必须依赖具体的拉格朗日量 $L$ 以及质量矩阵度规 $g_{ij}$。更严重的是，拉格朗日力学的对称性在多粒子长程演化和量子化（正则对易子 $[q, p] = i\\hbar$）中显得极为笨重。
</div>

1. **动量的几何本相**：
   通过 Legendre 变换 $p_i = \\frac{\\partial L}{\\partial \\dot{q}^i}$ 引入的动量，本质上是余切向量（微分 1-形式）。因此，力学的真实舞台不是切丛 $TQ$，而是**余切丛 $T^*Q$（相空间 Phase Space）**。

2. **余切丛的神奇天赐：典范辛结构**：
   在纯数学上，任意光滑流形 $Q$ 的余切丛 $T^*Q$，**无论物理系统是什么、无论有没有重力或电磁场，其自身天然就携带一个独一无二、完全无须任何外在假设的闭 2-形式 $\\omega$**！这种几何刚性使得哈密顿体系具有比拉格朗日体系高得多的普适性。
      `
    },
    {
      heading: '二、典范 1-形式与辛 2-形式的无坐标严格构造',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
    <span>定义 2.1：余切丛上的 Poincaré 典范 1-形式 $\\theta$ 与辛 2-形式 $\\omega$</span>
  </div>
  <p>设 $Q$ 为位形流形，$T^*Q$ 为其余切丛，自然投影为 $\\pi: T^*Q \\to Q, \\, (q, p) \\mapsto q$。其微分切映射为 $d\\pi: T_{(q, p)}(T^*Q) \\to T_q Q$。</p>
  <p>在相空间 $T^*Q$ 上定义<strong>典范 1-形式（Liouville / Poincaré 1-form）$\\theta$</strong>：对相空间任意切向量 $\\xi \\in T_{(q, p)}(T^*Q)$，规定：</p>
  $$\\langle \\theta_{(q, p)}, \\xi \\rangle = \\langle p, d\\pi(\\xi) \\rangle$$
  <p>对典范 1-形式取外微分，定义<strong>典范辛 2-形式（Canonical Symplectic 2-Form）</strong>：</p>
  $$\\omega = - d\\theta$$
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 局部坐标展开：为什么 $\\omega = dq^i \\wedge dp_i$？</span>
  </div>
  <p>
    取位形局部坐标 $(q^1, \\dots, q^n)$，诱导余切丛局部坐标为 $(q^1, \\dots, q^n, p_1, \\dots, p_n)$。<br/>
    设相空间中的一条曲线切向量为 $\\xi = \\dot{q}^i \\frac{\\partial}{\\partial q^i} + \\dot{p}_i \\frac{\\partial}{\\partial p_i}$。<br/>
    投影切映射作用结果为：$d\\pi(\\xi) = \\dot{q}^i \\frac{\\partial}{\\partial q^i} \\in T_q Q$。<br/>
    根据定义，动量 $p = p_i dq^i$ 作用其上给出标量：
    $$\\langle \\theta, \\xi \\rangle = p_i \\dot{q}^i = \\langle p_i dq^i, \\xi \\rangle$$
    因此典范 1-形式具有极其纯粹的坐标表象：
    $$\\theta = \\sum_{i=1}^n p_i \\, dq^i$$
    对其取负外微分，利用外微分算子的反 Leibniz 律：
    $$\\omega = - d\\left( \\sum_{i=1}^n p_i \\, dq^i \\right) = - \\sum_{i=1}^n (dp_i \\wedge dq^i + p_i \\underbrace{d(dq^i)}_{=0}) = \\sum_{i=1}^n dq^i \\wedge dp_i$$
    由于外微分幂零性，$d\\omega = - d(d\\theta) \\equiv 0$。且在坐标基底下其矩阵表象为标准正规辛对角块：
    $$J = \\begin{pmatrix} 0 & I_n \\\\ -I_n & 0 \\end{pmatrix}, \\quad \\det(J) = 1 \\neq 0$$
    辛形式 $\\omega$ 处处闭且严格非退化！
  </p>
</div>
      `
    },
    {
      heading: '三、哈密顿向量场 $X_H$ 与李维尔定理 (Liouville Theorem) 纯几何证明',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    <span>定义 2.2：哈密顿向量场 $X_H$（辛对偶梯度）</span>
  </div>
  <p>给定相空间上的实平滑能量哈密顿函数 $H: T^*Q \\to \\mathbb{R}$，其全微分为 1-形式 $dH \\in \\Omega^1(T^*Q)$。利用辛形式 $\\omega$ 的非退化同构映射，定义相空间上的<strong>哈密顿向量场 $X_H$</strong> 唯一满足：</p>
  $$i_{X_H} \\omega = dH$$
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【推导 2.1】从无坐标几何等式 $i_{X_H}\\omega = dH$ 到正则哈密顿方程</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Exact Derivation</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        设哈密顿向量场在相空间基底中展开为待定分量：$X_H = A^j \\frac{\\partial}{\\partial q^j} + B_j \\frac{\\partial}{\\partial p_j}$。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        计算内积收缩 $i_{X_H} \\omega$：
        $$i_{X_H} \\left( \\sum_{j=1}^n dq^j \\wedge dp_j \\right) = \\sum_{j=1}^n \\left( (i_{X_H} dq^j) dp_j - dq^j (i_{X_H} dp_j) \\right) = \\sum_{j=1}^n \\left( A^j dp_j - B_j dq^j \\right)$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        计算等号右侧哈密顿量的全微分：
        $$dH = \\sum_{j=1}^n \\left( \\frac{\\partial H}{\\partial q^j} dq^j + \\frac{\\partial H}{\\partial p_j} dp_j \\right)$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        对应基底 $dq^j$ 与 $dp_j$ 的系数必须处处相等：
        $$- B_j = \\frac{\\partial H}{\\partial q^j} \\implies B_j = - \\frac{\\partial H}{\\partial q^j}$$
        $$A^j = \\frac{\\partial H}{\\partial p_j}$$
        因为粒子的物理轨道切向量即为 $\\dot{q}^j = A^j, \\, \\dot{p}_j = B_j$，立即严格还原出<strong>哈密顿正则方程</strong>：
        $$\\dot{q}^j = \\frac{\\partial H}{\\partial p_j}, \\quad \\dot{p}_j = - \\frac{\\partial H}{\\partial q^j}$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 正则方程几何还原完毕</div>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【核心定理 2.1】Liouville 相空间体积保全定理的纯几何证明</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Theorem & Proof</span>
  </div>
  <p style="color:#e2e8f0; margin-bottom:12px;">
    <strong>定理内容</strong>：沿哈密顿相流，相空间体积元 $\\Omega = \\frac{(-1)^{n(n-1)/2}}{n!} \\omega^n = dq^1 \\wedge \\dots \\wedge dq^n \\wedge dp_1 \\wedge \\dots \\wedge dp_n$ 的李导数严格为零：$$\\mathcal{L}_{X_H} \\Omega = 0$$
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>先证明相流保辛 2-形式：$\\mathcal{L}_{X_H} \\omega = 0$</strong><br/>
        直接应用微分几何的 Cartan 魔术公式：
        $$\\mathcal{L}_{X_H} \\omega = d(i_{X_H} \\omega) + i_{X_H}(d\\omega)$$
        - 由哈密顿向量场定义，$i_{X_H} \\omega = dH$；
        - 由典范辛形式性质，$d\\omega = -d(d\\theta) = 0$。
        代入上式：
        $$\\mathcal{L}_{X_H} \\omega = d(dH) + i_{X_H}(0) = 0 + 0 = 0$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>推广到高阶外积体积形式 $\\omega^n$</strong><br/>
        李导数满足导数 Leibniz 法则：
        $$\\mathcal{L}_{X_H} (\\omega^n) = \\sum_{i=1}^n \\omega \\wedge \\dots \\wedge (\\mathcal{L}_{X_H} \\omega) \\wedge \\dots \\wedge \\omega = \\sum_{i=1}^n \\omega \\wedge \\dots \\wedge 0 \\wedge \\dots \\wedge \\omega = 0$$
        因此 $\\mathcal{L}_{X_H} \\Omega = 0$。根据流的拉回与体积积分定理：
        $$\\frac{d}{dt} \\text{Vol}(\\Phi_t(U)) = \\frac{d}{dt} \\int_{\\Phi_t(U)} \\Omega = \\int_U \\mathcal{L}_{X_H} \\Omega = 0$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Q.E.D.</div>
</div>
      `
    },
    {
      heading: '四、加速器动力学核心：Hill 方程、Twiss 参数与 Courant-Snyder 辛不变量完整推演',
      content: `
<div class="math-motivation">
  <strong>【加速器束流物理的核心问题】</strong>：在现代高能同步辐射光源、自由电子激光（FEL）以及能量回收型直线加速器（ERL）中，数十亿个电子组成一束微观粒子团，在由数百块偏转偶极铁（Dipole）、聚焦四极铁（Quadrupole）组成的周期性磁铁晶格（Lattice）中飞驰。每一个粒子经历的横向恢复力随着纵向坐标 $s$ 剧烈变化。如何描述这样一个庞大粒子系综的整体横向包络并保证束流不发散碰撞真空管壁？
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    <span>定义 2.3：横向 Betatron 振荡的 Hill 方程</span>
  </div>
  <p>取沿参考设计轨道的纵向弧长 $s$ 为自变量，带电粒子在横向平面偏离设计轨道的横向位移 $x(s)$ 遵从<strong>具有变系数周期的二阶齐次微分方程（Hill 方程）</strong>：</p>
  $$x\'\'(s) + K(s) x(s) = 0, \\quad x\' = \\frac{dx}{ds} = \\frac{p_x}{p_0}$$
  <p>其中对储存环 $K(s + C) = K(s)$ 为沿轨道具有周期的磁聚焦函数（由四极铁梯度决定）。</p>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【完整推导 2.2】Floquet 变换、Twiss 参数定义与 Courant-Snyder 不变量</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Beam Physics Core Derivation</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>试探解构造（振幅调制与相位调制分离）</strong>：<br/>
        根据 Floquet 定理，将 Hill 方程的通解表达为包络调制简谐波：
        $$x(s) = A w(s) \\cos(\\psi(s) + \\phi_0)$$
        其中 $w(s)$ 为未知的横向尺度包络函数，$\\psi(s)$ 为 Betatron 相位跃进（Phase Advance）。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>求导并代回 Hill 方程</strong>：<br/>
        计算一阶导数：$x\' = A w\' \\cos(\\psi + \\phi_0) - A w \\psi\' \\sin(\\psi + \\phi_0)$。<br/>
        计算二阶导数：
        $$x\'\' = A (w\'\' - w \\psi\'^2) \\cos(\\psi + \\phi_0) - A (2 w\' \\psi\' + w \\psi\'\') \\sin(\\psi + \\phi_0)$$
        代入 $x\'\' + K(s)x = 0$：
        $$\\left[ w\'\' - w \\psi\'^2 + K(s) w \\right] \\cos(\\psi + \\phi_0) - \\left[ 2 w\' \\psi\' + w \\psi\'\' \\right] \\sin(\\psi + \\phi_0) = 0$$
        为了使方程对任意初始相位 $\\phi_0$ 均成立，正弦与余弦的系数必须<strong>分别恒等于零</strong>！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>求解相位微商方程</strong>：<br/>
        令正弦项为零：$2 w\' \\psi\' + w \\psi\'\' = 0 \\implies (w^2 \\psi\')\' = 0 \\implies w^2(s) \\psi\'(s) = \\text{const}$。<br/>
        按加速器标准常规选取归一化常数为 1，得到极其重要的**相位与包络的微分关系**：
        $$\\psi\'(s) = \\frac{1}{w^2(s)} \\implies \\psi(s) = \\int_0^s \\frac{d\\tilde{s}}{w^2(\\tilde{s})}$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>定义 Courant-Snyder Twiss 参数 $(\\beta, \\alpha, \\gamma)$</strong>：<br/>
        加速器物理学家 Courant 与 Snyder 将包络函数平方定义为 **Beta 函数 $\\beta(s)$**：
        $$\\beta(s) \\equiv w^2(s) \\implies w(s) = \\sqrt{\\beta(s)}$$
        进而定义无量纲斜率参数 $\\alpha(s)$ 与曲率参数 $\\gamma(s)$：
        $$\\alpha(s) \\equiv - \\frac{1}{2} \\beta\'(s) = - w w\'$$
        $$\\gamma(s) \\equiv \\frac{1 + \\alpha^2(s)}{\\beta(s)}$$
        此时粒子轨道坐标与角散写为：
        $$x(s) = \\sqrt{\\epsilon \\beta(s)} \\cos(\\psi(s) + \\phi_0)$$
        $$x\'(s) = - \\sqrt{\\frac{\\epsilon}{\\beta(s)}} \\left[ \\alpha(s) \\cos(\\psi(s) + \\phi_0) + \\sin(\\psi(s) + \\phi_0) \\right]$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">5</div>
      <div>
        <strong>消去相位角 $\\psi(s) + \\phi_0$，导出 Courant-Snyder 二次型不变量</strong>：<br/>
        由 $x(s)$ 表达式得到：$\\cos(\\psi + \\phi_0) = \\frac{x}{\\sqrt{\\epsilon \\beta}}$。<br/>
        代入 $x\'(s)$ 表达式：
        $$x\' = - \\frac{\\alpha x}{\\beta} - \\sqrt{\\frac{\\epsilon}{\\beta}} \\sin(\\psi + \\phi_0) \\implies \\sin(\\psi + \\phi_0) = - \\left( \\frac{\\alpha x + \\beta x\'}{\\sqrt{\\epsilon \\beta}} \\right)$$
        利用恒等式 $\\cos^2(\\cdot) + \\sin^2(\\cdot) = 1$：
        $$\\left( \\frac{x}{\\sqrt{\\epsilon \\beta}} \\right)^2 + \\left( \\frac{\\alpha x + \\beta x\'}{\\sqrt{\\epsilon \\beta}} \\right)^2 = 1$$
        去分母并展开：
        $$x^2 + (\\alpha^2 x^2 + 2 \\alpha \\beta x x\' + \\beta^2 x\'^2) = \\epsilon \\beta$$
        两边同除以 $\\beta(s)$，并利用 $\\gamma = \\frac{1+\\alpha^2}{\\beta}$：
        $$\\gamma(s) x^2 + 2 \\alpha(s) x x\' + \\beta(s) x\'^2 = \\epsilon = \\text{const}$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Courant-Snyder 不变量导出完毕</div>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>📐 束流物理与实验测量：相椭圆几何特征与 Quad Scan 原理</span>
  </div>
  <p>
    上述二次型在相空间 $(x, x')$ 中描绘了一个<strong>中心在原点的倾斜椭圆</strong>：
    - 椭圆在 $x$ 轴的最大投影宽度（束斑半包络）：$\\hat{x} = \\sqrt{\\epsilon \\beta(s)}$；
    - 椭圆在 $x'$ 轴的最大角散跨度：$\\hat{x}\' = \\sqrt{\\epsilon \\gamma(s)}$；
    - 椭圆被四极铁聚焦/散焦引起的倾斜度由 $\\alpha(s)$ 决定（$\\alpha > 0$ 表示束流汇聚，$\\alpha < 0$ 表示束流发散）；
    - <strong>椭圆的相空间几何面积精确等于 $\\pi \\epsilon$</strong>，其中常数 $\\epsilon$ 称为<strong>单粒子发射度（Emittance）</strong>！<br/>
    <br/>
    <strong>【束流断层扫描（Quad Scan）测量发射度的底层代数】</strong>：
    在实际加速器中，我们无法直接测量粒子的微观发散角 $x'$，荧光靶（Profile Monitor / Screen）只能拍摄到空间束斑截面积 $\\sigma_x^2(s) = \\epsilon \\beta(s)$。<br/>
    如何从单一空间投影重建出完整的二维相空间发射度 $\\epsilon$？<br/>
    上游调节四极铁焦距 $k_1$（改变传输矩阵 $M$），下游荧光靶测得束斑平方 $\\sigma_x^2$。根据 Twiss 参数传输公式：
    $$\\sigma_x^2(k_1) = \\epsilon \\beta_1 = \\epsilon \\left( m_{11}^2 \\beta_0 - 2 m_{11} m_{12} \\alpha_0 + m_{12}^2 \\gamma_0 \\right)$$
    因为薄透镜矩阵元素 $m_{11} = 1 - L_d k_1$，将该式对四极铁强度 $k_1$ 展开为一个**二次抛物线** $y = A k_1^2 + B k_1 + C$。通过实验测定 3 个以上不同磁场下的束斑，拟合出系数 $(A, B, C)$，就能通过代数方程反解出初始截面的全部 Twiss 参数 $(\\beta_0, \\alpha_0, \\epsilon)$！这正是相空间断层重建的最基本数学原理！
  </p>
</div>
      `
    },
    {
      heading: '五、传输矩阵的辛结构与辛积分器 (Symplectic Integrators) 为什么不可替代？',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    <span>定义 2.4：辛群 $Sp(2, \\mathbb{R})$ 与传输矩阵辛正规化</span>
  </div>
  <p>两个横向相截面 $s_1$ 与 $s_2$ 之间的粒子运动映射 $z(s_2) = M z(s_1)$（其中 $z = (x, x\')^T$）。传输矩阵 $M \\in \\mathbb{R}^{2 \\times 2}$ 必须保持相空间的辛形式，即：</p>
  $$M^T J M = J \\iff \\det(M) = m_{11} m_{22} - m_{12} m_{21} = 1$$
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【深度剖析】为什么 Runge-Kutta 算法在粒子追踪中不可用？（逆误差分析与影子哈密顿量）</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Backward Error Analysis</span>
  </div>
  <p style="color:#cbd5e1; line-height: 1.8;">
    在加速器储存环或长达数十公里的直线加速器中，粒子需要模拟上百万圈的演化。如果使用经典的四阶 Runge-Kutta（RK4）方法：
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>RK4 不是辛变换</strong>：对谐振子 Hill 方程 $z\' = J K z$，RK4 单步单步迭代矩阵为泰勒截断：
        $$M_{\\text{RK4}} = I + h A + \\frac{h^2}{2} A^2 + \\frac{h^3}{6} A^3 + \\frac{h^4}{24} A^4$$
        计算其行列式：
        $$\\det(M_{\\text{RK4}}) = 1 - c_5 h^5 + O(h^6) \\neq 1$$
        虽然单步误差仅为 $O(h^5)$，但它每一步都在**非物理地衰减或放大相空间体积**！运行 $10^6$ 圈后，累积人工收缩 $(1 - 10^{-6})^{10^6} \\approx 1/e$，导致真实的保守系统在数值上虚假地耗散湮灭或发散！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>辛积分器（Symplectic Integrator）的影子哈密顿量理论</strong>：<br/>
        辛算法（如 Symplectic Euler、Verlet、Yoshida）每一步离散映射严格满足 $\\det(M_{\\text{symp}}) \\equiv 1$。<br/>
        根据哈密顿逆误差分析（Backward Error Analysis），辛积分器在离散步长 $h$ 下计算出的数值点，<strong>并不是原哈密顿量 $H$ 的截断近似，而是某个邻近的“影子哈密顿量（Shadow Hamiltonian）”的精确解析轨道</strong>：
        $$\\tilde{H}(q, p) = H(q, p) + h^2 H_2(q, p) + h^4 H_4(q, p) + \\dots$$
        只要时间步长 $h$ 小于系统特征振动周期，粒子就必须严格约束在影子能量曲面 $\\tilde{H} = E$ 上运动，因此<strong>能量误差在经历无限长时间追踪后依然处处有界、绝不发散漂移</strong>！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 辛动力学数值算法精要</div>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-ham-01',
      title: '验证 Symplectic Euler 单步映射的辛性并推导其一阶修正影子哈密顿量',
      difficulty: 'Advanced',
      statement: '对于一维可分离系统 $H(q, p) = \\frac{1}{2} p^2 + V(q)$，考虑步长为 $h$ 的 Symplectic Euler 映射：\n$$p_{n+1} = p_n - h V\'(q_n), \\quad q_{n+1} = q_n + h p_{n+1}$$\n1. 计算单步 Jacobi 矩阵 $\\mathcal{M} = \\frac{\\partial(q_{n+1}, p_{n+1})}{\\partial(q_n, p_n)}$，严格证明其行列式恒等于 1；\n2. 运用生成函数方法或渐近级数匹配，求出其一阶影子哈密顿量 $\\tilde{H} = H + h H_1$，解释为何辛积分器具有超长期的能量振荡稳定性。',
      hints: [
        '第一步：先将 $p_{n+1}$ 代入 $q_{n+1}$ 得到关于旧变量 $(q_n, p_n)$ 的显式函数。',
        '计算 Jacobi 矩阵的 4 个偏导数分量并计算主对角乘积减副对角乘积。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **显式映射与 Jacobi 行列式证明**：
   将 $p_{n+1}$ 代入位置更新方程：
   $$q_{n+1} = q_n + h \\left( p_n - h V\'(q_n) \\right) = q_n + h p_n - h^2 V\'(q_n)$$
   $$p_{n+1} = p_n - h V\'(q_n)$$
   计算单步变换矩阵的四个偏导数：
   $$\\frac{\\partial q_{n+1}}{\\partial q_n} = 1 - h^2 V\'\'(q_n), \\quad \\frac{\\partial q_{n+1}}{\\partial p_n} = h$$
   $$\\frac{\\partial p_{n+1}}{\\partial q_n} = - h V\'\'(q_n), \\quad \\frac{\\partial p_{n+1}}{\\partial p_n} = 1$$
   因此 Jacobi 矩阵为：
   $$\\mathcal{M} = \\begin{pmatrix} 1 - h^2 V\'\'(q_n) & h \\\\ -h V\'\'(q_n) & 1 \\end{pmatrix}$$
   计算行列式：
   $$\\det(\\mathcal{M}) = (1 - h^2 V\'\'(q_n)) \\cdot 1 - (h) \\cdot (-h V\'\'(q_n)) = 1 - h^2 V\'\'(q_n) + h^2 V\'\'(q_n) = 1$$
   行列式恒为 1，完全保持相空间辛结构！

2. **修正影子哈密顿量推导**：
   寻找连续时间哈密顿系统 $\\dot{q} = \\frac{\\partial \\tilde{H}}{\\partial p}, \\dot{p} = - \\frac{\\partial \\tilde{H}}{\\partial q}$，使其解在时间 $t=h$ 处的泰勒展开精确吻合离散差分格式：
   设 $\\tilde{H} = H + h H_1 = \\frac{1}{2} p^2 + V(q) + h H_1(q, p)$。
   对应方程为：
   $$\\dot{q} = p + h \\frac{\\partial H_1}{\\partial p}, \\quad \\dot{p} = - V\'(q) - h \\frac{\\partial H_1}{\\partial q}$$
   将连续解在 $t=0$ 处展开到 $O(h^2)$：
   $$q(h) = q(0) + h \\dot{q}(0) + \\frac{h^2}{2} \\ddot{q}(0) = q_0 + h p_0 + h^2 \\frac{\\partial H_1}{\\partial p} - \\frac{h^2}{2} V\'(q_0)$$
   而 Symplectic Euler 的实际离散更新为：
   $$q_{n+1} = q_0 + h p_0 - h^2 V\'(q_0)$$
   两者必须精确吻合，对比 $h^2$ 项系数：
   $$\\frac{\\partial H_1}{\\partial p} - \\frac{1}{2} V\'(q_0) = - V\'(q_0) \\implies \\frac{\\partial H_1}{\\partial p} = - \\frac{1}{2} V\'(q_0) \\implies H_1(q, p) = - \\frac{1}{2} p V\'(q)$$
   因此修正后的影子哈密顿量为：
   $$\\tilde{H}(q, p) = \\frac{1}{2} p^2 + V(q) - \\frac{h}{2} p V\'(q) + O(h^2)$$
   因为 Symplectic Euler 是这个连续体系 $\\tilde{H}$ 的精确解，数值点永远在闭合曲面 $\\tilde{H}(q, p) = \\text{const}$ 上移动，原能量 $H = \\tilde{H} + \\frac{h}{2} p V\'(q)$ 的相对误差永远在 $\\pm \\frac{h}{2} p V'$ 之间周期性震荡，绝无单调发散！
      `
    },
    {
      id: 'hw-ham-02',
      title: '从 Hill 方程 Wronskian 守恒严格推导传输矩阵辛条件 $\\det M = 1$',
      difficulty: 'Beam Physics Core',
      statement: '设 $C(s)$ 和 $S(s)$ 分别为满足初始条件 $C(0)=1, C\'(0)=0$ 和 $S(0)=0, S\'(0)=1$ 的 Hill 方程 $x\'\' + K(s)x = 0$ 的两个线性无关特解（余弦型与正弦型基本解）。\n1. 利用 Liouville 微分方程定理证明其 Wronskian 行列式 $W(s) = C(s)S\'(s) - C\'(s)S(s) \\equiv 1$ 沿整个环处处守恒；\n2. 证明传输矩阵 $M(s_0 \\to s) = \\begin{pmatrix} C(s) & S(s) \\\\ C\'(s) & S\'(s) \\end{pmatrix}$ 必满足辛条件 $M^T J M = J$。',
      hints: [
        '计算微商 $\\frac{dW}{ds}$ 并代入 Hill 方程 $C\'\' = -K C, S\'\' = -K S$。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **Wronskian 行列式沿轨道守恒的严格证明**：
   定义基本解组的 Wronskian 为：
   $$W(s) = \\det \\begin{pmatrix} C(s) & S(s) \\\\ C\'(s) & S\'(s) \\end{pmatrix} = C(s) S\'(s) - C\'(s) S(s)$$
   对纵向弧长 $s$ 求导：
   $$\\frac{dW}{ds} = C\' S\' + C S\'\' - (C\'\' S + C\' S\') = C S\'\' - C\'\' S$$
   因为 $C(s)$ 和 $S(s)$ 分别满足 Hill 方程：
   $$C\'\'(s) = - K(s) C(s), \\quad S\'\'(s) = - K(s) S(s)$$
   代入上式：
   $$\\frac{dW}{ds} = C (-K S) - (-K C) S = - K C S + K C S = 0$$
   因此导数处处严格为零，$W(s)$ 是一个绝对常数！
   在初始位置 $s = 0$ 处代入初始条件：
   $$W(0) = C(0) S\'(0) - C\'(0) S(0) = 1 \\cdot 1 - 0 \\cdot 0 = 1$$
   故在束线上任意位置 $s$，恒有 $W(s) \\equiv 1$。

2. **传输矩阵辛性证明**：
   任意粒子的轨迹可由基本解线性表出：
   $$x(s) = x_0 C(s) + x\'_0 S(s), \\quad x\'(s) = x_0 C\'(s) + x\'_0 S\'(s)$$
   写成矩阵形式：
   $$\\begin{pmatrix} x(s) \\\\ x\'(s) \\end{pmatrix} = M(0 \\to s) \\begin{pmatrix} x_0 \\\\ x\'_0 \\end{pmatrix}, \\quad M = \\begin{pmatrix} C(s) & S(s) \\\\ C\'(s) & S\'(s) \\end{pmatrix}$$
   计算传输矩阵行列式：
   $$\\det(M) = C(s) S\'(s) - C\'(s) S(s) = W(s) \\equiv 1$$
   对于二维相空间，直接验证辛矩阵条件：
   $$M^T J M = \\begin{pmatrix} C & C\' \\\\ S & S\' \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} \\begin{pmatrix} C & S \\\\ C\' & S\' \\end{pmatrix} = \\begin{pmatrix} C & C\' \\\\ S & S\' \\end{pmatrix} \\begin{pmatrix} C\' & S\' \\\\ -C & -S \\end{pmatrix} = \\begin{pmatrix} 0 & CS\' - C\'S \\\\ -(CS\' - C\'S) & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} = J$$
   这直接从二阶常微分方程的本质上证明了：**任何由保守线性磁铁（四极铁、漂移段、螺线管）构成的束流光学系统，其传输矩阵天然属于实辛群 $Sp(2, \\mathbb{R})$，相空间面积与发射度由此严格守恒！**
      `
    }
  ]
};

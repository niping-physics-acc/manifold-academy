/**
 * Modern Differential Geometry Master Chapter
 * Fully hierarchical, graduate-level geometric theoretical physics & beam dynamics.
 * 
 * Sections:
 * 1.1 现代几何动机：为什么传统三维矢量微积分必须被重构？
 * 1.2 切空间 T_pM：切向量作为方向导数算子 (Derivation)
 * 1.3 余切空间 T_p^*M：微分 1-形式作为几何测量尺
 * 1.4 向量丛与截面空间 Γ：从单点代数到全流形物理场 (详解 Ω^k(M) 与 Γ 算符)
 * 1.5 外代数 (Exterior Algebra)：高维有向体积的反对称演算
 * 1.6 外微分算子 d 与拓扑幂零律：d² = 0 严格证明
 * 1.7 流形上的外积分 (Exterior Integration) 与广义 Stokes 定理
 * 1.8 李导数 L_X 与 Cartan 魔术公式严密推导
 */

export const diffGeomChapter = {
  id: 'diff-geom-01',
  disciplineId: 'diff-geom',
  title: '微分流形、外微积分与李导数几何图景',
  subtitle: 'Coordinate-Free Geometry: Bundles, Sections, Exterior Algebra, Integration & Cartan Calculus',
  level: 'Graduate Core / 现代几何根基',
  prereqs: ['多变量微积分', '实分析与拓扑初步', '线性代数对偶空间'],
  readingTime: '65 min',
  summary: '本章系统重构现代微分几何的内蕴体系：从切向量的方向导数算子本质、余切 1-形式的几何测量对偶，深入到向量丛截面算符 Γ 的“场化”内涵；完整建立反对称外代数（Grassmann Algebra）的高维体积测度理论，证明外微分算子 d 的拓扑幂零律（d²=0）；阐明流形上外积分对偶维度匹配原则与广义 Stokes 定理的物理大一统，并完整证明被誉为动力学几何灵魂的 Cartan 魔术公式及其在束流相空间保体积中的决定性应用。',
  sections: [
    {
      id: 'sec-1',
      number: '1.1',
      heading: '概念诞生背景：为什么传统三维矢量微积分必须被重构？',
      content: `
<div class="math-motivation">
  <strong>【历史与物理局限】</strong>：在初等力学与经典电动力学中，物理量通常被表达为直角坐标 $(x, y, z)$ 或球坐标 $(r, \theta, \phi)$ 下的分量多元函数。梯度 $\\nabla f$、散度 $\\nabla \\cdot \\vec{v}$、旋度 $\\nabla \\times \\vec{v}$ 似乎无所不能。然而当理论物理走向广义动力学系统（具有约束的拉格朗日系统、加速器弯转磁铁轨道、相对论时空）时，这一套工具暴露出三大根本性硬伤：
</div>

1. **依赖于平直欧氏度规的假象**：
   三维旋度 $\\nabla \\times \\vec{v}$ 只能在三维空间中定义（因为两个矢量的叉乘在 $n \\neq 3$ 维中根本不是矢量，而是反称二阶张量！）。此外，传统矢量分析把“矢量场（速度）”与“梯度（力的功）”都画成带箭头的向量，掩盖了**切向量（Tangent Vector）**与**余切向量/微分形式（Covector / 1-form）**之间本质的对偶差异。

2. **坐标系变换下的混淆**：
   在带电粒子加速器中，粒子沿弯曲设计轨道（Curvilinear Frenet-Serret 坐标系 $(x, y, s)$）运动。如果在旧框架下求加速度，每次换坐标系都必须重新计算极为冗长的 Christoffel 符号或拉梅系数（Lamé coefficients）。而物理定律（如粒子轨迹的定态性、麦克斯韦方程的无荷守恒）绝不可能因我们选了极坐标还是直角坐标而发生实质改变。

3. **现代物理的解决方案——无坐标流形（Smooth Manifold）**：
   必须建立一种**内蕴几何（Intrinsic Geometry）**语言：空间是一个光滑流形 $M$，物体在上面运动只取决于流形本身的微分结构与拓扑，所有物理方程必须写成**无坐标（Coordinate-Free）**张量与微分形式的代数等式。在任何局部图卡（Chart）选定后，自动且精确地退化为具体的计算偏导数。
      `
    },
    {
      id: 'sec-2',
      number: '1.2',
      heading: '切空间 $T_pM$：切向量作为方向导数算子 (Derivation)',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
    <span>定义 1.1：光滑流形与切向量的导数定义 (Derivation)</span>
  </div>
  <p>设 $M$ 为 $n$ 维光滑流形，$p \\in M$。流形上点 $p$ 处的<strong>切向量 $X_p$</strong>，定义为一个作用在点 $p$ 局域光滑标量函数芽空间 $C^\\infty(p)$ 上的<strong>实线性映射</strong>：</p>
  $$X_p: C^\\infty(p) \\to \\mathbb{R}$$
  <p>且对任意 $f, g \\in C^\\infty(p)$，满足 <strong>Leibniz 乘积法则（导数性质）</strong>：</p>
  $$X_p(f g) = f(p) X_p(g) + g(p) X_p(f)$$
  <p>所有满足上述条件的切向量集合在实数域上构成一个 $n$ 维实线性空间，称为流形在点 $p$ 的<strong>切空间（Tangent Space）</strong>，记为 $T_p M$。</p>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 为什么切向量是“导数算子”而不是“带箭头的线段”？</span>
  </div>
  <p>
    在弯曲流形（如球面 $S^2$）内部，并没有多余的平直外围空间去画一根由“起点指向终点”的直线箭头。但物理上，<strong>速度的全部物理功效，就在于衡量标量物理量（如温度、势能、电荷密度）沿该方向的时间变化率</strong>！<br/>
    若粒子沿曲线 $\\gamma(t)$ 运动且 $\\gamma(0) = p$，则对流形上任意可观测量 $f$，其沿轨道的全变化率为：
    $$\\left. \\frac{d}{dt} f(\\gamma(t)) \\right|_{t=0} = \\left. \\frac{\\partial f}{\\partial x^i} \\frac{dx^i}{dt} \\right|_{t=0}$$
    因此，曲线的切向量本质上就是<strong>方向导数微分算子</strong>：
    $$X_p = \\left. \\frac{dx^i}{dt} \\right|_{t=0} \\left. \\frac{\\partial}{\\partial x^i} \\right|_p$$
    在局部坐标系 $(x^1, \\dots, x^n)$ 下，偏导数算子族 $\\left\\{ \\left. \\frac{\\partial}{\\partial x^1} \\right|_p, \\dots, \\left. \\frac{\\partial}{\\partial x^n} \\right|_p \\right\\}$ 天然构成了切空间 $T_p M$ 的一组正规基底！
  </p>
</div>
      `
    },
    {
      id: 'sec-3',
      number: '1.3',
      heading: '余切空间 $T_p^*M$：微分 1-形式作为几何测量尺',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/></svg>
    <span>定义 1.2：余切空间与微分 1-形式 (Differential 1-Forms)</span>
  </div>
  <p>流形在点 $p$ 处的<strong>余切空间 $T_p^* M$</strong> 定义为切空间 $T_p M$ 的代数<strong>对偶空间（Dual Vector Space）</strong>：</p>
  $$T_p^* M = \\text{Hom}_\\mathbb{R}(T_p M, \\mathbb{R}) = \\{ \\alpha_p: T_p M \\to \\mathbb{R} \\mid \\alpha_p \\text{ 为实线性泛函} \\}$$
  <p>余切空间中的元素称为<strong>余向量（Covector）</strong>或<strong>外微分 1-形式</strong>。它作用于切向量 $X_p$ 产生一个无坐标的实数：$\\langle \\alpha_p, X_p \\rangle = \\alpha_p(X_p) \\in \\mathbb{R}$。</p>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 物理直观：向量是“位移流”，1-形式是“等值面测量网”</span>
  </div>
  <p>
    在物理中，<strong>动量 $p_i$</strong>、<strong>力的功 $dW$</strong>、<strong>电磁标势差 $d\\phi$</strong> 绝不是速度那样的空间箭头，而是对偶的“测量网格”：
    <br/>• 切向量 $X$ 是一个微观位移速度；
    <br/>• 1-形式 $\\alpha$ 是一簇等高线平面。当矢量 $X$ 穿过这一簇等高线时，穿过的线数就是标量数值 $\\alpha(X)$；
    <br/>• 局部坐标下，坐标基底对偶关系定义为：
    $$\\langle dx^i, \\frac{\\partial}{\\partial x^j} \\rangle = \\delta^i_j$$
    • 标量场 $f$ 的全微分 $df$ 正是天然的 1-形式：$df = \\frac{\\partial f}{\\partial x^i} dx^i$。对任意切向量 $X$，作用结果 $df(X) = X(f)$ 就是该方向上的方向导数！
  </p>
</div>
      `
    },
    {
      id: 'sec-4',
      number: '1.4',
      heading: '向量丛与截面空间 $\\Gamma$：从单点代数到全流形物理场',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>定义 1.3：向量丛 (Vector Bundle)、纤维 (Fiber) 与截面算符 $\\Gamma$</span>
  </div>
  <p>设 $M$ 为底流形。一个光滑<strong>向量丛（Vector Bundle）</strong>由三元组 $(E, \\pi, M)$ 构成，其中：</p>
  <ul>
    <li>$E$ 为<strong>总空间（Total Space）</strong>；</li>
    <li>$M$ 为<strong>底流形（Base Manifold）</strong>；</li>
    <li>$\\pi: E \\to M$ 为光滑满射<strong>投影映射（Projection）</strong>；</li>
    <li>对任意点 $p \\in M$，原像 $E_p := \\pi^{-1}(p)$ 具有 $k$ 维实向量空间结构，称为点 $p$ 处的<strong>纤维（Fiber）</strong>。</li>
  </ul>
  <p>丛 $E$ 的一个光滑<strong>截面（Section）</strong>是一个光滑映射 $s: M \\to E$，满足投影后回到原点：</p>
  $$\\pi \\circ s = \\text{id}_M \\quad (\\text{即对任意 } p \\in M, \\; s(p) \\in E_p)$$
  <p>所有光滑截面构成的实线性空间记为 <strong>$\\Gamma(E)$</strong>（或 $\\Gamma(M, E)$）。</p>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 为什么说 $\\Gamma$ 的物理本质就是“场化（Fieldization）”算符？</span>
  </div>
  <p>
    请严格区分“点上的向量空间”与“整个流形上的物理场”：
    <br/>1. <strong>点上的代数空间</strong>：在单个点 $p$，余切空间 $T_p^* M$ 及其外积 $\\bigwedge^k T_p^* M$ 只是孤立的一套线性代数空间；
    <br/>2. <strong>截面 $\\Gamma$ 的作用</strong>：$\\Gamma$ 就像在流形 $M$ 上给每一个点 $p$ 竖起一根纤维，然后在每根纤维上光滑地挑出一个张量 $s(p)$，连缀成遍布全流形的连续介质；
    <br/>3. <strong>经典物理场的现代几何对应</strong>：
    <ul style="margin: 8px 0 8px 24px;">
      <li><strong>$\\Gamma(TM) = \\mathfrak{X}(M)$</strong>：切丛 $TM$ 的截面空间 = <strong>光滑切向量场</strong>（如流体速度场 $\\vec{v}(x)$、加速器相空间中的哈密顿矢量场 $X_H$）；</li>
      <li><strong>$\\Gamma(T^*M) = \\Omega^1(M)$</strong>：余切丛 $T^*M$ 的截面空间 = <strong>光滑 1-形式场</strong>（如四维电磁矢势 $A = A_\\mu dx^\\mu$、经典力学正则动量形式 $\\theta = p_i dq^i$）；</li>
      <li><strong>$\\Gamma(\\bigwedge^k T^*M) = \\Omega^k(M)$</strong>：$k$ 阶反对称余切外代数丛的截面空间 = <strong>光滑微分 $k$-形式场</strong>（如麦克斯韦电磁场强张量 $F \\in \\Omega^2(M)$、相空间辛 2-形式 $\\omega = dq \\wedge dp \\in \\Omega^2(M)$）。</li>
    </ul>
    因此，公式 <strong>$\\Omega^k(M) := \\Gamma\\left(\\bigwedge^k T^*M\\right)$</strong> 清晰揭示了物理场的来源：它是在流形各点取 $k$ 阶反对称代数后，再经由 $\\Gamma$ 提升到全流形上的<strong>平滑物理场空间</strong>！
  </p>
</div>

<div style="background: rgba(30, 41, 59, 0.7); border-left: 3px solid #f59e0b; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 0.9rem; color: #cbd5e1;">
  <strong style="color: #fbbf24;">⚠️ 符号阶梯解析（自内向外）：</strong>
  $$M \\quad \\xrightarrow{\\quad T^*M \\quad} \\quad \\bigwedge\\nolimits^k T^*M \\quad \\xrightarrow{\\quad \\Gamma \\quad} \\quad \\Omega^k(M)$$
  底空间 $M$ $\\to$ 赋予每点余切纤维 $T_p^*M$ $\\to$ 构建外代数丛 $\\bigwedge^k T^*M$ $\\to$ 截面取值算符 $\\Gamma$ $\\to$ 生成微分 $k$-形式场空间 $\\Omega^k(M)$。
</div>
      `
    },
    {
      id: 'sec-5',
      number: '1.5',
      heading: '外代数 (Exterior Algebra)：高维有向体积的反对称演算',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    <span>定义 1.4：Grassmann 外代数与反对称外积 $\\wedge$ (Wedge Product)</span>
  </div>
  <p>设 $V$ 为实数域上的 $n$ 维向量空间。将全张量代数 $T(V) = \\bigoplus_{k=0}^\\infty V^{\otimes k}$ 模去由所有退化对称张量 $\\{v \\otimes v \\mid v \\in V\\}$ 生成的双边理想 $I$，得到的商代数称为 <strong>Grassmann 外代数（Exterior Algebra）</strong>，记为 $\\bigwedge V$：</p>
  $$\\bigwedge V = T(V) / I = \\bigoplus_{k=0}^n \\bigwedge\\nolimits^k V$$
  <p>外积运算 $\\wedge$ 满足<strong>结合律</strong>与<strong>反交换律（Anticommutativity）</strong>：</p>
  $$\\alpha \\wedge \\beta = (-1)^{k \\cdot l} \\beta \\wedge \\alpha \\quad (\\alpha \\in \\bigwedge\\nolimits^k V, \\; \\beta \\in \\bigwedge\\nolimits^l V)$$
  <p>特别地，对任意 1-形式 $\\alpha, \\beta \\in V^*$，恒有：$$\\alpha \\wedge \\beta = - \\beta \\wedge \\alpha, \\qquad \\alpha \\wedge \\alpha = 0$$</p>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 几何直观：外代数是测量“高维有向平行多面体体积”的代数</span>
  </div>
  <p>
    为什么外积必须满足反交换律？
    <br/>• <strong>有向面积翻转</strong>：两根向量 $u, v$ 张成一个二维平行四边形。从 $u$ 转向 $v$ 与从 $v$ 转向 $u$，平面的右手螺旋定向恰好相反，故 $u \\wedge v = - (v \\wedge u)$；
    <br/>• <strong>共线平行无体积</strong>：若两向量共线平行（$u = c v$），它们张成的平行四边形压成一条直线，面积为零，故 $v \\wedge v = 0$；
    <br/>• <strong>空间维度与阶数截断</strong>：
    在 $n$ 维向量空间中，外代数各分级的基底维数精确对应组合数 $\\dim \\bigwedge^k V = \\binom{n}{k}$：
    $$\\dim \\bigwedge V = \\sum_{k=0}^n \\binom{n}{k} = 2^n$$
    当 $k = n$ 时，$\\dim \\bigwedge^n V = \\binom{n}{n} = 1$（一维空间，最高阶有向体积元 / 顶形式）；<br/>
    当 $k > n$ 时，$\\bigwedge^k V = \\{0\\}$（鸽巢原理：$n$ 维空间中任何 $> n$ 个基底相乘必然存在重复项，由于 $v \\wedge v = 0$ 必然直接归零！）。
  </p>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【代数推导】为什么 1-形式的外积天然就是行列式 (Determinant)？</span>
  </div>
  <p>
    设两个基底 1-形式 $dx^1, dx^2 \\in T_p^*M$，以及两个切向量 $u = u^1 \\frac{\\partial}{\\partial x^1} + u^2 \\frac{\\partial}{\\partial x^2}$ 与 $v = v^1 \\frac{\\partial}{\\partial x^1} + v^2 \\frac{\\partial}{\\partial x^2}$。<br/>
    根据反对称双线性张量定义：
    $$(dx^1 \\wedge dx^2)(u, v) = dx^1(u) dx^2(v) - dx^1(v) dx^2(u) = u^1 v^2 - v^1 u^2 = \\det \\begin{pmatrix} u^1 & v^1 \\\\ u^2 & v^2 \\end{pmatrix}$$
    <strong>结论：行列式根本不是人为发明的矩阵算式，它本质上就是外积反对称作用在向量组上的自然输出结果！</strong>
  </p>
</div>
      `
    },
    {
      id: 'sec-6',
      number: '1.6',
      heading: '外微分算子 $d$ 与拓扑幂零律：$d^2 = 0$ 严格证明',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>定义 1.5：外微分算子 $d: \\Omega^k(M) \\to \\Omega^{k+1}(M)$</span>
  </div>
  <p>流形上存在唯一的实线性导数算子族 $d$，将 $k$-形式提升为 $(k+1)$-形式，并满足如下三条公理：</p>
  <ol>
    <li>对 0-形式（标量函数 $f$），$df = \\frac{\\partial f}{\\partial x^i} dx^i$（全微分）；</li>
    <li><strong>反 Leibniz 乘积律</strong>：对 $\\alpha \\in \\Omega^k(M), \\; \\beta \\in \\Omega^l(M)$，有：
      $$d(\\alpha \\wedge \\beta) = d\\alpha \\wedge \\beta + (-1)^k \\alpha \\wedge d\\beta$$
    </li>
    <li>对局部坐标微分形式，二阶微分为零：$d(dx^i) = 0$。</li>
  </ol>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【核心定理 1.1】外微分算子的幂零律证明：$d \\circ d \\equiv 0$</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Theorem & Proof</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>第一步：验证对任意平滑标量场 $f \\in \\Omega^0(M)$ 成立</strong>：<br/>
        根据全微分定义：$df = \\frac{\\partial f}{\\partial x^j} dx^j$。对该 1-形式再次施加 $d$ 算子，应用反 Leibniz 律：
        $$d(df) = d\\left( \\frac{\\partial f}{\\partial x^j} dx^j \\right) = d\\left( \\frac{\\partial f}{\\partial x^j} \\right) \\wedge dx^j + \\frac{\\partial f}{\\partial x^j} d(dx^j)$$
        由于公理 3 规定 $d(dx^j) = 0$，第二项精确消除。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>第二步：展开二阶偏导数项</strong>：<br/>
        $$d(df) = \\left( \\frac{\\partial^2 f}{\\partial x^i \\partial x^j} dx^i \\right) \\wedge dx^j = \\sum_{1 \\le i < j \\le n} \\left( \\frac{\\partial^2 f}{\\partial x^i \\partial x^j} - \\frac{\\partial^2 f}{\\partial x^j \\partial x^i} \\right) dx^i \\wedge dx^j$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>第三步：利用 Clairaut-Schwarz 对称性与外积反对称性对消</strong>：<br/>
        因为流形上的函数为 $C^\\infty$ 平滑，二阶混合偏导数关于指标严格对称：
        $$\\frac{\\partial^2 f}{\\partial x^i \\partial x^j} = \\frac{\\partial^2 f}{\\partial x^j \\partial x^i}$$
        而楔积基底严格反对称：$dx^i \\wedge dx^j = - dx^j \\wedge dx^i$。对称量与反对称量的全面收缩必恒为零：
        $$d(df) \\equiv 0$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>第四步：利用数学归纳法推广到任意 $k$-形式 $\\omega = a_I dx^I$</strong>：<br/>
        $$d(d\\omega) = d(da_I \\wedge dx^I) = d(da_I) \\wedge dx^I - da_I \\wedge d(dx^I) = 0 - 0 = 0$$
        因此对流形上的任意形式，幂零律严格成立：$$d^2 \\equiv 0$$
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Q.E.D.</div>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 现代物理的灵魂几何对应：$d^2 = 0 \\iff \\partial^2 = 0$</span>
  </div>
  <p>
    流形外微分的 $d^2 = 0$，在几何拓扑上严格对应于<strong>“边界的边界永远为空”</strong>：$\\partial(\\partial \\Omega) = \\emptyset$（如三维实心球的边界是二维球面，二维球面的边界是空集 $\\emptyset$）。<br/>
    这统一解释了经典物理学中所有“无旋”、“无散”与“守恒”规律：
    <br/>• $\\text{curl}(\\text{grad} f) = 0 \\iff d(df) = 0$；
    <br/>• $\\text{div}(\\text{curl} \\vec{A}) = 0 \\iff d(d A) = 0$；
    <br/>• 电磁场张量 $F = dA$ 自动保证了麦克斯韦无磁单极方程 $dF = d(dA) \\equiv 0$！
  </p>
</div>
      `
    },
    {
      id: 'sec-7',
      number: '1.7',
      heading: '流形上的外积分 (Exterior Integration) 与广义 Stokes 定理',
      content: `
<div class="math-motivation">
  <strong>【传统多元微积分的尴尬痛点】</strong>：在高等微积分中，计算重积分坐标变换 $(x,y) \\to (u,v)$ 时，必须人为在公式中硬塞入一个<strong>雅可比行列式的绝对值</strong>：
  $$\\iint_D f(x,y) dx dy = \\iint_{D'} f(x(u,v), y(u,v)) \\left| \\det \\frac{\\partial(x,y)}{\\partial(u,v)} \\right| du dv$$
  为什么要有绝对值？因为经典黎曼积分的“体积”被定义为无符号的正数。但在弯曲流形上，没有全局坐标系，当跨越不同图卡（Charts）时，若局部定向翻转（$\\det J < 0$），绝对值会彻底撕裂几何的连续协变性！
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
    <span>定义 1.6：流形上的外积分 (Integration of Differential Forms)</span>
  </div>
  <p>设 $M$ 为 $n$ 维定向流形，$\\omega \\in \\Omega^n_c(M)$ 为紧支集顶形式。在局部坐标卡 $(U, \\phi)$ 下，形式写为 $\\omega = f(x^1, \\dots, x^n) dx^1 \\wedge \\dots \\wedge dx^n$。定义其外积分为：</p>
  $$\\int_U \\omega = \\int_{\\phi(U)} f(x^1, \\dots, x^n) dx^1 \\dots dx^n$$
  <p>对全流形，借助从属于开覆盖的<strong>单位分解（Partition of Unity）</strong> $\\{\\rho_\\alpha\\}$ 定义：</p>
  $$\\int_M \\omega = \\sum_\\alpha \\int_{U_\\alpha} \\rho_\\alpha \\omega$$
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 为什么说“外代数天生自带换元法”，无需人为规定绝对值？</span>
  </div>
  <p>
    设局部坐标变换为 $x^i = x^i(u^1, \\dots, u^n)$，微分 1-形式的全微分为 $dx^i = \\sum_j \\frac{\\partial x^i}{\\partial u^j} du^j$。<br/>
    将它们代入顶形式外积中，根据<strong>外代数反交换律</strong>直接展开：
    $$dx^1 \\wedge dx^2 \\wedge \\dots \\wedge dx^n = \\det\\left( \\frac{\\partial x^i}{\\partial u^j} \\right) du^1 \\wedge du^2 \\wedge \\dots \\wedge du^n$$
    <strong>惊人结论：雅可比行列式是外代数自身反对称性的自然代数产物！</strong> 只要流形保持相容定向，坐标变换公式自动成立，完全不需要外加绝对值符号。
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>对偶维度匹配原则：$k$-形式与 $k$-维流形</span>
  </div>
  <p>在现代微分几何中，被积形式的阶数与几何积分区域的维数必须<strong>严格对偶相等</strong>：</p>
  <ul>
    <li><strong>0-形式 $f$</strong> 积在 <strong>0-维流形（离散点集）</strong>：$\\int_{\\{p\\}} f = f(p)$；</li>
    <li><strong>1-形式 $\\alpha \\in \\Omega^1(M)$</strong> 积在 <strong>1-维有向曲线 $\\gamma$</strong>：$\\int_\\gamma \\alpha = \\int_a^b \\alpha_i(\\gamma(t)) \\dot{\\gamma}^i(t) dt$（物理：做功 $\\int \\mathbf{F} \\cdot d\\mathbf{r}$、正则相线积分 $\\oint p dq$）；</li>
    <li><strong>2-形式 $\\beta \\in \\Omega^2(M)$</strong> 积在 <strong>2-维有向曲面 $\\Sigma$</strong>：$\\iint_\\Sigma \\beta$（物理：穿过截面的磁通量 $\\iint \\mathbf{B} \\cdot d\\mathbf{S}$、相空间辛面积）；</li>
    <li><strong>$n$-形式 $\\Omega_{\\text{vol}} \\in \\Omega^n(M)$</strong> 积在 <strong>$n$-维实体流形 $V$</strong>：$\\int_V \\Omega_{\\text{vol}}$（物理：相空间总概率、全电荷量）。</li>
  </ul>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【几何顶峰】广义 Stokes 定理 (Generalized Stokes' Theorem)</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Fundamental Theorem of Geometry</span>
  </div>
  <p style="font-size: 1.15rem; color: #38bdf8; font-family: var(--font-mono); margin: 12px 0;">
    $$\\int_{\\partial \\Omega} \\omega = \\int_{\\Omega} d\\omega$$
  </p>
  <p>
    其中 $\\Omega$ 为任意 $k$ 维带边定向流形，$\\partial \\Omega$ 为其 $(k-1)$ 维诱导定向边界，$\\omega \\in \\Omega^{k-1}(M)$ 为任意平滑 $(k-1)$-形式。<br/>
    <strong>大一统全景图：</strong>
    <br/>• 当 $k = 1$ 时：$\\int_{\\partial [a,b]} f = f(b) - f(a) = \\int_a^b df$（<strong>微积分基本定理</strong>）；
    <br/>• 当 $k = 2$ 时：$\\oint_{\\partial S} (P dx + Q dy) = \\iint_S \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) dx dy$（<strong>格林公式 / Kelvin-Stokes 旋度定理</strong>）；
    <br/>• 当 $k = 3$ 时：$\\iint_{\\partial V} \\vec{F} \\cdot d\\vec{S} = \\iiint_V (\\nabla \\cdot \\vec{F}) dV$（<strong>高斯散度定理</strong>）。
  </p>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>⚛️ 加速器束流应用：单粒子发射度（Emittance）与辛外积分</span>
  </div>
  <p>
    在粒子加速器中，粒子在横向相空间 $(x, p_x)$ 上的状态点构成分布。
    横向<strong>几何发射度 $\\epsilon_x$</strong> 本质上就是束流包络相椭圆 $\\Sigma$ 上的<strong>辛 2-形式外积分</strong>：
    $$\\epsilon_x = \\frac{1}{\\pi} \\iint_{\\Sigma} dx \\wedge dp_x$$
    当束流穿过任意磁铁聚焦通道（漂移段、四极透镜、偏转铁），其传输矩阵 $M \\in Sp(2, \\mathbb{R})$ 保持典范辛形式不变（$M^* \\omega = \\omega$）。根据外积分换元协变律：
    $$\\iint_{M(\\Sigma)} dx \\wedge dp_x = \\iint_{\\Sigma} M^*(dx \\wedge dp_x) = \\iint_{\\Sigma} dx \\wedge dp_x$$
    <strong>单粒子相椭圆面积严格守恒！发射度绝不会因长程理想磁铁传输而发生耗散或畸变。</strong>
  </p>
</div>
      `
    },
    {
      id: 'sec-8',
      number: '1.8',
      heading: '李导数 $\\mathcal{L}_X$ 与 Cartan 魔术公式严密推导',
      content: `
<div class="math-motivation">
  <strong>【为什么不能直接对流形上的张量求差？】</strong>：在平直空间中，导数定义为 $\\frac{T(x+h) - T(x)}{h}$。但在弯曲流形上，点 $p$ 处的切空间 $T_p M$ 与点 $q$ 处的切空间 $T_q M$ 是两个完全独立的向量空间！在没有选定联络（Connection）的情况下，不同点的向量根本无法直接相减。为了定义微分形式沿着流场的变化率，必须借助由向量场 $X$ 生成的<strong>单参数局部微分同胚流族 $\\Phi_t^X: M \\to M$</strong>，利用拉回（Pullback $(\\Phi_t)^*$）算子把变化后的张量“拉回”到原点作差。
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    <span>定义 1.7：微分形式的李导数与内积收缩算子 $i_X$</span>
  </div>
  <p>设 $X$ 为光滑向量场，$\\Phi_t$ 为其积分相流。微分形式 $\\omega$ 沿 $X$ 的<strong>李导数</strong>定义为：</p>
  $$\\mathcal{L}_X \\omega = \\lim_{t \\to 0} \\frac{(\\Phi_t)^* \\omega - \\omega}{t}$$
  <p>定义<strong>内积收缩算子（Interior Product）$i_X: \\Omega^k(M) \\to \\Omega^{k-1}(M)$</strong>：将向量场 $X$ 插入形式的第一个槽位：</p>
  $$(i_X \\omega)(Y_1, \\dots, Y_{k-1}) = \\omega(X, Y_1, \\dots, Y_{k-1})$$
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【核心定理 1.2】Cartan 魔术公式 (Cartan's Magic Formula) 完整证明</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Theorem & Proof</span>
  </div>
  <p style="margin-bottom: 12px; color: #e2e8f0;">
    对流形上的任意微分形式 $\\omega$，恒有等式：
    $$\\mathcal{L}_X \\omega = d(i_X \\omega) + i_X (d\\omega)$$
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>第一步：验证对 0-形式（标量函数 $f$）成立</strong>：<br/>
        根据定义，对 0-形式，内积算子将其降为 0 阶以下，故规定 $i_X f = 0$。<br/>
        左边：李导数作用在标量上即为方向导数，$\\mathcal{L}_X f = X(f)$。<br/>
        右边：$d(i_X f) + i_X (df) = d(0) + i_X (df) = df(X) = X(f)$。<br/>
        两边严格相等，对 0-形式定理成立。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>第二步：验证对精确 1-形式 $\\omega = df$ 成立</strong>：<br/>
        因为李导数与外微分算子可以对易：$\\mathcal{L}_X (df) = d(\\mathcal{L}_X f)$（拉回与外微分可交换）。<br/>
        将第一步结论 $\\mathcal{L}_X f = i_X (df)$ 代入：
        $$\\mathcal{L}_X (df) = d(i_X(df))$$
        另一方面，计算右边算子作用于 $df$：
        $$d(i_X (df)) + i_X(d(df)) = d(i_X (df)) + i_X(0) = d(i_X(df))$$
        两边精确相等，对全微分形式成立。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>第三步：利用 Leibniz 导数公理推广至局部坐标任意形式</strong>：<br/>
        局部坐标下任意形式都是 $f \\, dx^{i_1} \\wedge \\cdots \\wedge dx^{i_k}$ 的线性叠加。<br/>
        记算子 $D_X = d \\circ i_X + i_X \\circ d$。可以直接通过反 Leibniz 法则验证 $D_X$ 也是一个阶数为 0 的外微商算子，满足：
        $$D_X(\\alpha \\wedge \\beta) = (D_X \\alpha) \\wedge \\beta + \\alpha \\wedge (D_X \\beta)$$
        因为 $\\mathcal{L}_X$ 与 $D_X$ 在所有的 0-形式 $f$ 和生成元 1-形式 $dx^i$ 上均完全重合，根据代数生成元唯一定理，二者在所有阶数的微分形式空间 $\\Omega^*(M)$ 上处处相等！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Q.E.D.</div>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>⚛️ 加速器物理直观：Cartan 公式为什么是辛力学的“保送卡”？</span>
  </div>
  <p>
    在哈密顿力学与储存环束流动力学中，相空间上定义了辛 2-形式 $\\omega$。辛形式处处非退化且是<strong>闭形式</strong>（$d\\omega = 0$）。<br/>
    粒子群在磁聚焦场中沿哈密顿向量场 $X_H$ 演化。若想知道束流在跑了几千万圈之后，相空间的辛面积元会不会被磁铁非线性场扭曲变形？直接应用 Cartan 魔术公式：
    $$\\mathcal{L}_{X_H} \\omega = d(i_{X_H} \\omega) + i_{X_H}(d\\omega) = d(dH) + i_{X_H}(0) = 0 + 0 = 0$$
    第二项因为闭性 $d\\omega=0$ 归零；第一项因为哈密顿流满足 $i_{X_H}\\omega = dH$，代入后变成外微分幂零律 $d(dH) = 0$！<br/>
    <strong>整个李维尔定理与相空间面积守恒，完全由外微分幂零律 $d^2 = 0$ 赋予了绝对保证！</strong>
  </p>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-diff-01',
      title: '证明李导数满足 Cartan 魔术公式并展开为局部坐标张量形式',
      difficulty: 'Advanced',
      statement: '设局部坐标系中，向量场 $X = X^i \\frac{\\partial}{\\partial x^i}$，1-形式 $\\alpha = \\alpha_j dx^j$。请：\n1. 利用内积收缩算子与外微分，按分量严格展开计算 $d(i_X \\alpha) + i_X (d\\alpha)$；\n2. 从李导数的对偶定义 $\\mathcal{L}_X \\langle \\alpha, Y \\rangle = \\langle \\mathcal{L}_X \\alpha, Y \\rangle + \\langle \\alpha, [X, Y] \\rangle$ 出发，推导 $(\\mathcal{L}_X \\alpha)_k$ 的局部坐标显式表达式；\n3. 证明二者完全等价。',
      hints: [
        '第一步：标量函数 $i_X \\alpha = X^k \\alpha_k$，其全微分利用积法则展开。',
        '第二步：计算 $d\\alpha = \\partial_i \\alpha_j dx^i \\wedge dx^j$，内积作用满足 $i_X(dx^i \\wedge dx^j) = X^i dx^j - X^j dx^i$。'
      ],
      solution: `
**【详细解答与严格推导】**：
1. **计算第一项 $d(i_X \\alpha)$**：
   因为 $i_X \\alpha = \\alpha(X) = X^k \\alpha_k$ 是标量函数，其外微分直接为：
   $$d(i_X \\alpha) = \\frac{\\partial(X^k \\alpha_k)}{\\partial x^i} dx^i = \\left( X^k \\frac{\\partial \\alpha_k}{\\partial x^i} + \\alpha_k \\frac{\\partial X^k}{\\partial x^i} \\right) dx^i$$

2. **计算第二项 $i_X (d\\alpha)$**：
   首先计算外微分：$d\\alpha = \\frac{\\partial \\alpha_j}{\\partial x^i} dx^i \\wedge dx^j$。
   内积算子作用于外积：$i_X(dx^i \\wedge dx^j) = (i_X dx^i) dx^j - dx^i (i_X dx^j) = X^i dx^j - X^j dx^i$。
   代入：
   $$i_X(d\\alpha) = \\frac{\\partial \\alpha_j}{\\partial x^i} \\left( X^i dx^j - X^j dx^i \\right) = X^i \\frac{\\partial \\alpha_j}{\\partial x^i} dx^j - X^j \\frac{\\partial \\alpha_j}{\\partial x^i} dx^i$$
   在第一项中，将哑指标交换 $i \\leftrightarrow j$（即 $X^j \\frac{\\partial \\alpha_i}{\\partial x^j} dx^i$）：
   $$i_X(d\\alpha) = \\left( X^j \\frac{\\partial \\alpha_i}{\\partial x^j} - X^j \\frac{\\partial \\alpha_j}{\\partial x^i} \\right) dx^i = \\left( X^k \\frac{\\partial \\alpha_i}{\\partial x^k} - X^k \\frac{\\partial \\alpha_k}{\\partial x^i} \\right) dx^i$$

3. **求和与对消**：
   $$d(i_X \\alpha) + i_X(d\\alpha) = \\left( X^k \\frac{\\partial \\alpha_k}{\\partial x^i} + \\alpha_k \\frac{\\partial X^k}{\\partial x^i} + X^k \\frac{\\partial \\alpha_i}{\\partial x^k} - X^k \\frac{\\partial \\alpha_k}{\\partial x^i} \\right) dx^i$$
   注意第一项中的 $X^k \\frac{\\partial \\alpha_k}{\\partial x^i}$ 与最后一项符号相反，精准抵消！剩下：
   $$d(i_X \\alpha) + i_X(d\\alpha) = \\left( X^k \\frac{\\partial \\alpha_i}{\\partial x^k} + \\alpha_k \\frac{\\partial X^k}{\\partial x^i} \\right) dx^i$$

4. **从李括号展开验证**：
   设 $Y = \\frac{\\partial}{\\partial x^i}$。根据李导数定义：
   $$(\\mathcal{L}_X \\alpha)_i = \\mathcal{L}_X (\\alpha(Y)) - \\alpha([X, Y])$$
   已知标量导数为 $X(\\alpha_i) = X^k \\partial_k \\alpha_i$。
   向量场的李括号 $[X, \\frac{\\partial}{\\partial x^i}] = - \\frac{\\partial X^k}{\\partial x^i} \\frac{\\partial}{\\partial x^k}$。
   代入即得：
   $$(\\mathcal{L}_X \\alpha)_i = X^k \\frac{\\partial \\alpha_i}{\\partial x^k} - \\alpha_k \\left( - \\frac{\\partial X^k}{\\partial x^i} \\right) = X^k \\frac{\\partial \\alpha_i}{\\partial x^k} + \\alpha_k \\frac{\\partial X^k}{\\partial x^i}$$
   两式完全相等，证毕。
      `
    },
    {
      id: 'hw-diff-02',
      title: '辛流形维数的偶数性定理与 Darboux 局部正规坐标系的存在性',
      difficulty: 'Foundational',
      statement: '设 $(M, \\omega)$ 为辛流形，满足 $d\\omega = 0$ 且非退化。证明：\n1. 流形维数 $\\dim M$ 必须为偶数 $2n$；\n2. 为什么存在局部坐标系 $(q^1, \\dots, q^n, p_1, \\dots, p_n)$ 使得辛形式恒能写成标准常数对角块 $\\omega = \\sum_{i=1}^n dq^i \\wedge dp_i$（Darboux 定理物理意义），并与黎曼几何中“存在曲率张量导致度规无法全局对角化”进行深刻对照。',
      hints: [
        '反对称矩阵的行列式满足 $\\det(\\Omega) = (-1)^{\\dim M} \\det(\\Omega)$。',
        '辛流形是否存在类似黎曼曲率的“局域外在曲率不变量”？'
      ],
      solution: `
**【详细解答与步骤】**：
1. **辛流形维数必为偶数的严格代数证明**：
   在切空间 $T_p M$ 的任意一组基底 $\\{e_i\\}_{i=1}^m$ 下，辛 2-形式表现为一个实矩阵 $\\Omega_{ij} = \\omega(e_i, e_j)$。
   因为 $\\omega$ 是反对称 2-形式，所以 $\\Omega_{ji} = -\\Omega_{ij}$，即 $\\Omega^T = -\\Omega$。
   根据矩阵行列式性质：
   $$\\det(\\Omega) = \\det(\\Omega^T) = \\det(-\\Omega) = (-1)^m \\det(\\Omega)$$
   如果维数 $m$ 为奇数，则 $\\det(\\Omega) = - \\det(\\Omega) \\implies 2\\det(\\Omega) = 0 \\implies \\det(\\Omega) = 0$。
   行列式为零意味着存在非零特征向量 $X \\in T_p M, X \\neq 0$，使得 $\\Omega X = 0$，即对任意向量 $Y$ 都有 $\\omega(X, Y) = 0$。这与辛形式的“非退化性公理”发生不可调和的矛盾！
   因此，任何辛流形的维数 $m$ 必须是偶数，记作 $2n$。

2. **Darboux 定理与黎曼几何的根本差异**：
   - **黎曼几何**：度规张量 $g_{ij}(x)$ 受到黎曼曲率张量 $R^i_{\\,jkl}$ 的束缚。如果空间存在局域物理曲率（如爱因斯坦广义相对论时空、二维曲面），我们无法在一个有限局域坐标块内把度规处处变成平直的 Minkowski 或欧氏常数 $\\delta_{ij}$；
   - **辛几何（Darboux 定理）**：对于任何满足 $d\\omega = 0$ 的辛形式，在相空间任何点附近，**总能找到一组局部坐标 $(q^i, p_i)$，使得 $\\omega$ 精确化为标准常数矩阵**：
     $$\\omega = \\sum_{i=1}^n dq^i \\wedge dp_i$$
   - **物理结论**：辛几何中**没有任何“局域曲率不变量”**！所有辛流形在微观局域上全都是完全平坦且同构的。哈密顿力学的非平凡物理全部来自于**哈密顿量函数 $H$ 在相空间上的形状**，以及相空间的**全局宏观拓扑结构**（如闭合轨道与同调环），而不是来自于相空间底层的局域弯曲！
      `
    },
    {
      id: 'hw-diff-03',
      title: '外积分的定向变换与加速器横向相椭圆单粒子发射度守恒',
      difficulty: 'Intermediate',
      statement: '在粒子加速器束流动力学中，束流在横向相空间 $(x, x\') \\in \\mathbb{R}^2$ 的边缘包络由 Courant-Snyder 椭圆方程给出：\n$$\\gamma x^2 + 2\\alpha x x\' + \\beta x\'^2 = \\epsilon$$\n其中 $\\beta\\gamma - \\alpha^2 = 1$。请：\n1. 利用变量替换与外积性质，严格计算该椭圆区域在辛形式 $\\omega = dx \\wedge dx\'$ 下的外积分 $I = \\iint_{\\text{椭圆}} dx \\wedge dx\'$，证明其值恰好为 $\\pi \\epsilon$；\n2. 设粒子经过一段漂移空间（Drift Space）$L$，传输矩阵为 $M = \\begin{pmatrix} 1 & L \\\\ 0 & 1 \\end{pmatrix}$。证明拉回算子 $M^* \\omega = \\omega$，并说明为什么即使相椭圆发生剧烈剪切倾斜，外积分依然严格守恒。',
      hints: [
        '第一步：做线性变换消去交叉项 $x x\'$。利用 $\\beta x\'^2 + 2\\alpha x x\' + \\gamma x^2 = \\frac{1}{\\beta}(\\beta x\' + \\alpha x)^2 + \\frac{\\beta\\gamma - \\alpha^2}{\\beta} x^2$。',
        '令 $u = x / \\sqrt{\\beta}$，$v = (\\alpha x + \\beta x\') / \\sqrt{\\beta}$，计算 $du \\wedge dv$ 与 $dx \\wedge dx\'$ 的关系。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **配方与坐标变换**：
   原椭圆方程可写为：
   $$\\frac{1}{\\beta} (\\alpha x + \\beta x\')^2 + \\frac{\\beta\\gamma - \\alpha^2}{\\beta} x^2 = \\epsilon$$
   因为 $\\beta\\gamma - \\alpha^2 = 1$，化简为：
   $$\\left( \\frac{x}{\\sqrt{\\beta}} \\right)^2 + \\left( \\frac{\\alpha x + \\beta x\'}{\\sqrt{\\beta}} \\right)^2 = \\epsilon$$
   令新变量为：
   $$u = \\frac{x}{\\sqrt{\\beta}}, \\qquad v = \\frac{\\alpha x + \\beta x\'}{\\sqrt{\\beta}}$$
   在 $(u, v)$ 平面中，积分区域变为标准正圆：$u^2 + v^2 \\le \\epsilon$，其半径为 $R = \\sqrt{\\epsilon}$。

2. **计算外代数微元 $du \\wedge dv$**：
   全微分为：
   $$du = \\frac{1}{\\sqrt{\\beta}} dx, \\qquad dv = \\frac{\\alpha}{\\sqrt{\\beta}} dx + \\sqrt{\\beta} dx\'$$
   计算它们的外积：
   $$du \\wedge dv = \\left( \\frac{1}{\\sqrt{\\beta}} dx \\right) \\wedge \\left( \\frac{\\alpha}{\\sqrt{\\beta}} dx + \\sqrt{\\beta} dx\' \\right) = 0 + \\left( \\frac{1}{\\sqrt{\\beta}} \\cdot \\sqrt{\\beta} \\right) dx \\wedge dx\' = dx \\wedge dx\'$$
   **外积微元在这一变换下完全不变！**
   因此，相椭圆的外积分直接等于新变量下圆盘的面积：
   $$I = \\iint_{\\text{椭圆}} dx \\wedge dx\' = \\iint_{u^2 + v^2 \\le \\epsilon} du \\wedge dv = \\pi R^2 = \\pi \\epsilon$$

3. **传输矩阵 $M$ 下的辛不变性**：
   对于漂移空间矩阵 $M = \\begin{pmatrix} 1 & L \\\\ 0 & 1 \\end{pmatrix}$：
   $$x_1 = x_0 + L x\'_0, \\qquad x\'_1 = x\'_0$$
   外微分：$dx_1 = dx_0 + L dx\'_0$，$dx\'_1 = dx\'_0$。
   做外积：
   $$dx_1 \\wedge dx\'_1 = (dx_0 + L dx\'_0) \\wedge dx\'_0 = dx_0 \\wedge dx\'_0 + L (dx\'_0 \\wedge dx\'_0) = dx_0 \\wedge dx\'_0 + 0 = dx_0 \\wedge dx\'_0$$
   因此 $M^* \\omega = \\omega$，即 $M \\in Sp(2, \\mathbb{R})$。
   根据外积分的拉回定理：
   $$\\iint_{M(\\Sigma)} dx_1 \\wedge dx\'_1 = \\iint_{\\Sigma} M^*(dx_1 \\wedge dx\'_1) = \\iint_{\\Sigma} dx_0 \\wedge dx\'_0 = \\pi \\epsilon$$
   **物理意义**：虽然束流在自由漂移中发生了严重的“位置-角散”剪切倾斜（相椭圆被拉长并倾斜），但在由外代数所衡量的典范相空间中，其有向几何面积（发射度）严格保持为常数 $\\pi\\epsilon$！
      `
    }
  ]
};

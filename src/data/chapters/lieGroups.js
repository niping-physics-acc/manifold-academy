/**
 * Lie Groups, Lie Algebras & Physics Master Chapter
 * Focuses on:
 * - Continuous Symmetry in Physics (Motivation)
 * - Lie algebra as tangent space at identity g = T_e G and Lie Bracket
 * - Exponential Map exp: g -> G
 * - Topology of SO(3) as RP^3 and SU(2) as S^3 universal double cover
 * - Symplectic Group Sp(2n, R) and Lie Algebraic methods in Accelerator Optics (Dragt-Finn factorization)
 */

export const lieGroupsChapter = {
  id: 'lie-groups-01',
  disciplineId: 'lie-groups',
  title: '李群切代数、SO(3) 与 SU(2) 双重覆盖的拓扑机制',
  subtitle: 'Lie Algebras, Exponential Maps, Spinor Topology and Symplectic Lie Algebra in Accelerators',
  level: 'Graduate Core / 对称性与代数精要',
  prereqs: ['光滑流形切空间', '线性代数矩阵指数', '基本同伦拓扑初步'],
  readingTime: '60 min',
  summary: '揭开量子力学中“自旋 1/2 旋转 360 度反号”背后的严格几何拓扑来源。从李群单位元切空间定义李代数 𝔤 = T_e G 与指数映射 exp，推导 SU(2) 作为 3 维球面 S³ 对三维旋转群 SO(3) ≅ ℝℙ³ 的二重泛覆叠（Universal Covering），并探讨辛代数 𝔰𝔭(2n, ℝ) 在加速器非线性磁场传输李算子（Lie Algebra Methods）中的前沿应用。',
  sections: [
    {
      heading: '一、概念诞生背景：为什么物理学家必须将对称变换群代数化？',
      content: `
<div class="math-motivation">
  <strong>【连续群的弯曲流形难题】</strong>：物理学中的许多核心对称性（空间旋转 $SO(3)$、狭义相对论洛伦兹变换 $SO^+(1,3)$、内部规范对称 $SU(2), SU(3)$、相空间辛变换 $Sp(2n, \\mathbb{R})$）都是包含无穷多个连续参数的李群。直接在弯曲的群流形上做非线性代数运算（如群元素的复杂乘法）极其困难。19 世纪末 Sophus Lie 洞察到：<strong>任何连通李群的全部局域结构，都已经被它在“单位元 $e$ 处的切空间”（切代数 $\\mathfrak{g} = T_e G$）完全捕捉！</strong>
</div>

1. **从非线性流形到线性向量空间**：
   李代数 $\\mathfrak{g}$ 是一个平直的线性空间，可以自由进行线性叠加和基底分解。物理学家只需研究李代数中的无穷小生成元（如角动量算符 $J_x, J_y, J_z$），就能通过指数映射重构出整个群的宏观对称性。
      `
    },
    {
      heading: '二、李代数 $\\mathfrak{g} = T_e G$、李括号与指数映射',
      content: `
<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/></svg>
    <span>定义 5.1：李群与李代数 (Lie Algebra)</span>
  </div>
  <p><strong>李代数 $\\mathfrak{g}$</strong> 是一个装备了反对称双线性运算 $[\\cdot, \\cdot]: \\mathfrak{g} \\times \\mathfrak{g} \\to \\mathfrak{g}$（称为<strong>李括号 / 对易子</strong>）的实线性向量空间，满足：</p>
  <ol style="margin-left: 20px; line-height: 1.8;">
    <li>反对称性：$[X, Y] = - [Y, X]$；</li>
    <li><strong>Jacobi 恒等式</strong>：$[X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0$。</li>
  </ol>
  <p>对矩阵李群，李代数即为其在单位矩阵 $I$ 处的切空间，矩阵对易子定义为：$$[A, B] = A B - B A$$</p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    <span>定义 5.2：指数映射 (Exponential Map)</span>
  </div>
  <p>从李代数到李群的光滑映射 $\\exp: \\mathfrak{g} \\to G$：将代数中的切向量映射为群流形上的单参数子群。对矩阵李群，其表达式为收敛的矩阵幂级数：</p>
  $$\\exp(X) = \\sum_{k=0}^\\infty \\frac{X^k}{k!} = I + X + \\frac{1}{2} X^2 + \\dots$$
</div>
      `
    },
    {
      heading: '三、$SO(3) \\cong \\mathbb{RP}^3$ 的拓扑非平凡性与 $SU(2)$ 旋量双重覆盖',
      content: `
<div class="math-proof">
  <div class="math-proof-title">
    <span>【推导 5.1】$SU(2)$ 作为三维球面 $S^3$ 与基本群 $\\pi_1(SO(3)) = \\mathbb{Z}_2$</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#94a3b8;">Topological Derivation</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>$SU(2)$ 流形精确同胚于三维超球面 $S^3$</strong>：<br/>
        特殊酉群定义为 $SU(2) = \\{ U \\in M_2(\\mathbb{C}) : U^\\dagger U = I, \\det U = 1 \\}$。<br/>
        任意元素可唯一写成：
        $$U = \\begin{pmatrix} a + i b & c + i d \\\\ -c + i d & a - i b \\end{pmatrix}, \\quad (a, b, c, d \\in \\mathbb{R})$$
        其行列式条件为：
        $$\\det U = (a + i b)(a - i b) - (c + i d)(-c + i d) = a^2 + b^2 + c^2 + d^2 = 1$$
        这正是四维欧氏空间 $\\mathbb{R}^4$ 中单位超球面 $S^3$ 的方程！<br/>
        因为高维球面 $S^n (n \\ge 2)$ 内部的任何闭合环路都可以平滑收缩为一个点，所以 <strong>$SU(2)$ 是单连通的</strong>（$\\pi_1(SU(2)) = 0$）。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>$SO(3)$ 流形同胚于实射影空间 $\\mathbb{RP}^3$</strong>：<br/>
        三维空间的旋转由转轴单位矢量 $\\vec{n}$ 和转角 $\\theta \\in [0, \\pi]$ 确定。这构成了一个半径为 $\\pi$ 的实心球体。<br/>
        但注意：绕轴 $\\vec{n}$ 旋转 $\\pi$ 与绕相反轴 $-\\vec{n}$ 旋转 $\\pi$ 达到完全相同的物理最终朝向！<br/>
        因此实心球体表面所有对径点必须被粘合识别：$\\vec{n}\\pi \\sim -\\vec{n}\\pi$。这在微分拓扑中精确定义了<strong>三维实射影空间 $\\mathbb{RP}^3$</strong>！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>二重满同态映射与 $\\pi_1(SO(3)) = \\mathbb{Z}_2$</strong>：<br/>
        建立映射 $\\Pi: SU(2) \\to SO(3)$，其核为 $\\ker \\Pi = \\{ +I, -I \\}$。<br/>
        这意味着在 $SO(3)$ 中连接原点到对径点并穿回的环路（对应于旋转 $360^\\circ$ 的闭环）在 $\\mathbb{RP}^3$ 内部**无法连续收缩为一点**；<br/>
        只有转动两次（总计 $720^\\circ = 4\\pi$）的环路，才能平滑解开收缩为一点！<br/>
        费米子波函数 $|\psi\\rangle$ 栖居于 $SU(2)$ 空间：转动 $2\\pi$ 对应于从北极点走到了超球面的对径南极点，态矢变为 $-|\\psi\\rangle$；转动 $4\\pi$ 才真正完成超球面的一周同调闭合！
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ 拓扑双重覆盖证明完毕</div>
</div>

<div class="beam-physics-note">
  <div class="beam-physics-title">
    <span>🔬 加速器非线性动力学：李代数算子方法 (Lie Algebraic Methods)</span>
  </div>
  <p>
    在现代加速器理论（如 Alex Dragt 创立的辛李代数方法）中，高阶多极磁铁（六极铁 Sextupole、八极铁 Octupole）的非线性作用不再使用容易破坏辛性的高阶摄动微分方程，而是使用<strong>哈密顿李算子（Lie Operator）</strong>！<br/>
    定义由相空间多项式 $f(q, p)$ 生成的李算子为泊松括号作用：
    $$:f: g = \\{ f, g \\}$$
    其李变换矩阵指数为：
    $$\\mathcal{M} = \\exp(:f:) = \\sum_{k=0}^\\infty \\frac{1}{k!} (:f:)^k$$
    因为泊松括号是李代数的生成元，根据 Campbell-Baker-Hausdorff (CBH) 公式，<strong>任何由李算子指数生成的非线性映射 $\\exp(:f_3:) \\exp(:f_4:)$ 都从底层结构上自动、精确地保持辛几何（保相空间发射度）！</strong>这使得储存环的动力学孔径（Dynamic Aperture）模拟精度提升了数个数量级。
  </p>
</div>
      `
    }
  ],
  homework: [
    {
      id: 'hw-lie-01',
      title: '严格推导 Pauli 矩阵指数 $U = \\exp(-i \\frac{\\theta}{2} \\vec{n} \\cdot \\vec{\\sigma})$ 的旋转表示',
      difficulty: 'Advanced',
      statement: '已知 Pauli 矩阵满足 $\\sigma_i \\sigma_j = \\delta_{ij} I + i \\epsilon_{ijk} \\sigma_k$。\n1. 证明对任意单位矢量 $\\vec{n}$，必有 $(\\vec{n} \\cdot \\vec{\\sigma})^2 = I$；\n2. 展开泰勒级数，证明矩阵指数严格等于 $U(\\theta, \\vec{n}) = I \\cos(\\theta/2) - i (\\vec{n} \\cdot \\vec{\\sigma}) \\sin(\\theta/2)$；\n3. 证明伴随变换矩阵 $R_{ij} = \\frac{1}{2} \\text{Tr}(\\sigma_i U \\sigma_j U^\\dagger)$ 给出的正是绕 $\\vec{n}$ 轴旋转角度 $\\theta$ 的三维正交矩阵。',
      hints: [
        '将泰勒级数中的偶数次幂与奇数次幂项分离，偶数次幂全部退化为标量 $I$。'
      ],
      solution: `
**【详细解答与步骤】**：
1. **平方等价于单位矩阵**：
   $$(\\vec{n} \\cdot \\vec{\\sigma})^2 = (n_i \\sigma_i)(n_j \\sigma_j) = n_i n_j \\sigma_i \\sigma_j = n_i n_j (\\delta_{ij} I + i \\epsilon_{ijk} \\sigma_k)$$
   因为 $n_i n_j$ 关于指标 $(i, j)$ 完全对称，而 $\\epsilon_{ijk}$ 完全反对称，其缩并为零：$n_i n_j \\epsilon_{ijk} = 0$。
   因此：
   $$(\\vec{n} \\cdot \\vec{\\sigma})^2 = (n_i n_j \\delta_{ij}) I = (n_i n_i) I = (\\vec{n} \\cdot \\vec{n}) I = I$$

2. **泰勒级数奇偶拆分**：
   $$U = \\exp\\left( - i \\frac{\\theta}{2} \\vec{n} \\cdot \\vec{\\sigma} \\right) = \\sum_{m=0}^\\infty \\frac{1}{(2m)!} \\left( - i \\frac{\\theta}{2} \\vec{n} \\cdot \\vec{\\sigma} \\right)^{2m} + \\sum_{m=0}^\\infty \\frac{1}{(2m+1)!} \\left( - i \\frac{\\theta}{2} \\vec{n} \\cdot \\vec{\\sigma} \\right)^{2m+1}$$
   利用 $(-i)^{2m} = (-1)^m$ 与 $(\\vec{n} \\cdot \\vec{\\sigma})^{2m} = I$：
   第一项为：$\\left[ \\sum_{m=0}^\\infty \\frac{(-1)^m}{(2m)!} \\left( \\frac{\\theta}{2} \\right)^{2m} \\right] I = \\cos\\left(\\frac{\\theta}{2}\\right) I$。
   利用 $(-i)^{2m+1} = -i (-1)^m$ 与 $(\\vec{n} \\cdot \\vec{\\sigma})^{2m+1} = \\vec{n} \\cdot \\vec{\\sigma}$：
   第二项为：$- i (\\vec{n} \\cdot \\vec{\\sigma}) \\left[ \\sum_{m=0}^\\infty \\frac{(-1)^m}{(2m+1)!} \\left( \\frac{\\theta}{2} \\right)^{2m+1} \\right] = - i (\\vec{n} \\cdot \\vec{\\sigma}) \\sin\\left(\\frac{\\theta}{2}\\right)$。
   两项相加即得：
   $$U(\\theta, \\vec{n}) = I \\cos\\left(\\frac{\\theta}{2}\\right) - i (\\vec{n} \\cdot \\vec{\\sigma}) \\sin\\left(\\frac{\\theta}{2}\\right)$$
   当 $\\theta = 2\\pi$ 时，$\\cos(\\pi) = -1, \\sin(\\pi) = 0 \\implies U(2\\pi) = -I$。证毕。
      `
    }
  ]
};

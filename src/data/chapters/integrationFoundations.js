/** Prerequisites are introduced before their use in geometric integration. */
export const geometryPrerequisites = `
<div class="math-intuition intuition-box">
  <div class="math-intuition-title">本章路线：先区分空间、逐点测量与区域总量</div>
  <p>图卡给点编坐标；切向量描述变化方向；微分形式在一个点接受若干切向量并给出数值。要把这些逐点数值累加成区域总量，还需要一套积分定义。本章不预设已经学过测度论：在 1.5 节完成外代数之后，先用 <a href="#sec-integration-foundations">1.6 节</a> 定义测度与函数积分，再在 <a href="#sec-integration-definition">1.7 节</a> 构造流形上的形式积分。</p>
  <p>“测量尺”在前几节只是线性映射的直观比喻。严格说，<strong>形式接收切向量，测度接收集合，积分接收完整的被积对象与积分区域</strong>，它们的输入与职责不同。</p>
</div>

<details class="proof-card math-definition" id="geometry-topology-prerequisites">
  <summary class="proof-header math-definition-title">基础定义：拓扑、光滑图卡与本章的流形约定（展开）</summary>
  <div class="proof-body">
    <p><strong>拓扑</strong>规定哪些子集叫开集，用它描述点的邻域和连续性。严格地，一族子集构成拓扑，要求空集与全空间属于其中、任意并仍属于其中、有限交仍属于其中。包含点的开集是该点的开邻域。实数空间的标准开集是每点都能放进一个小开球的集合；闭集是开集的补集。</p>
    <p><strong>光滑流形</strong>首先是一个拓扑空间。坐标图 $x:U\\to V$ 把开集 $U\\subset M$ 与欧氏开集 $V\\subset\\mathbb{R}^n$ 连续且一一对应，逆映射也连续（称为同胚）。一族图覆盖 $M$，重叠处的坐标转换及其逆都无限次可微，就组成光滑图册。这里的“局部像欧氏空间”不自动提供距离、角度或体积。</p>
    <p>本章采用通常的两条流形约定：<strong>Hausdorff</strong>指不同点有不相交的开邻域；<strong>第二可数</strong>指存在可数个开集构成的基，使每个开集都是其中一些集合的并。后者让局部图卡能够以可控方式拼接，并与其他流形条件一起保证后面所需的光滑单位分解存在。</p>
    <p><strong>紧致</strong>指每个开覆盖都有有限子覆盖；欧氏空间中它等价于闭且有界。集合的<strong>闭包</strong>是包含它的最小闭集。函数或形式的<strong>支集</strong>是其非零点集的闭包；支集紧致就称为<strong>紧支集</strong>。例如实轴上闭区间是紧集，整个实轴不是。</p>
  </div>
</details>
`;

export const metricPrerequisites = `
<details class="proof-card math-definition" id="geometry-metric-prerequisites">
  <summary class="proof-header math-definition-title">基础定义：度规提供什么额外信息？（展开）</summary>
  <div class="proof-body">
    <p>在 1.2 节定义的每个切空间 $T_pM$ 上，另选一个随点光滑变化的正定、对称双线性映射 $g_p:T_pM\\times T_pM\\to\\mathbb{R}$，就得到<strong>黎曼度规</strong>。它给出向量的长度 $\\|v\\|_g=\\sqrt{g_p(v,v)}$ 和夹角。坐标下 $g_{ij}=g(\\partial_{x^i},\\partial_{x^j})$ 是它的矩阵分量。</p>
    <p>光滑结构本身不选定这样的 $g$。后文说“无度规”，表示那一步构造不需要先选择 $g$；并不表示它没有量纲，也不表示结果只由拓扑决定。由 $g$ 构造区域体积的步骤留到 1.7 节，先不把长度、面积、形式混成同一个概念。</p>
  </div>
</details>
`;

export const integrationFoundationsSection = {
  id: 'sec-integration-foundations',
  number: '1.6',
  heading: '积分的分析基础：测度、可测函数与勒贝格积分',
  content: `
<div class="math-intuition intuition-box">
  <div class="math-intuition-title">动机：把“区域有多大”与“区域上函数有多高”分开</div>
  <p>在熟悉的黎曼和 $\\sum_i f(\\xi_i)\\Delta x_i$ 中，$f(\\xi_i)$ 给出函数值，$\\Delta x_i$ 给出小区间的长度。现代分析把后者推广为<strong>对集合赋予非负大小的规则——测度</strong>，再依据这条规则定义函数的积分。这样，“怎样累计”也成为明确给定的数据。</p>
  <p>本节定义的是函数对测度的积分。它尚未把 1-形式 $dx$ 解释成一个集合大小；前一节的外代数对象保持原有定义。</p>
</div>

<div class="math-definition" id="measure-definition">
  <div class="math-definition-title">一、可测集合与测度</div>
  <p>先给一个集合 $X$，再选一族允许赋予大小的子集，记为 $\\Sigma$。要求 $X\\in\\Sigma$、$A\\in\\Sigma$ 时 $X\\setminus A\\in\\Sigma$、可数个成员的并仍在 $\\Sigma$ 中。这样的集合族叫 <strong>$\\sigma$-代数</strong>；其成员叫<strong>可测集合</strong>。“可数”表示可以按自然数编号；由补集与并的规则也得到对可数交的封闭性。</p>
  <p>在可测集合上定义的<strong>测度</strong>是映射 $\\mu:\\Sigma\\to[0,+\\infty]$，满足 $\\mu(\\varnothing)=0$，以及对两两不相交的 $A_j\\in\\Sigma$：</p>
  $$\\mu\\!\\left(\\bigcup_{j=1}^{\\infty}A_j\\right)
    =\\sum_{j=1}^{\\infty}\\mu(A_j).$$
  <p>这叫<strong>可数可加性</strong>：互不重叠的部分合起来，总大小等于各部分大小之和。三元组 $(X,\\Sigma,\\mu)$ 称为测度空间。测度可以等于无穷，但没有负值或定向符号。</p>
  <p>拓扑的开集族与 $\\sigma$-代数职责不同：前者描述邻域，后者规定哪些集合允许测量。由全部开集生成的最小 $\\sigma$-代数叫<strong>Borel 集族</strong>；其中含开集、闭集以及它们的可数并交。后面光滑函数和紧支集所涉及的这些集合都可以测量。</p>
</div>

<div class="math-definition" id="lebesgue-measure-definition">
  <div class="math-definition-title">二、勒贝格测度：把矩形体积扩展到更多集合</div>
  <p>在 $\\mathbb{R}^n$ 中，本章采用的标准测度是<strong>勒贝格测度</strong> $\\lambda^n$。它在矩形上满足</p>
  $$\\lambda^n\\!\\left(\\prod_{i=1}^n[a_i,b_i]\\right)
    =\\prod_{i=1}^n(b_i-a_i),\\qquad a_i\\leq b_i.$$
  <p>$n=1$ 时给区间长度，$n=2$ 时给平面面积，$n=3$ 时给空间体积。它平移不变，且包含全部 Borel 集；其定义域还包含零测 Borel 集的所有子集。下方给出一个不依赖微分形式的精确定义。</p>
  <p>若 $\\lambda^n(A)=0$，称 $A$ 为<strong>零测集</strong>。例如单点在 $\\mathbb{R}$ 中的长度为零；这并不是说单点不存在。可数个点组成的集合也为零测集，由可数可加性得到。</p>
</div>

<details class="proof-card math-proof">
  <summary class="proof-header math-proof-title">构造卡片：怎样从矩形真正定义勒贝格测度？（展开）</summary>
  <div class="proof-body">
    <details class="proof-step">
      <summary><strong>步骤 1：先用覆盖定义任意集合的外测度</strong></summary>
      <p>对任意 $E\\subset\\mathbb{R}^n$，用可数个有界开矩形 $Q_j=\\prod_i(a_{ji},b_{ji})$ 覆盖它，定义</p>
      $$\\lambda^{n,*}(E):=\\inf\\left\\{
        \\sum_{j=1}^{\\infty}\\prod_{i=1}^n(b_{ji}-a_{ji})
        \\;:\\;E\\subset\\bigcup_{j=1}^{\\infty}Q_j\\right\\}.$$
      <p>$\\inf$ 是所有覆盖总体积的下确界，即最大的共同下界。先从外部尽可能紧地覆盖，再取这些总体积能逼近的最低值。外测度对所有子集有定义，但不能直接假定它对所有子集都可数可加。</p>
    </details>
    <details class="proof-step">
      <summary><strong>步骤 2：挑出切分任意集合时不会破坏大小相加的集合</strong></summary>
      <p>定义 $A$ 为勒贝格可测，当且仅当对每个 $E\\subset\\mathbb{R}^n$ 都有</p>
      $$\\lambda^{n,*}(E)=\\lambda^{n,*}(E\\cap A)
        +\\lambda^{n,*}(E\\setminus A).$$
      <p>这些 $A$ 构成的集合族记为 $\\mathcal{L}^n$，并定义 $\\lambda^n(A):=\\lambda^{n,*}(A)$。外测度构造定理保证 $\\mathcal{L}^n$ 是 $\\sigma$-代数，限制后的 $\\lambda^n$ 满足可数可加性，并给出上述矩形体积。这里采用这条实分析构造定理，不把它当成外积的性质。</p>
    </details>
  </div>
</details>

<div class="math-definition" id="lebesgue-integral-definition">
  <div class="math-definition-title">三、函数积分的严格定义：简单函数 → 非负函数 → 可积实函数</div>
  <p>函数 $f:X\\to[-\\infty,+\\infty]$ 称为<strong>可测</strong>，如果对每个实数 $t$，集合 $\\{p:f(p)>t\\}$ 都在 $\\Sigma$ 中。这里允许函数取无穷值；连续实函数在 Borel 集族上可测，因此本章随后使用的光滑坐标系数满足这个要求。</p>
  <p>集合 $A$ 的<strong>示性函数</strong> $\\mathbf{1}_A$ 在 $A$ 内取 $1$，在外取 $0$。只取有限多个值的可测函数叫<strong>简单函数</strong>。把非负简单函数写为 $s=\\sum_{j=1}^m c_j\\mathbf{1}_{A_j}$，其中 $A_j$ 两两不相交、$c_j\\geq0$，规定</p>
  $$\\int_X s\\,d\\mu:=\\sum_{j=1}^m c_j\\mu(A_j),
    \\qquad 0\\cdot(+\\infty):=0.$$
  <p>对非负可测函数 $f$（允许取 $+\\infty$），定义它的积分为所有不超过它的非负简单函数积分的上确界：</p>
  $$\\boxed{\\int_X f\\,d\\mu:=
    \\sup\\left\\{\\int_X s\\,d\\mu:
    s\\text{ 为非负简单函数},\\;0\\leq s\\leq f\\right\\}.}$$
  <p>$\\sup$ 是这些数的最小共同上界，积分值允许为 $+\\infty$。对实值可测函数，令 $f^+=\\max(f,0)$、$f^-=\\max(-f,0)$。若 $\\int_X|f|\\,d\\mu\\lt\\infty$，称 $f$ <strong>可积</strong>，并定义</p>
  $$\\int_X f\\,d\\mu:=\\int_X f^+\\,d\\mu-\\int_X f^-\\,d\\mu.$$
  <p>积分记号 $\\int_A f\\,d\\mu$ 表示 $\\int_X\\mathbf{1}_A f\\,d\\mu$。这里 $d\\mu$ 表示所采用的测度，不是给 $\\mu$ 施加外微分，也不是一个无穷小数。对 $\\mu=\\lambda^n$，这就是<strong>勒贝格积分</strong>。有界矩形上黎曼可积的函数也勒贝格可积，两者数值相同；光滑紧支集系数属于这种熟悉的情形。</p>
</div>

<details class="proof-card math-proof">
  <summary class="proof-header math-proof-title">算例卡片：函数不变，换掉测度会怎样？（展开）</summary>
  <div class="proof-body">
    <p>在 $X=[0,1]$ 上取 $f\\equiv1$，标准长度测度给出 $\\int_X1\\,d\\lambda^1=1$。若改选 $\\nu(A)=2\\lambda^1(A)$，则 $\\int_X1\\,d\\nu=2$。测度是定义积分所需的数据，不能只写出函数就宣称总量唯一。</p>
    <p>更一般地，若先给非负可测函数 $r$，可定义新测度 $\\nu(A):=\\int_A r\\,d\\mu$。这时称 $r$ 为 $\\nu$ 相对于 $\\mu$ 的<strong>密度函数</strong>：它表示相对于原测量规则的局部权重。这里的“密度”依赖参考测度；后面流形上的<strong>几何密度</strong>是另一种需单独定义的对象。</p>
  </div>
</details>

<div class="math-definition" id="measure-change-of-variables">
  <div class="math-definition-title">四、后面要用的分析定理：换元</div>
  <p>设 $h:E\\to D$ 是两个欧氏开集之间的光滑一一对应，逆映射也光滑；$Dh(v)$ 是它的导数矩阵（雅可比矩阵）。对 $D$ 上可积函数 $a$，勒贝格换元定理为</p>
  $$\\int_D a(u)\\,d\\lambda^n(u)
    =\\int_E a(h(v))|\\det Dh(v)|\\,d\\lambda^n(v).$$
  <p>绝对值反映测度对区域大小取非负值，即使 $a$ 本身可正可负。形式的外积变换产生带符号的行列式，下一节将借助定向把两者连接起来。本章使用这个分析定理来证明形式积分坐标无关，不反过来用尚未定义的形式积分证明它。</p>
</div>

<div class="math-intuition intuition-box">
  <div class="math-intuition-title">进入下一节前，检查对象的输入</div>
  <p>$\\mu(A)$ 的输入是可测集合；$\\alpha_p(v)$ 的输入是点 $p$ 处的切向量；$\\int_X f\\,d\\mu$ 的输入是函数与测度空间。三者已经分别定义。<a href="#sec-integration-definition">1.7 节</a> 接下来定义如何把形式与有向流形配对，并证明这个定义不依赖坐标。</p>
</div>

<p class="math-motivation">分析基础参考：<a href="https://ocw.mit.edu/courses/18-125-measure-and-integration-fall-2003/pages/lecture-notes/" target="_blank" rel="noopener noreferrer">MIT 18.125 Measure and Integration，讲义 1–9</a>（可测集合、函数积分及勒贝格测度的构造）。</p>
`
};

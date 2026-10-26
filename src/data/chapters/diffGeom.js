import { integrationDefinitionSection } from './integrationDefinition.js';
import { geometryPrerequisites, metricPrerequisites, integrationFoundationsSection } from './integrationFoundations.js';

/**
 * Modern Differential Geometry Master Chapter
 * Fully hierarchical, graduate-level geometric theoretical physics & beam dynamics.
 * 
 * Step-by-step cognitive progression:
 * 1.1 现代几何动机与概念基石 (流形、图卡与内蕴几何)
 * 1.2 切空间 T_pM：切向量作为方向导数算子 (Derivation)
 * 1.3 余切空间 T_p^*M：微分 1-形式作为几何测量尺
 * 1.4 向量丛与截面空间 Γ：从“点”到“场” (底流形、纤维、总空间与场化算子 Γ)
 * 1.5 外代数 (Exterior Algebra)：交替多线性形式与逐点有向测量
 * 1.6 积分的分析基础 (可测集合、测度、简单函数与勒贝格积分)
 * 1.7 现代微分几何中的积分定义 (拉回、单位分解、坐标无关性与几何密度)
 * 1.8 外微分算子 d 与拓扑幂零律：d² = 0 严格证明 (闭形式、恰当形式与 ∂²=0 对偶)
 * 1.9 广义 Stokes 定理 (形式阶数、积分域维数与边界)
 * 1.10 李导数 L_X 与 Cartan 魔术公式严密推导 (流线、拉回、内积收缩与相流保辛性)
 */

export const diffGeomChapter = {
  id: 'diff-geom-01',
  disciplineId: 'diff-geom',
  title: '微分流形、外微积分与李导数几何图景',
  subtitle: 'Coordinate-Free Geometry: Manifolds, Bundles, Sections, Exterior Algebra, Integration & Cartan Calculus',
  level: 'Graduate Core / 现代几何根基',
  prereqs: ['多变量微积分（含黎曼积分）', '线性代数与对偶空间', '极限与基础集合语言'],
  readingTime: '100 min',
  summary: '先由流形、切空间、余切空间与向量丛建立逐点几何语言，再定义外代数中的有向多重线性测量。随后补齐可测集合、测度与勒贝格积分，用拉回和单位分解严格构造流形上的形式积分，证明坐标无关性，区分形式、密度与度规体积。最后研究外微分、Stokes 定理及 Cartan 公式，并连接物理中的做功、通量与相空间守恒。',
  sections: [
    {
      id: 'sec-1',
      number: '1.1',
      heading: '概念诞生背景与初学者基石：什么是流形、图卡与内蕴几何？',
      content: `
${geometryPrerequisites}
<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 零门槛基石：什么是“流形 (Manifold)”与“图卡 (Chart)”？</span>
  </div>
  <p>
    初学者第一次接触微分几何，往往被“流形”、“坐标卡”等抽象名词困扰。其实它们的物理直观非常亲切：
  </p>
  <div class="primer-grid">
    <div class="primer-card">
      <div class="primer-card-title">🌐 1. 流形 (Manifold) —— 局部像平地，整体很奇妙</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        站在地面上看，四周是平坦的二维平面 $\\mathbb{R}^2$（所以古人以为天圆地方）；但当你走遍全球，会发现它是一个闭合的二维球面 $S^2$。<strong>流形就是任何“局部微观具有平坦欧氏空间性质，但宏观整体可能弯曲、闭合或扭曲的几何空间”</strong>。例如：物理时空、环形加速器真空室（甜甜圈环面 $T^2$）、质点系统的位形空间 $Q$。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🗺️ 2. 图卡 (Chart) 与图册 (Atlas) —— 世界地图集隐喻</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        你不可能把整个地球表面毫无形变、不撕裂地画在一张平面纸上。地理学家的做法是编制一本<strong>《世界地图册 (Atlas)》</strong>：每一页是一张局部的地图（中国地图、日本地图），每一张局部地图就是一个<strong>图卡 (Coordinate Chart)</strong>，为局部区域的点赋予实数坐标 $(x^1, \\dots, x^n)$。在两张地图重合的重叠区，坐标变换必须是平滑无撕裂的（$C^\\infty$），这就是<strong>光滑流形</strong>。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🐜 3. 内蕴几何 (Intrinsic) —— 蚂蚁的视角</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        一只生活在二维弯曲纸面上的蚂蚁，并不需要知道外部“三维空间”的存在。只要它在纸面上测量距离、光线弯曲与角度变化，就能感知空间的几何属性。这就是<strong>内蕴几何</strong>：物理定律不应依赖于外部虚拟高维空间，也不应依赖于人为选择的局部坐标系。
      </p>
    </div>
  </div>
</div>

<div class="math-motivation">
  <strong>【为什么传统三维矢量微积分必须被重构？】</strong>：在初等力学中，物理量通常表达为直角坐标 $(x, y, z)$ 下的分量。然而走向复杂系统（加速器弯转磁铁轨道、相对论时空、分析力学相空间）时，暴露出三大根本硬伤：
</div>

1. **依赖平直欧氏度规的假象**：
   三维旋度 $\\nabla \\times \\vec{v}$ 只能在三维空间定义（两矢量叉乘在 $n \\neq 3$ 维中根本不是矢量，而是反对称张量！）。传统微积分将“速度矢量”与“力的梯度”混同为带箭头的几何对象，掩盖了**切向量（速度流）**与**余切向量（等高线测量网）**的本质对偶。

2. **坐标系变换下的冗长混淆**：
   在带电粒子加速器中，粒子沿弯曲设计轨道（Frenet-Serret 曲线坐标系 $(x, y, s)$）运动。旧框架下每次换坐标系都必须重新计算冗长的 Christoffel 符号。物理定律（如无荷麦克斯韦方程、哈密顿相流保体积）绝不可能因我们选了极坐标还是直角坐标而发生实质改变。

3. **现代物理的解决方案——无坐标语言**：
   空间是一个光滑流形 $M$，物体运动取决于流形本身的内蕴微分结构。所有物理方程写成**无坐标（Coordinate-Free）**的外微分形式等式。选定局部图卡后，自动且精确地退化为偏导数。
      `
    },
    {
      id: 'sec-2',
      number: '1.2',
      heading: '切空间 $T_pM$：切向量作为方向导数算子 (Derivation)',
      content: `
<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 零门槛基石：什么是“函数芽 (Germs)”与“切空间”？</span>
  </div>
  <p>
    • <strong>不要被“函数芽空间 $C^\\infty(p)$”的术语吓退！</strong> 在物理大白话里，它指的就是<strong>“定义在点 $p$ 极小微观邻域内的任意光滑实数物理场”</strong>（例如温度场 $T(x)$、静电势 $\\phi(x)$、重力势能等）。我们只关心物理场在点 $p$ 处的导数和局域性质，根本不关心它在宇宙边缘的行为；<br/>
    • <strong>切空间 $T_pM$</strong>：在流形上的某一个固定点 $p$，所有可能穿过该点的粒子轨道所具有的“速度矢量”汇集在一起，构成的 $n$ 维平坦向量空间。
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
    <span>定义 1.1：光滑流形与切向量的导数定义 (Derivation)</span>
  </div>
  <p>设 $M$ 为 $n$ 维光滑流形，$p \\in M$。流形上点 $p$ 处的<strong>切向量 $X_p$</strong>，定义为一个作用在点 $p$ 局域光滑标量函数芽空间 $C^\\infty(p)$ 上的<strong>实线性泛函</strong>：</p>
  $$X_p: C^\\infty(p) \\to \\mathbb{R}$$
  <p>且对任意 $f, g \\in C^\\infty(p)$，满足 <strong>Leibniz 乘积法则（导数性质）</strong>：</p>
  $$X_p(f g) = f(p) X_p(g) + g(p) X_p(f)$$
  <p>点 $p$ 处所有满足上述条件的导数算子构成的集合称为流形在点 $p$ 的<strong>切空间（Tangent Space）</strong>，记为 $T_p M$。</p>
</div>

<div class="math-proof" style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(56, 189, 248, 0.35); margin-top: 16px;">
  <div class="math-proof-title">
    <span>【核心定理 1.0】为什么无穷维函数空间上的算子集 $T_p M$ 恰好是 $n$ 维线性空间？</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#38bdf8;">Hadamard Lemma & Basis Theorem</span>
  </div>
  <p style="font-size:0.9rem; color:#cbd5e1; margin-bottom:12px;">
    <strong>深刻质疑</strong>：$C^\\infty(p)$（点 $p$ 附近的光滑函数空间）明明是<strong>无穷维</strong>的！定义在其上的线性泛函也是无穷维的。凭什么仅仅加上一条 Leibniz 乘积法则，$T_p M$ 的维数就坍缩成了有限的流形维数 $n$？这不是“显然的公理”，而是一个依赖<strong>莱布尼茨高阶抹杀机制</strong>与<strong>Hadamard 引理</strong>的严密定理：
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>第一步：验证线性空间结构与“杀死常数”性质</strong>：<br/>
        若 $X_p, Y_p \\in T_p M$，直接验证可知线性组合 $(a X_p + b Y_p)$ 仍满足实线性与 Leibniz 律，故 $T_p M$ 是实线性空间。<br/>
        进一步，将恒等于 $1$ 的常数函数代入 Leibniz 律：$X_p(1) = X_p(1 \\cdot 1) = 1 \\cdot X_p(1) + 1 \\cdot X_p(1) = 2 X_p(1) \\implies X_p(1) = 0$。由线性性，对任意常数 $c \\in \\mathbb{R}$，必有：
        $$X_p(c) = c X_p(1) \\equiv 0 \\quad (\\text{零阶常数项被完全抹杀})$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>第二步：Leibniz 律的“高阶无穷小处决机制”</strong>：<br/>
        设 $h_1, h_2 \\in C^\\infty(p)$ 是在点 $p$ 取值为零的两个函数，即 $h_1(p) = 0, \\; h_2(p) = 0$（代表一阶及以上无穷小量）。对它们的乘积作用 $X_p$：
        $$X_p(h_1 h_2) = h_1(p) X_p(h_2) + h_2(p) X_p(h_1) = 0 \\cdot X_p(h_2) + 0 \\cdot X_p(h_1) \\equiv 0$$
        <span style="color:#38bdf8;"><strong>核心洞察</strong>：任何两个在 $p$ 点为零的函数之积（即泰勒展开中所有二次项 $(x-p)^2$、三次项及一切高阶余项），在 Leibniz 算子 $X_p$ 面前<strong>全军覆没、精确归零</strong>！$X_p$ 只对函数在 $p$ 点的<strong>一阶线性斜率</strong>敏感！</span>
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>第三步：Hadamard 引理（带光滑余项的精确一阶展开）</strong>：<br/>
        在点 $p$ 附近取局部坐标 $(x^1, \\dots, x^n)$，记 $p$ 点坐标为 $a = (a^1, \\dots, a^n)$。对任意 $f \\in C^\\infty(p)$，利用微积分基本定理沿连线 $t \\in [0, 1]$ 积分：
        $$f(x) - f(a) = \\int_0^1 \\frac{d}{dt} f\\big(a + t(x-a)\\big) dt = \\sum_{i=1}^n (x^i - a^i) \\underbrace{\\int_0^1 \\frac{\\partial f}{\\partial x^i}\\big(a + t(x-a)\\big) dt}_{:= g_i(x) \\in C^\\infty(p)}$$
        其中 $g_i(a) = \\left.\\frac{\\partial f}{\\partial x^i}\\right|_p$。将 $g_i(x)$ 拆分为常数主部与在 $p$ 点为零的余部 $\\tilde{g}_i(x) := g_i(x) - g_i(a)$（满足 $\\tilde{g}_i(a) = 0$），得到<strong>无截断误差的精确恒等式</strong>：
        $$f(x) = \\underbrace{f(a)}_{\\text{常数}} + \\sum_{i=1}^n \\left.\\frac{\\partial f}{\\partial x^i}\\right|_p (x^i - a^i) + \\sum_{i=1}^n \\underbrace{(x^i - a^i) \\tilde{g}_i(x)}_{\\text{两个在 } p \\text{ 点为 0 的函数之积}}$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>第四步：作用 $X_p$ 并导出 $n$ 维基底展开</strong>：<br/>
        对上述恒等式两边同时作用任意切向量 $X_p \\in T_p M$：常数项被第一步抹杀，二次乘积余项被第二步抹杀，唯有中间的一阶项存活：
        $$X_p(f) = 0 + \\sum_{i=1}^n \\left.\\frac{\\partial f}{\\partial x^i}\\right|_p X_p(x^i - a^i) + 0 = \\sum_{i=1}^n \\underbrace{X_p(x^i)}_{:= v^i \\in \\mathbb{R}} \\left.\\frac{\\partial f}{\\partial x^i}\\right|_p$$
        由于 $f$ 是任意光滑函数，这证明了任意抽象导数算子 $X_p$ 都可以唯一表为 $n$ 个偏导算子的线性组合：
        $$X_p = \\sum_{i=1}^n v^i \\left.\\frac{\\partial}{\\partial x^i}\\right|_p, \\quad v^i = X_p(x^i)$$
        <span style="color:#38bdf8;"><strong>自由度剖析（为什么恰好是 $n$ 个自由度？）</strong>：在构造切向量 $X_p$ 时，这 $n$ 个实数 $(v^1, \\dots, v^n) = \\big(X_p(x^1), \\dots, X_p(x^n)\\big) \\in \\mathbb{R}^n$ <strong>是可以完全任意、彼此独立选取的</strong>（因为对任意给定的一组实数 $v^i$，算子 $\\sum_i v^i \\left.\\frac{\\partial}{\\partial x^i}\\right|_p$ 天然满足线性与 Leibniz 律，且作用在 $x^j$ 上恰好还原出 $v^j$）；但<strong>一旦你选定了它在 $n$ 个坐标函数 $x^i$ 上的取值，$X_p$ 在宇宙间所有其他光滑函数 $f$ 上的取值就不再有任何自由度，被完全锁死！</strong></span><br/>
        最后验证线性无关：若 $\\sum_i v^i \\left.\\frac{\\partial}{\\partial x^i}\\right|_p = 0$，将其作用于坐标函数 $x^j$ 即得 $v^j = 0$。因此 $\\left\\{ \\left.\\frac{\\partial}{\\partial x^1}\\right|_p, \\dots, \\left.\\frac{\\partial}{\\partial x^n}\\right|_p \\right\\}$ 构成 $T_p M$ 的一组基，<strong>$\\dim T_p M = n$ 严格得证！</strong>
      </div>
    </div>
  </div>
  <div class="qed-symbol">■ Q.E.D.</div>
</div>

<div class="math-proof" style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(56, 189, 248, 0.35); margin-top: 16px;">
  <div class="math-proof-title">
    <span>🔍 灵魂追问：在莱布尼茨代数证明中，究竟是哪一步要求方向导数必须拘束在“切平面”内？</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#38bdf8;">Why Leibniz Rule Forces Tangency</span>
  </div>
  <p style="font-size:0.9rem; color:#cbd5e1; margin-bottom:12px;">
    <strong>极易被忽略的盲点</strong>：回看上面定理 1.0 的整套代数推导，我们只用了线性性和莱布尼茨法则 $X_p(fg) = f(p)X_p(g) + g(p)X_p(f)$，表面上似乎完全没提“切平面”或“禁止指向法线方向”。<strong>那究竟是哪一步暗中把 $X_p$ 的方向死死按在了流形的切平面内？</strong><br/>
    答案可以从<strong>内蕴定义域</strong>与<strong>外围嵌入约束</strong>两个视角彻底看穿（其中第二个视角堪称微分几何最震撼的代数奇迹）：
  </p>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>视角一（内蕴视角）：紧箍咒藏在输入函数的定义域 $C^\\infty(M)$ 与第三步的坐标个数 $n$ 里！</strong><br/>
        • 注意定义 1.1 中算子 $X_p : C^\\infty(p) \\to \\mathbb{R}$ 吃进肚子的函数 $f \\in C^\\infty(M)$，<strong>仅仅定义在 $n$ 维流形 $M$ 本身之上</strong>，压根不存在“流形外面的函数值”！<br/>
        • 当我们在第三步（Hadamard 引理）使用局部图卡 $\\phi(q) = (x^1, \\dots, x^n) \\in \\mathbb{R}^n$ 展开 $f$ 时，这 $n$ 个坐标 $(x^1, \\dots, x^n)$ 是<strong>顺着流形内部贴的 $n$ 个内蕴参数</strong>（例如二维球面上的经纬度 $(\\theta, \\phi)$）。因为 $f$ 在流形法向（如球面半径 $r \\neq 1$ 处）根本没有定义，你连法向差分 $\\frac{f(r+\\epsilon)-f(r)}{\\epsilon}$ 都写不出来，所以展开式天然只有流形内部的 $n$ 个方向 $\\frac{\\partial}{\\partial x^1}, \\dots, \\frac{\\partial}{\\partial x^n}$！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>视角二（外围空间嵌入视角 —— 莱布尼茨法则如何自动杀死法向分量？）：</strong><br/>
        有人会问：<em>“如果我把二维球面 $S^2$ 嵌在三维空间 $\\mathbb{R}^3$ 中（方程为 $x^2 + y^2 + z^2 = 1$），强行用外围的 3 个笛卡尔坐标 $(x, y, z)\\big|_{S^2} \\in C^\\infty(S^2)$ 放进莱布尼茨算子 $X_p$ 里，为什么 $\\big(X_p(x), X_p(y), X_p(z)\\big)$ 不会指向球面外的法线方向？”</em><br/>
        请看<strong>第一步（杀死常数 $X_p(c) = 0$）与莱布尼茨法则的联手绝杀</strong>：<br/>
        • 考虑外围三维空间的函数 $G(x,y,z) = x^2 + y^2 + z^2$。当限制在二维球面 $S^2$ 上时，<strong>$G\\big|_{S^2} = x^2 + y^2 + z^2 \\equiv 1$ 是球面 $S^2$ 上的一个常数函数！</strong><br/>
        • 既然 $x^2 + y^2 + z^2 = 1$ 在 $C^\\infty(S^2)$ 中等于常数 $1$，我们把任意满足莱布尼茨律的算子 $X_p$ 作用在这个恒等式两边：<br/>
        ① <strong>等式右边（由证明第一步：常数导数必为 0）</strong>：
        $$X_p(1) = 0$$
        ② <strong>等式左边（对 $x \\cdot x + y \\cdot y + z \\cdot z$ 直接使用莱布尼茨乘积法则）</strong>：
        $$X_p(x^2 + y^2 + z^2) = 2x(p)\\,X_p(x) + 2y(p)\\,X_p(y) + 2z(p)\\,X_p(z)$$
        • 令左右两边相等，莱布尼茨法则<strong>当场自动导出正交方程</strong>：
        $$2x(p)\\,X_p(x) + 2y(p)\\,X_p(y) + 2z(p)\\,X_p(z) = 0 \\quad \\Longleftrightarrow \\quad \\underbrace{\\nabla G(p)}_{\\text{曲面法向量 } \\vec{n}_p} \\cdot \\underbrace{\\big(X_p(x),\\, X_p(y),\\, X_p(z)\\big)}_{\\text{导子在 } \\mathbb{R}^3 \\text{ 中的方向矢量 } \\vec{v}} = 0 \\; !!$$
        <span style="color:#38bdf8;"><strong>醍醐灌顶的结论</strong>：正是<strong>定理证明的第一步 $X_p(\\text{常数}) = 0$ 结合莱布尼茨法则</strong>！因为定义流形的约束方程 $G(x,y,z) = c$ 在流形上恒为常数，任何作用在 $C^\\infty(M)$ 上的莱布尼茨导子 $X_p$ 作用在约束函数 $G$ 上必须得 $0$，而 $X_p(G) = \\nabla G(p) \\cdot \\vec{v} = 0$ 恰恰就是<strong>“方向矢量 $\\vec{v}$ 必须与曲面法向量 $\\vec{n}_p = \\nabla G(p)$ 严格垂直（即 100% 拘束在切平面内）”</strong>的充要条件！</span>
      </div>
    </div>
  </div>
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
<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 零门槛基石：什么是“对偶空间 (Dual Space)”与“1-形式”？</span>
  </div>
  <p>
    • <strong>对偶空间（Dual Space）</strong>：线性代数中的对偶，就是“把向量变成纯数字的线性测量仪器”。例如，向测功仪输入一个速度向量 $\\vec{v}$，测功仪输出一个实数（单位时间做功功率 $P = \\vec{F} \\cdot \\vec{v}$）。所有这种线性测量仪器的集合，就是切空间的对偶空间，称为<strong>余切空间 $T_p^*M$</strong>；<br/>
    • <strong>余向量与 1-形式场</strong>：余切空间中的一个元素是单点余向量；在各点光滑地选取余向量，得到 1-形式场。把它想成“刻度尺”，是指它对一个切方向线性求值，而不是已经给某段曲线赋予长度。
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/></svg>
    <span>定义 1.2：余切空间与微分 1-形式 (Differential 1-Forms)</span>
  </div>
  <p>流形在点 $p$ 处的<strong>余切空间 $T_p^* M$</strong> 定义为切空间 $T_p M$ 的代数<strong>对偶空间（Dual Vector Space）</strong>：</p>
  $$T_p^* M = \\text{Hom}_\\mathbb{R}(T_p M, \\mathbb{R}) = \\{ \\alpha_p: T_p M \\to \\mathbb{R} \\mid \\alpha_p \\text{ 为实线性泛函} \\}$$
  <p>它作用于切向量 $X_p$ 产生一个无坐标的实数：$\\langle \\alpha_p, X_p \\rangle = \\alpha_p(X_p) \\in \\mathbb{R}$。</p>
  <p>对光滑实函数 $f$，定义 $(df)_p(X_p):=X_p(f)$。特别地，坐标函数 $x^i$ 的微分满足 $(dx^i)_p(X_p)=X_p(x^i)$。因此 $dx^i$ 测量的是<strong>坐标沿切方向的变化率</strong>；它不是两个点的坐标差，也不是一个区间的长度。若把各点余向量光滑地连成场，就得到后面要在曲线上积分的 1-形式。</p>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 物理直观：动量形式与做功形式接受什么输入？</span>
  </div>
  <p>
    给一条粒子轨道，它在点 $p$ 的切向量代表瞬时速度。设 $q^i$ 是局部位形坐标，$F_i$ 是广义力分量，则<strong>做功 1-形式</strong> $\\alpha=\\sum_i F_i\\,dq^i$ 接受这个速度，输出瞬时功率；沿轨道积分后才得到功。动量分量 $p_i$ 也要组合为 $\\theta=\\sum_i p_i\\,dq^i$ 才是完整的动量 1-形式，而不能把单个系数 $p_i$ 本身叫作 1-形式。
    <br/>• $df$ 可以用函数 $f$ 的等值面作直观图像；一般 1-形式未必是某个函数的全微分，不预设它具有全局等值面图像。
    <br/>• 非保守力的做功形式不能直接写成某个全局功函数的 $dW$；“局部线性测量”与“存在原函数”是两个不同要求。
    <br/>• 局部坐标下，$dx^i$ 对坐标切基的求值为：
    $$\\langle dx^i, \\frac{\\partial}{\\partial x^j} \\rangle = \\delta^i_j$$
    • 标量场 $f$ 的全微分 $df$ 正是天然的 1-形式：$df = \\frac{\\partial f}{\\partial x^i} dx^i$。对任意切向量 $X$，作用结果 $df(X) = X(f)$ 就是该方向上的方向导数！沿整条路径累计的定义将在 1.6–1.7 节给出。
  </p>
</div>
${metricPrerequisites}
      `
    },
    {
      id: 'sec-4',
      number: '1.4',
      heading: '向量丛与截面空间 $\\Gamma$：从单点的切/余切空间，到遍布全流形的“场”',
      content: `
<div class="math-motivation">
  <strong>【认知承上启下：为什么在弯曲流形上定义“场”这么麻烦？】</strong><br/>
  在第 1.2 与 1.3 节中，我们只研究了流形上<strong>单个孤立点 $p$</strong> 处的切空间 $T_pM$ 与余切空间 $T_p^*M$。而在物理学中，我们需要的是<strong>遍布整个空间的连续物理场</strong>（如全球风速场、电磁场）。<br/>
  在平直欧氏空间 $\\mathbb{R}^3$ 中，所有点的切空间都可以平移重合，所以向量场可以直接写成映射 $\\vec{v}: \\mathbb{R}^3 \\to \\mathbb{R}^3$。但在弯曲流形（如地球表面 $S^2$）上，<strong>东京地面上的切平面 $T_{\\text{东京}}S^2$ 与纽约地面上的切平面 $T_{\\text{纽约}}S^2$ 是倾斜方向完全不同的两个独立空间！</strong>点 $p$ 处的速度向量 $v(p)$ 只能住在它自己专属的切空间 $T_pM$ 里——<strong>映射的“靶空间”随着自变量 $p$ 的移动而在不断改变！</strong>为了严格处理这种“每个点各自顶着一个专属向量空间”的几何结构，数学家建立了<strong>向量丛 (Vector Bundle)</strong> 与<strong>截面 (Section)</strong>。
</div>

<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 第一步：先破除最大误区 —— 一个总空间里到底装了什么纤维？</span>
  </div>
  <p style="margin-bottom: 12px;">
    初学者最容易混淆的问题是：<strong>“总空间 $E$ 打包的纤维，是把切纤维和余切纤维全塞在一起，还是只装其中一种？”</strong><br/>
    答案是：<strong style="color:#38bdf8;">每一个具体的向量丛，严格只打包同一种类型的纤维！（“一丛一世界，各司其职，绝不混装”）</strong><br/>
    “向量丛 $(E, \\pi, M)$”是一个<strong>通用的抽象母模板</strong>（就像编程里的泛型容器 <code>Bundle&lt;Fiber&gt;</code>）。根据你在地面点 $p$ 头顶上挂载的纤维类型不同，会分别组装出两座完全独立的大楼：
  </p>
  <div class="primer-grid">
    <div class="primer-card" style="border-color: rgba(56, 189, 248, 0.35);">
      <div class="primer-card-title">🏛️ 大楼 A：切丛 (Tangent Bundle, $E = TM$)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0; line-height:1.7;">
        • <strong>挂载的纤维</strong>：每个点 $p \\in M$ 头顶<strong>只挂切空间 $T_pM$</strong>（速度向量空间）；<br/>
        • <strong>总空间 $TM := \\bigsqcup_{p \\in M} T_pM$</strong>：把所有点的切空间无交并打包成的 $2n$ 维流形；<br/>
        • <strong>总空间里的一个点</strong>：是一对绑定数据 $(q, \\dot{q})$（即<strong>位置 + 广义速度</strong>），里面<strong>绝不包含动量/余切向量</strong>；<br/>
        • <strong>物理归属</strong>：这是第 2 章<strong>现代拉格朗日力学</strong>生活的舞台（拉格朗日量 $L(q, \\dot{q})$ 就是定义在 $TM$ 上的函数）。
      </p>
    </div>
    <div class="primer-card" style="border-color: rgba(199, 125, 255, 0.35);">
      <div class="primer-card-title" style="color:#c77dff;">🏛️ 大楼 B：余切丛 (Cotangent Bundle, $E = T^*M$)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0; line-height:1.7;">
        • <strong>挂载的纤维</strong>：每个点 $p \\in M$ 头顶<strong>只挂余切空间 $T_p^*M$</strong>（1-形式/动量空间）；<br/>
        • <strong>总空间 $T^*M := \\bigsqcup_{p \\in M} T_p^*M$</strong>：把所有点的余切空间无交并打包成的 $2n$ 维流形；<br/>
        • <strong>总空间里的一个点</strong>：是一对绑定数据 $(q, p)$（即<strong>位置 + 正则动量</strong>），里面<strong>绝不包含速度向量</strong>；<br/>
        • <strong>物理归属</strong>：这是第 3 章<strong>哈密顿相空间与加速器束流动力学</strong>生活的舞台（哈密顿量 $H(q, p)$ 就是定义在相空间 $T^*M$ 上的函数）。
      </p>
    </div>
  </div>
</div>

<div class="math-primer">
  <div class="math-primer-title">
    <span>🔍 第二步：慢放拆解向量丛 $(E, \\pi, M)$ 的四大核心构件</span>
  </div>
  <p>
    为了不流于表面名词，我们把通用的 $k$ 维向量丛 $(E, \\pi, M)$ 的四个构件逐一拆开看清它的内部齿轮：
  </p>
  <div class="primer-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
    <div class="primer-card">
      <div class="primer-card-title">1. 底流形 (Base Manifold, $M$) —— 脚下的地基</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0; line-height:1.7;">
        物理事件发生的基础 $n$ 维空间。比如：地球表面 $S^2$、机械系统的 $n$ 维位形空间 $Q$、或者四维时空流形 $\\mathbb{R}^{3,1}$。它只提供“位置坐标 $p$”，本身还没有挂载任何向量。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">2. 单点纤维 (Fiber, $E_p$) —— 固定点 $p$ 头顶的专属标尺空间</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0; line-height:1.7;">
        固定底流形上的某一个点 $p \\in M$，挂在它头顶上的那个 $k$ 维实线性空间就叫点 $p$ 处的<strong>纤维 $E_p$</strong>（对切丛而言 $E_p = T_pM$，维数 $k=n$）。<br/>
        <strong>关键性质</strong>：不同地面点 $p \\neq q$ 上的纤维 $E_p$ 与 $E_q$ 是<strong>完全不相交（$E_p \\cap E_q = \\emptyset$）</strong>的两个独立向量空间，你不能直接把 $E_p$ 里的向量和 $E_q$ 里的向量相加！
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">3. 总空间 (Total Space, $E$) —— 无交并 $\\bigsqcup_{p \\in M} E_p$</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0; line-height:1.7;">
        把底流形所有点 $p \\in M$ 上的纤维 $E_p$ 全部汇集并粘合成一个 $(n+k)$ 维的光滑大流形：
        $$E := \\bigsqcup_{p \\in M} E_p = \\big\\{ (p, v) \\;\\big|\\; p \\in M, \\; v \\in E_p \\big\\}$$
        <strong>总空间里的一个“点”是什么？</strong> 它是<strong>“地面位置 $p$ + 该点纤维上的一个具体向量 $v \\in E_p$”组成的配对 $(p, v)$</strong>！要定位总空间里的一个点，你需要 $n$ 个地面坐标外加 $k$ 个纤维分量坐标，共 $n+k$ 个实数。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">4. 投影映射 ($\\pi: E \\to M$) 与原像 $\\pi^{-1}(p)$</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0; line-height:1.7;">
        既然总空间 $E$ 里的元素是 $(p, v)$，那么<strong>投影映射 $\\pi$</strong> 就是一个极其自然的“降维读取器”——<strong>抹掉纤维上的向量 $v$，只报告它站在地面上的哪个点 $p$</strong>：
        $$\\pi(p, v) = p$$
        反过来，什么叫<strong>原像 $\\pi^{-1}(p)$</strong>？就是在总空间 $E$ 里找出所有“拍回地面后落在点 $p$”的元素集合：$\\pi^{-1}(p) = \\{ (p, v) \\mid v \\in E_p \\} \\equiv E_p$。所以<strong>点 $p$ 的原像 $\\pi^{-1}(p)$ 恰好就是点 $p$ 头顶上的整根纤维 $E_p$！</strong>
      </p>
    </div>
  </div>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 第三步：为什么叫“丛 (Bundle)”而不直接叫“笛卡尔直积 $M \\times \\mathbb{R}^k$”？</span>
  </div>
  <p>
    你可能会问：在每个点 $p \\in M$ 上挂一个 $k$ 维向量空间 $\\mathbb{R}^k$，那总空间 $E$ 不就是简单的笛卡尔乘积 $M \\times \\mathbb{R}^k$ 吗？为什么要发明“向量丛”这个新词？<br/>
    • <strong>局部来看（局部平凡化 Local Trivialization）</strong>：在底流形的一小块局部图卡 $U \\subset M$ 上，向量丛确实和直积 $U \\times \\mathbb{R}^k$ 完全一样（就像牙刷上排列整齐的一排刷毛）；<br/>
    • <strong>整体来看（全局拓扑扭转）</strong>：当你在弯曲的底流形 $M$ 上绕一圈回到起点时，纤维在粘合时可能发生<strong>整体扭转</strong>！<br/>
    最直观的例子是底流形为圆圈 $M = S^1$，每点挂载一维直线纤维 $\\mathbb{R}^1$：<br/>
    1. 如果绕一圈不扭转直接粘合，总空间是<strong>无限高圆柱面 $S^1 \\times \\mathbb{R}$</strong>（这叫<strong>平凡丛 Trivial Bundle</strong>）；<br/>
    2. 如果绕一圈将直线纤维上下翻转 $180^\\circ$ 粘合，总空间就变成了<strong>莫比乌斯带 (Möbius Strip)</strong>！它在局部每一小段都像 $U \\times \\mathbb{R}$，但整体绝不等于 $S^1 \\times \\mathbb{R}$。这正是“向量丛”比“直积空间”更深刻的原因。
  </p>
</div>

<div class="math-proof" style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(56, 189, 248, 0.35);">
  <div class="math-proof-title">
    <span>✨ 第四步：彻底搞懂“截面 (Section, $s$)”与场化算符 $\\Gamma(E)$</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#38bdf8;">Sections as Physical Fields</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>先用“普通函数图像”建立直观</strong>：<br/>
        对于普通实变函数 $f: \\mathbb{R} \\to \\mathbb{R}$，如果在每个横坐标 $x$ 处画一条竖直线（纤维 $\\mathbb{R}$），函数 $f$ 就是在每条竖直线上挑一个高度点 $(x, f(x))$。当 $x$ 连续变动时，这些挑出来的点连成一条光滑曲线，<strong>把每一根竖直纤维都横向截断一次</strong>——这就是几何上“<strong>截面 (Cross-Section)</strong>”一词的由来！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>为什么截面要定义为“从底流形 $M$ 到总空间 $E$ 的映射 $s: M \\to E$”？它和“切向量场”有什么区别？</strong><br/>
        • <strong>为什么靶空间必须是总空间 $E$？</strong> 因为不同地面点 $p \\neq q$ 头顶上的纤维 $E_p$ 与 $E_q$ 是完全不同的向量空间，没有任何单一的 $E_p$ 能同时装下全流形所有点的向量！唯一能把所有点的纤维 $E_p$ 全装进去的公共大池子，就是总空间 $E = \\bigsqcup_{p \\in M} E_p$。因此在数学上，“在每个点 $p$ 挑一个向量 $v_p \\in E_p$”就必须写成映射 $s: M \\to E, \\; p \\mapsto (p, v_p) \\in E_p \\subset E$。<br/>
        • <strong>“截面”和“切向量场”有什么区别？——“通用母概念”与“具体特例”的关系！</strong><br/>
        <strong>当总空间取切丛 $E = TM$ 时，切丛的一个光滑截面 $X: M \\to TM$ 与“一个切向量场”没有任何区别，它们 100% 是同一个东西的两种叫法！</strong><br/>
        之所以引入“截面 (Section)”这个词，是因为物理学中不仅有切向量场，还有各种不同类型的“场”（截面就是所有“场”的通用数学统称）：
        <br/>① 若总空间取<strong>切丛 $E = TM$</strong>，它的一个截面 $X: M \\to TM$ 就是<strong>一个切向量场</strong>（如流体速度场）；
        <br/>② 若总空间取<strong>余切丛 $E = T^*M$</strong>，它的一个截面 $\\alpha: M \\to T^*M$ 就是<strong>一个 1-形式场 / 余切向量场</strong>（如电磁四维势场 $A_\\mu dx^\\mu$）——它也是截面，但不是切向量场；
        <br/>③ 若总空间取<strong>外积余切丛 $E = \\bigwedge^k T^*M$</strong>，它的一个截面 $\\omega: M \\to \\bigwedge^k T^*M$ 就是<strong>一个 $k$-形式场</strong>（如电磁场强 2-形式场 $F$）。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>什么是 $\\text{id}_M$？为什么数学定义里一定要写公式 $\\pi \\circ s = \\text{id}_M$？</strong><br/>
        • <strong>符号 $\\text{id}_M$（Identity Map，恒等映射）</strong>：$\\text{id}$ 是英文 Identity 的缩写，$\\text{id}_M: M \\to M$ 代表流形 $M$ 上的“<strong>原地不动映射</strong>”——你输入任意一个点 $p \\in M$，它原封不动地吐回 $p$ 本身，即 $\\text{id}_M(p) \\equiv p$（在线性代数中，它就相当于单位矩阵 $I$）；<br/>
        • <strong>符号 $\\circ$（映射复合）</strong>：$\\pi \\circ s$ 表示“先执行截面映射 $s: M \\to E$，紧接着执行投影映射 $\\pi: E \\to M$”的串联操作，即 $(\\pi \\circ s)(p) := \\pi\\big(s(p)\\big)$。<br/>
        • <strong>为什么必须要求 $\\pi \\circ s = \\text{id}_M$？</strong> 如果随便写一个映射 $s: M \\to E$，万一它把“东京地面点 $p$”映射到了“纽约头顶纤维里的某个向量”怎么办？那就不叫东京的风速了！为了<strong>严禁跨点串门</strong>，数学上规定：从任意点 $p \\in M$ 出发，先用 $s$ 挑出向量 $s(p) \\in E$，再用投影 $\\pi$ 把它拍回地面，<strong>结果必须等于恒等映射 $\\text{id}_M(p) = p$（精准落回出发点 $p$ 本身）</strong>：
        $$(\\pi \\circ s)(p) = \\pi\\big(s(p)\\big) = \\text{id}_M(p) = p \\quad \\iff \\quad \\text{对任意 } p \\in M, \\; s(p) \\in E_p$$
        <strong>一句话翻译 $\\pi \\circ s = \\text{id}_M$</strong>：每个点 $p$ 的场值 $s(p)$，必须老老实实待在 $p$ 自己头顶的纤维 $E_p$ 里！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>算符 $\\Gamma(E)$ 是什么？—— 收集所有可能物理场的“母空间”！</strong><br/>
        • <strong>单个截面 $s$</strong>：代表<strong>某一个具体的物理场</strong>（例如今天下午 3 点全球的一张具体风速分布图）；<br/>
        • <strong>截面空间 $\\Gamma(E)$</strong>：把向量丛 $E$ 上<strong>所有可能的光滑截面全部收集在一起构成的无穷维实线性空间</strong>（因为两个截面在同一纤维内可以逐点相加 $(s_1 + s_2)(p) = s_1(p) + s_2(p) \\in E_p$）。<br/>
        至此，微分几何中最核心的三套“场空间”记号彻底打通：
        <ul style="margin: 8px 0 0 20px;">
          <li><strong>切向量场空间 $\\Gamma(TM) \\equiv \\mathfrak{X}(M)$</strong>：切丛 $TM$ 的所有光滑截面（如流体速度场、哈密顿相流场 $X_H$）；</li>
          <li><strong>1-形式场空间 $\\Gamma(T^*M) \\equiv \\Omega^1(M)$</strong>：余切丛 $T^*M$ 的所有光滑截面（如力做功场 $F_i dx^i$、电磁四维势场 $A_\\mu dx^\\mu$）；</li>
          <li><strong>$k$-形式场空间 $\\Gamma(\\bigwedge^k T^*M) \\equiv \\Omega^k(M)$</strong>：$k$ 阶外积余切丛的所有光滑截面（这就是下一节即将登场的通量形式场！）。</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div style="background: rgba(30, 41, 59, 0.7); border-left: 3px solid #38bdf8; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 0.92rem; color: #cbd5e1;">
  <strong style="color: #38bdf8;">🤔 迈向下一节的几何思考：</strong>
  现在，我们已经有了 1-形式场 $\\Omega^1(M) = \\Gamma(T^*M)$（在流形每个点放置一把一维线测量尺）。然而在物理学中，我们到处都需要测量<strong>穿过二维曲面的通量</strong>（例如磁通量 $\\iint \\vec{B} \\cdot d\\vec{S}$、加速器横向相空间中的相椭圆面积）。我们如何在每个点的纤维上，把手头的 1-形式标尺“乘”起来，拼装成二维面元测量机 $\\bigwedge^2 T_p^*M$？这就是第 1.5 节的核心：<strong>外代数（Exterior Algebra）</strong>。
</div>
      `
    },
    {
      id: 'sec-5',
      number: '1.5',
      heading: '外代数 (Exterior Algebra)：交替多线性形式与逐点有向测量',
      content: `
<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 第一性原理：如何用两根“1-形式测量尺”去度量一个二维平行四边形的面元？</span>
  </div>
  <p>
    设在流形某点处有两个切向量 $u, v \\in T_p M$；它们在同一个切空间中张成平行四边形。这里的向量是线性空间中的元素，不要求是无穷小位移。<br/>
    我们手头有两个基本的 1-形式测量尺：
    <br/>• $dx$：输入切向量 $u$，给出 $u(x)$；
    <br/>• $dy$：输入切向量 $u$，给出 $u(y)$。
    <br/>我们要把它们组合成接收 $(u,v)$ 的<strong>有向坐标面积测量规则</strong>，记为 <strong>$dx \\wedge dy$</strong>。在欧氏正交单位坐标中，它与熟悉的有向面积一致；一般坐标中，它首先是交替双线性映射。本节只定义这种逐点求值；对区域赋予大小的“测度”将在 1.6 节另行定义。
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    <span>定义 1.4：外积 $\\wedge$ (Wedge Product) 的三大几何物理铁律</span>
  </div>
  <p>任何测量有向面积的乘法运算 $\\wedge$，必须严格服从三条天然的几何规则：</p>
  <div class="primer-grid">
    <div class="primer-card">
      <div class="primer-card-title">⚖️ 1. 双线性律 (Bilinearity)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        如果平行四边形的一条边长度扩大 $c$ 倍，它所包含的面元面积也必须成正比扩大 $c$ 倍；对向量加法满足乘法分配律。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🔄 2. 反对称律 (Antisymmetry)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        二维平面是有定向的！从向量 $u$ 旋向向量 $v$（逆时针）与从 $v$ 旋向 $u$（顺时针），法线朝向完全相反。因此调换输入向量的顺序，面积必须变号：
        $$dx \\wedge dy = - dy \\wedge dx$$
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🚫 3. 退化归零律 (Nilpotency)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        如果两根向量平行共线（$u = v$），它们根本张不出二维面元，压成了一条直线，面积必定为零！因此任何 1-形式与自身的乘积必恒为零：
        $$dx \\wedge dx = 0, \\qquad dy \\wedge dy = 0$$
      </p>
    </div>
  </div>
</div>

<div class="math-proof">
  <div class="math-proof-title">
    <span>【严格数学根源】从张量积 $\\otimes$ 到外积 $\\wedge$：反对称化算子 (Antisymmetrizer)</span>
  </div>
  <p>
    为了回答“两项相减从何而来”的严谨性问题，我们必须请出多重线性代数中最原始的乘法——<strong>张量积（Tensor Product, $\\otimes$）</strong>：
  </p>
  <div class="primer-grid">
    <div class="primer-card">
      <div class="primer-card-title">✖️ 1. 最朴素的乘积：张量积 $\\alpha \\otimes \\beta$</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        给定两个 1-形式 $\\alpha, \\beta \\in T_p^*M$，它们最直接的双线性乘积定义为：
        $$(\\alpha \\otimes \\beta)(u, v) \\stackrel{\\text{def}}{=} \\alpha(u) \\cdot \\beta(v)$$
        输入两根向量，分别输入给 $\\alpha$ 和 $\\beta$ 求值后相乘。但张量积<strong>完全不具备反对称性</strong>（交换 $u, v$，乘积 $\\alpha(v)\\beta(u)$ 不等于 $-\\alpha(u)\\beta(v)$），无法直接测量有向面元。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">✂️ 2. 反对称化算子：外积 $\\wedge$ 的严格数学定义</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        反对称投影定义为 $\\operatorname{Alt}(T)(u,v)=\\tfrac12[T(u,v)-T(v,u)]$。在本章约定中，<strong>两个 1-形式的外积是张量积反对称投影的两倍</strong>：
        $$\\alpha \\wedge \\beta \\stackrel{\\text{严格定义}}{=} \\alpha \\otimes \\beta - \\beta \\otimes \\alpha$$
      </p>
    </div>
  </div>

  <p style="margin-top: 14px;">
    <strong>把任意两根切向量 $(u, v)$ 代入外积定义式：</strong>
    $$\\begin{aligned}
    (\\alpha \\wedge \\beta)(u, v) &= (\\alpha \\otimes \\beta)(u, v) - (\\beta \\otimes \\alpha)(u, v) \\\\
    &= \\alpha(u)\\beta(v) - \\beta(u)\\alpha(v) \\\\
    &= \\alpha(u)\\beta(v) - \\alpha(v)\\beta(u)
    \\end{aligned}$$
    现在选定流形上的<strong>任意局部坐标卡 $(x^1, x^2)$</strong>（可以是球面经纬度 $(\\theta, \\phi)$ 或弯转轨道坐标 $(x, s)$），令 $\\alpha = dx^1, \\beta = dx^2$：
    $$(dx^1 \\wedge dx^2)(u, v) = dx^1(u) dx^2(v) - dx^1(v) dx^2(u) = u^1 v^2 - v^1 u^2 = \\det \\begin{pmatrix} u^1 & v^1 \\\\ u^2 & v^2 \\end{pmatrix}$$
    <strong>数学结论</strong>：行列式公式来自 $\\alpha\\wedge\\beta=2\\operatorname{Alt}(\\alpha\\otimes\\beta)$，其归一化使 $(dx^1\\wedge dx^2)(\\partial_{x^1},\\partial_{x^2})=1$。
  </p>
</div>

<div class="math-primer">
  <div class="math-primer-title">
    <span>💡 深度辨析：外积 $\\wedge$ 与普通乘法 $\\times$ 到底有什么本质区别？难道只是多了方向和正负号？</span>
  </div>
  <p>
    绝不仅仅是加了正负号！外积与普通乘法在代数结构与拓扑物理上有四大根本性跨越：
  </p>
  <div class="primer-grid">
    <div class="primer-card">
      <div class="primer-card-title">🚀 1. 几何维度的“升阶性” (Graded Algebra)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        普通数乘是同维封闭的（实数 $\\times$ 实数 = 实数）。而外积是<strong>几何升阶算子</strong>：1-形式 $\\wedge$ 1-形式 = <strong>2-形式（面元测量机）</strong>；2-形式 $\\wedge$ 1-形式 = <strong>3-形式（体元测量机）</strong>。它把低维几何探针缝合成高维几何探针。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🛑 2. 流形物理维数的天然感知与截断</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        普通乘法可以无限相乘。而外积能<strong>天然感知空间的物理维数</strong>：在 $n$ 维流形上，由于抽屉原理，任何超过 $n$ 个基底相乘必有重复项（$dx^i \\wedge dx^i = 0$），导致整个外代数空间在流形维数处<strong>直接自动归零死亡：$\\Omega^{k > n}(M) = \\{0\\}$！</strong>
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🔒 3. 非除法代数与拓扑零因子</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        普通非零实数都有逆元（除法）。在外代数中，任何 1-形式自积必定为零：$\\alpha \\wedge \\alpha = 0$。外代数存在“零因子”，不能把外积当作普通实数乘法来约分；这条代数事实本身不意味着动力学不可逆。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">🍩 4. 拓扑环洞探测器 (德拉姆上同调)</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        外积 $\\wedge$ 与外微分 $d$ 联手满足反向 Leibniz 律，构成了<strong>上同调代数环 $H^*(M)$</strong>。它能直接计算出流形上有几个环洞（如环面 $T^2$ vs 球面 $S^2$），这是普通乘法完全不具备的拓扑威力。
      </p>
    </div>
  </div>
</div>

<div class="math-primer">
  <div class="math-primer-title">
    <span>🧐 深度追问：这是否假定了笛卡尔直角坐标？在任意复杂弯曲流形中到底是什么样的？</span>
  </div>
  <p>
    许多初学者看到上面的公式，会产生一个极其深刻的疑问：<strong>“这里的坐标轴如果不是互相垂直的直角坐标系，面积难道还能直接等于行列式吗？”</strong><br/>
    这是通往现代微分几何最高殿堂的<strong>分水岭问题</strong>。物理与几何真相如下：
  </p>
  <div class="primer-grid">
    <div class="primer-card">
      <div class="primer-card-title">🌐 1. 坐标轴可以任意倾斜弯曲、任意非等长！</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        在任意弯曲流形（如球面 $S^2$）上，经纬度坐标 $(x^1, x^2) = (\\theta, \\phi)$ 的切基底 $\\frac{\\partial}{\\partial \\theta}$ 与 $\\frac{\\partial}{\\partial \\phi}$ 在两极附近<strong>严重汇聚，长度也随纬度改变</strong>。但无论坐标线怎么弯曲倾斜，基底与对偶基底的代数对偶律 $\\langle dx^i, \\frac{\\partial}{\\partial x^j} \\rangle = \\delta^i_j$ 处处绝对成立！因此上面的代数展开在<strong>任意弯曲坐标下毫发无损，完全正确</strong>。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">📐 2. 行列式给出相对于坐标的有向面积值</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        行列式 $\\det \\begin{pmatrix} u^1 & v^1 \\\\ u^2 & v^2 \\end{pmatrix}$ 给出 $(dx^1\\wedge dx^2)(u,v)$，即<strong>相对于所选坐标的有向面积值</strong>。这个代数求值不需要度规；其量纲由坐标与输入向量的量纲决定，数值也会随坐标基形式的改变而改变。只有在与度规相容的情形下，它才等于有向物理面积；无度规并不等于无量纲或只依赖拓扑。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">📏 3. 物理面积还需要选择度规</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        按 <a href="#geometry-metric-prerequisites">1.3 节的定义</a>，度规 $g$ 提供切向量的长度与夹角；外积的定义不使用这份额外数据。坐标面积值因此不自动等于物理面积。先在 1.6 节定义区域测度，再在 <a href="#geometric-density-definition">1.7 节</a> 说明 $g$ 怎样确定体积密度与体积形式，避免把这些对象提前混同。
      </p>
    </div>
    <div class="primer-card">
      <div class="primer-card-title">⚛️ 4. 为什么加速器相空间更崇拜“无度规”的外代数？</div>
      <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
        在粒子相空间 $(x, p_x)$ 中，横坐标是位置（米），纵坐标是动量（$\\text{GeV}/c$）。两者量纲不同，不能直接把 $x^2+p_x^2$ 解释成长度平方；可以另选尺度和黎曼度规，但<strong>辛结构本身不指定这样的度规</strong>。相空间却有典范辛 2-形式：
        $$\\omega = dx \\wedge dp_x$$
        它的量纲天然是 $[\\text{米}] \\times [\\text{动量}] = [\\text{作用量}]$，精确对应单粒子发射度 $\\pi\\epsilon$。<strong>正因为外代数完全不依赖度规，它才成为哈密顿力学与相空间动力学唯一合法的几何语言！</strong>
      </p>
    </div>
  </div>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 什么是 2-形式 (2-form)？物理中的鲜活实例</span>
  </div>
  <p>
    任何形如 $\\omega = \\sum_{i < j} B_{ij}(x) \\, dx^i \\wedge dx^j$ 的几何对象，就叫做一个 <strong>2-形式（2-form）</strong>。<br/>
    它的物理本质就是一个<strong>“曲面面元测量机”</strong>：你给它输入两个切向量，它立刻吐出有向面元大小！
    <br/>• <strong>物理实例 1（电磁学中的磁通量）</strong>：
    在三维空间中，磁感应强度 $\\vec{B}$ 穿过曲面产生的磁通量 $\\Phi = \\iint \\vec{B} \\cdot d\\vec{S}$，在微分几何中被统一写为一个纯净的 2-形式：
    $$B = B_x dy \\wedge dz + B_y dz \\wedge dx + B_z dx \\wedge dy$$
    • <strong>物理实例 2（加速器束流相空间面积）</strong>：
    在哈密顿横向相空间 $(x, p_x)$ 中，单粒子围绕平衡轨道回旋时，其相椭圆面积微元就是一个天然的辛 2-形式：
    $$\\omega = dx \\wedge dp_x$$
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>形式的物理通量阶梯 (The Ladder of Forms) 与母体空间 $\\Omega^k(M)$</span>
  </div>
  <p>以下列出各阶形式对应的几何维数和物理用途。这里先识别被积对象；出现的线积分、面积分和体积分将在 1.6–1.7 节统一定义。</p>
  <ul>
    <li><strong>0-形式 $\\Omega^0(M) = C^\\infty(M)$</strong>：<strong>0 维点测量</strong>（计算某点处的标量取值：电势 $\\phi$、温度 $T$、势能 $V$）；</li>
    <li><strong>1-形式 $\\Omega^1(M) = \\Gamma(T^*M)$</strong>：<strong>1 维线测量</strong>（计算沿轨线的线积分做功：$\\int_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_C F_i dx^i$、动量形式 $p_i dq^i$）；</li>
    <li><strong>2-形式 $\\Omega^2(M) = \\Gamma(\\bigwedge^2 T^*M)$</strong>：<strong>2 维面测量</strong>（计算穿过曲面的通量：磁通量 $\\iint_S B$、辛相空间面积元 $dq \\wedge dp$）；</li>
    <li><strong>3-形式 $\\Omega^3(M) = \\Gamma(\\bigwedge^3 T^*M)$</strong>：<strong>3 维体测量</strong>（计算封闭体积内的总电荷或总质量：$\\iiint_V \\rho \\, dx \\wedge dy \\wedge dz$）；</li>
    <li><strong>$k$-形式 $\\Omega^k(M) = \\Gamma(\\bigwedge^k T^*M)$</strong>：<strong>$k$ 维有向体积的测量尺</strong>！</li>
    <li><strong>维数封顶截断</strong>：当 $k > n = \\dim M$ 时，由于抽屉原理，任何超过 $n$ 个坐标基底相乘必有重复项（如在二维平面上 $dx \\wedge dy \\wedge dx = - dx \\wedge dx \\wedge dy = 0$），因此形式阶数在空间维数处自动截断：$\\Omega^{k > n}(M) = \\{0\\}$。</li>
  </ul>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">接下来分两步建立积分</div>
  <p>形式在一个点的取值，尚未给出整片区域的总量。先读 <a href="#sec-integration-foundations">1.6 节</a>：定义可测集合、测度、简单函数与勒贝格积分；再读 <a href="#sec-integration-definition">1.7 节</a>：借助拉回与单位分解，定义有向流形上的形式积分并证明坐标无关性。</p>
</div>
      `
    },
    integrationFoundationsSection,
    integrationDefinitionSection,
    {
      id: 'sec-6',
      number: '1.8',
      heading: '外微分算子 $d$ 与拓扑幂零律：$d^2 = 0$ 严格证明',
      content: `
<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 零门槛基石：什么是外微分 $d$？什么是闭形式与恰当形式？</span>
  </div>
  <p>
    现在我们有了从 0 形式到 $n$ 形式的阶梯。外微分算子 $d$ 正是<strong>沿着阶梯往上爬一步的微分算子</strong>：
    $$\\Omega^0(M) \\xrightarrow{\\quad d \\quad} \\Omega^1(M) \\xrightarrow{\\quad d \\quad} \\Omega^2(M) \\xrightarrow{\\quad d \\quad} \\Omega^3(M) \\xrightarrow{\\quad d \\quad} \\cdots$$
    • <strong>算符 $d$ 的物理功效</strong>：它是传统矢量微积分中梯度 (grad)、旋度 (curl)、散度 (div) 的统一无坐标推广！它计算的是“微元边界上的净通量/环流密度”；<br/>
    • <strong>闭形式 (Closed Form, $d\\omega = 0$)</strong>：局域上没有任何“旋度涡流”或“散度源”；<br/>
    • <strong>恰当形式 (Exact Form, $\\omega = d\\alpha$)</strong>：它本身是某个低一阶势场的导数（例如保守力场 $\\vec{F} = - dV$，磁场 $\\vec{B} = dA$）；<br/>
    • <strong>幂零律 $d^2 = 0$ 的物理宣称</strong>：<strong>所有恰当形式必为闭形式（保守场必无旋）！</strong>
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>定义 1.5：外微分算子 $d: \\Omega^k(M) \\to \\Omega^{k+1}(M)$ 的公理体系</span>
  </div>
  <p>流形上存在唯一的实线性导数算子族 $d$，满足三条公理：</p>
  <ol>
    <li>对 0-形式（标量函数 $f$），$df = \\frac{\\partial f}{\\partial x^i} dx^i$（全微分）；</li>
    <li><strong>反 Leibniz 乘积律</strong>：对 $\\alpha \\in \\Omega^k(M), \\; \\beta \\in \\Omega^l(M)$，有：
      $$d(\\alpha \\wedge \\beta) = d\\alpha \\wedge \\beta + (-1)^k \\alpha \\wedge d\\beta$$
    </li>
    <li>对局部坐标微分形式，二阶微分为零：$d(dx^i) = 0$。</li>
  </ol>
</div>

<div class="math-primer" style="margin-top: 20px;">
  <div class="math-primer-title">
    <span>🔍 关键破局：外微分 $d$ 作用在 1-形式上到底是什么？</span>
  </div>
  <p>
    在上面的定义中，很多初学者最容易产生的困惑是：<strong>“0-形式的 $d$ 我很熟（就是普通的全微分梯度 $df$），但 1-形式本身已经带着微元 $dx^i$ 了，把 $d$ 拍在 1-形式上，它究竟算出了什么几何与物理量？”</strong><br/>
    答案可以高度凝练为两句话：
    <br/>• <strong>几何类型跃迁</strong>：1-形式是“线积分做功标尺”，而 <strong>$d(1\\text{-形式})$ 跃迁为了 2-形式（面元测量机）</strong>！
    <br/>• <strong>物理测量本质</strong>：$d\\alpha$ 测量的正是 1-形式 $\\alpha$ 沿着<strong>无穷小闭合回线的“环量密度（Circulation Density）”或“旋度涡量（Vorticity）”</strong>！
  </p>
</div>

<div class="math-proof" style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(56, 189, 248, 0.35);">
  <div class="math-proof-title">
    <span>📐 局部坐标显式推导：从反 Leibniz 律手把手计算 $d(1\\text{-形式})$</span>
    <span style="font-size:0.8rem; font-family:var(--font-mono); color:#38bdf8;">Step-by-step Algebra</span>
  </div>
  <div class="math-proof-steps">
    <div class="proof-step-item">
      <div class="proof-step-dot">1</div>
      <div>
        <strong>写出任意 1-形式的局部展开</strong>：<br/>
        设 $\\alpha \\in \\Omega^1(M)$，在局部坐标卡下展开为：
        $$\\alpha = \\sum_{j=1}^n \\alpha_j(x) \\, dx^j$$
        其中系数 $\\alpha_j(x)$ 是普通的 0-形式（标量函数），而基底 $dx^j$ 是 1-形式基底。
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">2</div>
      <div>
        <strong>应用线性公理与反 Leibniz 乘积律</strong>：<br/>
        由于 $d$ 是实线性的，且对乘积 $\\alpha_j \\cdot dx^j = \\alpha_j \\wedge dx^j$（0-形式与 1-形式的外积即普通标量乘法），按反 Leibniz 律展开：
        $$d\\alpha = \\sum_{j=1}^n d\\left( \\alpha_j \\, dx^j \\right) = \\sum_{j=1}^n \\Big[ (d\\alpha_j) \\wedge dx^j + (-1)^0 \\, \\alpha_j \\wedge d(dx^j) \\Big]$$
        根据公理 3，坐标基底的二阶微分恒为零：$d(dx^j) \\equiv 0$。因此第二项精确消失！
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">3</div>
      <div>
        <strong>展开标量函数的全微分 $d\\alpha_j$</strong>：<br/>
        根据公理 1，标量函数 $\\alpha_j$ 的外微分就是普通全微分：$d\\alpha_j = \\sum_{i=1}^n \\frac{\\partial \\alpha_j}{\\partial x^i} dx^i$。代入上式得：
        $$d\\alpha = \\sum_{j=1}^n \\left( \\sum_{i=1}^n \\frac{\\partial \\alpha_j}{\\partial x^i} dx^i \\right) \\wedge dx^j = \\sum_{i, j=1}^n \\frac{\\partial \\alpha_j}{\\partial x^i} \\, dx^i \\wedge dx^j$$
      </div>
    </div>
    <div class="proof-step-item">
      <div class="proof-step-dot">4</div>
      <div>
        <strong>利用外积的反对称骨架合并指标（反对称化梯度）</strong>：<br/>
        由于楔积严格反对称：$dx^i \\wedge dx^j = - dx^j \\wedge dx^i$，且当 $i = j$ 时 $dx^i \\wedge dx^i = 0$。<br/>
        我们将矩阵中的上三角 $(i < j)$ 与下三角项配对合并：
        $$d\\alpha = \\sum_{1 \\le i < j \\le n} \\left( \\frac{\\partial \\alpha_j}{\\partial x^i} - \\frac{\\partial \\alpha_i}{\\partial x^j} \\right) dx^i \\wedge dx^j = \\frac{1}{2} \\sum_{i, j=1}^n \\left( \\partial_i \\alpha_j - \\partial_j \\alpha_i \\right) dx^i \\wedge dx^j$$
        <span style="color:#38bdf8;"><strong>代数洞察</strong>：$d$ 作用在 1-形式上，自动完成了“指标偏导的全反对称化”！在黎曼几何中，即使考虑协变导数 $\\nabla_i \\alpha_j = \\partial_i \\alpha_j - \\Gamma^k_{ij}\\alpha_k$，由于克里斯托费尔联络关于下指标对称 $\\Gamma^k_{ij} = \\Gamma^k_{ji}$，在反对称差中联络项精确对消：$\\nabla_i \\alpha_j - \\nabla_j \\alpha_i \\equiv \\partial_i \\alpha_j - \\partial_j \\alpha_i$。<strong>外微分算子完全独立于黎曼度规与联络，是绝对内蕴的纯拓扑微分！</strong></span>
      </div>
    </div>
  </div>
</div>

<div class="math-intuition">
  <div class="math-intuition-title">
    <span>💡 物理与几何图像：$d\\alpha$ 究竟在测量什么？—— 无穷小闭合回线的“环量密度”</span>
  </div>
  <p>
    既然 $d\\alpha \\in \\Omega^2(M)$ 是一个 2-形式，它的使命就是<strong>吃进两个切向量 $X, Y \\in T_p M$，吐出一个实数 $(d\\alpha)(X, Y)$</strong>。<br/>
    这个数在物理上到底代表什么？让我们做一个<strong>微观思想实验（Stokes 微元与闭合 Wilson 回路）</strong>：
    <br/>• 在流形点 $p$ 处，以无穷小位移向量 $\\epsilon X$ 与 $\\epsilon Y$ 为相邻边，围成一个微型平行四边形面元 $\\Sigma$；
    <br/>• 面元的边界是一圈闭合定向回路 $\\partial \\Sigma$：$p \\to p+\\epsilon X \\to p+\\epsilon X+\\epsilon Y \\to p+\\epsilon Y \\to p$；
    <br/>• 让我们计算 1-形式 $\\alpha$ 沿该闭合回路的<strong>总环流线积分（Circulation / 做功）</strong>：
    $$\\oint_{\\partial \\Sigma} \\alpha = \\int_{\\text{底边}} \\alpha + \\int_{\\text{右边}} \\alpha - \\int_{\\text{顶边}} \\alpha - \\int_{\\text{左边}} \\alpha$$
    • 顶边与底边的微小差值正好反映了 $\\alpha(X)$ 沿 $Y$ 方向的偏导增量；右边与左边的差值反映了 $\\alpha(Y)$ 沿 $X$ 方向的偏导增量。<br/>
    根据广义 Stokes 定理，闭合回路积分除以微元面积，正是 2-形式在切向量 $(X, Y)$ 上的取值：
    $$(d\\alpha)(X, Y) = \\lim_{\\epsilon \\to 0} \\frac{1}{\\epsilon^2} \\oint_{\\partial \\Sigma(\\epsilon X, \\epsilon Y)} \\alpha$$
    <strong style="color: #38bdf8;">结论：$d(1\\text{-形式})$ 就是该 1-形式在 2 维面元上的“局域环量密度（旋度涡量）”！</strong>
    <br/>• 若 $\\alpha$ 是流体速度场 $\\vec{v}$，$\\oint \\alpha$ 是流体环量，$d\\alpha$ 就是<strong>流体的涡度（Vorticity）</strong>；
    <br/>• 若 $\\alpha = A$ 是电磁矢势，$\\oint A = \\Phi_B$ 是磁通量，$dA = F$ 就是<strong>磁感应强度 / 电磁场强 2-形式</strong>；
    <br/>• 若 $\\alpha = df$ 是梯度保守场（恰当形式），其沿任意闭合回路的做功恒为 $\\oint df = 0$，因此它的环量密度处处死掉：<strong>$d(df) \\equiv 0$！这就是“保守场必无旋”的底层几何本质！</strong>
  </p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>严格内蕴无坐标表述：Cartan 恒等式 (Palais-Cartan Formula)</span>
  </div>
  <p>现代微分几何彻底抛弃坐标系时，将 $d\\alpha$ 作为 2-形式的作用规律定义为（对任意光滑向量场 $X, Y \\in \\mathfrak{X}(M)$）：</p>
  $$(d\\alpha)(X, Y) := X\\big(\\alpha(Y)\\big) - Y\\big(\\alpha(X)\\big) - \\alpha\\big([X, Y]\\big)$$
  <div style="font-size:0.9rem; color:#cbd5e1; line-height:1.75; margin-top:8px;">
    <strong>项项拆解几何意义：</strong>
    <br/>• $X(\\alpha(Y))$：沿切向 $X$ 观察“向量 $Y$ 上的线积分测量值”如何变化；
    <br/>• $-Y(\\alpha(X))$：沿切向 $Y$ 观察“向量 $X$ 上的线积分测量值”如何变化；
    <br/>• $-\\alpha([X, Y])$：<strong>几何闭合缺陷补偿</strong>！如果两个向量场不能对易（$[X, Y] \\neq 0$），在流形上位移 $\\epsilon X$ 后沿 $\\epsilon Y$、与先 $\epsilon Y$ 后 $\epsilon X$ 并不能精准闭合成四边形，差出的位移缺口正是李括号 $[X, Y]$，最后一项负责将这个闭合缺口的做功精确扣除！
    <br/>• <strong>自洽性验证</strong>：若代入坐标切基矢 $X = \\frac{\\partial}{\\partial x^i}, Y = \\frac{\\partial}{\\partial x^j}$，因坐标切基矢天生对易 $[\\partial_i, \\partial_j] = 0$，李括号项为 0，直接得出：
    $$(d\\alpha)\\left(\\frac{\\partial}{\\partial x^i}, \\frac{\\partial}{\\partial x^j}\\right) = \\frac{\\partial}{\\partial x^i}\\left(\\alpha_j\\right) - \\frac{\\partial}{\\partial x^j}\\left(\\alpha_i\\right) = \\partial_i \\alpha_j - \\partial_j \\alpha_i$$
    这与我们利用反 Leibniz 律算出的局部坐标结果严格一致！
  </div>
</div>

<div class="primer-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin: 16px 0;">
  <div class="primer-card">
    <div class="primer-card-title">🌀 1. 经典三维微积分：就是旋度 $\\text{curl}$</div>
    <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
      取 1-形式 $\\alpha = A_x dx + A_y dy + A_z dz$。则：
      $$d\\alpha = \\left( \\frac{\\partial A_y}{\\partial x} - \\frac{\\partial A_x}{\\partial y} \\right) dx \\wedge dy + \\left( \\frac{\\partial A_z}{\\partial y} - \\frac{\\partial A_y}{\\partial z} \\right) dy \\wedge dz + \\left( \\frac{\\partial A_x}{\\partial z} - \\frac{\\partial A_z}{\\partial x} \\right) dz \\wedge dx$$
      通过霍奇对偶，这正是经典的旋度矢量：$*(d\\alpha) = (\\vec{\\nabla} \\times \\vec{A}) \\cdot d\\vec{r}$！
    </p>
  </div>
  <div class="primer-card">
    <div class="primer-card-title">⚡ 2. 四维电动力学：场强张量 $F = dA$</div>
    <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
      取电磁 4-势 1-形式 $A = A_\\mu dx^\\mu = -\\phi dt + A_x dx + A_y dy + A_z dz$。其外微分就是物理中的电磁场强 2-形式：
      $$F = dA = \\frac{1}{2} F_{\\mu\\nu} dx^\\mu \\wedge dx^\\nu, \\quad F_{\\mu\\nu} = \\partial_\\mu A_\\nu - \\partial_\\nu A_\\mu$$
      反对称分量直接组成了电场 $\\vec{E}$ 与磁感应强度 $\\vec{B}$！
    </p>
  </div>
  <div class="primer-card">
    <div class="primer-card-title">⚛️ 3. 经典力学与加速器：相空间辛形式 $\\omega = -d\\theta$</div>
    <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
      在哈密顿相空间中，定义庞加莱正则 1-形式（Liouville 形式）$\\theta = \\sum p_i dq^i$。对其施加外微分：
      $$d\\theta = \\sum d(p_i dq^i) = \\sum dp_i \\wedge dq^i = - \\sum dq^i \\wedge dp_i = - \\omega$$
      相空间的辛 2-形式 $\\omega$ 居然就是正则 1-形式外微分的相反数！而 $d\\omega = -d(d\\theta) \\equiv 0$ 自动奠定了刘维尔定理与相体积保面积性！
    </p>
  </div>
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
      number: '1.9',
      heading: '广义 Stokes 定理：形式积分与边界的关系',
      content: `
<div class="math-primer">
  <div class="math-primer-title"><span>从积分定义到边界公式</span></div>
  <p><a href="#sec-integration-foundations">1.6 节</a> 定义了测度和函数积分，<a href="#sec-integration-definition">1.7 节</a> 已经定义形式积分并证明坐标无关性。1.8 节则定义了外微分。现在可以研究形式在区域上的积分与其在边界上的积分之间的关系。</p>
  <p>在没有全局定向的流形上，普通顶次形式不能直接按这套规则全局积分；密度仍然可以积分。下面使用既有积分定义，讨论形式的阶数、积分域的维数，以及外微分和边界之间的 Stokes 关系。</p>
</div>

<div class="math-definition">
  <div class="math-definition-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
    <span>对偶维度匹配原则：为什么 $k$-形式必须且只能在 $k$-维流形上积分？</span>
  </div>
  <p>在现代微分几何中，被积形式的阶数 $k$ 与积分几何区域的维数 $k$ 必须<strong>严格相等</strong>——因为<strong>只有 $k$ 维流形的 $k$ 个独立参数坐标曲线，才能在点 $p$ 的切空间 $T_p M$ 中不多不少刚好生成 $k$ 个独立的方向导数算子 $\\left(\\left.\\frac{\\partial}{\\partial u^1}\\right|_p, \\dots, \\left.\\frac{\\partial}{\\partial u^k}\\right|_p\\right)$，去填满 $k$-形式 $\\omega_p(\\cdot, \\dots, \\cdot)$ 的 $k$ 个输入插槽！</strong></p>
  <ul>
    <li><strong>0-形式 $f$（0 个插槽）</strong> 积在 <strong>0-维流形（离散点集）</strong>：无需切向量，直接代入点求值 $\\int_{\\{p\\}} f = f(p)$；</li>
    <li><strong>1-形式 $\\alpha \\in \\Omega^1(M)$（1 个插槽）</strong> 积在 <strong>1-维有向曲线 $\\gamma(t)$</strong>：单参数曲线在每点生成 1 个切导数算子 $\\dot{\\gamma}(t) \\in T_{\\gamma(t)}M$，喂给 $\\alpha$ 并乘以参数微元 $dt$ 得到 $\\int_\\gamma \\alpha = \\int_a^b \\alpha\\big(\\dot{\\gamma}(t)\\big) dt = \\int_a^b \\alpha_i(\\gamma(t)) \\dot{\\gamma}^i(t) dt$（物理：做功 $\\int \\mathbf{F} \\cdot d\\mathbf{r}$）；</li>
    <li><strong>2-形式 $\\beta \\in \\Omega^2(M)$（2 个插槽）</strong> 积在 <strong>2-维有向曲面 $\\Sigma(u,v)$</strong>：双参数曲面在每点生成 2 个偏导算子 $\\big(\\frac{\\partial \\Sigma}{\\partial u}, \\frac{\\partial \\Sigma}{\\partial v}\\big)$，喂给 $\\beta$ 并乘以参数网格面积 $du dv$ 得到 $\\iint_\\Sigma \\beta = \\iint \\beta\\big(\\frac{\\partial \\Sigma}{\\partial u}, \\frac{\\partial \\Sigma}{\\partial v}\\big) du dv$（物理：磁通量 $\\iint \\mathbf{B} \\cdot d\\mathbf{S}$、相椭圆辛面积）；</li>
    <li><strong>$n$-形式 $\\Omega_{\\text{vol}} \\in \\Omega^n(M)$（$n$ 个插槽）</strong> 积在 <strong>$n$-维实体流形 $V$</strong>：$n$ 条坐标曲线在每点生成 $n$ 个方向导数算子填满 $\\Omega_{\\text{vol}}$，算出总质量、总电荷或相空间总概率 $\\int_V \\Omega_{\\text{vol}}$。</li>
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
      number: '1.10',
      heading: '李导数 $\\mathcal{L}_X$ 与 Cartan 魔术公式严密推导',
      content: `
<div class="math-primer">
  <div class="math-primer-title">
    <span>🌱 零门槛基石：什么是单参数流？什么是拉回 (Pullback) 与内积收缩？</span>
  </div>
  <p>
    • <strong>为什么不同点的张量不能直接相减？</strong> 在弯曲流形上，点 $p$ 的切空间与点 $q$ 的切空间是两个完全独立的向量空间。就像一个人站在赤道，另一个人站在北极，两人的“水平向北”朝向在三维空间中根本不同，绝不能直接相减求导！<br/>
    • <strong>单参数流 $\\Phi_t^X$</strong>：把向量场 $X$ 想象成一条大河的流速场。在时间 $t=0$ 从点 $p$ 放入一片落叶，随水流漂流到时间 $t$ 的新位置，记为 $\\Phi_t^X(p)$；<br/>
    • <strong>拉回算子 (Pullback, $(\\Phi_t)^*$)</strong>：既然不能直接在下游作差，我们就利用相流映射，把下游时间 $t$ 处的物理量“顺着河流倒流拉回”到原点 $p$。在原点同一个切空间里作差求极限，这就是<strong>李导数 $\\mathcal{L}_X$</strong>（即流体力学中的物质导数/随体导数）；<br/>
    • <strong>内积收缩算子 $i_X$</strong>：一个“吃向量”的降阶算符。将向量场 $X$ 强行塞入 $k$-形式的第一个插槽，使其退化为 $(k-1)$-形式。
  </p>
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

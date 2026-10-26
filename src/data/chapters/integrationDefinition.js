/** A focused definition of integration, inserted between exterior algebra and d. */
export const integrationDefinitionSection = {
  id: 'sec-integration-definition',
  number: '1.6',
  heading: '现代微分几何中的积分定义：从 dx、拉回到坐标无关性',
  content: `
<div class="math-intuition intuition-box">
  <div class="math-intuition-title">出发点：局部测量怎样成为一个总量？</div>
  <p>做功需要累加沿路径的有向贡献，通量需要累加穿过曲面的有向贡献。微分形式给出每一点的局部测量规则；积分把规则与一个有向几何区域配对，得到一个数。本节只构造这一配对，不预先使用 Stokes 定理或原函数。</p>
  <p><strong>需要说明的核心：</strong>如何从一个作用在切向量上的多重线性映射，严格定义出一个实数？答案是先在欧氏参数域规定积分，再证明不同参数给出的数相同。</p>
</div>

<div class="math-definition">
  <div class="math-definition-title">一、先固定对象与记号</div>
  <p>设 $M$ 是 $n\\geq 1$ 维、Hausdorff、第二可数的已定向光滑流形，先假设无边界。$T_pM$ 是点 $p$ 的切空间，$T_p^*M$ 是其线性对偶。一个 $n$-形式 $\\omega$ 在每点给出一个随点光滑变化的交替 $n$ 重线性映射：</p>
  $$\\omega_p:(T_pM)^n\\longrightarrow\\mathbb{R}.$$
  <p>所有这样的光滑场构成 $\\Omega^n(M)$；下标 $c$ 表示<strong>支集紧致</strong>，即非零点集的闭包是紧集。先在 $\\Omega_c^n(M)$ 上定义积分，可避免无穷远处的收敛问题。</p>
  <p>坐标图 $x=(x^1,\\ldots,x^n):U\\to V\\subset\\mathbb{R}^n$ 是一个光滑坐标对应。其逆映射 $\\Phi=x^{-1}:V\\to U$ 是参数化。<strong>定向</strong>是选定一族覆盖 $M$ 的坐标图，使重叠处的过渡映射雅可比行列式为正；这些图称为正向图。</p>
  <p>对坐标函数 $x^i:U\\to\\mathbb{R}$，它的微分是一个确切的余切向量场：</p>
  $$(dx^i)_p(v):=v(x^i),\\qquad v\\in T_pM.$$
  <p>外积把这些线性测量组合成有向多重测量，约定</p>
  $$(dx^1\\wedge\\cdots\\wedge dx^n)_p(v_1,\\ldots,v_n)
    =\\det\\big[(dx^i)_p(v_j)\\big]_{i,j=1}^n.$$
  <p>这里的 $dx^i$ 既不是一个趋于零的数，也不是一个集合的体积。它作用在切向量上，返回坐标函数沿该方向的导数。</p>
</div>

<div class="math-definition">
  <div class="math-definition-title">二、定义的分析起点：欧氏空间上的顶次形式积分</div>
  <p>令 $u^1,\\ldots,u^n$ 是 $\\mathbb{R}^n$ 上的标准坐标，$\\lambda^n$ 是标准勒贝格测度，它给矩形赋值 $\\prod_i(b_i-a_i)$。对标准定向开集 $V$ 上的紧支集光滑形式 $\\eta=a(u)\\,du^1\\wedge\\cdots\\wedge du^n$，<strong>规定</strong>：</p>
  $$\\boxed{\\int_V\\eta:=\\int_V a(u)\\,d\\lambda^n(u).}$$
  <p>左边的输入是一个形式，右边是已经在实分析中定义的函数对测度的积分。这是一条<strong>定义两种积分之间关系的规则</strong>，没有声称 $du^1\\wedge\\cdots\\wedge du^n$ 与 $d\\lambda^n$ 是同一类对象。</p>
  <p>若把 $a$ 在 $V$ 外延拓为零，并取包含其支集的矩形 $Q$，右边也等于黎曼和极限：</p>
  $$\\int_V a\\,d\\lambda^n
    =\\lim_{|P|\\to0}\\sum_{R\\in P}a(\\xi_R)\\,\\lambda^n(R).$$
  <p>$P$ 是 $Q$ 的矩形分割，$|P|$ 是最大网格直径，$\\xi_R\\in R$ 是取样点。趋于零的是网格大小；极限作用于<strong>整个和</strong>。不能写成“$dx=\\lim\\Delta x$”。</p>
</div>

<div class="math-definition">
  <div class="math-definition-title">三、拉回：把流形上的测量规则搬到参数域</div>
  <p>给光滑映射 $\\Phi:D\\subset\\mathbb{R}^k\\to M$ 和 $M$ 上的 $k$-形式 $\\omega$。微分 $T_u\\Phi:T_uD\\to T_{\\Phi(u)}M$ 把参数方向送到流形的切方向；具体地，$[T_u\\Phi(v)](h)=v(h\\circ\\Phi)$，其中 $h$ 是流形上的局部光滑函数。<strong>拉回</strong> $\\Phi^*\\omega$ 定义为参数域上的形式：</p>
  $$(\\Phi^*\\omega)_u(v_1,\\ldots,v_k)
    :=\\omega_{\\Phi(u)}(T_u\\Phi(v_1),\\ldots,T_u\\Phi(v_k)).$$
  <p>令 $e_i=\\partial/\\partial u^i$ 为参数域的标准切基，定义系数函数</p>
  $$a_\\Phi(u):=\\omega_{\\Phi(u)}(T_u\\Phi(e_1),\\ldots,T_u\\Phi(e_k)).$$
  <p>由交替多重线性性，有 $\\Phi^*\\omega=a_\\Phi(u)\\,du^1\\wedge\\cdots\\wedge du^k$。<strong>拉回后仍然是形式</strong>；$a_\\Phi$ 才是相对于参数坐标的实值系数函数。求值并没有消灭或改造原来的 $\\omega$。</p>
</div>

<div class="math-definition">
  <div class="math-definition-title">四、严格定义：局部积分与全局积分</div>
  <p>若 $\\omega\\in\\Omega_c^n(M)$ 的支集包含在一张正向图 $U$ 中，令 $\\Phi=x^{-1}:V\\to U$。使用上面的欧氏规则，定义</p>
  $$\\boxed{\\int_M\\omega:=\\int_V\\Phi^*\\omega
    =\\int_V a_\\Phi(u)\\,d\\lambda^n(u).}$$
  <p>对一般紧支集形式，选取正向图覆盖 $\\{U_\\alpha\\}$ 和从属于它的<strong>光滑单位分解</strong> $\\{\\rho_\\alpha\\}$：这些非负光滑函数满足 $\\operatorname{supp}\\rho_\\alpha\\subset U_\\alpha$、$\\sum_\\alpha\\rho_\\alpha=1$，且局部有限（每点附近只有有限个非零权重）。令 $\\Phi_\\alpha:V_\\alpha\\to U_\\alpha$ 为逆图，定义</p>
  $$\\boxed{\\int_M\\omega:=\\sum_\\alpha\\int_{V_\\alpha}
    \\Phi_\\alpha^*(\\rho_\\alpha\\omega).}$$
  <p>每个右端积分都由第二部分化为勒贝格积分；紧支集与局部有限性保证只有有限项贡献。这给出线性映射 $I_M:\\Omega_c^n(M)\\to\\mathbb{R}$。构造还欠一件事：证明这个数不依赖坐标图与权重的选择。</p>
</div>

<details class="proof-card math-proof">
  <summary class="proof-header math-proof-title">证明卡片：为什么坐标和单位分解的选择不影响结果？（展开）</summary>
  <div class="proof-body">
    <details class="proof-step">
      <summary><strong>步骤 1：在两套正向参数中追踪同一个形式</strong></summary>
      <p>先假设支集位于两张图的交集中。令 $\\Phi:D\\to U$、$\\Psi:E\\to U$ 参数化该交集，$h=\\Phi^{-1}\\circ\\Psi:E\\to D$，于是 $\\Psi=\\Phi\\circ h$，且 $\\det Dh>0$。若 $\\Phi^*\\omega=a(u)\\,du^1\\wedge\\cdots\\wedge du^n$，由拉回定义和行列式公式，</p>
      $$\\Psi^*\\omega=b(v)\\,dv^1\\wedge\\cdots\\wedge dv^n,
        \\qquad b(v)=a(h(v))\\det Dh(v).$$
      <p>因此 $a$ 与 $b$ 是<strong>同一个形式在不同参数下的系数</strong>，并不是仅作复合变换的同一个标量场。</p>
    </details>
    <details class="proof-step">
      <summary><strong>步骤 2：使用实分析的换元定理</strong></summary>
      $$\\begin{aligned}
      \\int_E b(v)\\,d\\lambda^n(v)
      &=\\int_E a(h(v))\\det Dh(v)\\,d\\lambda^n(v)\\\\
      &=\\int_E a(h(v))|\\det Dh(v)|\\,d\\lambda^n(v)\\\\
      &=\\int_D a(u)\\,d\\lambda^n(u).
      \\end{aligned}$$
      <p>第二个等号使用正向性，第三个等号才是勒贝格换元定理。形式变换律产生的行列式<strong>恰好满足</strong>换元定理所需的因子。证明不需要把 $d\\lambda$ 当成可约分的代数对象。</p>
    </details>
    <details class="proof-step">
      <summary><strong>步骤 3：用共同细分比较两组单位分解</strong></summary>
      <p>若另一组权重为 $\\{\\sigma_\\beta\\}$，则 $\\rho_\\alpha\\omega=\\sum_\\beta\\rho_\\alpha\\sigma_\\beta\\omega$。每个乘积的支集位于两张图的交集中。利用步骤 2 的局部坐标无关性和线性性，</p>
      $$\\sum_\\alpha\\int\\rho_\\alpha\\omega
        =\\sum_{\\alpha,\\beta}\\int\\rho_\\alpha\\sigma_\\beta\\omega
        =\\sum_\\beta\\int\\sigma_\\beta\\omega.$$
      <p>紧支集保证这里可以交换有限求和。这证明全局定义与所有辅助选择无关。反转 $M$ 的定向则使积分变号：$\\int_{-M}\\omega=-\\int_M\\omega$。</p>
    </details>
  </div>
</details>

<div class="math-definition">
  <div class="math-definition-title">五、沿曲线、曲面或映射的积分</div>
  <p>设 $N$ 是定向 $k$ 维流形，$F:N\\to M$ 光滑，$\\omega\\in\\Omega^k(M)$，并假设 $F^*\\omega$ 紧支集。定义<strong>沿映射的积分</strong> $\\int_F\\omega:=\\int_N F^*\\omega$。若 $N$ 是 $M$ 的子流形，取包含映射 $F=i:N\\hookrightarrow M$，通常简写成 $\\int_N\\omega$。阶数匹配的是积分域 $N$ 的维数，环境流形 $M$ 可以有更高维数。</p>
  <p>特别地，对光滑曲线 $\\gamma:[a,b]\\to M$ 和 1-形式 $\\alpha$，</p>
  $$\\int_\\gamma\\alpha:=\\int_{[a,b]}\\gamma^*\\alpha
    =\\int_{[a,b]}\\alpha_{\\gamma(t)}(\\dot\\gamma(t))\\,d\\lambda^1(t).$$
  <p>这里区间取从 $a$ 到 $b$ 的定向（$a\\lt b$）。带边界流形使用半空间坐标图作同样构造；边界在顶维勒贝格测度下为零。一般映射可以重复覆盖，其积分会计入重数与方向，不能无条件等同于像集上的积分。非紧支集的推广需要另外要求绝对可积。</p>
</div>

<details class="proof-card math-proof">
  <summary class="proof-header math-proof-title">算例卡片：同一个 x dx，换参数与反转路径分别发生什么？（展开）</summary>
  <div class="proof-body">
    <details class="proof-step">
      <summary><strong>步骤 1：在实轴上，从 1 到 4 积分</strong></summary>
      <p>取 $\\alpha=x\\,dx$，实轴取递增定向。由定义，</p>
      $$\\int_{[1,4]}\\alpha=\\int_{[1,4]}x\\,d\\lambda^1(x)=\\frac{15}{2}.$$
    </details>
    <details class="proof-step">
      <summary><strong>步骤 2：改用 x=t²，1 ≤ t ≤ 2，方向保持不变</strong></summary>
      <p>令 $\\gamma(t)=t^2$。由拉回的定义，$\\gamma^*dx=d(x\\circ\\gamma)=2t\\,dt$；所以</p>
      $$\\gamma^*\\alpha=t^2(2t\\,dt)=2t^3\\,dt,\\qquad
        \\int_\\gamma\\alpha=\\int_{[1,2]}2t^3\\,d\\lambda^1(t)=\\frac{15}{2}.$$
      <p>若只把函数 $x$ 换成 $t^2$、漏掉 $dx$ 的拉回，就会误算 $\\int_1^2t^2\\,d\\lambda^1(t)=7/3$。$dx$ 的作用体现在<strong>确定新参数中的系数必须多出 2t</strong>。</p>
    </details>
    <details class="proof-step">
      <summary><strong>步骤 3：令 x=5−s，1 ≤ s ≤ 4，路径从 4 走到 1</strong></summary>
      <p>此时 $\\bar\\gamma^*\\alpha=-(5-s)\\,ds$，故</p>
      $$\\int_{\\bar\\gamma}\\alpha=\\int_{[1,4]}-(5-s)\\,d\\lambda^1(s)=-\\frac{15}{2}.$$
      <p>变号来自路径定向反转。若只是用反向坐标描述原来定向的区间，就必须补上该图相对于既定定向的负号，原积分仍为 $15/2$。</p>
    </details>
  </div>
</details>

<div class="math-intuition intuition-box">
  <div class="math-intuition-title">六、世界观转换：从“函数乘上小长度”到“完整的几何被积对象”</div>
  <p><strong>传统写法 $\\int f(x)\\,dx$ 隐含了实轴上的标准测量规则。</strong>在形式语言中，完整对象是 $\\alpha=f(x)\\,dx$。换坐标时，系数与基形式一起变化，$\\alpha$ 本身保持不变；积分是它与有向路径的配对。单独一个标量函数在一般流形上没有唯一的积分，必须另给测度或密度。</p>
  <ul>
    <li><strong>$dx$：</strong>坐标函数的微分，是 1-形式；拉回遵守链式法则。</li>
    <li><strong>$d\\lambda^n$：</strong>“对标准勒贝格测度积分”的记号；测度换元使用 $|\\det J|$，没有方向符号。</li>
    <li><strong>$\\Delta x$：</strong>有限分割宽度；它出现在逼近积分的和中，不是对 $dx$ 的定义。</li>
  </ul>
  <p>三者通过本节的定义相联系，并非符号偶然重名。把 $\\Delta u^i$ 乘在切向量上本身也合法：由多重线性性，$\\omega(\\Delta u^1v_1,\\ldots,\\Delta u^nv_n)=\\omega(v_1,\\ldots,v_n)\\prod_i\\Delta u^i$；不能把这种黎曼和近似当成流形上两点之差的内蕴定义。</p>
  <p><strong>度规在何处进入？</strong>积分一个已经给定的形式不需要度规。若需要物理长度或体积，则黎曼度规 $g$ 选择体积密度 $\\sqrt{\\det(g_{ij})}|dx^1\\cdots dx^n|$；有定向时对应体积形式 $\\mathrm{vol}_g=\\sqrt{\\det(g_{ij})}dx^1\\wedge\\cdots\\wedge dx^n$。密度按雅可比绝对值变换，因此也能在不可定向流形上积分。绝对值在这里保证坐标无关性。</p>
  <p>例如区间 $[1,4]$ 上 $\\int dx=3$；若度规为 $g=4\\,dx\\otimes dx$，其长度却是 $\\int_{[1,4]}2\\,d\\lambda^1=6$。给定形式的积分与由度规选择的长度，可以是不同的量。</p>
</div>

<details class="proof-card math-intuition">
  <summary class="proof-header math-intuition-title">理解检查：为什么系数函数不能单独代表形式？</summary>
  <div class="proof-body">
    <p>在同一条定向实轴上令 $x=2u$。$\\alpha=dx$ 在 $x$ 坐标中的系数是 $1$，在 $u$ 坐标中的系数是 $2$，因为 $\\alpha=2du$。而标量函数 $f\\equiv1$ 在两个坐标中仍然都是 $1$。<strong>形式的系数必须连同坐标基形式一起理解。</strong>这正是形式积分能够不依赖坐标的原因。</p>
  </div>
</details>

<p class="math-motivation">定义与证明的参考：Nigel Hitchin，<a href="https://people.maths.ox.ac.uk/joyce/Nairobi2019/Hitchin-DifferentiableManifolds.pdf" target="_blank" rel="noopener noreferrer">Differentiable Manifolds，§6.2、§7.1</a>（单位分解、定向与形式积分）。</p>
`
};

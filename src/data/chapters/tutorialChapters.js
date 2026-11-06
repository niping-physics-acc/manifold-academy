// Short prerequisite lessons. Each section poses one question before introducing notation.
const section = (id, number, heading, content) => ({ id, number, heading, content });
const check = (question, answer) => `<details class="lesson-check"><summary>停下来算一算：${question}</summary><div>${answer}</div></details>`;

export const calculusBridgeChapter = {
  id: 'calculus-bridge', disciplineId: 'foundations', title: '从基础微积分出发：读懂几何与物理的六件工具',
  subtitle: '函数、线性测量、链式法则、行列式、微分方程与复数',
  level: '起步教程', readingTime: '分 6 次，每次约 15 min', prereqs: ['一元导数', '定积分', '初等代数'],
  summary: '把已经学过的微积分变成后续课程可反复使用的工具。每节先算一个具体例子，再给一般记号；遇到后面的抽象内容时，可以沿链接回到这里复习。',
  sections: [
    section('start-quantities', '0.1', '积分之前：你想累计什么量？', `
      <p>车速 $v(t)$ 的单位是米/秒。小时间段 $\\Delta t$ 中的位移近似为 $v(t)\\Delta t$，于是 $\\int v(t)\\,dt$ 的单位是米。这个积分有物理意义，因为我们先给出了“速度如何贡献位移”的关系。</p>
      <p>若函数是杆上的温度 $T(x)$，$\\int T(x)\\,dx$ 的单位却是温度乘长度。数学上它完全可以计算，但它本身不等于热量。若要算热量变化，还需线密度 $\\rho_\\ell$、比热 $c$ 和温差 $\\Delta T$，才得到 $\\int c\\rho_\\ell\\Delta T\\,dx$。</p>
      <div class="math-intuition intuition-box"><strong>先做三项约定：</strong>区域是什么？函数测量什么？按时间、长度、面积还是别的规则累计？函数并不会因为出现在积分号内就自动成为质量或概率密度。</div>
      <p>本教程把累计规则写清楚。以后看到 $f\\,dx$，请同时读出 $f$ 的含义和 $dx$ 的含义。</p>
      ${check('恒温 300 K 的两米长杆，积分温度得到什么？', '<p>得到 600 K·m。平均温度需再除以总长度，得到 300 K；计算热量还需要材料数据。</p>')}`),
    section('start-linear', '0.2', '向量和线性测量：一列数与一行数做什么？', `
      <p>用两个数表示一个平面方向 $v=(v^1,v^2)$。它们是相对于所选两根基向量的分量；$v^1,v^2$ 的上标在这里是编号。两个方向可以相加，方向可以乘实数，这就是我们此处需要的向量空间结构。</p>
      <p>一个线性测量 $\\alpha$ 接受方向，返回一个数，并满足 $\\alpha(av+bw)=a\\alpha(v)+b\\alpha(w)$。例如</p>
      $$\\alpha(v)=3v^1-v^2,\\qquad \\alpha(2,1)=5.$$
      <p>所有这样的测量组成对偶空间。这里的“对偶”只表示输入是原空间的向量；暂时不需要丛或流形。线性测量与向量可以用不同的分量变换来描述同一次求值。</p>
      <details class="proof-card math-proof"><summary class="proof-header">算例：把横向坐标放大两倍（展开）</summary><div class="proof-body">
      <p>新坐标 $u=2x,v=y$。同一个速度原来分量为 $(2,1)$，新分量为 $(4,1)$。测量原来是 $3\\,dx-dy$，现在是 $\\tfrac32du-dv$，于是 $\\tfrac32\\cdot4-1=5$。改变的是分量，测量结果保持不变。</p></div></details>
      ${check('测量 α(v)=2v¹+v²，输入 v=(−1,3) 的结果？', '<p>结果是 1。这个数由两者的配对产生；单独一个方向不等于一个测量。</p>')}`),
    section('start-chain', '0.3', '从一元链式法则到沿曲线求导', `
      <p>设平面上的函数 $f(x,y)=x^2+y$，粒子沿 $\\gamma(t)=(t,t^2)$ 运动。先代入轨道，得到 $f(\\gamma(t))=2t^2$，所以变化率为 $4t$。</p>
      <p>也可以先问：只改变 $x$ 时函数怎样变？只改变 $y$ 时怎样变？这分别是偏导数 $\\partial_xf=2x$、$\\partial_yf=1$。把两个坐标的变化率乘进去：</p>
      $$\\frac{d}{dt}f(x(t),y(t))=\\partial_x f\\,x'(t)+\\partial_y f\\,y'(t)=2t+2t=4t.$$
      <p>向量 $(x'(t),y'(t))$ 是速度；$df$ 是把速度变成函数变化率的线性测量。后面的拉回会把这条链式法则写成对几何对象的操作。</p>
      ${check('若 f=x+y²，沿同一轨道 γ(t)=(t,t²)，变化率是多少？', '<p>先代入得到 $t+t^4$，导数为 $1+4t^3$；按链式法则则为 $1+2t^2\\cdot2t$。</p>')}`),
    section('start-determinant', '0.4', '矩阵与行列式：小方格怎样变形？', `
      <p>线性映射把输入的两根标准基向量送到 $u=(a,c)$、$v=(b,d)$，用矩阵 $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ 记录。它把单位正方形变成由 $u,v$ 张成的平行四边形。</p>
      <p>有向面积的放大因子是 $\\det A=ad-bc$。绝对值表示面积倍数，符号记录顺序是否翻转。两列平行时面积为零，矩阵不能把二维信息完整保留。</p>
      <div data-lesson-lab="area"></div>
      <p>非线性映射在一点附近用导数矩阵近似，这个矩阵叫雅可比矩阵。换元积分中的雅可比因子，就是局部小方格面积的变化率。</p>
      ${check('u=(2,0)、v=(1,1) 的有向面积？交换两根向量呢？', '<p>面积值为 2；交换后是 −2，非负面积仍是 2。</p>')}`),
    section('start-ode', '0.5', '微分方程：给变化率，再寻找运动', `
      <p>导数题从 $x(t)$ 算 $x'(t)$；微分方程反过来，给出变化率的关系，再找满足关系的函数。初始条件指定是哪一条运动。</p>
      <p>弹簧的力与位移相反：$F=-kx$。牛顿定律 $m x''=-kx$ 给出 $x''+\\omega^2x=0$，其中 $\\omega=\\sqrt{k/m}$。把 $x(t)=A\\cos(\\omega t)+B\\sin(\\omega t)$ 求两次导数，就能验证它是解。</p>
      <p>若 $x(0)=x_0$、$x'(0)=v_0$，则 $A=x_0$、$B=v_0/\\omega$。同一方程的不同解对应不同初始状态。后面把 $(x,x')$ 或 $(x,p)$ 放在一起，是为了用一个点记录这份状态。</p>
      ${check('初始位置为 1、初始速度为 0，ω=2 时的解？', '<p>$x(t)=\\cos(2t)$，速度为 $-2\\sin(2t)$。</p>')}`),
    section('start-complex', '0.6', '复数与概率：量子与统计课程需要的语言', `
      <p>复数 $z=a+ib$ 用两个实数记录大小与相位，$i^2=-1$。复共轭为 $\\bar z=a-ib$，模平方为 $|z|^2=a^2+b^2$。Euler 公式 $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$ 把相位变化写成平面旋转。</p>
      <p>离散概率 $P_j$ 满足 $P_j\\geq0$、$\\sum_jP_j=1$，平均值为 $\\langle E\\rangle=\\sum_jP_jE_j$。连续概率要指定累计规则，例如 $P(A)=\\int_A\\rho(x)\\,dx$，其中 $\\rho$ 是每单位长度的概率，满足 $\\int\\rho\\,dx=1$。</p>
      <p>量子振幅可以为复数；先把振幅相加，再取模平方，和直接相加概率不是同一种运算。例如两个振幅 $1$ 与 $-1$ 相加为零，展示了相消干涉的代数基础。</p>
      ${check('z=3+4i 的模平方是多少？它能直接当概率吗？', '<p>模平方是 25。要作为某组结果的概率，还需要对整组振幅归一化，使模平方之和为 1。</p>')}`)
  ], homework: []
};

export const geometryIntroChapter = {
  id: 'geometry-intro', disciplineId: 'foundations', title: '微分几何先体验：从一条曲线到一片曲面',
  subtitle: '先画、先算，再给这些操作命名', level: '几何入门', readingTime: '分 6 次，每次约 20 min',
  prereqs: ['起步教程 0.1–0.4'],
  summary: '先用平面和空间中的具体对象认识图卡、切向量、1-形式与2-形式。沿曲线累计和曲面求积都先算一个完整例子，再进入第 1 章的严格构造。',
  sections: [
    section('intro-charts', 'G.1', '圆周上的位置：坐标只是给点编号', `
      <p>单位圆上的点可写成 $\\gamma(\\theta)=(\\cos\\theta,\\sin\\theta)$。圆周本身是一维的，因为局部只需一个数 $\\theta$ 就能确定位置。它画在二维纸面上，不会因此变成二维空间。</p>
      <p>$\\theta$ 和 $\\theta+2\\pi$ 指向同一点，因此这个公式不能给整个圆提供一个一一对应的实数坐标。去掉一个点，可以取一段角度区间作坐标；换一个被去掉的点，得到另一张图。重叠处可以互相换算，这就是图卡与图册的原型。</p>
      <p>半径为 $R$ 的圆用同样的角度编号，但一段弧的长度是 $R\\Delta\\theta$。给点编号与选择长度规则，是两份数据。</p>
      ${check('同样跨过 0.1 弧度，半径 1 与半径 2 的圆弧长度相同吗？', '<p>分别为 0.1 和 0.2。坐标差相同不保证物理长度相同。</p>')}`),
    section('intro-tangent', 'G.2', '切向量：从一条轨道提取瞬时速度', `
      <p>对单位圆参数式求导，得到 $\\dot\\gamma(\\theta)=(-\\sin\\theta,\\cos\\theta)$。在 $\\theta=0$ 时，点为 $(1,0)$，速度为 $(0,1)$，沿圆周向上。</p>
      <p>如果改用 $\\theta=2t$，速度变成原来的两倍；图形和经过的点不变，经过的快慢改变。对任意函数 $f$，速度如何影响它的读数，由 $\\frac{d}{dt}f(\\gamma(t))$ 描述。这就是把切向量解释为方向导数的原因。</p>
      ${check('在 (1,0) 处沿圆周运动，函数 f(x,y)=x 的变化率是多少？', '<p>该点速度只有 y 分量，所以变化率是 0；这不代表粒子静止。</p>')}`),
    section('intro-covector', 'G.3', '1-形式：对同一个速度，可以问不同的问题', `
      <p>速度为 $v=(v_x,v_y)$ 时，$dx(v)=v_x$ 问横坐标变化多快，$dy(v)=v_y$ 问纵坐标变化多快；$\\alpha=2dx+dy$ 则返回 $2v_x+v_y$。这些都是接受向量的线性函数。</p>
      <div data-lesson-lab="covector"></div>
      <p>若 $f=2x+y$，则 $df=2dx+dy$。然而形式也可以有随点变化的系数，例如 $\\alpha=-y\\,dx+x\\,dy$。一般不能假定它是某个全局函数的微分；后面的闭路积分会检测这一点。</p>
      ${check('为什么 dx(v)=0 不代表 v=0？', '<p>dx 只读取一个方向的坐标变化。比如 v=(0,3) 的横向读数为 0，纵向读数为 3。</p>')}`),
    section('intro-wedge', 'G.4', '2-形式：两根方向共同决定一个有向面积值', `
      <p>两根方向 $u=(u_x,u_y)$、$v=(v_x,v_y)$ 张成平行四边形。组合 $dx,dy$，定义</p>
      $$(dx\\wedge dy)(u,v)=u_xv_y-u_yv_x.$$
      <p>这个交替双线性测量就是 2-形式的原型。交换输入顺序会变号；两根方向共线会给出零。它是在一个切空间里计算的局部量，整片曲面的总量还需要积分。</p>
      <div data-lesson-lab="area"></div>
      ${check('平行四边形被剪斜后，面积一定改变吗？', '<p>不一定。固定 u=(1,0)，把 v 从 (0,1) 变为 (s,1)，行列式始终为 1。</p>')}`),
    section('intro-line-integral', 'G.5', '沿圆周做功：一次完整的形式积分', `
      <p>在平面上给出做功形式 $\\alpha=\\tfrac12(-y\\,dx+x\\,dy)$。沿单位圆 $\\gamma(t)=(\\cos t,\\sin t)$，$0\\leq t\\leq2\\pi$，先代入位置，再代入变化率：</p>
      $$\\alpha_{\\gamma(t)}(\\dot\\gamma(t))=
        \\tfrac12\\big[-\\sin t(-\\sin t)+\\cos t\\cos t\\big]=\\tfrac12.$$
      <p>因此累计做功为 $\\int_0^{2\\pi}\\tfrac12\\,dt=\\pi$。反向走一圈，速度反号，积分成为 $-\\pi$。若 $\\alpha=df$ 是一个全局函数的微分，走回起点应得到 $f(\\text{终点})-f(\\text{起点})=0$，因此这个算例说明它不可能是平面上的全局全微分。</p>
      ${check('反向走一圈，路径长度会成为负值吗？', '<p>不会。做功形式对方向敏感；长度按速度的非负大小累计。二者对应不同的被积对象。</p>')}`),
    section('intro-surface', 'G.6', '弯曲曲面上，坐标面积和实际面积为什么不同？', `
      <p>把单位方形的参数 $(u,v)$ 放到曲面 $\\Phi(u,v)=(u,v,u^2+v^2)$ 上。沿两个参数方向的切向量分别为 $(1,0,2u)$ 与 $(0,1,2v)$。</p>
      <p>形式 $dx\\wedge dy$ 只读取前两个分量，因此对这两根向量给出 $1$。它在这块曲面上的积分为 $\\int_0^1\\int_0^1 1\\,du\\,dv=1$，测量的是有向投影面积。</p>
      <p>若要曲面实际面积，欧氏长度规则给出的系数是 $\\sqrt{1+4u^2+4v^2}$。这来自两根切向量张成的平行四边形的欧氏面积，除原点外都大于 $1$。这个面积系数是额外选择的度规参与计算的结果。</p>
      <details class="proof-card math-proof"><summary class="proof-header">面积系数从哪里算出来？</summary><div class="proof-body"><p>记两根切向量为 a、b。欧氏内积就是对应分量乘积相加，长度平方为自身内积。由底乘高，面积为 $|a||b|\\sin\\theta$；再用 $a\\cdot b=|a||b|\\cos\\theta$，面积平方为 $|a|^2|b|^2-(a\\cdot b)^2$。本例中</p>$$|a|^2=1+4u^2,\\quad |b|^2=1+4v^2,\\quad a\\cdot b=4uv,$$<p>所以面积平方为 $(1+4u^2)(1+4v^2)-16u^2v^2=1+4u^2+4v^2$。对它开正平方根，就得到按参数小方格累计实际面积时的系数。</p></div></details>
      ${check('形式 dx∧dy 的积分为 1，是否说明曲面是平的？', '<p>不说明。它计算投影面积，并没有记录竖直方向的起伏。要问实际面积，需要更换被积对象。</p>')}`)
  ], homework: []
};

export const physicsPrimerChapter = {
  id: 'physics-primer', disciplineId: 'foundations', title: '理论物理的起点：八个可计算的模型',
  subtitle: '从牛顿方程、能量与概率走向几何理论', level: '物理桥梁', readingTime: '分 8 次，每次约 25 min',
  prereqs: ['起步教程 0.1–0.6'],
  summary: '先建立各学科要回答的物理问题。这里完成最小模型的计算，后续课程再把同样的关系推广到流形、相空间、连续对称性与量子态空间。',
  sections: [
    section('physics-work', 'P.1', '牛顿方程如何给出能量守恒？', `
      <p>一维运动满足 $m\\ddot q=F(q)$，点号表示对时间求导。若存在势能函数 $V(q)$ 使 $F=-V'(q)$，两边乘速度 $\\dot q$：</p>
      $$m\\ddot q\\dot q=-V'(q)\\dot q
        \\quad\\Longrightarrow\\quad
        \\frac{d}{dt}\\left(\\tfrac12m\\dot q^2+V(q)\\right)=0.$$
      <p>所以动能加势能沿运动保持不变。这里用到的只是链式法则。力乘位移的积分等于动能变化；力对应的 1-形式 $F(q)dq$ 接受速度后给出功率。</p>
      ${check('弹簧 F=−kq 的势能是什么？', '<p>$V(q)=kq^2/2+C$。常数 C 不影响力。</p>')}`),
    section('physics-variation', 'P.2', '拉格朗日方法：比较相邻的整条路径', `
      <p>定义 $L(q,\\dot q)=m\\dot q^2/2-V(q)$，称为拉格朗日量。路径的作用量是 $S[q]=\\int_{t_0}^{t_1}L\\,dt$。现在让路径轻微变化为 $q_\\varepsilon=q+\\varepsilon\\eta$，其中扰动 $\\eta$ 在两个端点为零。</p>
      <details class="proof-card math-proof"><summary class="proof-header">逐步算出第一变分（展开）</summary><div class="proof-body">
      <p>对普通实参数 $\\varepsilon$ 求导，再令它为零：</p>
      $$\\left.\\frac{dS[q_\\varepsilon]}{d\\varepsilon}\\right|_0
        =\\int_{t_0}^{t_1}\\left(L_q\\eta+L_{\\dot q}\\dot\\eta\\right)dt.$$
      <p>第二项分部积分。端点项因 $\\eta=0$ 消失，剩下 $\\int(L_q-\\frac{d}{dt}L_{\\dot q})\\eta\\,dt$。若对所有这样的扰动都为零，连续的括号内函数必须处处为零：</p>
      $$\\frac{d}{dt}\\frac{\\partial L}{\\partial\\dot q}-\\frac{\\partial L}{\\partial q}=0.$$
      <p>代入本例得 $m\\ddot q+V'(q)=0$，恢复牛顿方程。驻值不一定是最小值。</p></div></details>
      ${check('L=mq̇²/2−kq²/2 给出哪个运动方程？', '<p>$m\\ddot q+kq=0$，就是起步教程中的简谐振子。</p>')}`),
    section('physics-phase', 'P.3', '哈密顿方法：用位置和动量表示状态', `
      <p>定义动量 $p=\\partial L/\\partial\\dot q=m\\dot q$，消去速度后定义能量函数 $H=p\\dot q-L=p^2/(2m)+V(q)$。在这个模型中，运动写为两条一阶方程：</p>
      $$\\dot q=\\frac{\\partial H}{\\partial p}=\\frac{p}{m},
        \\qquad \\dot p=-\\frac{\\partial H}{\\partial q}=-V'(q).$$
      <p>状态是平面中的点 $(q,p)$；运动是一条相空间曲线。对弹簧，能量固定意味着 $p^2/(2m)+kq^2/2=E$，是一条椭圆。哈密顿几何后来研究这类流怎样影响有向面积 $dq\\wedge dp$。</p>
      ${check('为什么只给位置还不能预测后续运动？', '<p>在同一位置可以有不同动量；状态需要同时给出 q 和 p。</p>')}`),
    section('physics-fields', 'P.4', '场与通量：电动力学从哪个问题出发？', `
      <p>场为每个空间位置指定一个物理量。例如静电势 $\\phi(x)$ 为每点给出电势，沿一条直线的电场为 $E(x)=-\\phi'(x)$。沿线段的电势差等于 $-\\int E(x)\\,dx$。</p>
      <p>通量问的是穿过一个面的总贡献。在一维平面对称模型中，高斯定律给出 $E(b)-E(a)=\\varepsilon_0^{-1}\\int_a^b\\rho(x)\\,dx$；这里 $\\rho$ 是体电荷密度，等式按单位横截面积计，$\\varepsilon_0$ 是真空介电常数。</p>
      <p>三维的对应结构是“闭曲面的总电通量等于包围电荷除以 $\\varepsilon_0$”。这解释了为什么电动力学需要线积分、面积分与边界关系；学习完整 Maxwell 方程后，才进入四维势与场强形式。</p>
      ${check('电势整体增加常数 C，电场会改变吗？', '<p>不会，因为常数的导数为零。这是理解势的表示自由度的一个起点。</p>')}`),
    section('physics-ensemble', 'P.5', '统计力学：不知道微观状态时怎样预测平均量？', `
      <p>假设系统只有能量 $0$ 和 $\\Delta>0$ 两种状态。与温度 $T$ 的热库平衡时，正则模型给它们权重 $1$ 与 $e^{-\\beta\\Delta}$，其中 $\\beta=1/(k_BT)$，$k_B$ 是玻尔兹曼常数。</p>
      $$Z=1+e^{-\\beta\\Delta},\\qquad P_1=1/Z,
        \\quad P_2=e^{-\\beta\\Delta}/Z,\\qquad
        \\langle E\\rangle=\\Delta P_2.$$
      <p>$Z$ 负责把权重归一化。低温时高能态难以占据；高温极限两态概率趋于相等。本节把正则权重作为平衡模型的输入；其物理推导与适用条件是统计力学课程的任务。</p>
      <p>连续相空间中，概率要写成分布函数对相空间测量规则的积分。此时“概率密度相对于什么”就成为不可省略的问题。</p>
      ${check('高温极限的平均能量是多少？', '<p>两态各占一半，所以平均能量趋于 Δ/2。</p>')}`),
    section('physics-symmetry-quantum', 'P.6', '连续对称与量子态：从旋转和两态振幅开始', `
      <p>平面旋转由 $R(\\theta)=\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$ 表示。连续做两次旋转，角度相加；微小旋转满足 $R(\\theta)=I+\\theta J+O(\\theta^2)$，其中 $J=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ 是在零角度处的导数。$O(\\theta^2)$ 表示误差至多与角度平方同阶。李群研究有限变换，李代数研究这种无穷小生成元。</p>
      <p>最简单量子态由两个复振幅 $\\psi=(a,b)$ 表示，要求 $|a|^2+|b|^2=1$。在所选测量基中，两种结果的概率分别是这两个模平方。整体相位 $e^{i\\chi}\\psi$ 不改变任何测量概率；相对相位却可以改变干涉结果。</p>
      <p>量子力学课程先需要线性算符、内积与时间演化；射影希尔伯特空间和 Berry 相位是随后对这些结构的几何解释。</p>
      ${check('ψ=(1,i)/√2 的两个基测量概率是多少？', '<p>都是 1/2。第二个振幅的相位不是另一个概率。</p>')}`),
    section('physics-quantum-tools', 'P.7', '从两个复数到算符、测量与时间演化', `
      <p>量子态需要给出各测量结果的概率以及它们之间的干涉。先只研究两个可能结果的系统。向量 $\\psi=(a,b)$ 的内积定义为 $\\langle\\phi,\\psi\\rangle=\\overline{\\phi_1}a+\\overline{\\phi_2}b$；上划线表示复共轭。自身内积 $|a|^2+|b|^2$ 是范数的平方，物理态归一化为 1。</p>
      <p>线性算符在这里就是作用于列向量的矩阵。厄米算符满足 $A^\\dagger=A$，其中 $\\dagger$ 表示转置再取复共轭。若非零向量 u 满足 $Au=\\lambda u$，就称 u 为本征向量，倍数 $\\lambda$ 为本征值：矩阵作用后，向量仅被乘了一个数。</p>
      <p>本节使用如下量子公设：可观测量由厄米算符表示；本征值是可能的测量结果。在本节的两个不同本征值的模型中，归一化本征向量 $u$ 对应的概率为 $|\\langle u,\\psi\\rangle|^2$。这些是物理理论的输入，不能只凭微积分推出。</p>
      <details class="proof-card math-proof"><summary class="proof-header">两能级例子：完整计算相位如何演化</summary><div class="proof-body">
        <p>取能量算符 $H=\\begin{pmatrix}0&0\\\\0&\\Delta\\end{pmatrix}$，$\\Delta>0$。它的本征态为 $(1,0)$ 与 $(0,1)$，能量分别为 0 与 $\\Delta$。初态取 $\\psi(0)=(1,1)/\\sqrt2$。</p>
        <p>时间演化遵从 $i\\hbar\\dot\\psi=H\\psi$，$\\hbar$ 是约化普朗克常数。按分量展开，得到 $\\dot a=0$ 与 $\\dot b=-i\\Delta b/\\hbar$，所以</p>
        $$\\psi(t)=\\frac{1}{\\sqrt2}(1,e^{-i\\Delta t/\\hbar}).$$
        <p>两种能量的概率仍各为 1/2。然而在 $u_+=(1,1)/\\sqrt2$ 这个测量方向上的概率为</p>
        $$|\\langle u_+,\\psi(t)\\rangle|^2
          =\\left|\\frac{1+e^{-i\\Delta t/\\hbar}}{2}\\right|^2
          =\\frac{1+\\cos(\\Delta t/\\hbar)}2.$$
        <p>最后一步使用 $|z|^2=z\\bar z$ 展开乘法。可见相对相位能改变另一组测量基中的概率；整体乘同一个单位复数则不改变任何内积的模平方。</p>
      </div></details>
      <p>有限维复向量空间连同这个内积，是希尔伯特空间的最简单例子。无限维理论还要处理完备性、算符定义域等问题；后续几何课程先从这个有限维模型进入射影态空间。</p>
      ${check('为什么演化中的范数仍等于 1？', '<p>两个分量的模始终都是 $1/\\sqrt2$。一般厄米 H 的演化也保持内积；本例已经可以直接验证。</p>')}`),
    section('physics-maxwell', 'P.8', '从小盒子、小回路到 Maxwell 方程', `
      <p>三维场需要描述向外流出和沿圈环流两个不同操作。对光滑向量场 $E=(E_x,E_y,E_z)$，取轴向小盒子。相对两面的通量差约为对应分量的偏导数乘盒子体积，三对面相加并除以体积，极限为</p>
      $$\\operatorname{div}E=\\partial_xE_x+\\partial_yE_y+\\partial_zE_z.$$
      <p>它叫散度：单位体积的向外净通量。类似地，在 xy 平面的小矩形上逆时针累计 $E_xdx+E_ydy$，除以矩形面积后趋于 $\\partial_xE_y-\\partial_yE_x$。三个坐标平面的结果组合成旋度：</p>
      $$\\operatorname{curl}E=(\\partial_yE_z-\\partial_zE_y,\\partial_zE_x-\\partial_xE_z,\\partial_xE_y-\\partial_yE_x).$$
      <details class="proof-card math-proof"><summary class="proof-header">核算一个局部环流：E=(−y/2,x/2,0)</summary><div class="proof-body"><p>这个场的散度为零，旋度为 $(0,0,1)$。在边长 a、b 的矩形 $[0,a]\\times[0,b]$ 上逆时针行走：底边贡献 0，右边贡献 ab/2，顶边反向贡献 ab/2，左边贡献 0。总环流 ab 等于面积乘旋度的 z 分量。这是 Stokes 关系的一个直接算例。</p></div></details>
      <p>在真空的 SI 单位制中，给定电荷密度 $\\rho$ 和电流密度向量 $j$，电场 E、磁场 B 满足</p>
      $$\\operatorname{div}E=\\rho/\\varepsilon_0,\\qquad
        \\operatorname{div}B=0,$$
      $$\\operatorname{curl}E=-\\partial_tB,\\qquad
        \\operatorname{curl}B=\\mu_0j+\\mu_0\\varepsilon_0\\partial_tE.$$
      <p>$\\varepsilon_0$、$\\mu_0$ 分别是真空介电常数与磁导率。第一行规定通量与源的关系，第二行规定环流与时间变化及电流的关系。这些是经典电磁学的物理定律；几何语言会统一它们的表达，并不替代实验输入。</p>
      <p>例如在无源区取 $E=(E_x(z,t),0,0)$、$B=(0,B_y(z,t),0)$。旋度方程逐项给出 $\\partial_zE_x=-\\partial_tB_y$ 与 $-\\partial_zB_y=\\mu_0\\varepsilon_0\\partial_tE_x$。对前式再求 z 导数，并用后式消去 B，得 $\\partial_z^2E_x=\\mu_0\\varepsilon_0\\partial_t^2E_x$：场以速度 $c=1/\\sqrt{\\mu_0\\varepsilon_0}$ 传播。</p>
      ${check('E=(ax,0,0) 的散度和旋度是多少？它在静电情况下对应什么电荷？', '<p>散度为 a，旋度为零。高斯定律要求电荷密度为 $\\rho=\\varepsilon_0a$。</p>')}`)
  ], homework: []
};

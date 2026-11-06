import { integrationDefinitionSection as rigorousSection } from './integrationDefinition.js';

export const integrationJourneySection = {
  ...rigorousSection,
  heading: '积分为什么这样定义：从小区间累计到流形上的积分',
  content: `
<div class="lesson-lead">
  <p class="lesson-eyebrow">本节只沿一条主线前进</p>
  <h3>每一小块贡献多少，换一套坐标后为什么仍是同一个总量？</h3>
  <p>先用一元微积分完整走一遍，再进入曲线、曲面与多张图卡。第一次阅读只需会求导、定积分与二阶行列式；测度论和一般流形上的严格构造放在最后的展开卡片中。</p>
  <ol class="lesson-route"><li>明确要累计的对象</li><li>从有限小段得到定义</li><li>换参数并保留每段的贡献</li><li>用两个方向处理曲面</li><li>拼接多个局部计算</li></ol>
</div>

<div class="math-intuition intuition-box" id="integral-physical-question">
  <div class="math-intuition-title">一、先回答你的疑问：f 本来就必须是物理密度吗？</div>
  <p><strong>不必。</strong>任意连续函数 $f$ 都能在有限区间上按通常方式积分。数学构造只要求足够的可积性，不要求 $f$ 具有质量、电荷或概率的物理意义。</p>
  <p>但是，要把积分解释为某个<strong>物理总量</strong>，必须先规定局部量怎样贡献这个总量。杆的线密度 $\\rho(x)$ 若以 kg/m 表示，小段质量近似为 $\\rho(x)\\Delta x$；温度 $T(x)$ 以 K 表示，$T(x)\\Delta x$ 的单位是 K·m，不能直接称为热量。</p>
  <p>更一般地，先选定参考测量规则 $\\nu$，再说“$\\rho$ 是每单位 $\\nu$ 的质量”。此时 $\\rho$ 是相对于这份规则的权重；换坐标时，作为标量场的 $\\rho$ 只作函数复合，参考体积的坐标系数还要随坐标改变。<strong>相对于参考体积的密度，与相对于坐标体积的系数，需要分清。</strong></p>
  <div class="lesson-table-wrap"><table class="lesson-table"><thead><tr><th>对象</th><th>换成 x=h(u) 时</th><th>还需什么？</th></tr></thead><tbody>
    <tr><td>标量场 $T$</td><td>坐标表达变成 $T(h(u))$</td><td>要累计它，还需选定长度或其他测量规则</td></tr>
    <tr><td>同一个 1-形式 $\\alpha=f_x(x)dx$</td><td>系数成为 $f_u(u)=f_x(h(u))h'(u)$</td><td>给定有向路径即可定义形式积分</td></tr>
    <tr><td>质量分布 $\\rho$ 连同参考长度</td><td>长度换元产生 $|h'(u)|$</td><td>质量使用非负长度；反向走不使质量变负</td></tr>
  </tbody></table></div>
  <p>形式系数 $f_x$ 的下标只提醒它依赖所选坐标。它不一定是一个预先存在的内蕴标量场。选定 $x$ 后，任何函数 $f$ 都能组成 $f\\,dx$；若换坐标却重新写成 $f\\,du$，通常已经更换了几何对象。</p>
</div>

<div class="math-definition" id="integral-motivation">
  <div class="math-definition-title">二、为什么对形式积分，要等于对它的系数积分？</div>
  <p>先在实轴上工作，给区间 $[a,b]$ 从左到右的方向。坐标函数是 $x$，1-形式 $dx$ 的定义是 $dx(v)=v(x)$，因此 $dx(\\partial_x)=1$。给一个连续的形式 $\\alpha=f(x)dx$。</p>
  <details class="proof-card math-proof" open>
    <summary class="proof-header">从有限分割得到积分定义（逐步展开）</summary>
    <div class="proof-body">
      <details class="proof-step" open><summary>步骤 1：把区间切成有限小段</summary>
        <p>取 $a=x_0&lt;x_1&lt;\\cdots&lt;x_N=b$，第 $i$ 段宽度为 $\\Delta x_i=x_{i+1}-x_i$，选取样点 $\\xi_i$。这时所有宽度都是真实的有限数，还没有取极限。</p>
      </details>
      <details class="proof-step"><summary>步骤 2：把每一段的方向和宽度送入局部测量</summary>
        <p>实轴上的坐标给出样点处的切向量 $\\Delta x_i\\partial_x|_{\\xi_i}$。线性性给出精确等式：</p>
        $$\\alpha_{\\xi_i}(\\Delta x_i\\partial_x)
          =f(\\xi_i)\\,dx_{\\xi_i}(\\Delta x_i\\partial_x)
          =f(\\xi_i)\\Delta x_i.$$
        <p>左边是形式对一个切向量的求值；右边是熟悉的“函数值乘区间宽度”。用样点的一次测量代表整段贡献是近似，近似会随分割加细而改善。一般流形上没有天然的“两点相减”，此处的构造明确使用实轴坐标。</p>
      </details>
      <details class="proof-step"><summary>步骤 3：把各段贡献相加，再取极限</summary>
        $$\\int_{[a,b]}\\alpha:=\\lim_{|P|\\to0}
          \\sum_{i=0}^{N-1}\\alpha_{\\xi_i}(\\Delta x_i\\partial_x)
          =\\int_a^b f(x)\\,dx.$$
        <p>$|P|$ 表示最大分段宽度。右端就是普通黎曼积分。由于 $f$ 连续，极限与样点选择无关。形式求值没有创造另一套分析运算；它把每段贡献写成了可以换坐标的几何表达。</p>
      </details>
    </div>
  </details>
  <p><strong>这套定义采用的规范化是：</strong>在标准坐标与递增定向下，$dx$ 在 $[a,b]$ 上累计为 $b-a$。再要求对形式线性、对区间可加、对一致逼近连续，连续系数的积分就由上述和式确定。仅凭“线性”和“坐标无关”两条要求，并不能凭空确定全部积分理论。</p>
  <p>推广到 $n$ 维时，$du^1\\wedge\\cdots\\wedge du^n$ 对坐标小方格的边向量求值，给出边长乘积；于是同样恢复多重积分。记 $\\lambda^n$ 为参数空间里通常的无向体积测量规则（勒贝格测度，严格构造见 1.6）。对于按坐标次序定向的区域 $V$ 和可积系数 $a$，定义为</p>
  $$\\int_V a(u)\\,du^1\\wedge\\cdots\\wedge du^n
    :=\\int_V a(u)\\,d\\lambda^n(u).$$
  <p>这是让局部几何测量与普通积分相容的定义。它没有额外假定 $a$ 是某种物理密度。</p>
</div>

<div class="lesson-experiment">
  <h3>先观察再继续：同一条杆，换坐标、换方向、换累计对象</h3>
  <p>下图把等长的参数小格映射到 $x\\in[1,4]$。调节参数分布，观察小格在杆上如何变宽或变窄。比较形式积分、质量积分，以及遗漏换元因子时实际算到的另一个量。</p>
  <div data-lesson-lab="integral"></div>
  <details class="lesson-check"><summary>为什么参数小格不均匀时，总量仍可以不变？</summary><p>同一个小参数格对应的物理宽度改变了；正确的新系数同时包含这个宽度变化率。有限分割有近似误差，增大分段数后会接近同一个极限。</p></details>
</div>

<div class="math-definition" id="pullback-one-dimension">
  <div class="math-definition-title">三、先只换一个参数：“拉回”就是追踪同一份测量</div>
  <p>仍取 $\\alpha=x\\,dx$，要从 $x=1$ 走到 $x=4$。改用 $x=\\gamma(t)=t^2$，其中 $1\\leq t\\leq2$。请分别追踪位置与切方向：</p>
  <ol class="lesson-route">
    <li><strong>位置：</strong>参数点 $t$ 对应实轴点 $x=t^2$，所以系数 $x$ 的数值为 $t^2$。</li>
    <li><strong>方向：</strong>参数速度 $\\partial_t$ 映成 $2t\\partial_x$，这就是普通导数 $\\gamma'(t)=2t$。</li>
    <li><strong>测量：</strong>$\\alpha_{t^2}(2t\\partial_x)=t^2\\cdot2t=2t^3$。</li>
  </ol>
  <p>因此，参数轴上应该采用的形式是 $2t^3dt$。把这个形式记为 $\\gamma^*\\alpha$，读作“$\\alpha$ 沿 $\\gamma$ 的拉回”。星号表示这项操作，不是乘法：</p>
  $$\\gamma^*\\alpha=2t^3dt,\\qquad
    \\int_\\gamma\\alpha=\\int_1^2 2t^3dt=\\frac{15}{2}.$$
  <p>直接在 $x$ 坐标算 $\\int_1^4 x\\,dx$ 也是 $15/2$。只代入函数、漏掉方向的变化，会算出 $\\int_1^2t^2dt=7/3$；那是在按参数长度累计另一个对象。</p>
  <details class="lesson-check"><summary>拉回的是函数、向量还是形式？</summary><p>函数的拉回只是复合：$\\gamma^*f=f\\circ\\gamma$。形式的拉回还必须处理它的向量输入。$\\gamma^*\\alpha$ 仍是参数域上的 1-形式，$2t^3$ 才是它相对于 $dt$ 的系数。</p></details>
</div>

<div class="math-definition" id="pullback-curve">
  <div class="math-definition-title">四、走到平面曲线上：一个参数，两项贡献</div>
  <p>设曲线 $\\gamma(t)=(t,t^2)$，$0\\leq t\\leq1$；给定形式 $\\alpha=y\\,dx+2x\\,dy$。用同样的三步，不增加任何新规则：</p>
  <details class="proof-card math-proof"><summary class="proof-header">完整计算这条曲线的积分（展开）</summary><div class="proof-body">
    <div class="proof-step"><p>① 代入位置，两个系数分别变为 $y=t^2$ 和 $2x=2t$。</p></div>
    <div class="proof-step"><p>② 对参数求导，$dx$ 的拉回是 $dt$，$dy$ 的拉回是 $2t\\,dt$。</p></div>
    <div class="proof-step"><p>③ 各项相加：$\\gamma^*\\alpha=t^2dt+2t(2t\\,dt)=5t^2dt$，故 $\\int_\\gamma\\alpha=5/3$。</p></div>
  </div></details>
  <p>这一步的通用写法才是</p>
  $$\\int_\\gamma\\alpha=\\int_a^b
    \\alpha_{\\gamma(t)}(\\dot\\gamma(t))\\,dt.$$
  <p>曲线提供每点的位置与速度，形式将速度转成一个数，再按参数累计。速度大小随参数改变，但只要方向与经过的次数保持不变，最终积分不变。</p>
  <div data-lesson-lab="curve"></div>
</div>

<div class="math-definition" id="pullback-surface">
  <div class="math-definition-title">五、两个参数时：链式法则变成雅可比行列式</div>
  <p>把参数方形 $0\\leq s,t\\leq1$ 映成平面上的平行四边形：$\\Phi(s,t)=(x,y)=(2s+t,t)$。每一点有两根参数方向，它们映成 $u=(2,0)$、$v=(1,1)$。</p>
  <p>若 $\\beta=dx\\wedge dy$，它对这两根方向求值为 $2\\cdot1-0\\cdot1=2$，所以</p>
  $$\\Phi^*\\beta=2\\,ds\\wedge dt,\\qquad
    \\int_\\Phi\\beta=\\int_0^1\\int_0^1 2\\,ds\\,dt=2.$$
  <div data-lesson-lab="area"></div>
  <p>一般曲面也如此：先找两根参数切向量，再让 2-形式对它们求值。映到三维曲面时，得到的可能是投影面积、磁通量或实际面积，具体由给定的 2-形式决定。<a href="#intro-surface" data-lesson-chapter="geometry-intro" data-lesson-section="intro-surface">回到 G.6 比较投影面积与实际面积</a>。</p>
  <details class="proof-card math-definition"><summary class="proof-header">现在读一般拉回公式（展开）</summary><div class="proof-body">
    <p>$T_u\\Phi$ 表示映射 $\\Phi$ 在点 $u$ 的微分，它把参数域切向量送到流形上的切向量。给 $k$-形式 $\\omega$，要求拉回后的测量与原测量一致：</p>
    $$(\\Phi^*\\omega)_u(v_1,\\ldots,v_k)
      :=\\omega_{\\Phi(u)}(T_u\\Phi(v_1),\\ldots,T_u\\Phi(v_k)).$$
    <p>先把点与所有方向送过去，再求值。这是前面一个方向、两个方向的共同写法。$k$ 个输入与参数域的 $k$ 个方向匹配。</p>
  </div></details>
</div>

<div class="math-intuition intuition-box" id="orientation-comparison">
  <div class="math-intuition-title">六、换坐标与反转对象的方向，需要分别处理</div>
  <p>对同一个有向对象作保向的参数变换，积分值不变；将对象的定向反转，形式积分变号。若只用了反向坐标来表示原来的定向，计算时还需补上该坐标图的定向负号。</p>
  <p>例如在 $[1,4]$ 上，$x\\,dx$ 的正向积分是 $15/2$，反向走则为 $-15/2$。同一根杆上按非负长度累计的质量 $\\int x\\,ds$ 不因你反向观察而改变。长度、质量与做功必须按各自的测量规则计算。</p>
  <p>在高维中，形式使用带符号的 $\\det J$，非负密度使用 $|\\det J|$。正向图之间 $\\det J>0$，所以形式系数的变化与普通测度换元定理正好相容。</p>
</div>

<div class="math-definition" id="partition-motivation">
  <div class="math-definition-title">七、多张图卡：为何需要单位分解？</div>
  <p>圆周、球面不能用一张坐标图覆盖。分别在几张图里算，再把答案直接相加，会把重叠区重复计算。先看最简单的双重覆盖：同一个区间 $[0,2]$ 被两个计算窗口完整看到。</p>
  <div data-lesson-lab="partition"></div>
  <p>把第一份贡献乘权重 $\\rho_1$，第二份乘 $\\rho_2$，并逐点要求 $\\rho_1+\\rho_2=1$。由于积分线性，$\\int\\rho_1\\omega+\\int\\rho_2\\omega=\\int\\omega$。权重可以随位置变化；关键是每点的总权重等于一。</p>
  <p>一般流形上，要让每个权重光滑、只在对应图卡内有贡献，并保证每点附近只涉及有限个权重。满足这些条件的权重族叫<strong>光滑单位分解</strong>。它让每张图都能用已学过的局部积分，最后拼成全局积分。</p>
  <details class="lesson-check"><summary>权重是新的物理密度吗？</summary><p>这里的权重是计算时避免重复的辅助函数。更换合适的权重不会改变总积分。它与待计算的物理分布是两回事。</p></details>
</div>

<details class="proof-card math-proof" id="integration-rigorous-reference">
  <summary class="proof-header">第二遍研读：一般流形上的完整定义、坐标无关证明与密度（展开）</summary>
  <div class="proof-body"><p>下面将刚才的操作放回一般 $n$ 维情形。测度、可积性与紧支集的定义可在 <a href="#sec-integration-foundations">1.6 节</a> 查阅。首次阅读可以先完成本节的理解检查，再进入这份严格参考。</p>${rigorousSection.content}</div>
</details>

<details class="lesson-check"><summary>本节出口：换成 u=2x 后，同一个 α=x dx 应怎样写？</summary><p>$x=u/2$、$dx=du/2$，所以 $\\alpha=(u/4)du$。原区间 $[1,4]$ 变成 $[2,8]$，$\\int_2^8 (u/4)du=15/2$。如果只把 $x$ 换成 $u/2$ 而遗漏第二个 $1/2$，得到的就是两倍的答案。</p></details>
`
};

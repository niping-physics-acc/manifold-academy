import { integralModel, areaModel, covectorModel, partitionModel, curveModel } from './lessonLabModels.js';

const fmt = x => Math.abs(x) < 1e-9 ? '0' : Number(x.toFixed(4)).toString();
const range = (name, label, min, max, step, value) => `<label class="lesson-control"><span>${label} <output data-value="${name}">${value}</output></span><input type="range" name="${name}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
const checkbox = (name, label) => `<label class="lesson-checkbox"><input type="checkbox" name="${name}"> ${label}</label>`;
const svg = (label, contents, height = 240) => `<svg viewBox="0 0 480 ${height}" role="img" aria-label="${label}"><title>${label}</title>${contents}</svg>`;
const axes = `<path class="lab-axis" d="M20 120H460 M240 15V225"/><text x="445" y="140">x</text><text x="250" y="25">y</text>`;
const point = ([x, y]) => `${240 + x * 45},${120 - y * 45}`;
const vector = (v, label, cls) => `<path class="${cls}" d="M240 120L${point(v)}"/><circle class="${cls}" cx="${240 + v[0] * 45}" cy="${120 - v[1] * 45}" r="4"/><text x="${248 + v[0] * 45}" y="${112 - v[1] * 45}">${label}</text>`;

const labs = {
  curve: {
    title: '动手：沿抛物线追踪位置、速度与累计值',
    controls: range('t', '参数 t', 0, 1, 0.01, 0.5) + checkbox('reverse', '反向参数化'),
    draw: s => {
      const m = curveModel(s.t, s.reverse);
      const x = 50 + 280 * m.x, y = 200 - 140 * m.y;
      return svg('抛物线上的移动点及参数切向量', `<path class="lab-axis" d="M30 200H420 M50 215V20"/><path class="lab-primary" style="fill:none" d="M50 200Q190 200 330 60"/><path class="lab-secondary" d="M${x} ${y}l${42 * m.vx} ${-21 * m.vy}"/><circle class="lab-primary" cx="${x}" cy="${y}" r="5"/><text x="345" y="55">(1, 1)</text><text x="60" y="225">(0, 0)</text><text x="300" y="180">紫线显示参数速度</text>`) +
        `<p>γ(t) = ${s.reverse ? '(1 − t, (1 − t)²)' : '(t, t²)'}，当前位置 (${fmt(m.x)}, ${fmt(m.y)})，速度 (${fmt(m.vx)}, ${fmt(m.vy)})。</p><div class="lab-metrics"><span>y · x′ <strong>${fmt(m.y * m.vx)}</strong></span><span>2x · y′ <strong>${fmt(2 * m.x * m.vy)}</strong></span><span>形式对速度求值 <strong>${fmt(m.coefficient)}</strong></span><span>从参数 0 累计到 t <strong>${fmt(m.cumulative)}</strong></span></div><p>α = y dx + 2x dy。前三项是此刻的局部读数，最后一项是已经走过的整段积分；它们不是同一个量。速度线段在图中按固定比例缩短以便显示。把 t 调到 1，完整路径的积分为 ${s.reverse ? '−5/3' : '5/3'}。</p>`;
    }
  },
  covector: {
    title: '动手：一把线性测量尺怎样读出向量？',
    controls: range('a', 'dx 的系数 a', -3, 3, 0.5, 2) + range('b', 'dy 的系数 b', -3, 3, 0.5, 1) + range('vx', '向量分量 vˣ', -3, 3, 0.25, 2) + range('vy', '向量分量 vʸ', -2, 2, 0.25, 1),
    draw: s => {
      const lines = [];
      // Level sets a x + b y = integer: use a normal and a tangent to avoid division by a or b.
      const norm = s.a * s.a + s.b * s.b;
      if (norm) for (let level = -12; level <= 12; level++) {
        const p = [s.a * level / norm, s.b * level / norm];
        lines.push(`<path class="lab-level" d="M${point([p[0] - s.b * 15, p[1] + s.a * 15])}L${point([p[0] + s.b * 15, p[1] - s.a * 15])}"/>`);
      }
      const value = covectorModel(s.a, s.b, s.vx, s.vy);
      return svg('向量及线性函数的等值线', lines.join('') + axes + vector([s.vx, s.vy], 'v', 'lab-primary')) +
        `<p class="lab-result">α(v) = ${s.a} × ${s.vx} + ${s.b} × ${s.vy} = <strong>${fmt(value)}</strong></p><p>蓝线是 a x + b y 为整数的等值线。向量终点落在哪个数值的线上，读数就是多少。a = b = 0 时，所有读数为零。图中的直角网格只是展示工具，计算 α(v) 无需先定义向量长度。</p>`;
    }
  },
  area: {
    title: '动手：剪切、压缩与定向',
    controls: range('shear', '剪切 s', -2, 2, 0.1, 1) + range('height', '高度 h', -2, 2, 0.1, 1) + checkbox('swap', '交换两个输入向量的次序'),
    draw: s => {
      const { u, v, determinant } = areaModel(s.shear, s.height, s.swap);
      const polygon = [[0, 0], u, [u[0] + v[0], u[1] + v[1]], v].map(point).join(' ');
      return svg('由两个向量张成的有向平行四边形', axes + `<polygon class="lab-area" points="${polygon}"/>` + vector(u, 'u', 'lab-primary') + vector(v, 'v', 'lab-secondary')) +
        `<p>u = (${u.map(fmt).join(', ')})，v = (${v.map(fmt).join(', ')})</p><p class="lab-result">(dx ∧ dy)(u, v) = <strong>${fmt(determinant)}</strong>；普通欧氏面积 = <strong>${fmt(Math.abs(determinant))}</strong></p><p>只改剪切，行列式不变；把高度调到负数或交换输入次序，会翻转符号。h = 0 时两向量共线，面积为零。这里以标准平面的欧氏度规计算普通面积。</p>`;
    }
  },
  integral: {
    title: '动手：同一条线段，三种累计问题',
    controls: `<label class="lesson-control"><span>要累计什么？</span><select name="object"><option value="form">1-形式 α = x dx（有向）</option><option value="mass">线密度 ρ(x) = x 的质量（无向）</option><option value="scalar">只对参数累计 x(t) dt</option></select></label>` + range('k', '参数网格不均匀程度 k', 0, 0.9, 0.1, 0) + range('n', '分段数 N', 4, 80, 4, 12) + checkbox('reverse', '反向走过线段'),
    draw: s => {
      const model = integralModel(s);
      const physical = x => 30 + (x - 1) / 3 * 420;
      const strips = model.samples.map((p, i) => {
        const shade = i % 2 ? 'lab-strip-even' : 'lab-strip-odd';
        return `<rect class="${shade}" x="${30 + i * 420 / s.n}" y="28" width="${420 / s.n}" height="28"/><rect class="${shade}" x="${physical(Math.min(p.left, p.right))}" y="108" width="${Math.abs(p.right - p.left) * 140}" height="28"/>`;
      }).join('');
      const term = s.object === 'scalar' ? 'x(t)' : s.object === 'mass' ? 'x(t) |x′(t)|' : 'x(t) x′(t)';
      return svg('上方参数等分，下方对应空间分段', strips + `<text x="30" y="18">参数 t：等宽 Δt = 1/N</text><text x="30" y="76">0 → 1</text><text x="30" y="98">空间 x：分段宽度由参数映射决定</text><text x="30" y="158">x = 1</text><text x="390" y="158">x = 4</text><text x="180" y="183">行进方向 ${s.reverse ? '←' : '→'}</text>`, 195) +
        `<p>x(t) = 1 + 3[(1 − k)s + ks²]，s = ${s.reverse ? '1 − t' : 't'}。中点处累计 ${term} Δt。</p><div class="lab-metrics"><span>中点和 <strong>${fmt(model.sum)}</strong></span><span>精确积分 <strong>${fmt(model.exact)}</strong></span><span>绝对误差 <strong>${fmt(model.error)}</strong></span></div><p>${s.object === 'scalar' ? '这里改成了对参数长度 dt 累计位置数值，问题本身已经改变。调整 k，精确结果也会改变。' : s.object === 'mass' ? '质量用正的长度测量规则 |dx|：反向走不会让物体质量变负。ρ = x 是本例额外指定的物理模型。' : '保持 α = x dx 不变，参数速度的因子必不可少。换参数不改变精确积分；反向则变号。有限分段和仍有误差，增加 N 可以观察收敛。'}</p>`;
    }
  },
  partition: {
    title: '动手：两张重叠窗口为什么不能直接相加？',
    controls: range('blend', '权重分配 λ', 0, 1, 0.05, 0),
    draw: s => {
      const m = partitionModel(s.blend);
      const path = upper => Array.from({ length: 41 }, (_, i) => {
        const x = i / 20;
        const y = upper ? x : x * m.weight(x);
        return `${30 + 210 * x},${190 - 70 * y}`;
      });
      const lower = path(false), upper = path(true);
      return svg('同一个被积函数的两份加权贡献', `<polygon class="lab-area" points="30,190 ${lower.join(' ')} 450,190"/><polygon class="lab-area-secondary" points="${lower.join(' ')} ${upper.reverse().join(' ')}"/><path class="lab-axis" d="M30 30V190H450"/><text x="30" y="215">x = 0</text><text x="405" y="215">x = 2</text><text x="45" y="25">蓝色 = xρ₁，紫色 = xρ₂；叠起来始终是 x</text>`) +
        `<p>ρ₁(x) = (1 − λ)(1 − x/2) + λx/2，ρ₂(x) = 1 − ρ₁(x)。</p><div class="lab-metrics"><span>第一份 <strong>${fmt(m.first)}</strong></span><span>第二份 <strong>${fmt(m.second)}</strong></span><span>总和 <strong>${fmt(m.first + m.second)}</strong></span></div><p>两个窗口都覆盖 [0, 2]。不加权会把 ∫₀² x dx = 2 算两遍得到 4；权重和为 1，所以分工比例变化时总量仍为 2。这是分工原理的玩具模型；流形上的单位分解还要求光滑性、局部有限性及支集从属于图卡。</p>`;
    }
  }
};

export function mountLessonLabs(root) {
  const controller = new AbortController();
  root.querySelectorAll('[data-lesson-lab]').forEach(slot => {
    const lab = labs[slot.dataset.lessonLab];
    if (!lab) return;
    slot.classList.add('lesson-lab');
    slot.innerHTML = `<h4>${lab.title}</h4><form class="lesson-lab-controls">${lab.controls}<button type="reset" class="btn btn-secondary btn-sm">重置实验</button></form><div class="lesson-lab-output" aria-live="polite" aria-atomic="true"></div>`;
    const form = slot.querySelector('form');
    const update = () => {
      const state = {};
      form.querySelectorAll('input, select').forEach(input => {
        state[input.name] = input.type === 'checkbox' ? input.checked : input.type === 'range' ? Number(input.value) : input.value;
        const output = form.querySelector(`[data-value="${input.name}"]`);
        if (output) output.textContent = input.value;
      });
      slot.querySelector('.lesson-lab-output').innerHTML = lab.draw(state);
    };
    form.addEventListener('input', update, { signal: controller.signal });
    form.addEventListener('submit', e => e.preventDefault(), { signal: controller.signal });
    form.addEventListener('reset', () => queueMicrotask(() => { if (!controller.signal.aborted) update(); }), { signal: controller.signal });
    update();
  });
  return () => controller.abort();
}

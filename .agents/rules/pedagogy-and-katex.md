# Manifold Academy 教学与渲染规范 (Rule)

在为 Manifold Academy 编写或更新课程数据（`src/data/chapters/*.js`）以及样式组件时，必须遵循以下规则：

## 1. 认知爬升三部曲 (Cognitive Progression)
每个新章节或小节必须包含：
1. **背景意象 (Mental Image & Motivation)**：为什么要造这个数学工具？它在物理上量度什么？不用数学黑话，用几何直观解释。
2. **严密构造 (Rigorous Construction & Proof)**：
   - 给出精确的数学定义。
   - 所有引入的符号均附带说明（如底流形 $M$、纤维 $F$、截面 $\Gamma$、全反对称化算子 $\operatorname{Alt}$）。
   - 推导过程使用 `proof-card` 结构封装，支持逐步阅读。
3. **物理投射与反直觉陷阱 (Physical Interpretation & Caveats)**：
   - 区分“坐标系表示”与“坐标无关形式”；
   - 区分“度规独立（拓扑/微分形式）”与“度规依赖（黎曼测度/长度）”。

## 2. KaTeX 字符串双反斜杠规则 (MANDATORY)
在 JavaScript 文件中定义 LaTeX 公式字符串时：
- 必须双重转义所有反斜杠：`\\frac{d}{dt}`, `\\Omega`, `\\wedge`, `\\mathcal{L}`
- 块级公式包裹在 `$$...$$`，行内公式包裹在 `$...$`
- 严禁出现未转义的单个反斜杠，避免被 V8 引擎解析为转义符号导致静默渲染失败。

## 3. 证明与卡片排版规范
- 证明使用 HTML 结构：`<div class="proof-card"><div class="proof-header">...</div><div class="proof-body">...</div></div>`
- 关键直观解释使用：`<div class="callout intuition">...</div>`
- 关键数学定义使用：`<div class="callout definition">...</div>`

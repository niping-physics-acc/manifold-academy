---
name: manifold-content-authoring
description: Authoring, validating, and structuring interactive theoretical physics and modern differential geometry curriculum modules for Manifold Academy. Use when creating or refining chapters in src/data/chapters/, writing proof cards, or adding interactive physics labs.
---

# Manifold Content Authoring Skill

本 Skill 专门指导如何在 **Manifold Academy** 中撰写、扩充物理与数学章节，编写严谨推导卡片，以及确保 KaTeX 双反斜杠与响应式排版符合项目最高标准。

---

## 1. 章节数据结构规范 (`src/data/chapters/<id>.js`)

每个章节模块必须导出一个符合以下规范的 JavaScript 对象：

```javascript
export const diffGeom = {
  id: 'diffGeom',
  title: '微分几何与外微积分',
  englishTitle: 'Differential Geometry & Exterior Calculus',
  subtitle: '现代物理学的通用几何语言',
  sections: [
    {
      id: 'section-1',
      number: '1.1',
      title: '切空间与切丛：光滑流形的局部线性化',
      // 直观引言（必须讲清物理意象与引入动机）
      intro: '在欧几里得空间中，我们习惯于自由地移动向量...',
      // 核心内容块
      content: `
        <div class="callout intuition">
          <h4>💡 物理直观图景</h4>
          <p>不要把切向量看成箭头，把切向量看成<strong>对标量场的方向导数算符</strong>...</p>
        </div>

        <div class="callout definition">
          <h4>📐 严格数学定义</h4>
          <p>设 $M$ 为 $n$ 维光滑流形，点 $p \\in M$ 处的切空间定义为...</p>
        </div>

        <div class="proof-card">
          <div class="proof-header">
            <span class="proof-badge">严密推导</span>
            <span class="proof-title">推导：坐标基底变换与余切向量变换律</span>
            <button class="proof-toggle">展开证明 ▾</button>
          </div>
          <div class="proof-body">
            <p>设两套局部坐标分别为 $(x^1, \\dots, x^n)$ 与 $(y^1, \\dots, y^n)$...</p>
            $$\\frac{\\partial}{\\partial x^i} = \\sum_{j=1}^n \\frac{\\partial y^j}{\\partial x^i} \\frac{\\partial}{\\partial y^j}$$
          </div>
        </div>
      `
    }
  ]
};
```

---

## 2. 编写红线与自查清单 (Mandatory Pre-flight Checklist)

在保存或提交任何新章节前，必须逐项自查：

1. [ ] **双反斜杠检查 (CRITICAL)**：
   - 检查所有 LaTeX 命令：`\\frac`, `\\sum`, `\\int`, `\\Omega`, `\\wedge`, `\\mathcal{L}`, `\\partial` 等是否都带了**两个**反斜杠。
   - 严禁出现未经转义的单反斜杠。
2. [ ] **零门槛意象先行**：
   - 是否向读者交代了“为什么需要这个概念”？
   - 是否用比喻或几何操作解释了抽象符号（如“底流形 = 地皮”，“纤维 = 测量尺”，“截面 = 场”，“外积 = 有向面积测量机”）？
3. [ ] **严密无跳步**：
   - 公式推导中是否跳过了关键代数步骤？
   - 是否说明了度规依赖性（哪些是无度规拓扑外代数，哪些需要黎曼度规参与）？
4. [ ] **交互与可读性**：
   - 复杂长公式是否拆解成了逐步推导卡片（`.proof-card`）？
   - 在手机端或小屏宽度下，行内公式是否会自动合理折行？
5. [ ] **每次修改后强制同步至 GitHub (CRITICAL)**：
   - 任何内容增补、推导完善或代码修改，在完成构建校验后，**必须立即执行 `git add`、`git commit` 并推送到 GitHub 远程仓库 (`git push origin main`)**。
   - 提交信息必须规范清晰，准确描述修改的物理/数学内容或工程变动。
   - 严禁将修改堆积在本地未提交或未推送状态。

---

## 3. 自动化校验脚本示例

可以通过执行以下快速检查，验证是否有漏网的单反斜杠或 KaTeX 渲染隐患：
```javascript
// 检查是否有未转义的反斜杠引发的非法转义字符
const regex = /\\[a-zA-Z]+/g;
```
编写内容后，运行 `npm run build`，确保 Vite 打包阶段无静态语法报错。

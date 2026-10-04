# Manifold Academy - AI 协同开发指南与项目背景 (AGENTS.md)

本文件是 **Manifold Academy** 项目的核心上下文定义，适用于 Antigravity IDE、VS Code (Claude Code / Copilot / Cursor / Cline) 及各类 AI 辅助编程智能体。

---

## 1. 项目定位与核心愿景

- **项目名称**：`manifold-academy`
- **项目创建者**：倪平 (Ni Ping / 粒子物理与加速器物理背景)
- **GitHub 仓库**：`https://github.com/niping-physics-acc/manifold-academy`
- **目标**：打造一个具备**现代几何视角**、**直观物理图像**与**严密数学推导**的高性能、现代化理论物理与数学交互式自学平台。
- **目标读者**：具备扎实理工科本科数理底子，渴望彻底搞懂经典与现代物理底层几何结构（辛几何、流形、丛、形式、规范场）的学者与开发者。

---

## 2. 知识体系大纲 (Core Curriculum)

1. **微分几何与外微积分 (Differential Geometry & Exterior Calculus)**：
   - 光滑流形、切空间 $T_p M$、余切空间 $T_p^* M$
   - 纤维丛（底流形、总空间、截面 $\Gamma$ 的直观物理意象）
   - 微分形式、外积 $\wedge$（全反对称化张量积、有向体积测量机）与无度规外微积分
   - 外微分 $d$、李导数 $\mathcal{L}_X$、内积 $\iota_X$ 与嘉当神奇公式
   - 斯托克斯定理与德拉姆上同调
2. **现代拉格朗日力学 (Modern Lagrangian Mechanics)**：
   - 切丛 $TM$ 上的几何动力学、哈密顿原理、欧拉-拉格朗日方程
   - 诺特定理：对称性与第一积分的几何对应
3. **哈密顿力学与辛几何 (Hamiltonian Mechanics & Symplectic Geometry)**：
   - 余切丛 $T^* M$（相空间）、正则 1-形式 $\theta$ 与辛 2-形式 $\omega = -d\theta$
   - 辛流形、哈密顿向量场、泊松括号、刘维尔定理与相空间体积守恒
4. **电动力学与规范场论 (Electrodynamics & Gauge Field Theory)**：
   - 麦克斯韦方程组的几何化：$dF = 0, d*F = J$
   - $U(1)$ 主丛、联络形式（规范势 $A$）与曲率形式（场强 $F$）
5. **统计力学与遍历理论 (Statistical Mechanics & Ergodic Theory)**：
   - 相空间分布函数、刘维尔方程、微正则/正则系综、遍历假说与不可逆性涌现
6. **量子力学与希尔伯特空间 (Quantum Mechanics & Hilbert Space)**：
   - 射影希尔伯特空间几何、几何相位（Berry Phase）、算符代数与正则量子化
7. **李群与李代数 (Lie Groups & Lie Algebras)**：
   - 连续对称性、李代数指数映射、伴随表示、物理常见紧李群（$SO(3), SU(2), SU(3)$）

---

## 3. 教学法与内容编写红线 (Strict Pedagogical Rules)

任何 AI 在本仓库编写、扩充课程或推导内容时，**必须严格遵守以下准则**：

### 3.1 零门槛认知爬升（严禁突兀抛出抽象定义）
- **绝不允许直接甩出未解释符号**：例如引入 $\Omega^k(M) := \Gamma(\bigwedge^k T^* M)$ 时，必须先行通俗拆解：
  - 什么是**底流形**（每一点的地皮）？
  - 什么是**纤维**（挂在地皮上的局部向量空间）？
  - 什么是**截面 $\Gamma$**（在每个地皮点上平滑挑出一个代表的“场”）？
  - 什么是**外代数 $\bigwedge$**（把小测量尺全反对称化拼装成面积/体积测量机）？
- **直观物理意象先行**：在严谨定义前，必须给出“这个数学工具究竟在物理上测量什么”的几何图像。

### 3.2 讲透底层机制（严禁只罗列结论）
- 拒绝“显而易见”、“易得”式跳步。
- 核心物理量必须区分：
  - **坐标表达** vs **内蕴无坐标表达**；
  - **依赖度规的量（如黎曼面积测量）** vs **完全无度规的拓扑/外代数量（如微分形式的外积与积分）**；
  - **张量积**（包含对称与反对称全部自由度）与**外积**（纯反对称化有向投影）的代数与几何差异。

### 3.3 交互式分步推导设计 (Proof Cards)
- 每一个核心定理与公式推导，采用带有渐进式展开逻辑的推导卡片（利用 `.proof-card`、`.proof-step`、`.intuition-box` 结构），支持学习者逐步展开每一步的数学跳跃点与物理注记。

---

## 4. 技术栈与工程规范

### 4.1 技术选型
- **构建工具**：Vite 5+
- **前端架构**：原生 Vanilla JS (ES6+ 模块化) + 现代化语义 CSS
- **数学排版**：KaTeX（通过 CDN 加载并由 `src/utils/katexRenderer.js` 统一渲染）
- **交互实验**：HTML5 Canvas 2D / WebGL 自研轻量级物理仿真内核

### 4.2 极其致命的 KaTeX 转义陷阱（CRITICAL）
在 JavaScript 模板字符串中写入 LaTeX 源码时，**所有反斜杠必须写成双反斜杠 `\\\\`**！
- ❌ **严重错误**：`\Omega`, `\frac{1}{2}`, `\wedge` （会被 JS 引擎解释为控制字符或丢失反斜杠，导致 KaTeX 报错）
- ✅ **正确写法**：`\\Omega`, `\\frac{1}{2}`, `\\wedge`, `\\Gamma`, `\\mathbf{x}`

### 4.3 目录架构
```text
manifold-academy/
├── AGENTS.md                  # 本文件 (跨 AI 工具通用全局指引)
├── .agents/                   # Antigravity / Agentic IDE 本地技能与规则
│   ├── rules/                 # 项目专属编程规则
│   └── skills/                # 课程扩充与 KaTeX 校验专属技能
├── docs/                      # 架构文档与理论物理白皮书
├── public/                    # 静态资源、图标、图片
└── src/
    ├── components/            # UI 组件 (chapterViewer, graphViewer, hero, navbar)
    ├── data/
    │   ├── chapters/          # 各学科核心内容数据模块 (diffGeom, hamiltonian...)
    │   ├── curriculum.js      # 课程大纲路由配置
    │   └── knowledgeGraph.js  # 知识图谱节点与连线拓扑
    ├── labs/                  # 交互仿真物理实验室 (symplecticLab, actionLab...)
    ├── styles/                # 样式层 (index.css, proofs.css, labs.css, modules.css)
    └── utils/                 # 工具类 (katexRenderer.js, storage.js)
```

---

## 5. 开发与部署工作流
- **本地启动**：`npm run dev`（监听 `0.0.0.0:5173`，支持手机同一 Wi-Fi 访问）
- **生产构建**：`cmd /c "npm run build"`（Windows 环境下通过 cmd 构建，输出至 `dist/`）
- **部署分支**：`main` 分支托管于 GitHub，通过 GitHub Pages 提供公网访问。
- **强制同步规则 (CRITICAL)**：每一次内容修改与功能迭代后，完成构建校验必须立即执行 `git add`, `git commit` 并同步推送到 GitHub 远程仓库 (`git push origin main`)，确保最新改动实时与远端同步。

/**
 * Knowledge Dependency Graph Data
 * Represents the topological dependency of concepts across Modern Theoretical Physics & Beam Dynamics
 */

export const KNOWLEDGE_GRAPH = {
  nodes: [
    // 微分几何节点
    { id: 'manifold', label: '光滑流形 M', disc: 'diff-geom', x: 120, y: 180, r: 24, chapterId: 'diff-geom-01' },
    { id: 'tangent', label: '切丛 TQ 与向量场', disc: 'diff-geom', x: 250, y: 130, r: 20, chapterId: 'diff-geom-01' },
    { id: 'cotangent', label: '余切丛 T*Q 与 1-形式', disc: 'diff-geom', x: 260, y: 240, r: 22, chapterId: 'diff-geom-01' },
    { id: 'exterior', label: '外微积分 d 与 Cartan 公式', disc: 'diff-geom', x: 380, y: 180, r: 24, chapterId: 'diff-geom-01' },
    { id: 'symplectic', label: '典范辛流形 (M, ω)', disc: 'diff-geom', x: 500, y: 240, r: 26, chapterId: 'diff-geom-01' },

    // 拉格朗日力学
    { id: 'action', label: '几何作用量泛函 S[γ]', disc: 'lagrangian', x: 380, y: 80, r: 22, chapterId: 'lagrangian-01' },
    { id: 'euler-lagrange', label: 'Euler-Lagrange 方程', disc: 'lagrangian', x: 510, y: 80, r: 22, chapterId: 'lagrangian-01' },
    { id: 'noether', label: 'Noether 对称与守恒荷', disc: 'lagrangian', x: 640, y: 110, r: 25, chapterId: 'lagrangian-01' },

    // 李群与李代数
    { id: 'lie-algebra', label: '李代数 g 与生成元', disc: 'lie-groups', x: 500, y: 20, r: 22, chapterId: 'lie-groups-01' },
    { id: 'spinor', label: 'SU(2) 双重覆盖与旋量', disc: 'lie-groups', x: 670, y: 30, r: 22, chapterId: 'lie-groups-01' },
    { id: 'sp-group', label: '辛群 Sp(2n, R)', disc: 'lie-groups', x: 650, y: 190, r: 24, chapterId: 'lie-groups-01' },

    // 哈密顿力学与束流
    { id: 'hamilton-flow', label: '哈密顿向量场 X_H', disc: 'hamiltonian', x: 620, y: 270, r: 24, chapterId: 'hamiltonian-01' },
    { id: 'liouville', label: 'Liouville 保体积定理', disc: 'hamiltonian', x: 760, y: 270, r: 26, chapterId: 'hamiltonian-01' },
    { id: 'courant-snyder', label: 'Courant-Snyder 束流相椭圆', disc: 'hamiltonian', x: 890, y: 230, r: 28, chapterId: 'hamiltonian-01', highlight: true },
    { id: 'symplectic-int', label: '辛积分器与长程保几何', disc: 'hamiltonian', x: 780, y: 350, r: 24, chapterId: 'hamiltonian-01' },

    // 电动力学
    { id: 'gauge-field', label: 'U(1) 连络与 4-势 A', disc: 'electrodynamics', x: 360, y: 380, r: 22, chapterId: 'electrodynamics-01' },
    { id: 'faraday-form', label: '曲率 2-形式 F = dA', disc: 'electrodynamics', x: 500, y: 380, r: 25, chapterId: 'electrodynamics-01' },
    { id: 'maxwell-d', label: '微分形式 Maxwell dF=0', disc: 'electrodynamics', x: 640, y: 430, r: 25, chapterId: 'electrodynamics-01' },
    { id: 'synchrotron', label: '超相对论同步辐射与辐射锥', disc: 'electrodynamics', x: 820, y: 440, r: 26, chapterId: 'electrodynamics-01' },

    // 统计力学
    { id: 'phase-measure', label: '辛相空间吉布斯测度', disc: 'stat-mech', x: 740, y: 180, r: 20, chapterId: 'stat-mech-01' },
    { id: 'poincare-rec', label: 'Poincaré 复现定理', disc: 'stat-mech', x: 860, y: 130, r: 22, chapterId: 'stat-mech-01' },
    { id: 'coarse-grain', label: '粗粒化与发射度稀释', disc: 'stat-mech', x: 990, y: 180, r: 25, chapterId: 'stat-mech-01' },

    // 量子力学
    { id: 'proj-hilbert', label: '射影空间 CP(H) & FS 度规', disc: 'quantum', x: 540, y: 500, r: 22, chapterId: 'quantum-01' },
    { id: 'berry-phase', label: 'Berry 几何相位与丛曲率', disc: 'quantum', x: 700, y: 520, r: 24, chapterId: 'quantum-01' },
    { id: 'wigner', label: '相空间 Wigner 拟概率流', disc: 'quantum', x: 880, y: 350, r: 26, chapterId: 'quantum-01' }
  ],
  links: [
    { source: 'manifold', target: 'tangent', label: '局域微分' },
    { source: 'manifold', target: 'cotangent', label: '线性对偶' },
    { source: 'tangent', target: 'action', label: '切丛速度提升' },
    { source: 'cotangent', target: 'exterior', label: '外积升阶' },
    { source: 'exterior', target: 'symplectic', label: '典范 2-形式 ω = -dθ' },
    { source: 'action', target: 'euler-lagrange', label: '第一变分 δS=0' },
    { source: 'lie-algebra', target: 'noether', label: '对称性生成元' },
    { source: 'euler-lagrange', target: 'noether', label: '运动方程极值' },
    { source: 'lie-algebra', target: 'spinor', label: '指数映射 exp' },
    { source: 'symplectic', target: 'hamilton-flow', label: '辛对偶梯度 i_X ω = dH' },
    { source: 'symplectic', target: 'sp-group', label: '保持辛形式不变' },
    { source: 'sp-group', target: 'courant-snyder', label: '传输矩阵辛正规化' },
    { source: 'hamilton-flow', target: 'liouville', label: '李导数 L_X ω = 0' },
    { source: 'liouville', target: 'courant-snyder', label: '单粒子发射度 ε 守恒' },
    { source: 'hamilton-flow', target: 'symplectic-int', label: '保相空间辛离散化' },
    { source: 'exterior', target: 'faraday-form', label: '外微分算子 d' },
    { source: 'gauge-field', target: 'faraday-form', label: '曲率 F = dA' },
    { source: 'faraday-form', target: 'maxwell-d', label: '外微分 dF=0, d*F=J' },
    { source: 'maxwell-d', target: 'synchrotron', label: '波包发射与定向集束' },
    { source: 'liouville', target: 'phase-measure', label: '微正则测度' },
    { source: 'phase-measure', target: 'poincare-rec', label: '保测度流' },
    { source: 'courant-snyder', target: 'coarse-grain', label: '非线性扭曲丝状化' },
    { source: 'poincare-rec', target: 'coarse-grain', label: '不可逆熵增涌现' },
    { source: 'symplectic', target: 'wigner', label: '经典相空间对应' },
    { source: 'proj-hilbert', target: 'berry-phase', label: 'U(1) 配丛曲率' },
    { source: 'faraday-form', target: 'berry-phase', label: '几何规范类似' }
  ]
};

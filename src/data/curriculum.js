/**
 * Manifold Academy - Complete Curriculum & Course Data
 * Tailored for advanced graduate-level geometric theoretical physics & beam dynamics.
 */

import { diffGeomChapter } from './chapters/diffGeom.js';
import { lagrangianChapter } from './chapters/lagrangian.js';
import { hamiltonianChapter } from './chapters/hamiltonian.js';
import { electrodynamicsChapter } from './chapters/electrodynamics.js';
import { lieGroupsChapter } from './chapters/lieGroups.js';
import { statMechChapter } from './chapters/statMech.js';
import { quantumChapter } from './chapters/quantum.js';

export const DISCIPLINES = [
  {
    id: 'diff-geom',
    title: '现代微分几何',
    titleEn: 'Modern Differential Geometry',
    desc: '从光滑流形、切丛/余切丛到微分形式与李导数，建立现代无坐标理论物理通用几何语言。',
    accent: 'var(--accent-cyan)',
    glow: 'rgba(0, 242, 254, 0.25)',
    icon: 'compass',
    tag: '基础架构',
    topics: ['光滑流形与导数定义', '切丛 TQ 与余切丛 T*Q', '微分形式与外代数 d²=0', '李导数与 Cartan 恒等式', '辛流形与 Darboux 定理'],
    masterChapterId: 'diff-geom-01',
    labId: 'diff-geom-lab'
  },
  {
    id: 'lagrangian',
    title: '现代拉格朗日力学',
    titleEn: 'Lagrangian Mechanics on TQ',
    desc: '基于位形流形切丛 TQ 的变分几何学，深入李代数群作用下的 Noether 定理与 Busch 磁角动量守恒。',
    accent: 'var(--accent-emerald)',
    glow: 'rgba(16, 185, 129, 0.25)',
    icon: 'orbit',
    tag: '几何变分',
    topics: ['达朗贝尔原理与位形流形', '第一变分与 Euler-Lagrange', '李代数对称性与 Noether 荷', '坐标无关性协变定理', '螺线管聚焦与 Busch 定理'],
    masterChapterId: 'lagrangian-01',
    labId: 'lagrangian-lab'
  },
  {
    id: 'hamiltonian',
    title: '哈密顿力学与辛几何',
    titleEn: 'Hamiltonian & Symplectic Dynamics',
    desc: '余切丛 T*Q 上的典范辛形式、哈密顿流、加速器束流 Courant-Snyder 理论与辛积分器影子哈密顿量。',
    accent: 'var(--accent-purple)',
    glow: 'rgba(157, 78, 221, 0.3)',
    icon: 'activity',
    tag: '辛几何与束流',
    topics: ['典范 2-形式 ω = dq ∧ dp', '哈密顿向量场 X_H 与辛对偶', 'Liouville 保相体积几何证明', 'Hill 方程、Twiss 与 CS 不变量', '辛积分器逆误差分析与长程守恒'],
    masterChapterId: 'hamiltonian-01',
    labId: 'hamiltonian-lab'
  },
  {
    id: 'electrodynamics',
    title: '经典电动力学与规范场',
    titleEn: 'Covariant Electrodynamics & U(1) Bundles',
    desc: '时空流形上的曲率 2-形式 F = dA、微分形式 Maxwell 方程、超相对论束流定向辐射与波荡器物理。',
    accent: 'var(--accent-amber)',
    glow: 'rgba(255, 183, 3, 0.25)',
    icon: 'zap',
    tag: '四维协变场论',
    topics: ['4-势 1-形式与曲率 F = dA', 'Hodge 星算子对偶还原', '微分形式麦克斯韦 dF=0, d*F=J', '四维电荷守恒拓扑来源', '超相对论集束效应 (1/γ 辐射锥)'],
    masterChapterId: 'electrodynamics-01',
    labId: 'electrodynamics-lab'
  },
  {
    id: 'lie-groups',
    title: '李群、李代数与物理对称性',
    titleEn: 'Lie Groups & Lie Algebras in Physics',
    desc: 'SO(3), SU(2), 辛群 Sp(2n, R)，指数映射、旋量表示与加速器非线性磁场李代数算子方法。',
    accent: 'var(--accent-magenta)',
    glow: 'rgba(255, 0, 128, 0.25)',
    icon: 'cpu',
    tag: '连续对称性',
    topics: ['李代数 g=TeG 与李括号', '指数映射 exp 与 BCH 公式', 'SU(2) 对 SO(3) ≅ RP³ 双重覆盖', '费米子 4π 拓扑同伦复原', '辛群 Sp(2n, R) 与加速器李算子'],
    masterChapterId: 'lie-groups-01',
    labId: 'lie-groups-lab'
  },
  {
    id: 'stat-mech',
    title: '现代统计力学与几何相空间',
    titleEn: 'Statistical Mechanics & Phase Space',
    desc: '相空间测度不变性、Poincaré 复现定理、微观可逆性与粗粒化 (Coarse-grained) 熵增机制。',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.25)',
    icon: 'grid',
    tag: '系综与不可逆性',
    topics: ['细粒化 Gibbs 熵守恒 dS/dt=0', 'Poincaré 复现定理测度论证明', '粗粒化投影与 Jensen 熵增不等式', 'Baker 映射与混沌细丝化', '束流相空间发射度不可逆稀释'],
    masterChapterId: 'stat-mech-01',
    labId: 'stat-mech-lab'
  },
  {
    id: 'quantum',
    title: '现代几何量子力学',
    titleEn: 'Modern Geometric Quantum Mechanics',
    desc: 'Hilbert 空间射影几何、Fubini-Study 度规、Berry 相位、几何量子化与相空间 Wigner 拟概率分布。',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    icon: 'shield',
    tag: '几何量子化',
    topics: ['射影空间 CP(H) 与 Fubini-Study 度规', 'U(1) 连络、Berry 曲率与几何相位', '自旋 1/2 立体角定理 -1/2 Ω', 'Wigner 拟概率分布与边缘还原', 'Moyal 括号向经典 Liouville 的退化'],
    masterChapterId: 'quantum-01',
    labId: 'quantum-lab'
  }
];

export const CHAPTERS = {
  'diff-geom-01': diffGeomChapter,
  'lagrangian-01': lagrangianChapter,
  'hamiltonian-01': hamiltonianChapter,
  'electrodynamics-01': electrodynamicsChapter,
  'lie-groups-01': lieGroupsChapter,
  'stat-mech-01': statMechChapter,
  'quantum-01': quantumChapter
};

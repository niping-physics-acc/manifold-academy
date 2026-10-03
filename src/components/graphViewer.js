import { KNOWLEDGE_GRAPH } from '../data/knowledgeGraph.js';
import { DISCIPLINES } from '../data/curriculum.js';

export function createGraphViewer(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'container';
  wrapper.style.padding = '40px 24px 60px';

  wrapper.innerHTML = `
    <div style="margin-bottom: 24px; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
      <div>
        <span class="badge badge-cyan" style="margin-bottom: 8px;">TOPOLOGICAL ROADMAP</span>
        <h2 style="font-size: 2rem; color: #fff; font-weight: 800;">现代理论物理知识依赖拓扑网络</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 6px;">
          展示 7 大学科之间严密的几何逻辑衍生链。将鼠标悬停在节点上查看依赖路径，点击节点即可直接跳转至对应研读章节。
        </p>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary btn-sm" id="btn-graph-reset">重置视角</button>
      </div>
    </div>

    <div class="graph-container glass-panel">
      <canvas id="kg-canvas" class="graph-canvas"></canvas>
      <div class="graph-hud">
        <div class="graph-hud-title" id="kg-hud-title">选择或悬停任意知识节点</div>
        <div class="graph-hud-desc" id="kg-hud-desc">
          例如：光滑流形 M → 余切丛 T*Q → 典范辛流形 (M, ω) → 哈密顿向量场 → Liouville 定理 → Courant-Snyder 束流相椭圆。
        </div>
      </div>
      <div class="graph-controls">
        <div style="display: flex; gap: 6px; background: rgba(10,15,30,0.8); padding: 4px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 0.75rem; color: #94a3b8; align-items: center;">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--accent-cyan);"></span> 微分几何
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--accent-purple); margin-left:6px;"></span> 辛力学与束流
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--accent-emerald); margin-left:6px;"></span> 拉格朗日
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--accent-amber); margin-left:6px;"></span> 电动力学
        </div>
      </div>
    </div>
  `;

  const canvas = wrapper.querySelector('#kg-canvas');
  const ctx = canvas.getContext('2d');

  const nodes = JSON.parse(JSON.stringify(KNOWLEDGE_GRAPH.nodes));
  const links = KNOWLEDGE_GRAPH.links;

  let hoveredNode = null;
  let animId = null;

  function getNodeColor(discId) {
    const d = DISCIPLINES.find(item => item.id === discId);
    return d ? d.accent : '#00f2fe';
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  setTimeout(resize, 50);

  function render() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // 缩放基准尺寸以自适应当前容器
    const scaleX = w / 1100;
    const scaleY = h / 620;

    // 1. 绘制连线
    links.forEach(link => {
      const src = nodes.find(n => n.id === link.source);
      const tgt = nodes.find(n => n.id === link.target);
      if (!src || !tgt) return;

      const isHighlighted = hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id);

      ctx.beginPath();
      ctx.moveTo(src.x * scaleX, src.y * scaleY);
      ctx.lineTo(tgt.x * scaleX, tgt.y * scaleY);

      if (isHighlighted) {
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 绘制连线箭头
      if (isHighlighted && link.label) {
        const mx = (src.x * scaleX + tgt.x * scaleX) / 2;
        const my = (src.y * scaleY + tgt.y * scaleY) / 2;
        ctx.fillStyle = '#00f2fe';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(link.label, mx + 5, my - 5);
      }
    });

    // 2. 绘制节点
    nodes.forEach(node => {
      const nx = node.x * scaleX;
      const ny = node.y * scaleY;
      const color = getNodeColor(node.disc);
      const isHovered = hoveredNode && hoveredNode.id === node.id;

      // 外光晕
      ctx.beginPath();
      ctx.arc(nx, ny, node.r + (isHovered ? 8 : 4), 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? 'rgba(0, 242, 254, 0.35)' : 'rgba(255, 255, 255, 0.04)';
      ctx.fill();

      // 主节点球
      ctx.beginPath();
      ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
      ctx.fillStyle = '#0d1224';
      ctx.fill();
      ctx.strokeStyle = isHovered ? '#fff' : color;
      ctx.lineWidth = isHovered ? 2.5 : 1.5;
      ctx.stroke();

      // 核心高亮点
      if (node.highlight) {
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffb703';
        ctx.fill();
      }

      // 节点文本
      ctx.fillStyle = isHovered ? '#fff' : '#cbd5e1';
      ctx.font = `${isHovered ? '600 ' : ''}11px JetBrains Mono`;
      ctx.textAlign = 'center';
      ctx.fillText(node.label, nx, ny + node.r + 14);
    });

    animId = requestAnimationFrame(render);
  }

  // 鼠标交互
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const scaleX = rect.width / 1100;
    const scaleY = rect.height / 620;

    let found = null;
    for (const node of nodes) {
      const nx = node.x * scaleX;
      const ny = node.y * scaleY;
      if (Math.hypot(mx - nx, my - ny) <= node.r + 6) {
        found = node;
        break;
      }
    }

    hoveredNode = found;
    canvas.style.cursor = found ? 'pointer' : 'default';

    const titleEl = wrapper.querySelector('#kg-hud-title');
    const descEl = wrapper.querySelector('#kg-hud-desc');
    if (found) {
      titleEl.textContent = `节点: ${found.label}`;
      const disc = DISCIPLINES.find(d => d.id === found.disc);
      const discName = disc ? disc.title : '';
      const inDeps = links.filter(l => l.target === found.id).map(l => l.source).join(', ') || '基石根源';
      const outDeps = links.filter(l => l.source === found.id).map(l => l.target).join(', ') || '前沿终点';
      descEl.innerHTML = `所属学科: <strong style="color:#00f2fe;">${discName}</strong><br/>前置衍生: ${inDeps}<br/>后向导向: ${outDeps}<br/><span style="color:#ffb703;">点击直接打开研读章节 →</span>`;
    }
  });

  canvas.addEventListener('click', () => {
    if (hoveredNode && hoveredNode.chapterId) {
      onNavigate('chapter', hoveredNode.chapterId);
    }
  });

  wrapper.querySelector('#btn-graph-reset').addEventListener('click', () => {
    hoveredNode = null;
  });

  render();
  return wrapper;
}

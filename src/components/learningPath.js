import { LEARNING_PATH } from '../data/learningPath.js';
import { CHAPTERS } from '../data/curriculum.js';
import { getCompletedChapters } from '../utils/storage.js';

export function createLearningPath(onNavigate) {
  const section = document.createElement('section');
  section.className = 'learning-path container';
  const completed = getCompletedChapters();
  section.innerHTML = `<div class="learning-path-heading"><span class="badge badge-emerald">从基础微积分出发</span><h2>先会算一个例子，再理解一般结构</h2><p>按下面的路线逐步学习。先修链接可以随时回看；已有基础的内容可以跳过。前三门是入门桥梁，后七门进入几何理论与专题应用。</p></div>
    <ol class="learning-path-list">${LEARNING_PATH.map((route, i) => `<li class="learning-path-card glass-panel">
      <div class="learning-path-stage"><span>${String(i + 1).padStart(2, '0')}</span><span>${route.stage}</span>${completed.includes(route.chapterId) ? '<span class="badge badge-emerald">已完成</span>' : ''}</div>
      <h3><a href="#chapter-${route.chapterId}" data-chapter="${route.chapterId}">${route.title}</a></h3><p>${route.goal}</p>
      <div class="learning-prereqs">先修：${route.prerequisites.length ? route.prerequisites.map(id => `<a href="#chapter-${id}" data-chapter="${id}">${CHAPTERS[id].title.split('：')[0]}</a>`).join(' · ') : '一元微积分与中学代数'}</div>
      <p class="learning-checkpoint">学后能回答：${route.question}</p>
      <a class="btn btn-secondary btn-sm" href="#chapter-${route.chapterId}" data-chapter="${route.chapterId}">进入课程 · ${CHAPTERS[route.chapterId].sections.length} 节 →</a>
    </li>`).join('')}</ol>`;
  section.addEventListener('click', e => {
    const link = e.target.closest('[data-chapter]');
    if (link && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('chapter', link.dataset.chapter); }
  });
  return section;
}

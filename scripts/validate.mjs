import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { JSDOM } from 'jsdom';
import katex from 'katex';
import { CHAPTERS } from '../src/data/curriculum.js';
import { LEARNING_PATH } from '../src/data/learningPath.js';
import { EXERCISES } from '../src/data/exercises/index.js';
import { integralModel, areaModel, covectorModel, partitionModel, curveModel } from '../src/labs/lessonLabModels.js';

// Use the real renderer/viewer in a DOM. CSS is checked by Vite, not executed by Node.
registerHooks({ load(url, context, nextLoad) {
  if (url.endsWith('.css')) return { format: 'module', source: '', shortCircuit: true };
  return nextLoad(url, context);
} });
const dom = new JSDOM('<!doctype html><body></body>', { url: 'http://localhost/#home' });
for (const name of ['window', 'document', 'localStorage', 'history', 'location', 'NodeFilter', 'AbortController', 'Event']) globalThis[name] = dom.window[name];
dom.window.HTMLElement.prototype.scrollIntoView = function () {};
const tick = () => new Promise(resolve => setTimeout(resolve, 20));
const close = (actual, expected, epsilon = 1e-10) => assert.ok(Math.abs(actual - expected) < epsilon, `${actual} != ${expected}`);

let formulaCount = 0;
const chapterDocuments = new Map();
for (const chapter of Object.values(CHAPTERS)) {
  assert.equal(new Set(chapter.sections.map(s => s.id)).size, chapter.sections.length, `Duplicate sections: ${chapter.id}`);
  const root = document.createElement('article');
  root.innerHTML = chapter.sections.map(s => `<section id="${s.id}">${s.content}</section>`).join('') + chapter.homework.map(h => h.statement + h.hints.join('') + h.solution).join('');
  const ids = [...root.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(new Set(ids).size, ids.length, `Duplicate anchors: ${chapter.id}`);
  chapterDocuments.set(chapter.id, root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const text = walker.currentNode.nodeValue;
    assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text), `Control character in ${chapter.id}`);
    for (const match of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g)) {
      katex.renderToString(match[1] ?? match[2], { throwOnError: true, strict: false });
      formulaCount++;
    }
  }
  for (const el of root.querySelectorAll('[data-tex]')) {
    katex.renderToString(el.dataset.tex, { throwOnError: true, strict: false }); formulaCount++;
  }
}
for (const route of LEARNING_PATH) {
  assert.ok(CHAPTERS[route.chapterId]);
  const earlier = LEARNING_PATH.slice(0, LEARNING_PATH.indexOf(route)).map(r => r.chapterId);
  for (const id of route.prerequisites) assert.ok(earlier.includes(id), `Prerequisite cycle/order: ${route.chapterId} -> ${id}`);
  if (route.firstRead) assert.deepEqual([...route.firstRead].sort(), CHAPTERS[route.chapterId].sections.map(s => s.id).sort());
  if (route.preparation) assert.ok(chapterDocuments.get(route.preparation.chapterId).querySelector(`[id="${route.preparation.sectionId}"]`));
}
for (const [id, root] of chapterDocuments) for (const link of root.querySelectorAll('a[href^="#"]')) {
  const targetChapter = link.dataset.lessonChapter || id;
  const target = link.dataset.lessonSection || link.getAttribute('href').slice(1);
  if (target) assert.ok(chapterDocuments.get(targetChapter)?.querySelector(`[id="${target}"]`), `Broken lesson link: ${id} -> ${targetChapter}/${target}`);
}
const exerciseFiles = readdirSync(new URL('../src/data/exercises/', import.meta.url)).filter(file => file.endsWith('.js'));
for (const file of ['chapters/tutorialChapters.js', 'chapters/integrationJourney.js', ...exerciseFiles.map(file => `exercises/${file}`)]) {
  const source = readFileSync(new URL(`../src/data/${file}`, import.meta.url), 'utf8');
  const bad = [...source.matchAll(/(?<!\\)(?:\\\\)*\\[A-Za-z,;! ]/g)];
  assert.equal(bad.length, 0, `Unescaped TeX in ${file}: ${bad.map(m => source.slice(m.index, m.index + 35)).join(' | ')}`);
}
const homeworkIds = Object.values(CHAPTERS).flatMap(c => c.homework.map(hw => hw.id));
assert.equal(new Set(homeworkIds).size, homeworkIds.length, 'Homework IDs must be unique for saved progress');
for (const [chapterId, exercises] of Object.entries(EXERCISES)) {
  const chapter = CHAPTERS[chapterId];
  for (const section of chapter.sections) assert.ok(exercises.some(hw => hw.sectionId === section.id), `No practice for ${chapterId}/${section.id}`);
  for (const hw of exercises) {
    assert.ok(chapter.sections.some(s => s.id === hw.sectionId), `Invalid review link: ${hw.id}`);
    assert.ok(['基础', '进阶', '挑战'].includes(hw.difficulty));
    assert.ok(hw.hints.length >= 2, `Missing staged hints: ${hw.id}`);
  }
}

// Mathematical invariants of the experiments, including orientation and singular cases.
for (const k of [0, 0.3, 0.9]) for (const reverse of [false, true]) {
  const m = integralModel({ n: 80, k, reverse });
  assert.ok(m.error < 0.001);
  close(m.exact, reverse ? -7.5 : 7.5);
  close(integralModel({ n: 80, k, reverse, object: 'mass' }).sum, Math.abs(m.sum));
  close(integralModel({ n: 80, k, reverse, object: 'scalar' }).exact, 2.5 - k / 2);
  if (k) assert.ok(m.error < integralModel({ n: 4, k, reverse }).error);
}
for (const h of [-2, 0, 1.5]) for (const shear of [-2, 0, 2]) {
  close(areaModel(shear, h).determinant, 2 * h);
  close(areaModel(shear, h, true).determinant, -2 * h);
}
close(covectorModel(0, 0, 2, -1), 0); close(covectorModel(3, -1, 2, 1), 5);
for (const blend of [0, 0.25, 0.5, 1]) {
  const m = partitionModel(blend); close(m.first + m.second, 2);
  let numeric = 0;
  for (let i = 0; i < 10000; i++) { const x = (i + 0.5) / 5000; assert.ok(m.weight(x) >= 0 && m.weight(x) <= 1); numeric += x * m.weight(x) / 5000; }
  close(numeric, m.first, 1e-8);
}
close(curveModel(1).cumulative, 5 / 3); close(curveModel(1, true).cumulative, -5 / 3);
for (const reverse of [false, true]) {
  const m = curveModel(0.4, reverse);
  close(m.coefficient, m.y * m.vx + 2 * m.x * m.vy);
  close((curveModel(0.400001, reverse).cumulative - curveModel(0.399999, reverse).cumulative) / 0.000002, m.coefficient, 1e-8);
}

const { createChapterViewer } = await import('../src/components/chapterViewer.js');
const { createLearningPath } = await import('../src/components/learningPath.js');
const navigations = [];
const navigate = (...args) => navigations.push(args);
const mount = async (id, target) => {
  const view = createChapterViewer(id, navigate, target); document.body.append(view); await tick(); return view;
};
const dispose = view => { view.cleanup(); view.remove(); };
const visibleSections = view => [...view.querySelectorAll('.chapter-sub-section')].filter(el => !el.hidden);
for (const chapter of Object.values(CHAPTERS)) {
  const rendered = await mount(chapter.id, chapter.sections[0].id);
  assert.equal(visibleSections(rendered).length, 1);
  assert.equal(rendered.querySelectorAll('.katex-error').length, 0, `Rendered math: ${chapter.id}`);
  assert.ok(!rendered.querySelector('[data-reader-position]').textContent.includes('undefined'));
  dispose(rendered);
}
let view = await mount('calculus-bridge');
assert.equal(visibleSections(view).length, 1); assert.equal(visibleSections(view)[0].id, 'start-quantities');
assert.ok(view.querySelector('[data-reader-prev]').disabled);
view.querySelector('[data-reader-next]').click();
assert.equal(visibleSections(view)[0].id, 'start-linear'); assert.ok(location.hash.endsWith('/start-linear'));
view.querySelector('#reader-all').click(); assert.equal(visibleSections(view).length, 6);
view.querySelector('#reader-all').click(); assert.equal(visibleSections(view).length, 1);
dispose(view); view = await mount('calculus-bridge'); assert.equal(visibleSections(view)[0].id, 'start-linear'); dispose(view);

// Practice navigation, difficulty/progress filters, disclosures and persisted completion.
view = await mount('calculus-bridge', 'start-quantities');
view.querySelector('#start-quantities .section-practice a').click();
assert.equal(view.querySelector('#homework-section').hidden, false);
assert.ok(location.hash.endsWith('/card-ex-calc-01'));
const practiceFilter = view.querySelector('[data-practice-filter]');
practiceFilter.value = '挑战'; practiceFilter.dispatchEvent(new Event('change'));
assert.equal([...view.querySelectorAll('[data-practice-level]')].filter(el => !el.hidden).length, 1);
view.querySelector('.tree-sub-item[href="#start-quantities"]').click();
view.querySelector('#start-quantities .section-practice a').click();
assert.equal(practiceFilter.value, 'all', 'Navigating directly to a filtered-out exercise must reveal it');
const practiceCard = view.querySelector('#card-ex-calc-01');
assert.equal(practiceCard.querySelector('.solution-box').open, false);
practiceCard.querySelector('.solution-box > summary').click();
assert.ok(practiceCard.querySelector('.solution-box').open);
assert.ok(practiceCard.querySelector('.proof-step').open);
const remainingFilter = view.querySelector('[data-practice-remaining]');
remainingFilter.click(); practiceCard.querySelector('[data-hw-id]').click();
assert.ok(practiceCard.hidden);
assert.ok(view.querySelector('[data-practice-progress]').textContent.includes('已掌握 1 题'));
view.querySelector('.tree-sub-item[href="#start-quantities"]').click();
view.querySelector('#start-quantities .section-practice a').click();
assert.equal(remainingFilter.checked, false);
assert.equal(practiceCard.hidden, false);
practiceCard.querySelector('.practice-meta a').click();
assert.equal(visibleSections(view)[0].id, 'start-quantities');
dispose(view); view = await mount('calculus-bridge', 'card-ex-calc-01');
assert.equal(view.querySelector('#card-ex-calc-01 [data-hw-id]').getAttribute('aria-pressed'), 'true');
view.querySelector('#card-ex-calc-01 [data-hw-id]').click(); // Restore the test's initial progress.
view.querySelector('.tree-sub-item[href="#start-linear"]').click();
const savedCount = view.querySelector('[data-practice-progress]').textContent;
const oldFilter = view.querySelector('[data-practice-filter]');
dispose(view); oldFilter.value = '挑战'; oldFilter.dispatchEvent(new Event('change'));
assert.equal(view.querySelector('[data-practice-progress]').textContent, savedCount, 'Disposed practice listeners must stop');

view = await mount('diff-geom-01', 'geometric-density-definition');
assert.equal(visibleSections(view)[0].id, 'sec-integration-definition');
assert.ok(view.querySelector('#integration-rigorous-reference').open);
assert.equal(view.querySelectorAll('.katex-error').length, 0);
// A link from the expanded reference must reveal a hidden earlier section.
view.querySelector('a[href="#sec-integration-foundations"]').click();
assert.equal(visibleSections(view)[0].id, 'sec-integration-foundations');
view.querySelector('a[data-lesson-chapter="geometry-intro"][data-lesson-section="intro-surface"]').click();
assert.deepEqual(navigations.at(-1), ['chapter', 'geometry-intro', 'intro-surface']);
const lab = view.querySelector('[data-lesson-lab="integral"]');
const change = (name, value) => {
  const input = lab.querySelector(`[name="${name}"]`);
  if (input.type === 'checkbox') input.checked = value; else input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
};
change('k', 0.9); change('reverse', true);
assert.equal(lab.querySelectorAll('.lab-metrics strong')[1].textContent, '-7.5');
change('object', 'mass'); assert.equal(lab.querySelectorAll('.lab-metrics strong')[1].textContent, '7.5');
change('object', 'scalar'); assert.equal(lab.querySelectorAll('.lab-metrics strong')[1].textContent, '2.05');
lab.querySelector('[type="reset"]').click(); await tick();
assert.equal(lab.querySelector('[name="k"]').value, '0'); assert.equal(lab.querySelector('[name="object"]').value, 'form');
assert.equal(lab.querySelector('[name="reverse"]').checked, false);
assert.equal(lab.querySelectorAll('.lab-metrics strong')[1].textContent, '7.5');
Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true });
view.querySelector('#btn-sidebar-mobile-toggle').click(); assert.ok(view.querySelector('.sidebar').classList.contains('mobile-expanded'));
view.querySelector('.tree-sub-item').click(); assert.equal(view.querySelector('#btn-sidebar-mobile-toggle').getAttribute('aria-expanded'), 'false');
const beforeCleanup = lab.querySelector('.lesson-lab-output').innerHTML;
dispose(view); change('k', 0.9); assert.equal(lab.querySelector('.lesson-lab-output').innerHTML, beforeCleanup);
// Canvas drawing is stubbed here; check the legacy lab's values and lazy lifecycle, not its pixels.
let canvasDraws = 0;
dom.window.HTMLCanvasElement.prototype.getContext = () => new Proxy({}, {
  get: (_, name) => name === 'clearRect' ? () => { canvasDraws++; } : () => {},
  set: () => true
});
view = await mount('diff-geom-01', 'inline-lab-slot');
const legacySlot = view.querySelector('#inline-lab-slot');
assert.ok(legacySlot.querySelector('.katex'));
const initialArea = Number(legacySlot.querySelector('#hud-area-val').textContent);
legacySlot.querySelector('#btn-swap-vectors').click();
close(Number(legacySlot.querySelector('#hud-area-val').textContent), -initialArea);
const rotation = legacySlot.querySelector('#slider-geom-rot');
rotation.value = '1.5'; rotation.dispatchEvent(new Event('input', { bubbles: true }));
assert.equal(legacySlot.querySelector('#val-geom-rot').textContent, '1.50 rad');
close(Number(legacySlot.querySelector('#hud-area-val').textContent), -initialArea);
view.querySelector('.tree-sub-item').click();
assert.equal(legacySlot.childElementCount, 0);
const drawsAfterHide = canvasDraws;
await new Promise(resolve => setTimeout(resolve, 65));
assert.equal(canvasDraws, drawsAfterHide); dispose(view);
const path = createLearningPath(navigate); assert.equal(path.querySelectorAll('.learning-path-card').length, 10);
path.querySelector('[data-chapter="calculus-bridge"]').click(); assert.deepEqual(navigations.at(-1), ['chapter', 'calculus-bridge']);

// Exercise the real router: shared nested URL, next section, browser Back and course links.
document.body.innerHTML = '<div id="app"></div>';
window.scrollTo = () => {};
history.replaceState(null, '', '#chapter-diff-geom-01/geometric-density-definition');
await import('../src/main.js'); await tick();
assert.ok(document.querySelector('#integration-rigorous-reference').open);
document.querySelector('#btn-quick-start').click(); await tick();
assert.equal(location.hash, '#chapter-calculus-bridge');
document.querySelector('[data-reader-next]').click();
assert.ok(location.hash.includes('/start-chain')); // The previously saved reading position was start-linear.
history.back(); await tick();
assert.equal(location.hash, '#chapter-calculus-bridge');
document.querySelector('.nav-link[data-view="curriculum"]').click(); await tick();
assert.equal(document.querySelectorAll('.learning-path-card').length, 10);
document.querySelector('[data-chapter="geometry-intro"]').click(); await tick();
assert.equal(visibleSections(document)[0].id, 'intro-charts');
document.querySelector('.nav-link[data-view="home"]').click(); await tick();
dom.window.close();
console.log(`Validated ${Object.keys(CHAPTERS).length} courses, ${homeworkIds.length} exercises, ${formulaCount} formulas, section practice coverage, five numerical models and reader/practice/lab DOM interactions.`);

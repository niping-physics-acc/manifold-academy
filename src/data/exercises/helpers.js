// Keep the existing homework contract; new metadata connects practice to its lesson.
export function exercise(id, sectionId, difficulty, title, statement, hints, steps, caution) {
  return { id, sectionId, difficulty, title, statement, hints,
    solution: `<div class="exercise-solution">${steps.map((body, i) => `<details class="proof-step" ${i === 0 ? 'open' : ''}><summary>第 ${i + 1} 步</summary><div>${body}</div></details>`).join('')}${caution ? `<div class="intuition-box exercise-caution"><strong>容易混淆的地方：</strong>${caution}</div>` : ''}</div>` };
}

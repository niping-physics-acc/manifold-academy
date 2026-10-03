const STORAGE_KEY_PROGRESS = 'manifold_academy_progress';
const STORAGE_KEY_HOMEWORK = 'manifold_academy_homework';

export function getCompletedChapters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleChapterCompleted(chapterId) {
  const current = getCompletedChapters();
  const index = current.indexOf(chapterId);
  if (index > -1) {
    current.splice(index, 1);
  } else {
    current.push(chapterId);
  }
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(current));
  } catch (e) {}
  return current;
}

export function getCompletedHomework() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HOMEWORK);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleHomeworkCompleted(problemId) {
  const current = getCompletedHomework();
  const index = current.indexOf(problemId);
  if (index > -1) {
    current.splice(index, 1);
  } else {
    current.push(problemId);
  }
  try {
    localStorage.setItem(STORAGE_KEY_HOMEWORK, JSON.stringify(current));
  } catch (e) {}
  return current;
}

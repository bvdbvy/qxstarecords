export function getSubmissions() {
  const stored = localStorage.getItem("submissions");
  return stored ? JSON.parse(stored) : [];
}

export function saveSubmissions(submissions) {
  localStorage.setItem("submissions", JSON.stringify(submissions));
}

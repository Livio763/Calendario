// Modo oscuro
export function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
  });
}

export function updateTaskCounter() {
  const counter = document.getElementById('taskCounter');
  const all = JSON.parse(localStorage.getItem('calendario_v1') || '{}');
  let total = 0;
  Object.values(all).forEach(tasks => { total += tasks.length; });
  counter.textContent = `${total} tarea${total !== 1 ? 's' : ''}`;
}

export function setupSearch(listEl) {
  const searchInput = document.getElementById('searchTask');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = listEl.querySelectorAll('li.event');
    let visibleCount = 0;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) { item.style.display = 'flex'; visibleCount++; }
      else item.style.display = 'none';
    });
    const existing = listEl.querySelector('.no-results');
    if (existing) existing.remove();
    if (query && visibleCount === 0) {
      const noResults = document.createElement('li');
      noResults.className = 'no-results';
      noResults.textContent = 'No se encontraron tareas';
      listEl.appendChild(noResults);
    }
  });
}

export function createConfetti() {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = (Math.random() * 0.5) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

export function setupKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const editModal = document.getElementById('editModal');
      const alertModal = document.getElementById('alertModal');
      if (editModal.classList.contains('show')) editModal.classList.remove('show');
      if (alertModal.classList.contains('show')) alertModal.classList.remove('show');
    }
  });
}

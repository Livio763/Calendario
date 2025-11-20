import { localISO, format } from './utilidades.js';
import { renderCalendar } from './calendario_logica.js';
import { renderEvents, addTask, deleteTask, startEdit, commitEdit } from './tareas.js';
import { showNotification, scheduleNotifications } from './notificaciones.js';
import { initTheme, updateTaskCounter, setupSearch, createConfetti, setupKeyboardNav } from './extras.js';

const q = (s) => document.querySelector(s);

const dom = {
  calendarTable: q('#calendarTable'),
  monthYear: q('#monthYear'),
  prev: q('#prev'),
  next: q('#next'),
  selectedText: q('#selectedDateText'),
  listEl: q('#eventsList'),
  form: q('#taskForm'),
  title: q('#title'),
  desc: q('#desc'),
  photo: q('#photo'),
  time: q('#time'),
  editForm: q('#editForm'),
  editTitle: q('#editTitle'),
  editDesc: q('#editDesc'),
  editPhoto: q('#editPhoto'),
  editTime: q('#editTime'),
  editModal: q('#editModal'),
  cancelEdit: q('#cancelEdit'),
  notifyBtn: q('#notifyBtn'),
  alertModal: q('#alertModal'),
  closeAlert: q('#closeAlert'),
  alertTitle: q('#alertTitle'),
  alertTime: q('#alertTime'),
  alertDesc: q('#alertDesc'),
  alertPhoto: q('#alertPhoto'),
  format
};

dom.alertDom = {
  alertModal: dom.alertModal,
  alertTitle: dom.alertTitle,
  alertTime: dom.alertTime,
  alertDesc: dom.alertDesc,
  alertPhoto: dom.alertPhoto
};

const state = {
  view: new Date(),
  selectedISO: localISO(),
  editingIndex: -1,
  mode: 'view',
  renderCalendar: () => renderCalendar(state, dom),
  renderEvents: () => renderEvents(state, dom),
  editTask: (idx) => startEdit(state, dom, idx),
  deleteTask: (idx) => { deleteTask(state, idx); updateTaskCounter(); }
};

function initNotifications() {
  if ('Notification' in window && Notification.permission === 'granted') {
    dom.notifyBtn.textContent = 'Avisos activos';
    dom.notifyBtn.style.background = '#2563eb';
  }
  dom.notifyBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) { alert('Tu navegador no soporta notificaciones.'); return; }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('Avisos activados correctamente');
      dom.notifyBtn.textContent = 'Avisos activos';
      dom.notifyBtn.style.background = '#2563eb';
    } else {
      alert('Necesitas activar los permisos de notificación');
    }
  });
  scheduleNotifications(state, { alertDom: dom.alertDom }, state.renderEvents);
}

function wireUI() {
  dom.form.addEventListener('submit', (e) => { e.preventDefault(); addTask(state, dom); updateTaskCounter(); });
  dom.editForm.addEventListener('submit', (e) => { e.preventDefault(); commitEdit(state, dom); updateTaskCounter(); });
  dom.cancelEdit.addEventListener('click', () => { dom.editModal.classList.remove('show'); dom.editForm.reset(); });
  dom.closeAlert.addEventListener('click', () => { dom.alertModal.classList.remove('show'); });
  dom.prev.onclick = () => { state.view.setMonth(state.view.getMonth() - 1); state.renderCalendar(); };
  dom.next.onclick = () => { state.view.setMonth(state.view.getMonth() + 1); state.renderCalendar(); };
  setupSearch(dom.listEl); setupKeyboardNav();
  const panel = document.querySelector('.event-panel');
  const btnNew = document.getElementById('btnNew');
  const btnView = document.getElementById('btnView');
  function applyMode() { panel.classList.toggle('view-mode', state.mode === 'view'); panel.classList.toggle('form-mode', state.mode === 'form'); }
  applyMode();
  btnNew.addEventListener('click', () => { state.mode = 'form'; applyMode(); const s=document.getElementById('searchTask'); if (s) s.value=''; });
  btnView.addEventListener('click', () => { state.mode = 'view'; applyMode(); state.renderEvents(); });
}

function initWelcome() {
  setTimeout(() => {
    const welcome = document.getElementById('welcomeScreen');
    welcome.classList.add('fade-out');
    setTimeout(() => { welcome.style.display = 'none'; document.getElementById('mainApp').classList.add('visible'); }, 600);
  }, 2000);
}

function init() {
  dom.selectedText.textContent = format(state.selectedISO);
  initTheme(); updateTaskCounter(); wireUI(); initNotifications();
  state.renderCalendar(); state.renderEvents(); initWelcome();
}

window.addEventListener('DOMContentLoaded', init);
window.__calendarState = state; window.__showNotification = showNotification;

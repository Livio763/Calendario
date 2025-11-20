import { load, save } from './datos.js';
import { localISO, PLACEHOLDER_IMG } from './utilidades.js';
import { showNotification } from './notificaciones.js';

export function getTaskStatus(task, dateISO) {
  const todayISO = localISO();
  if (!task.time) return dateISO < todayISO ? 'completed' : 'no-time';
  if (dateISO < todayISO) return 'completed';
  const [y, mo, d] = dateISO.split('-').map(Number);
  const [hh, mm] = task.time.split(':').map(Number);
  const taskDateTime = new Date(y, mo - 1, d, hh, mm, 0, 0);
  const now = new Date();
  if (dateISO === todayISO && taskDateTime <= now) return 'completed';
  if (task.completed) return 'completed';
  return 'pending';
}

export function getStatusLabel(status) {
  switch (status) {
    case 'completed': return 'Realizada';
    case 'pending': return 'Pendiente';
    case 'no-time': return 'Sin horario';
    default: return '';
  }
}

export function renderEvents(state, dom) {
  const { listEl } = dom;
  const all = load();
  const raw = all[state.selectedISO] || [];
  const arr = raw.slice().sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time);
    if (a.time && !b.time) return -1;
    if (!a.time && b.time) return 1;
    return 0;
  });
  listEl.innerHTML = '';
  if (arr.length === 0) {
    listEl.innerHTML = '<li>No hay tareas aún.</li>';
    return;
  }
  arr.forEach((ev, idx) => {
    const status = getTaskStatus(ev, state.selectedISO);
    const li = document.createElement('li');
    li.className = `event ${status}`;
    const img = document.createElement('img');
    img.src = ev.photo || PLACEHOLDER_IMG;
    img.alt = ev.title;
    const info = document.createElement('div');
    info.className = 'event-info';
    const timeStr = ev.time ? `<div style="color:#666;font-size:.85rem">${ev.time}</div>` : '';
    const statusLabel = getStatusLabel(status);
    const statusBadge = `<span class="task-status status-${status}">${statusLabel}</span>`;
    const descHtml = ev.desc ? `<p class="task-desc">${ev.desc}</p>` : '';
    info.innerHTML = `<strong class="task-title">${ev.title}</strong>${timeStr}${descHtml}${statusBadge}`;
    const actions = document.createElement('div');
    actions.className = 'event-actions';
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn-edit';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => state.editTask(idx);
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-delete';
    btnDelete.textContent = 'Borrar';
    btnDelete.onclick = () => state.deleteTask(idx);
    actions.append(btnEdit);
    if (ev.time) {
      const btnNotify = document.createElement('button');
      btnNotify.className = 'btn-notify';
      btnNotify.textContent = 'Avisar';
      btnNotify.onclick = () => showNotification(ev.title, ev.desc);
      actions.append(btnNotify);
    }
    actions.append(btnDelete);
    li.append(img, info, actions);
    listEl.appendChild(li);
  });
}

export function addTask(state, dom) {
  const { title, desc, photo, time, form } = dom;
  const t = title.value.trim();
  if (!t) return;
  const d = desc.value.trim();
  const f = photo.files[0];
  const tm = time.value;
  const add = (photoData) => {
    const all = load();
    if (!all[state.selectedISO]) all[state.selectedISO] = [];
    all[state.selectedISO].push({
      title: t,
      desc: d,
      photo: photoData,
      time: tm,
      notified: false,
      completed: false
    });
    save(all);
    form.reset();
    state.renderCalendar();
    state.renderEvents();
    alert('Tarea guardada correctamente.');
  };
  if (f) {
    if (f.size > 500000) { alert('Imagen muy grande (máximo 500KB)'); return; }
    const r = new FileReader();
    r.onload = e => add(e.target.result);
    r.readAsDataURL(f);
  } else {
    add(null);
  }
}

export function deleteTask(state, idx) {
  if (!confirm('¿Eliminar esta tarea?')) return;
  const all = load();
  all[state.selectedISO].splice(idx, 1);
  if (all[state.selectedISO].length === 0) delete all[state.selectedISO];
  save(all);
  state.renderCalendar();
  state.renderEvents();
}

export function startEdit(state, dom, idx) {
  const all = load();
  const ev = all[state.selectedISO][idx];
  state.editingIndex = idx;
  dom.editTitle.value = ev.title;
  dom.editDesc.value = ev.desc || '';
  dom.editTime.value = ev.time || '';
  dom.editModal.classList.add('show');
}

export function commitEdit(state, dom) {
  const t = dom.editTitle.value.trim();
  if (!t) return;
  const d = dom.editDesc.value.trim();
  const tm = dom.editTime.value;
  const f = dom.editPhoto.files[0];
  const update = (photoData) => {
    const all = load();
    const old = all[state.selectedISO][state.editingIndex];
    const timeChanged = tm !== old.time;
    all[state.selectedISO][state.editingIndex] = {
      title: t,
      desc: d,
      photo: photoData || old.photo,
      time: tm,
      notified: false,
      completed: timeChanged ? false : (old.completed === true)
    };
    save(all);
    dom.editModal.classList.remove('show');
    dom.editForm.reset();
    state.renderCalendar();
    state.renderEvents();
    alert('Tarea actualizada correctamente.');
  };
  if (f) {
    if (f.size > 500000) { alert('Imagen muy grande (máximo 500KB)'); return; }
    const r = new FileReader();
    r.onload = e => update(e.target.result);
    r.readAsDataURL(f);
  } else {
    update(null);
  }
}

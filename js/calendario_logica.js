import { load } from './datos.js';
import { localISO, MONTHS, format } from './utilidades.js';

export function renderCalendar(state, dom) {
  const { view } = state;
  const { calendarTable, monthYear, selectedText } = dom;
  const y = view.getFullYear();
  const m = view.getMonth();
  const first = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0).getDate();
  const blanks = (first.getDay() + 6) % 7;
  monthYear.textContent = MONTHS[m] + ' ' + y;
  const data = load();
  let html = '<tr><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th></tr><tr>';
  for (let i = 0; i < blanks; i++) html += '<td></td>';
  for (let d = 1; d <= lastDay; d++) {
    const iso = localISO(new Date(y, m, d));
    let cls = 'day';
    if (iso === localISO()) cls += ' today';
    if (iso === state.selectedISO) cls += ' selected';
    const hasTasks = data[iso] && data[iso].length > 0;
    html += `<td class="${cls}" data-iso="${iso}">${d}${hasTasks ? '<div class="dot"></div>' : ''}</td>`;
    if ((d + blanks) % 7 === 0) html += '</tr><tr>';
  }
  html += '</tr>';
  calendarTable.innerHTML = html;
  calendarTable.querySelectorAll('td.day').forEach(td => {
    td.onclick = () => {
      state.selectedISO = td.dataset.iso;
      selectedText.textContent = format(state.selectedISO);
      state.renderCalendar();
      state.renderEvents();
    };
  });
}

import { load, save } from './datos.js';
import { localISO, PLACEHOLDER_IMG } from './utilidades.js';

export function mostrarNotificacion(titulo, cuerpo) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(titulo, {
        body: cuerpo || 'Tienes una tarea pendiente',
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%232563eb'/%3E%3Ctext x='32' y='40' text-anchor='middle' font-size='30' fill='white'%3E📅%3C/text%3E%3C/svg%3E",
        badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23ff3b30'/%3E%3C/svg%3E"
      });
    } catch (e) { console.error('Error al mostrar notificación:', e); }
  }
}
export const showNotification = mostrarNotificacion; // compatibilidad

export function sonidoAlerta() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const base = (f, tStart, tDur) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.frequency.value = f; osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, audioContext.currentTime + tStart);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + tStart + tDur);
    osc.start(audioContext.currentTime + tStart);
    osc.stop(audioContext.currentTime + tStart + tDur);
  };
  base(800, 0, 0.5); base(1000, 0.2, 0.5);
}
export const playAlertSound = sonidoAlerta;

export function mostrarModalAlerta(tarea, dom) {
  const { alertModal, alertTitle, alertTime, alertDesc, alertPhoto } = dom;
  alertTitle.textContent = tarea.title;
  alertTime.textContent = tarea.time ? `Hora: ${tarea.time}` : '';
  alertDesc.textContent = tarea.desc || 'Sin descripción';
  alertPhoto.src = tarea.photo || PLACEHOLDER_IMG;
  alertPhoto.style.display = 'block';
  alertModal.classList.add('show');
  sonidoAlerta();
}
export const showAlertModal = mostrarModalAlerta;

export function revisarNotificaciones(state, dom, rerender) {
  const all = load();
  const hoy = localISO();
  const ahora = new Date();
  const minutosActual = ahora.getHours() * 60 + ahora.getMinutes();
  if (all[hoy]) {
    let cambio = false;
    all[hoy].forEach(ev => {
      if (ev.time && !ev.notified) {
        const [h, m] = ev.time.split(':').map(Number);
        const minutosTarea = h * 60 + m;
        if (Math.abs(minutosTarea - minutosActual) <= 1) {
          mostrarModalAlerta(ev, dom.alertDom);
          mostrarNotificacion(ev.title, ev.desc);
          ev.notified = true; ev.completed = true; cambio = true;
        }
      }
    });
    if (cambio) { save(all); if (state.selectedISO === hoy) rerender(); }
  }
}
export const checkNotifications = revisarNotificaciones;

export function programarNotificaciones(state, dom, rerender) {
  (function ciclo() {
    revisarNotificaciones(state, dom, rerender);
    const ahora = new Date();
    const ms = (60 - ahora.getSeconds()) * 1000 - ahora.getMilliseconds();
    setTimeout(ciclo, ms);
  })();
}
export const scheduleNotifications = programarNotificaciones;

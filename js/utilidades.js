export function localISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatoFecha(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
// Mantener nombre original para compatibilidad
export const format = formatoFecha;

export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
export const MONTHS = MESES;

export const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%' stop-color='%232563eb'/%3E%3Cstop offset='100%' stop-color='%231d4ed8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4' y='8' width='72' height='68' rx='14' fill='url(%23g)'/%3E%3Crect x='12' y='20' width='56' height='44' rx='8' fill='%23ffffff'/%3E%3Crect x='12' y='20' width='56' height='10' rx='8' fill='%23e0ebff'/%3E%3Ccircle cx='26' cy='47' r='6' fill='%232563eb'/%3E%3Crect x='38' y='41' width='24' height='12' rx='4' fill='%23f97316'/%3E%3Ctext x='50' y='50' text-anchor='middle' font-size='10' font-family='Segoe UI, Arial' fill='white'%3EHOY%3C/text%3E%3C/svg%3E";

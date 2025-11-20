export const KEY = 'calendario_v1';
export const cargar = () => JSON.parse(localStorage.getItem(KEY) || '{}');
export const guardar = (o) => localStorage.setItem(KEY, JSON.stringify(o));
// Para compatibilidad con código existente
export const load = cargar;
export const save = guardar;

import render from './render';

export default function mutate<T, K extends keyof T>(
  store: T,
  key: K,
  value: T[K]
) {
  if (store[key] === value) return;
  store[key] = value;
  render();
}

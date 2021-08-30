export function remove<T>(array: T[], element: T): void {
  const i = array.indexOf(element);
  array.splice(i, 1);
}

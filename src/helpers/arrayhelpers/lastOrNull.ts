export function lastOrNull<T>(array: T[]) : T | null {
    return array.length == 0 ? null : array[array.length - 1];
}
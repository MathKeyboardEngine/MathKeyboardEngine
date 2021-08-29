export function firstAfter<T>(array: T[], element : T ) : T | null {
    const i = array.indexOf(element);
    if (i != -1 && i < array.length - 1) {
        return array[i + 1];
    } else {
        return null;
    }
}
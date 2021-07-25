export function firstAfter<T>(array: T[], element : T ) : T | null {
    let i = array.indexOf(element);
    if (i != -1 && i < array.length - 2) {
        return array[i + 1];
    } else {
        return null;
    }
}
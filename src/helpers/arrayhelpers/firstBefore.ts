export function firstBefore<T>(array: T[], element : T ) : T | null {
    let i = array.indexOf(element);
    if ( i > 0) {
        return array[i - 1];
    } else {
        return null;
    }
}
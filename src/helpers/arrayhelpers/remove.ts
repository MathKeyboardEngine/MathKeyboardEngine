export function remove<T>(array: T[], element : T ) : void {
    let i = array.indexOf(element);
    array.slice(i, 1);
}
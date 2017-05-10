export function isIterableEmtpy(iterable: Iterable<any>): boolean {
    if (iterable) {
        for (let element of iterable) {
            return false;
        }
    }
    return true;
}

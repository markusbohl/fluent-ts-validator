export function isIterable(input: any): input is Iterable<any> {
    if (input) {
        return input[Symbol.iterator] !== undefined;
    }

    return false;
}

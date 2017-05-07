export interface HasLength {
    length: number;
}

export function hasLength(input: any): input is HasLength {
    return input != null && input.length !== undefined;
}

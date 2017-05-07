export interface HasSize {
    size: number;
}

export function hasSize(input: any): input is HasSize {
    return input != null && input.size !== undefined;
}

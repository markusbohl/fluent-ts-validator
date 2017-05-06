export interface HasSize {
    size: number;
}

export interface HasLength {
    length: number;
}

export type SizedIterable<T> = (Iterable<T> & HasLength) | (Iterable<T> & HasSize);

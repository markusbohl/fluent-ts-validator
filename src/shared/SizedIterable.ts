import {HasLength} from "./HasLength";
import {HasSize} from "./HasSize";

export type SizedIterable<T> = (Iterable<T> & HasLength) | (Iterable<T> & HasSize);


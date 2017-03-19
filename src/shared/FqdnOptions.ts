/**
 * Options to be passed to IsFqdnValidator.
 */
export interface FqdnOptions {
    require_tld?: boolean;
    allow_underscores?: boolean;
    allow_trailing_dot?: boolean;
}
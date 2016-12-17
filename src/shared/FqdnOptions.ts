"use strict";

/**
 * Options to be passed to IsFQDNValidator.
 */
export interface FqdnOptions {
    require_tld?: boolean;
    allow_underscores?: boolean;
    allow_trailing_dot?: boolean;
}
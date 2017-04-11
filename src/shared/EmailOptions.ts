/**
 * Options to be passed to IsEmailValidator.
 */
export interface EmailOptions {
    allow_display_name?: boolean;
    require_display_name?: boolean;
    allow_utf8_local_part?: boolean;
    require_tld?: boolean;
}
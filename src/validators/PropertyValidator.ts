export interface PropertyValidator<TProperty> {

    isValid(input: TProperty | undefined): boolean;
}

export interface PropertyValidator<TProperty> {

    isValid(input: TProperty | any): boolean;
}

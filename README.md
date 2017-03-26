# fluent-ts-validator

A small validation library written in TypeScript which uses a fluent API and lambda expressions to build validation rules. It is inspired by the [FluentValidation](https://github.com/JeremySkinner/FluentValidation) library for .NET written by Jeremy Skinner.

Instead of implementing an awful lot of validation logic within this project again this library 
makes use of the mature validation library [validator.js](https://github.com/chriso/validator.js)
 and delegates invocations to it where it makes sense.

In this respect, special thanks go to these two projects.

The fluent-ts-validator library is licensed under [MIT](https://opensource.org/licenses/MIT).


## Usage

Creating a validator for your needs is simply done by extending the `AbstractValidator<T>` 
class for a specific type and defining a set of validation rules within the constructor of that 
class. Then create an instance of that validator and invoke the `validate()` or `validateAsync()` 
method with an object you want to validate.  


### Basic Validation Example

```TypeScript
import {Superhero} from "../models/superhero";
import {AbstractValidator, Severity} from "fluent-ts-validator";

export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfString(superhero => superhero.name)
            .isAlphanumeric()
            .withFailureMessage("C'mon! At least some pronounceable name.");

        this.validateIf(superhero => superhero.superpowers)
            .isNotEmpty()
            .unless(superhero => superhero.immortal)
            .withFailureCode("FAKE-001")
            .withSeverity(Severity.WARNING);

        this.validateIfEachString(superhero => superhero.superpowers.map(power => power.description))
            .hasLengthBetween(5, 50)
            .when(superheros => superheros.superpowers != null);
    }
}

const superhero: Superhero = ...;
const validator = new SuperheroValidator();

const result = validator.validate(superhero);
const validationSucceeded = result.isValid();
const failures = result.getFailures();
```

### Rule Building
Validation rules are built in a fluent API style. Entry points are always the 
type-based `validateIf` or `validateIfEach` kind of methods. These variants are available:
- `validateIf`
- `validateIfAny`
- `validateIfNumber`
- `validateIfDate`
- `validateIfString`
- `validateIfEach`
- `validateIfEachAny`
- `validateIfEachNumber`
- `validateIfEachDate`
- `validateIfEachString`

All of these methods expect a lambda expression as parameter which maps the input to specific 
validatable attributes of that instance. Depending on the type of the validatable attributes
different validation rules are available. The lambda expressions in the `validateIfEach`-methods 
map to an instance of type `Iterable`. Obviously, all elements in an Array, Set, or whatever kind
 of Iterable will then be validated.

For example:

```typescript
export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfString(superhero => superhero.name).isAlphanumeric();
        this.validateIfNumber(superhero => superhero.epicFightsWon).isGreaterThanOrEqual(3);
        this.validateIfDate(superhero => superhero.lastSighting).isAfter(THEdate);
    }
}
```
Above, `AbstractValidator` is typed with the `Superhero` class. So
the lamdba expressions expect instances of superheros. The type of the attribute to validate 
determines which `validateIf` method to use. So, checks on a superhero's name require the 
`validateIfString()` method, whether ensuring a superhero has won a certain amount of epic 
fights cries out for the `validateIfNumber()` method. In addition, the type of the attribute to 
validate determines which kind of validation rules are available. While `isAlphanumeric()` makes 
sense for a `string` it does not so much for a `Date` object. Using `isAfter(anotherDate)` is
plausible for a date but not for a number, etc. 

Only the types of validation rules that make sense for the attributes you are about to validate 
will be available. And that is an _epic_ win for auto completion.


#### Rule Concatencation

Validation rules can also be concatenated.

```typescript
export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfString(superhero => superhero.name)
            .isAlphanumeric().isUppercase().hasMinLength(3).isNotIn(arrayOfBadGuys);
    }
}
```

#### Conditional Validation

Sometimes, the necessity of validating a property depends on certain conditions. 
Conditional rules allow you to specify under which circumstances a validation should be executed or
 not. That's the reason why you can append a `when()` or an `unless()` method to your 
 validation rules. Both methods expect a lambda expression as parameter that evaluates to a boolean 
 value. When the lambda expression in a `when()` results in `true`, the validation is 
 executed. With `unless()` it is the other way round. The validation does _not_ take place when 
 the corresponding lambda expression evaluates to `true`.

```typescript
export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfString(superhero => superhero.name).isIn(hallOfFame)
            .when(superhero => superhero.epicFightsWon > 100);

        this.validateIf(superhero => superhero.superpowers).isNotEmpty()
            .unless(superhero => superhero.immortal);
    }
}
```

#### Validation Failure Configuration

Eventually, the appearance of validation failures can be configured on a per-property basis. In 
case an _invalid_ object is passed to the `validate()` or `validateAsync()` method, you might be 
interested in details about the failure, possibly react to it, or pass some failure-specific 
information along.

```typescript
export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfNumber(superhero => superhero.epicFightsWon).isLessThan(1)
            .withSeverity(Severity.INFO)
            .withFailureCode("F_0")
            .withFailureMessage("Don't give up!")
            .onFailure(failure => console.log(failure));
    }
}
```

## Validation Rules

### Common Validation Rules

Common validation rules are applicable to properties of all types.

#### Methods

- `isDefined()`: Validates if a property is _defined_. 
- `isUndefined()`: Validates if a property is _undefined_.
- `isNull()`: Validates if a property is _null_.
- `isNotNull()`: Validates if a property is _not null_.
- `isEmpty()`: Validates if a property is _empty_. 
    - _Empty_ in this context means either an empty `string`, `null`, or `undefined`. Or in case of 
collections (`Array`, `Set`, `Map`) that they do not contain any element (`length === 0`, `size 
=== 0`)
- `isNotEmpty()`: Validates if a property is _not empty_. 
    - That is, neither `null` nor `undefined` and not an empty `string`. If the property in 
    question is a collection (`Array`, `Set`, `Map`) this method checks if the collection contains elements.
- `isEqualTo(comparison: TProperty)`: Validates if a property is _equal_ to (`===`) the `comparison`
 parameter. 
- `isNotEqualTo(comparison: TProperty)`: Validates if a property is _not equal_ to (`!==`) the 
`comparison` parameter.
- `isIn(array: Array<TProperty>)`: Validates if a property or an equal value _is_ an element of the 
provided array (`===`).
- `isNotIn(array: Array<TProperty>)`: Validates if a property or an equal value _is not_ an element 
of the provided array (`!==`).



### String Validation Rules

#### Methods

- `contains(seed: string)`:
- `isAlphanumeric(locale?: AlphanumericLocale)`:
- `isAlpha(locale?: AlphaLocale)`:
- `isAscii()`:
- `isBase64()`:
- `isBooleanString()`:
- `isCurrency(options?: CurrencyOptions)`:
- `isDateString()`:
- `isDecimalString()`:
- `isEmail(options?: EmailOptions)`:
- `isFqdn(options?: FqdnOptions)`:
- `isHexadecimal()`:
- `isIso8601()`:
- `isJson()`:
- `hasLengthBetween(min: number, max: number)`:
- `hasMinLength(min: number)`:
- `hasMaxLength(max: number)`:
- `isLowercase()`:
- `isMobilePhoneNo(locale: MobilePhoneLocale)`:
- `isNumericString()`:
- `isUrl(options?: UrlOptions)`:
- `isUppercase()`:
- `isUuid(version?: UuidVersion)`:
- `matches(pattern: RegExp, modifiers?: string)`:


### Number Validation Rules

#### Methods

- `isPositive()`:
- `isNegative()`:
- `isGreaterThan(threshold: number)`:
- `isGreaterThanOrEqual(threshold: number)`:
- `isLessThan(threshold: number)`:
- `isLessThanOrEqual(threshold: number)`:

### Date Validation Rules

#### Methods

- `isBefore(date: Date)`:
- `isSameAs(date: Date)`:
- `isAfter(date: Date)`:
- `isSameOrBefore(date: Date)`:
- `isSameOrAfter(date: Date)`:
- `isBetween(date1: Date, date2: Date, lowerBoundary?: "(" | "[", upperBoundary?: ")" | "]")`:


### Type Validation Rules

#### Methods

- `isArray()`:
- `isBoolean()`:
- `isDate()`:
- `isNumber()`:
- `isString()`:


## Custom Validators


## Validation Conditions



## Validation Result & Validation Failures



## Asynchronous Validation




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
validate also determines which kind of validation rules are available. While `isAlphanumeric()` 
makes sense for a `string` it does not so much for a `Date` object. Using `isAfter(anotherDate)` is
plausible for a date but not for a number, etc. 

Only the types of validation rules that make sense for the attributes you are about to validate 
will be available. And that is an _epic_ win for auto completion. A detailed overview of all 
available validation options can be found in the [Validation Rules](#validation-rules) section 
below.


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
 the corresponding lambda expression evaluates to `true`. For details, see [Validation Conditions]
 (#validation-conditions).

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
information along. For details about the various methods see [Validation Result & Validation Failures](#validation-result--validation-failures).

```typescript
export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfNumber(superhero => superhero.epicFightsWon).isNotEqualTo(0)
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

- `isDefined()`: Checks if a property is defined. 
- `isUndefined()`: Checks if a property is undefined.
- `isNull()`: Checks if a property is null.
- `isNotNull()`: Checks if a property is not null.
- `isEmpty()`: Checks if a property is empty. 
    - Empty in this context means either an empty `string`, `null`, or `undefined`. Or in case of 
collections (`Array`, `Set`, `Map`) that they do not contain any element (`length === 0`, `size 
=== 0`)
- `isNotEmpty()`: Checks if a property is not empty. 
    - That is, neither `null` nor `undefined` and not an empty `string`. If the property in 
    question is a collection (`Array`, `Set`, `Map`) this method checks if the collection contains elements.
- `isEqualTo(comparison: TProperty)`: Checks if a property is equal to (`===`) the `comparison`
 parameter. 
- `isNotEqualTo(comparison: TProperty)`: Checks if a property is not equal to (`!==`) the 
`comparison` parameter.
- `isIn(array: Array<TProperty>)`: Checks if a property or an equal value is an element of the 
provided array (`===`).
- `isNotIn(array: Array<TProperty>)`: Checks if a property or an equal value is not an element 
of the provided array (`!==`).



### String Validation Rules

The largest group of validation rules targets properties of type `string`. Most of these rules 
delegate the actual validation to the internal [validator.js](https://github.com/chriso/validator.js) library.

#### Methods

- `contains(seed: string)`: Checks if a string contains a substring or `seed`.
- `isAlphanumeric(locale?: AlphanumericLocale)`: Checks if a string is alphanumeric.
    - an optional locale can be set. It accepts a locale of
    `AlphanumericLocale = "ar" | "ar-AE" | "ar-BH" | "ar-DZ" | "ar-EG" | "ar-IQ" | "ar-JO" | 
    "ar-KW" | "ar-LB" | "ar-LY" | "ar-MA" | "ar-QA" | "ar-QM" | "ar-SA" | "ar-SD" | "ar-SY" | 
    "ar-TN" | "ar-YE" | "cs-CZ" | "de-DE" | "en-AU" | "en-GB" | "en-HK" | "en-IN" | "en-NZ" | 
    "en-US" | "en-ZA" | "en-ZM" | "es-ES" | "fr-FR" | "fr-BE" | "hu-HU" | "nl-BE" | "nl-NL" | 
    "pl-PL" | "pt-BR" | "pt-PT" | "ru-RU" | "sr-RS" | "sr-RS@latin" | "tr-TR";` defaults to `en-US`
- `isAlpha(locale?: AlphaLocale)`: Checks if a string contains only letters (a-zA-Z). 
    - an optional locale can be set, which is  one of `AlphaLocale = "ar" | "ar-AE" | "ar-BH" | 
    "ar-DZ" | "ar-EG" |
  "ar-IQ" | "ar-JO" | "ar-KW" | "ar-LB" | "ar-LY" | "ar-MA" | "ar-QA" | "ar-QM" | "ar-SA" | 
  "ar-SD" | "ar-SY" | "ar-TN" | "ar-YE" | "cs-CZ" | "de-DE" | "en-AU" | "en-GB" | "en-HK" | 
  "en-IN" | "en-NZ" | "en-US" | "en-ZA" | "en-ZM" | "es-ES" | "fr-FR" | "hu-HU" | "nl-NL" | 
  "pl-PL" | "pt-BR" | "pt-PT" | "ru-RU" | "sr-RS" | "sr-RS@latin" | "tr-TR";` if not set, defaults
   to `en-US`.
- `isAscii()`: Checks if a string contains ASCII chars only.
- `isBase64()`: Checks if a string is Base64 encoded.
- `isBooleanString()`: Checks if a string is a boolean.
- `isCurrency(options?: CurrencyOptions)`: Checks if a string is a valid currency amount.
    - the optional parameter defaults to `CurrencyOptions: {
    symbol: '$', 
    require_symbol: false, 
    allow_space_after_symbol: 
    false, symbol_after_digits: false, 
    allow_negatives: true, 
    parens_for_negatives: false, 
    negative_sign_before_digits: false, 
    negative_sign_after_digits: false, 
    allow_negative_sign_placeholder: false, 
    thousands_separator: ',', 
    decimal_separator: '.', 
    allow_space_after_digits: false 
    }`
- `isDecimalString()`: Checks if a string represents a decimal number, such as 0.1, .3, 1.1, 1
.00003, 4.0, etc.
- `isEmail(options?: EmailOptions)`: Checks if a string is an email.
    - the optional parameter defaults to `EmailOptions: { allow_display_name: false, 
    require_display_name: false, allow_utf8_local_part: true, require_tld: true }`. 
    - if `allow_display_name` is set to `true`, the validator will also match `Display Name 
    <email-address>`. If `require_display_name` is set to true, the validator will reject strings without the format `Display Name <email-address>`. If `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part. If `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched.
- `isFqdn(options?: FqdnOptions)`: Checks if a string is a fully qualified domain name (e.g. 
domain.com). 
    - the optional parameter is an option that defaults to `FqdnOptions: { require_tld: true, allow_underscores: false, allow_trailing_dot: false }`.
- `isHexadecimal()`: Checks if a string is a hexadecimal number.
- `isIso8601()`: Checks if a string is a valid ISO 8601 date.
- `isJson()`: Check if a string is valid JSON (note: uses JSON.parse).
- `hasLengthBetween(min: number, max: number)`: Checks if a string falls in a the `min` - `max` 
range. 
- `hasMinLength(min: number)`: Checks if a string has at least `min` length.
- `hasMaxLength(max: number)`: Checks if a string has at most `max` length.
- `isLowercase()`: Checks if a string is all lowercase.
- `isMobilePhoneNo(locale: MobilePhoneLocale)`: Checks if a string is a mobile phone number.
    - the `locale` is one of `MobilePhoneLocale = "ar-DZ" | "ar-SA" | "ar-SY" | "cs-CZ" | "de-DE" | "da-DK" | "el-GR" | "en-AU" | "en-GB" | "en-HK" | "en-IN" | "en-NZ" | "en-US" | "en-CA" | "en-ZA" | "en-ZM" | "es-ES" | "fi-FI" | "fr-FR" | "hu-HU" | "it-IT" | "ja-JP" | "ms-MY" | "nb-NO" | "nn-NO" | "pl-PL" | "pt-PT" | "ru-RU" | "sr-RS" | "tr-TR" | "vi-VN" | "zh-CN" | "zh-TW";`
- `isNumericString()`: Checks if a string contains only numbers.
- `isUrl(options?: UrlOptions)`: Checks if a string is a URL.
    - the optional parameter defaults to `UrlOptions: { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }`
- `isUppercase()`: Checks if a string is all uppercase.
- `isUuid(version?: UuidVersion)`: Checks if a string is a UUID.
    - Optional `version` is one value of `UuidVersion = "3" | "4" | "5" | "all";`
    - defaults to `all`
- `matches(pattern: RegExp, modifiers?: string)`: Checks if a string matches a pattern.
    - optional `modifiers` are the same as a `RegExp` constructor would accept (e.g. `"i"` for 
    _ignore case_, or `"g"` for _global match_, etc.) 


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


## Custom Validators and Validation Expressions


## Validation Conditions



## Validation Result & Validation Failures

Each validator created with this library returns a `ValidationResult` object at the end of the 
validation process. It provides two methods that are of particular importance.

- `isValid(): boolean`
    - returns `true` if no `ValidationFailure` exists, `false` otherwise.
- `getFailures(): ValidationFailure[]`
    - returns an array containing `ValidationFailures` for the invalid properties. If no 
    failures exist, meaning the result is valid, an empty array is returned.

So, what is a `ValidationFailure`? It is an object with the following properties (all of them 
being _readonly_):

- `target: any`: the object as a whole that was validated
- `propertyName: string`: the name of the property that is considered invalid
- `attemptedValue: any`: the actual value of the property that is considered invalid
- `code: string`: a failure code, if set; otherwise `undefined`
- `message: string`: a failure message; if not explicitly set, it defaults to '`<propertyName>` is
 invalid'
- `severity: string`: the severity of the failure; defaults to `ERROR`

To make the relationship between a `Validator` and a `ValidationFailure` clear, take a look at the 
following `SuperheroValidator` and `Superhero` instance:

```typescript
export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.validateIfNumber(superhero => superhero.epicFightsWon).isNotEqualTo(0)
            .withSeverity(Severity.INFO)
            .withFailureCode("F_0")
            .withFailureMessage("Don't give up!");
    }
}

const superhero = new Superhero();
superhero.name = "SUPER DUDE";
superhero.epicFightsWon = 0;

const validator = new SuperheroValidator();
const result = validator.validate(superhero);
```

The `ValidationResult` will contain a `ValidationFailure` object in its array that looks like this:

```typescript
ValidationFailure {
  target: Superhero { name: 'SUPER DUDE', epicFightsWon: 0 },
  propertyName: 'epicFightsWon',
  attemptedValue: 0,
  code: 'F_0',
  message: 'Don\'t give up!',
  severity: 'INFO'
}
```
That makes it obvious which object failed validation due to which property and value.



## Asynchronous Validation




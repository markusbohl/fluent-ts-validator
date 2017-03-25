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
method with an 
object you want to validate.  


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
`AbstractValidator` is typed with the `Superhero` class. So
the lamdba expressions expect instances of superheros. The type of the attribute to validate 
determines which `validateIf` method to use. So, checks on a superhero's name require the 
`validateIfString()` method, whether ensuring a superhero has won a certain amount of epic 
fights cries out for the `validateIfNumber()` method. In addition, the type of the attribute to 
validate determines which kind of validation rules are available. While `isAlphanumeric()` makes 
sense for a `string` it does not so much for a `Date` object. Using `isAfter(anotherDate)` is
plausible for a date but not for a number, etc. 

Only the types of validation rules that make sense for the attributes you are about to validate 
will be available. And that is an _epic_ win for auto completion.

 
### Validation Conditions


### Custom Validators


## Validators

## Validation Result
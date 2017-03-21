# fluent-ts-validator

A small validation library written in TypeScript which uses a fluent API and lambda expressions to build validation rules. It is inspired by the [FluentValidation](https://github.com/JeremySkinner/FluentValidation) library for .NET written by Jeremy Skinner.

Instead of implementing an awful lot of validation logic within this project again this library makes use of the mature validation library [validator.js](https://github.com/chriso/validator.js) and delegates invocations to it when it makes sense.

In this respect, special thanks go to these two projects.

The fluent-ts-validator library is licensed under [MIT](https://opensource.org/licenses/MIT).


## Examples

### Basic Validation

```TypeScript
...
import {AbstractValidator, Severity} from "fluent-ts-validator";

export class SuperheroValidator extends AbstractValidator<Superhero> {
    constructor() {
        super();
        this.ruleForString(superhero => superhero.name)
            .isNotEmpty()
            .isAlphanumeric()
            .withErrorMessage("C'mon! At least some pronounceable name.");

        this.ruleFor(superhero => superhero.superpowers)
            .isNotEmpty()
            .unless(superhero => superhero.immortal)
            .withErrorCode("FAKE-001")
            .withSeverity(Severity.INFO);

        this.ruleForEachString(superhero => {
            return superhero.superpowers.map(power => power.description);
        }).isLength({min: 3, max: 40})
            .when(superheros => superheros.superpowers != null);
    }
}

const superhero: Superhero = ...;
const validator = new SuperheroValidator();

const result = validator.validate(superhero);
const validationSucceeded = result.isValid();
const failures = result.getFailures();
```
### Validation Conditions


### Collection Validation


### Custom Validators

## Validators
# Change Log
All notable changes to the [fluent-ts-validator](https://github.com/markusbohl/fluent-ts-validator) project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased](https://github.com/markusbohl/fluent-ts-validator/branches/all?utf8=%E2%9C%93&query=feature)

~~Added~~

~~Changed~~

~~Deprecated~~

~~Removed~~

~~Fixed~~

~~Security~~

## [2.0.0](https://github.com/markusbohl/fluent-ts-validator/releases/tag/2.0.0) - 2017-05-14

### Added

- New group of validation rules for `Iterables`. The entry point `validateIfIterable()` allows to apply the following checks:
    - `isEmpty()`
    - `isNotEmpty()`
    - `hasNumberOfElements(elementCount)`
    - `hasMinNumberOfElements(min)`
    - `hasMaxNumberOfElements(max)`
    - `hasNumberOfElementsBetween(min, max)`
    - `contains(element)`
    - `doesNotContain(element)`
    - as well as all common validation rules (`isDefined()`, `isIn()`, etc.)
- JSDoc for all public methods.
- Descriptions of added features to `README.md`.
- This Change Log.

### Changed

- Common validation rule methods `isIn()` and `isNotIn()` now accept `Iterable`s in general instead of only `Array`s.
 
### Removed

- `*.spec.js` files with transpiled test cases are no longer distributed with the published npm-module.

## [1.1.1](https://github.com/markusbohl/fluent-ts-validator/releases/tag/1.1.1) - 2017-05-06

### Fixed

- Invokation of lambda expressions with `undefined` or `null` values in a `validateIfX()` function could led to an error being thrown
and aborting the validation process. This could even happen despite validation conditions that should rather prevent conducting the validation entirely. 



## [1.1.0](https://github.com/markusbohl/fluent-ts-validator/releases/tag/1.1.0) - 2017-04-23

### Added

- `whenDefined()`, `whenNotNull()`, and `whenNotEmpty()` conditions. 
When added to a rule, the validation is only performed when the property to validate is _defined_, _not `null`_, or _not empty_, respectively.
- Convenient `getFailureMessages(): string[]` and `getFailureCodes(): string[]` methods for `ValidationResult`.
Instead of iterating over all `ValidationFailure`s to access each failure message and/or code the new methods allow to directly access these information.
- Descriptions of added features to `README.md`.

### Changed

- More than one validation condition can be defined per validation rule now. The conditions are logically ANDed. 
Meaning, all conditions must evaluate to `true` in order to perform the corresponding validation step. 
Before, only one validation rule could be set.



## [1.0.0](https://github.com/markusbohl/fluent-ts-validator/releases/tag/1.0.0) - 2017-04-17

### Added

- Initial release of fluent-ts-validator library.

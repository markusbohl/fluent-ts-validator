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

## [3.0.2](https://github.com/markusbohl/fluent-ts-validator/releases/tag/3.0.2) - 2018-01-10

### Fixed
- Fixes spelling issue in `README.md`


## [3.0.1](https://github.com/markusbohl/fluent-ts-validator/releases/tag/3.0.1) - 2017-11-27

### Fixed
- Updates `isGreaterThanOrEqualTo()` to check if `null` or `undefined` similar to `isLessThanOrEqualTo()` to ensure that `0` which is falsy is still compared to the threshold.


## [3.0.0](https://github.com/markusbohl/fluent-ts-validator/releases/tag/3.0.0) - 2017-10-03

### Added
- `hasLength()`-validation. Compared to the already existing methods `hasLengthBetween(min, max)`, `hasMinLength(min)`, or `hasMaxLength(max)` a more convenient way of checking for exact lengths.
- Additionally to checking if a certain value/object is/is not an element of an iterable, 
`isIn()` and `isNotIn()` can now validate if a given object has/has not a field with a certain value. ([Issue 5](https://github.com/markusbohl/fluent-ts-validator/issues/5))
- `isLatLong()`-validation. Strings can be checked for valid latitude-longitude coordinates.*
- `isPostalCode()`-validation. Validation of postal codes can be performed for several different locales.*
- Norwegian locales `nb-NO` and `nn-NO` are now supported for `isAlpha()` and `isAlphanumeric()` validations.*
- `isMobilePhone()` now supports locales for Kenya `en-KE`, Rwanda `en-RW`, Tanzania `en-TZ`, Uganda `en-UG`, Indonesia `id-ID`, Iran `fa-IR`, and Lithuania `lt-LT`.*

*) These features have been made possible thanks to the `validator.js` version `8.1.0`.

### Changed
- `dependencies` have been updated as follows:
    - `validator` from `7.0.0` to `8.1.0`. Due to this update, the behavior of `isUrl()` validations may change (see their [change log](https://github.com/chriso/validator.js/blob/master/CHANGELOG.md)).

### Fixed
- In addition to [issue 4](https://github.com/markusbohl/fluent-ts-validator/issues/4): `whenNotEmpty()` option was also not available after `validateIfEachString()`.

## [2.1.2](https://github.com/markusbohl/fluent-ts-validator/releases/tag/2.1.2) - 2017-08-28

### Fixed
- Publishing error: Wrong folder published to npm for version `2.1.1`. Issue reported here: [Problems with version 2.1.1](https://github.com/markusbohl/fluent-ts-validator/issues/6)

## [2.1.1](https://github.com/markusbohl/fluent-ts-validator/releases/tag/2.1.1) - 2017-08-27

### Fixed
- [Issue 4](https://github.com/markusbohl/fluent-ts-validator/issues/4) `whenNotEmpty()` option was not available after `validateIfString()`. The same problem occurred after `validateIfIterable()`.


## [2.1.0](https://github.com/markusbohl/fluent-ts-validator/releases/tag/2.1.0) - 2017-06-11

### Changed

- Validation rules can be defined for optional properties without the TypeScript compiler complaining 
when having the `strict` or `strictNullChecks` options activated in the `tsconfig.json` file. 
Before, warnings like `Type 'number | undefined' is not assignable to type 'number' because validateIfNumber() must have a number not a number | undefined`
prevented compiling a validator with rules for optional properties.

## [2.0.1](https://github.com/markusbohl/fluent-ts-validator/releases/tag/2.0.1) - 2017-05-22

### Fixed

- Invokation of lambda expressions with `undefined` or `null` values in a `validateIfEachX()` function could led to an error being thrown
and aborting the validation process. This could even happen despite validation conditions that should rather prevent conducting the validation entirely. 


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

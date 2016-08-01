# Angular Style and Best Practices

 * The most popular Angular style guide is maintained by John Papa.
https://github.com/johnpapa/angular-styleguide
 * This module will cover the most important recommendations

Remember: Style guides are recommendations, not rules. Every organization is different.

## Defer Controller Logic to Services

 * This is the first discussion point for a good reason
 * Number one cause of coupling: bloated controllers.
 * Always ask yourself:
   * Can I put this in a service?
   * Can I put this in a directive?

## Keep Controllers "Focused"

 * Reuse services, not controllers.
 * Extract reusable logic into services.
 * The controller *only* collects and formats data for the view

 > Is this controller code related to collecting view data?

## Single Responsibility

 * One component (controller, factory, etc) per file
   * Easier to test
   * Easier to read
   * Easier to refactor
   * Fewer source control collisions
   * Fewer variable name collisions via closure scope

## Small (<75 line) functions

 * If you are writing functions > 75 lines, something might be wrong.
 * Could indicate incorrect architecture, flawed abstractions, etc.
 * Small functions are easier to reuse, refactor and test.

## Keep the "App" Module Thin

 * Use feature areas as modules
 * Recommended: a "pediatrics" module
 * Discouraged: a "directives" module
## Use IIFEs

 * Avoids accidental global variables
 * Allows minifiers to work more efficiently

## Unique Naming with '.'

 * Give your modules unique names and namespaces.

```javascript

angular
  .module("acmeClaims", [
    "acme.procurement",
    "acme.finances"
  ]);

```

## Use Named Functions When Possible

 * Easier to see in profiler / debugger
 * Easier to trace
 * Easier to read for next developer

```javascript
//Recomened:
function MyCtrl () { };

//Avoid:
var MyCtrl = function () { };
```

## ControllerAs

 * Easier to upgrade to Angular 2.0
 * Less implicit binding to `$parent` in views
 * Easier to explicitly know which controller is called
   * Eg: `controller1.name` vs. `controller2.name`
 * Also recommended for directives.

## Use "this" Alias in ControllerAs

 * Prevents accidental loss of `this` scope in callbacks.


```javascript
function userValidationController($scope) {
  var vm = this;
  vm.users = [/* . . . */];
}
```

## Return Promises instead of Raw Data

 * Instead of returning AJAX response data, return the promise
   * Easier to test.
   * Easier to chain.
   * Easier to reuse logic.

## Put DOM Logic in Directives

 * DOM manipulation in controllers or services is hard to debug and test
 * The Angular architecture was built on the assumption that only directives modify the DOM.

## Always Prefix Custom Directives

 * Avoids name collisions
 * NOTE: Don't use reserved prefixes, such as `ng-*`

## Always .catch() Promise Exceptions

 * Not calling `.catch()` on a promise can lead to silent errors and unspecified behavior.

## Always Use ng-strict-di

 * Avoids mysterious errors in production caused by minification
 * `ng-annotate` is recommended for gulp and grunt.
 * NOTE: `$inject = []` is the preferred syntax.

## Project Structure: LIFT

The LIFT principals:

1. Easy to Locate. (single responsibility modules)
2. Easy to Identify.
3. Flat structure for as long as possible. (if < 7-10 files)
4. Try to stay DRY (Don’t Repeat Yourself).

## Folder by Feature, not Type

 * Recomended: Folders such as `/dashboard` or `/accounting`.
 * Discouraged: Names like `/directives` or `/services`.
 * Prevents excessive folder traversal while coding.
## Use Angular $ Wrapper Services

 * Calling `window` or `setTimeout` directly can create data binding issues.
 * Use `$window`, `$document`, `$timeout` instead.

## Use JSHint

 * JSHint will find worst practices preemptively.
 * Setup varies depending on your local development environment.

## Conclusion

 * Any questions about style and best practices?

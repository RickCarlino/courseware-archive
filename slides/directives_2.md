# Advanced Directives

---

## Communicating Between Directives

Sometimes, directives have a definite relationship.

Communication between these directives is ideal for many use cases.

```html
<tab-container>
  <tab title="Customers">
    Customer data here...
  </tab>
  <tab title="Vendors">
    Vendor data here...
  </tab>
</tab-container>
```

REAL WORLD USE CASE: <a href="https://material.angularjs.org/latest/demo/tabs">Angular Material UI Tabs</a>

---

## Example: Form Validations

```html
   <input name="username" ng-model="username" required>
```

With form validators, `ngModel` and `required` directives work together to perform validation.

---

## Demo: ngModel Custom Behavior

 * Angular does not provide "odd number" validation
 * But we can make our own by building a custom directive!
 * The custom directive will work in tandem with `ngModel` to add custom behavior.

<a href="http://localhost:8080/supplemental_material/344_custom_validators.html">Demo Here</a>

---

## Another Example

Think of the `ng-switch` directive.

```html
<div ng-switch="expression">
  <div ng-switch-when="matchValue1">...</div>
  <div ng-switch-when="matchValue2">...</div>
  <div ng-switch-default>...</div>
</div>
```

Three directives are working cooperativly: `ngSwitch`, `ng-switch-when`, `ng-switch-default`. Directives are able to cooperate by sharing controller objects.

---

## Creating a Controller

To create a controller for a directive, use the `controller:` DDO option.
It is always called *before* the `link:` function.

```javascript

mod.directive("special", function(){
  return {
    controller: function($scope, $http) {
      this.sharedFunction = function(){};
      // Dependency injection is OK!
    },

  }
})

```

---

## Using another directive's controller

If you want to access functionality on a sibling's controller, add `require:`

```javascript
mod.directive("special", function(){
  return {
    require: ['siblingDirective'],
    link: function(scope, el, attr, ctrls) {
      var siblingCtrl = ctrls[0];
    }
  }
})

```

---

## "require:" Prefixes

(no prefix) - Locate the required controller on the current element. Throw an error if not found.

`?` - Attempt to locate the required controller or pass null to the link fn if not found.

`^` - Locate the required controller by searching the element and its parents. Throw an error if not found.

`^^` - Locate the required controller by searching the element's parents. Throw an error if not found.

`?^` - Attempt to locate the required controller by searching the element and its parents or pass null to the link fn if not found.

`?^^` - Attempt to locate the required controller by
searching the element's parents, or pass null to the link fn if not found.

---

## Accessing Your Own Controller in the Link Function

We just learned how to access another directive's controller. But what about acessing the current directive's controller?

What if you need to access information published on your directive's scope?

A few options:

 - Use the `controller:` function directly (not possible if you're in the `link:` function)
 - `element.controller("myDirective")` (less common).
 - controllerAs: "name" then call "scope.name" in link.

---

## Exercise: Building a Tab Panel


https://gist.github.com/RickCarlino/6c5014a67c993120c51e

---

## Questions?

We will take a brief intermission for exercises, then explore some more directive features.

---

## New Directive Features

Let's talk about new features in Angular directives found in Angular 1.4 and Angular 1.5.

---

## Multiple Transclusion (Angular 1.5)

 * Angular 1.5 added the ability to transclude multiple elements.

**Demo:** `directives-2/multiple-transclusion.html`

---

## Using "Controller As" with Directive Scope

```javascript
mod.directive("myDir", function(){
  return {
    controllerAs: "vm",
    controller: function($scope) {
      this.name = "Rick";
    },
    template: "<p>Hello, {{ vm.name }}!</p>"
  }
});

```

---

## But What About Isolate Scope?

How can we attach scope bindings directly to the controller **instead of** the `scope` object?

```javascript
mod.directive("myDir", function(){
  return {
    controllerAs: "vm",
    scope: {
      name: "="
    },
    template: "<p>Hello, {{ name }}!</p>"
  }
});

```

**How can we change this to use `vm.name`?**

---

## Solution: `bindToController: true`

 * In Angular 1.3, the `bindToController: true` option was introduced.
 * Isolate scope will bind to the controller rather than the scope when this configuration is used.

---

## Even Better `bindToController` Syntax

 * In Angular 1.4, it was further improved by allowing `bindToController` to take a scope configuration object just like `scope:`.

```javascript
      return {
          bindToController: {
            myAttr: '='
          }
        }
```

**directives-2/bind-to-controller.html**

---

## Using `.controller()`s in Directives

* Newer versions of Angular also allow passing of strings to the `controller:` attribute.
* This can make testing easier in some cases.

**Example:** `controller: "widgetCtrl as vm"`

**Demo:** `directives-2/controller-as-string.html`

---

## "Component Directives" (1.5)

 * Angular 1.5 introduces a simpler way to define directives: `.component()`.
 * Directives defined in this manner are called "Component Directives"
 * Component directives offer a style that is more in line with Angular 2.0, thereby offering an easier upgrade path.
 * Component directives **cannot** replace traditional directives in all cases.


---

## Component Directive Syntax

**Before: **

```javascript
angular.directive("myDir", function(){
  return {
    /* DDO config here */
  };
})
```

**After: **

```javascript
angular.component("myComp", {
  /* Component config here */
});
```

**DEMO:** `directives-2/component-directive.html`

---

## Component Defaults

 * Most real world apps are using "isolate scope" for directive scope.
 * As a result, this is now the default for component directives.
 * `bindings:` now serves as a combination of `scope: {}` and `bindToController: {}` in one attribute.
 * Component directives default to `controller as $ctrl`, eliminating the need for combining `controller:` and `controllerAs:` in most cases.

---

## Implicit controller: $ctrl (Component Directives)

 * Angular 1.5 adds implicit controller names to `.component()` directives.
 * In the absence of a `controllerAs` configuration, controller will be placed on `$scope.$ctrl`.

---

## New "template:" Features (Component Directives)

 * `template:` can now return a function instead of a string. It can **inject** `$elemenet` and `$attrs` (as well as other providers).
 * This is optional: strings are still allowed.

---

## "require:"ing an Object (Component Directives)

* Angular 1.5 adds the ability to name `require:`ed controllers.

```javascript
{
  require: {
    myFormCtrl: 'form'
  },
  controller: function() {
    this.error = this.myFormCtrl.$error;
  }
}
```

**DEMO:** `directives-2/require-object.html`

---

## One Way Data Binding

 * Angular 1.5 adds a new "one way data binding" via `<`.
 * It is *only useful for primitive data types*.
 * This gives the parent controller "write only access"
 * The directive has "read only access"
 * The parent controller will overwrite the binding anytime the data changes.
 * The child cannot accidentally modify parent data.

```javascript
{
  bindings: {
    downwardFlowingData: "<"
  }
}
```

**DEMO: ** `directives-2/one-way-databinding.html`

---

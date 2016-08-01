# Directives

---

## Teaching HTML New Tricks

 * A directive is a custom HTML attribute or element.
 * Directives (such as `ng-show`) add new behavior to HTML.
 * Directives encourage modularity and re-use in web applications.

---

## Your First "DDO"

Demo: **directives/first\_ddo.html** (supplement)

```javascript
mod.directive("myDir", function(){
  return {
    template: "<p>Hello, Angular!</p>"
  }
})
```

```html
<my-dir></my-dir>
```
The most simple of directives.

The return value is a **directive definition object** (DDO).

Notice how angular normalized the name from camel case to kebab case?

---

## A Word of Warning

 * HTML will usually ignore unknown elements.
 * This includes **misspelled directive names**
 * Always remember that camelCaseNames are converted to kebab-case-names
 * JS Code = camelCase
 * HTML Code = kebab-case

---

## Best Practices

 * All directives must live in the same namespace- the DOM.
 * This can lead to accidental naming collisions
 * Best Practice: Prefix directives with an organizational namespace.

**Example:** `<acc-user-profile>` instead of `<user-profile>`.

---

## "templateUrl: " DDO Option

```javascript
return {
  templateUrl: "myTemplate.html"
}
```

 * It's also possible to keep templates in a separate file
 * That's a good idea for large templates.
 * How? Use `templateUrl:` instead of `template:`.
 * Angular will cache templates as an optimization.
 * Let's take a look.

Demo: **directives/template\_url.html** (supplement)

See: network inspector panel and \_template.html file

---

## "restrict: " Option

 * Sometimes you just want an **`<element-directive />`**
 * Other times you only **`<want attributes-directives />`**
 * Add **`restrict: 'E'`** for "directive only" elements
 * Add **`restrict: 'A'`** for "attribute only" elements
 * Less common: `"C"` (css class), `"M"` (HTML comment)

```javascript
  return {
    restrict: "E"
  }
```

DEMO: **directives/restrict.html** (supplement)

---

## What About Scope?

 * Directive templates **share the parent scope by default**.
 * This creates tight coupling.
 * Not often seen in production.
 * This can be overridden.

demo: **directives/default\_scope.html** (supplement)

```html
Which scope does myVariable belong to?
<my-directive>{{ myVariable }}</my-directive>
```

---

## "scope: false"

 * Default scope option if not set.
 * This is the same as not setting the `scope` attribute.
 * Directive shares scope with parent, as in `default_scope.html`.

DEMO: **directives/false\_scope.html** (supplement)

```javascript
  return {
    scope: false
  }
```


---

## "scope: true"

 * Creates a child scope.
 * Child is linked via prototypal inheritance.
 * Only one child scope per DOM node
 * Multiple directives on one node will share a single scope.

DEMO: **directives/true\_scope.html** (supplement)

```javascript
  return {
    scope: true
  }
```


---

## "scope: {}"

 * Creates an "Isolate Scope".
 * Most common scope option
 * Has a parent, but doesn't inherit from it or use prototypal inheritance.
 * Some properties can be passed down explicitly (next).
 * Sharing properties with parent is possible via configuration (next).

```javascript
  return {
    scope: {}
  }
```

---

## 2-way Binding to a Scope Property

 * Provides two way data binding.
 * It's a bi-directional binding, like many things in Angular.
 * Mnemonic: There are two lines in "=".

DEMO: directives/equal\_scope\_binding.html (supplement)

```javascript
  return {
    scope: { thisIsMyBinding: "=" }
  }
```

---

## Manipulating the DOM

 * It's OK to perform DOM manipulations in a directive.
 * You can gain access to the directives `scope`, `element` and `attributes` using a `link:` option.
 * The link option runs every time the directive is attached to the page.
 * `link: function(scope, el, attrs) { /* . . . */ }`

```javascript
return {
  template: "<button>Hello, Class!</button>",
  link: function(scope, element, attrs) {
    element.addClass('pink-polka-dots');
  }
}
```

The `link` works similarly to an "on initialize" callback in many other libraries.

DEMO: `directives/link_function.html` (supplement)

---

## JQLite

The `element` object in a `link` function is a "JQLite wrapped element".

By default, Angular will provide "JQLite" if you do not use JQuery. It exposes a number of convenience methods.

Most of these methods are documented under the [angular.element](https://docs.angularjs.org/api/ng/function/angular.element) section of the official documentation.

---

## Exercise

Let's take a look at our first hands on exercise (main material).

`Directives\Exercises\ProductDirectives\products-modules.js`

---

## Nested Directives

 * Nesting and re-use is encouraged!
 * Angular knows how to handle this.
 * It is one of the many ways to compose directives.

---

## Binding to a String

Sometimes, you just want to pass a string.

The `@` symbol passes value as a literal string.

You may use `{{}}` when passing in the attribute, but the end result on the scope is always a string.
```javascript
  return {
    scope: { aStringProp: "@" }
  }
```

DEMO: `directives/at_symbol_scope_binding.html` (supplement)

---

## Nesting User Content in Directives

```html
<my-directive>
  By default, inner text is destroyed on render.
</my-directive>
```
 * It is possible to save directive inner text (but you need to be explicit!)
 * set `transclude: true`.
 * Then, in your template, use the `ng-transclude` directive.

```javascript
return {
  transclude: true,
  // NOTICE THE `ng-transclude` DIRECTIVE!
  template: "<p ng-transclude></p>"
}
```

DEMO: `directives/transclusion.html` (supplement)

Multiple transclusion is available in Angular 1.5 (covered later).

---

## Exercise

Available in `directives/exercises/transclusion.html` or [here](https://gist.github.com/RickCarlino/eb5d3d2fa72874d4b4ae)

---

## Binding to an Expression

 * Want to pass expressions? (Eg: what ng-click does)
 * Usually, this is used for "callback attributes".
 * The resulting scope property is a WRAPED FUNCTION.
 * This is similar to using `$eval` on a string attribute.
 * Call it to execute the expression at anytime.
 * Returns the value of the string expression evaluation when called.

```javascript
  return {
    scope: { myExpression: "&" }
  }
```

DEMO: "directives/ampersand\_binding.html" (supplement)

---

## Optional Bindings

 * It's okay to not set an attribute binding
 * If you don't set the attribute, and attempt to assign that value to the scope later, an exception may be raised.
 * Sometimes, this happens when least expected.

DEMO: `directives/optional_scope_binding.html` (supplement)

---

## Aliasing Properties

Sometimes, you need to use **one name on an HTML attribute** and **another name for the directive's scope property**. This is called "property aliasing".

```javascript
{
  scope: {
    nameSeenInDirectiveScope: '@nameSeenInHtml',
    usedInTemplate: '=usedInHtml'
  }
}
```

```html
<my-directive name-seen-in-html="example">
<my-directive/>
```

---

## Cleaning Up After Directives

 * A directive may allocate resources during the `link` phase.
 * Some resources (such as timers or watches on `$rootScope`) won't be automatically garbage collected afterward.
 * In such a case, one must hook into an element's `destroy` event.


```javascript
return {
  link: function(scope, element, attrs) {
    element.on('$destroy', function() {
      $interval.cancel(stopTime);
    });
  }
}
```

---

## Questions?

---

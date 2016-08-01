# JavaScript: A Reintroduction

#### A brief re-introduction of JavaScript for Angular learners.

Copyright 2016, DataMelon, LLC

---

## Overview

What is meant by "Re-introduction?"

 * JavaScript is a language of many subtleties ("gotchas").
 * In the case of Angular, it is not possible to attain mastery without understanding advanced aspects of JavaScript.

---

## Review: Passing Values

What will this print? Why?

```javascript
var exercise1 = {
  name: "Old Example"
};

var exercise_name = exercise1.name;

exercise_name = "New Example";

console.log(exercise1.name);

console.log(exercise_name);

```

This can be a huge source of confusion when dealing with Angular features like `ng-repeat`, covered later.

---

## Solution

```javascript
var exercise1 = {
  name: "Old Example"
};

var exercise_name = exercise1.name;

exercise_name = "New Example";

console.log(exercise1.name);
// "Old Example"
console.log(exercise_name);
// "New Example"

```

It seems simple, but has **serious implications** in Angular.

---

## Objects vs. Primitives

Reference passing rules differ by type!

### Primitives

`Number`, `String`, `Boolean`, `null`, `undefined`

### Objects

**`Function`** *, `Array`, `Date`, `RegExp`,

---

## Functions are Objects?

It's important to remember that in JavaScript **functions are "Callable Objects"**.

```javascript
// This is an object, it has properties.
var user1 = {};
user1.email = "j@smith.com";

// This is also an object with open ended properties.
var user2 = function() { return console.log(this.email); };
user2.email = "j@johnson.com";

// We can still access function properties like "normal" object props.
console.log(user2.email);
// => "j@johnson.com"

```

Function attributes are used for Angular dependency annotation (`$inject`) and "spy objects".

---


## Review: Constructor Functions

JavaScript does not have classes (ES5 version and lower).

Instead, it has constructor functions that are called via `new`.

Angular **controllers and services** heavily rely on this pattern.

```javascript
function Point(x, y){
  this.x = x;
  this.y = y;
}

var point = new Point(3, 4);

console.log(point.x); // => 3

```

---

## Functions and Prototypes

Since functions are objects, they can have attributes.

Some attributes are special.

Every JavaScript function has a **`prototype`** property, which is *very* special, particularly in Angular.

Let's take a look.

---

## The Prototype Chain

```javascript
function Point(x, y){
  this.x = x;
  this.y = y;
}
// Objects climb the prototype chain to find methods on a parent:
Point.prototype.print = function() { console.dir(this); }

var point = new Point(3, 4);
point.print(); // => prints "{x: 3, y: 4}"

point.__proto__
// => {print: Function, constructor: Point(){}}
point.__proto__.__proto__
// => Object {}
point.__proto__.__proto__.__proto__
// => null

```

Angular resolves scopes (view models) via prototypal inheritance.

---

## '`this`' revisited

  * `this` usually refers to:
    * The global object (`window`)
    * "The thing left of the dot" (`myObj` in `myObj.property`)
    * The result of a constructor (functions called with `new`)
  * Functions `bind`, `apply` and `call` can explicitly change the value of `this`. Eg: Sharing a function between different instances.
  * Callbacks may also cause `this` to change (or go out of scope).


---

## Closures and `'this'`

Since **`this`** can change without notice, it may be necessary to store a reference to `this` in a closure.

```javascript
// A common pattern to prevent references to wrong "this" value.
var that = this;

function myCallback(data) {
  that.loadData(data);
}

AjaxLibrary.get('/users.json', myCallback);

```

This is a common pattern (and best practice) for Angular's "controller as" syntax.

---

## "Falsy"ness

  * There are many kinds of false (Special mention: NaN)
  * "Booleanizing values" is occasionally required.

```javascript
0         ||
false     ||
undefined ||
null      ||
""        ||
NaN       || "These are all false!";
// => "These are all false!"

// How will these evaluate?
(NaN === NaN);

// "Boleanizing" NaN.
!!(NaN) === !!(NaN);

```

---

## Minification

 * Production JavaScript applications contain thousands of lines of code.
 * Some code, such as whitespace and comments, are unnecessary.
 * Many tools can optimize file size by performing "minification".

Let's take a look at an example.

---

## Minification: Before

```javascript
// Comments are nice for developers, but they are
// of less importance in production.
function add(lhand, rhand) {
  return lhand + rhand;
}
```

---

## Minification: After

```javascript
function add(n,d){return n+d}
```

From 142 characters down to a mere 29 characters.

That is almost *5 times smaller than the original code*.

---

## Things That Don't Minify

 * Global variables
 * Strings

Minifiers will not compress strings (since they must be human readable).

Global variables are typically not minified because it causes issues for third party code.

Example: A library that looks for the `angular` global variable will break if it can't find a global of that name.

---

## Strict Mode

 * Some exercises in this course will use JavaScript "Strict Mode".
 * Strict mode is a subset of JavaScript that is less forgiving about bad practices.
   * Ex: `this` becomes `undefined` instead of `window` in strict mode. 
 * Using strict mode helps you write more reliable JavaScript by preventing common errors.
 * Example: `y = 123` (without a `var` keyword) will cause an exception in strict mode.
.

Next: Activating strict mode.

---

## Activating Strict Mode

```javascript
"use strict";
// Error because z was not defined
z = "WRONG!";
// Solution: Use `var` to avoid creation of globals.
```

---

## Avoiding Scope Leakage

 * There are only two scopes in current JavaScript versions.
   * Global scope
   * Function Scope
 * Unlike C or Java, there is no concept of "block scope" in JavaScript versions prior to ES6.
 * This can lead to accidental "scope leakage"

Let's look at an example of scope leakage next.

---

## Problem: Accidental Globals

```javascript
// In file1.js
// from top level of file, not in a function.
var userId = 123;

// In file2.js (loaded later)
// PROBLEM: We just overwrote "userId"
var userId = 456;

```

---

## Solution: IIFEs

Wrapping code in an "immediately invoked function expression" (IIFE) creates a new container scope to prevent scope leakage.

In conjunction with strict mode, this makes accidental global variable leakage less common.

```javascript
// Inside file1.js
(function(){
  var userId = 123;
})(); // Function is immediately called.

// Inside file2.js
(function(){
  var userId = 456;
})();

```

---

## Wrap Up

Any questions?

 * Passing primitives vs. objects
 * Function Objects
 * JavaScript prototypes
 * Keeping track of "this"
 * IIFEs
 * Strict mode
 * Minification
 * The 6 kinds of "falsyness" in JavaScript

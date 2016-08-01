# Unit Testing in Angular

Topics:

 * Jasmine
 * Jasmine Spies
 * Karma
 * NgMocks
 * $compile
 * $httpBackend

Unit testing in Angular requires a combination of *many* topics.

---

## Forming a Mental Model of Testing

What is a test suite?

   - It's a program that validates the correctness of another program.
   - It makes expectations about a program's output, based on known inputs.

 > "Function `add()` should always return `4` when passed `(2, 2)`.
 > If `add(2, 2)` does not return `4`, something is wrong."

A test suite is just a program that runs your program

It makes sure everything still works the way it should before deployments and after updates.

---

## Smallest Possible Testing Example

An example of a test for `add()`, using real javascript:

```javascript

function add(a, b) { return (a + b); }
var result = add(1, 2);

console.assert(result === 3, "Expected 1 + 2 to equal 3");

```

Typically, developers will use a testing framework instead of writing assertion logic by hand.

This will actually run in a browser, but you should think of it as pseudocode.

In the real world, people use frameworks like Jasmine or Mocha.

---

## Why Test?

 - Makes it easier to quickly test one application in many browsers (IE).
 - Decreases time spent on manual testing.
 - Quickly identify introduction of unintentional defects.
 - Eases new developers onto a team (less risk of breakage)

---

## Jasmine

Most teams use a testing framework, rather than reinvent the wheel.

 * Provides a consistent testing API across projects.
 * Large ecosystem of 3rd party testing tools.
 * Most testing "edge cases" have been solved.

**Jasmine is a 3rd party tool that is heavily integrated with angular. It is a separate project from Angular.**

**Jasmine provides a uniform set of JavaScript functions that verify the functionality of an application.**

We've got a long way to go before we talk about Angular.

Before we can learn Angular, we need to learn Jasmine

---

## Writing "Real" Tests with Jasmine

**What does a Jasmine spec look like?**

```javascript

describe("Calcuator addition", function(){
  it("adds 2 and 2", function(){
    var result = add(2,2);
    expect(result).toEqual(4);
  });
});

```

Next: How do you run a test? What does each function do?

The code you see here will run in a browser if properly set up.

The Jasmine API is written to be human readable.

When properly written, Jasmine tests can read like documentation.

---

## Manual Jasmine Setup

**How would you run a Jasmine spec in the browser?**

```html

  <!-- Jasmine related files -->
  <link rel="stylesheet" type="text/css" href="/lib/jasmine.css">
  <script src="jasmine.js"></script>
  <script src="jasmine-html.js"></script>
  <script src="jasmine-boot.js"></script>

  <!-- Project dependencies -->
  <script src="angular.js"></script>

  <!-- Your application -->
  <script src="my_app.js"></script>

  <!-- The tests -->
  <script src="my_app_test.js"></script>

```

---

## Demo: Manual Jasmine Setup

Files:

  * `unit_testing/demos/jasmine_manual.html`
  * `unit_testing/demos/my_app.js`
  * `unit_testing/demos/my_app_test.html`

Main file: `unit_testing/demos/jasmine_manual.html`.

Let's take a look at the source code for a 10,000 foot overview.

Then, we can take a look at the API functions.

---

## "describe", "it", "expect", "matchers"

Jasmine provides the following API:

 * `describe`: Contains a collection of related tests.
 * `it`: Contains a test for one piece of functionality.
 * `matchers`: Assertions like `toBe` and `toEqual`.
 * `expect`: Takes an "actual" value and performs assertions.


Try to keep `describe` blocks related to one set of functionality.

Try to confine `it` blocks to one individual aspect of a functionality.

If that sounds very relative, it's because it is.

Structure of these blocks is often a matter of readability.

---

## Common Assertions

Jasmine comes preloaded with many useful matchers such as:

`toBe`, `toBeCloseTo`, `toBeDefined`, `toBeFalsy`, `toBeGreaterThan`, `toBeLessThan`, `toBeNull`, `toBeTruthy`, `toContain`, `toEqual`, `toMatch`, `toThrow`

It is also possible to define custom or 3rd party matchers.

---

## "before" and "after" blocks

 * Sometimes its necessary to setup or teardown state before and after a test suite.
 * For this, Jasmine provides `beforeEach`, `afterEach`, `beforeAll`, `afterAll` blocks

```javascript

describe("my test suite", function(){
  var testUser
  beforeEach(function(){
    // Will be run before each 'it' block.
    testUser = userDAO.newUser();
  });
});

```

Can you think of any times when this would be useful?

---

## Temporarily Disabling a Test

 * Occasionally, tests in a suite will fail for known reasons.
 * This can be a distraction from other valid tests.
 * `it` and `describe` blocks can be disabled by prepending an `x`
 * You may also call `pending("with a message")`.

```javascript
// Notice the "x":
xdescribe("my test suite", function(){
  it("never runs this block", function(){ /* */ });
});

```

This is usually used in continuous integration systems that will reject a deployment when tests fail.

Often times, the team may know of a bug, but still needs to deploy.

---

## Dealing with Asynchronous Tests

 * How can Jasmine know that a test has finished when testing asynchronous functions?
 * Jasmine passes in a `done()` function to all test blocks.
 * **A test can be made asynchronous by passing in a `done` argument.**
 * Calling `done()` at a later time marks the test as complete.

```javascript
it("calls my service", function(done) {
  userDao.find(123)
    .then(function(resp){
      expect(resp.data.id).toEqual(123)
      done();
    })
}, optionalTimeout)

```

---

## Demo: Testing a timer with done()

**In this demo, we will test the accuracy of a timer function.**

**The timer executes asynchronously, so we will need to use done().**

files:

 * `unit_testing/demos/async_test.html`

What happens if we fail to call `done()`?

What happens if we don't pass `done()` into the `it` block?

---

## Dealing with Timeouts

 * Jasmine will wait a default max of 5 seconds for each test.
 * Occasionally, its necessary to wait longer than that
 * Methods like `beforeEach` and `it` can take a second timeout argument
 * `jasmine.DEFAULT_TIMEOUT_INTERVAL` adjusts the amount of milliseconds to wait when running async tests.

---

## Avoiding Real World Side Effects

 - How do you handle calls to AJAX endpoints?
 - How do you prevent creating or using "real world" data?

The key to avoiding this involves **swapping implementations**.

Jasmine accomplishes this using "spy objects". Let's take a look.

---

## Spies

With Spy objects, you can swap out an object's real implementation and see:

 * How many times the method was called
 * Which parameters were passed to a method
 * Prevent a method from being called (and return dummy data).
 * Stub a function to trigger a failure case (to test error handling)

You can think of a spy as an empty function that can record and playback trained response, as well as provide meta data for test info.

Most developers use spies in conjunction with the dependency injector to test their apps.

But it's part of Jasmine, not Angular. Keep that in mind while we go through the Demos

---

## Demo: Tracking Method Calls

files:

 * `unit_testing/demos/spy_object.html`

REMEMBER: Functions in JavaScript are objects, too!

---

## Providing Fake Return Values

The most common use case for a Jasmine spy.

```javascript

var fakeUser = {name: "Rick"};
spyOn(userDAO, "fetch").and.returnValue(fakeUser);
userDAO.fetch("Rick"); // => {name: "Rick"}

// Both are OK:
expect(userDAO.fetch).toHaveBeenCalled();
expect(userDAO.fetch).toHaveBeenCalledWith("Rick");
```

In this example, we're replacing the real method with a fake one that returns a pre-defined object.

This is useful when you want to avoid actually calling the function.

---

## Fake Sequences of Return Values

Useful when simulating a series of events.

```javascript

var user = {};
var fakeUser1 = {name: "Rick"};
var fakeUser2 = {name: "Sally"};
spyOn(user, "fetch")
  .and
  .returnValues(fakeUser1, fakeUser2); // Notice "values" is plural.
user.fetch(); // {name: "Rick"}
user.fetch(); // {name: "Sally"}

```

**Note: ** Returns `undefined` after fake values are expended.

---

## spy.and.callThrough

 * By default, spies won't call the actual implementation function they spy on.
 * But spies *can* call the original if you choose to do so.

```javascript

spyOn(user, "destroy");
spyOn(user2, "destroy").and.callThrough();
user.destroy();  // Does not call the real user.destroy
user2.destroy(); // Actually calls user2.destroy

```

Spies let you do more than just swap return values. You can also do things like check what parameters were passed, how many times the function was called and a few other things.

---

## Simulating Exceptions

Testing errors and exception handling is straightforward.

```javascript

  spyOn(userDAO, "fetch").and.throwError("Unable to fetch user");
  expect(function() { userDAO.fetch() }).toThrow();

```

---

## createSpy and createSpyObj

There are two alternatives to the `spyOn(obj, attr)` syntax.

```javascript

  // createSpyObject: (creates object with spies as attributes)
  var user1 = jasmine.createSpyObj('user1', ['load', 'update']);

  // createSpy: (returns a single spy function)
  var user2 = {};
  user2.load = jasmine.createSpy('load'); // Pass in a name.

```

These are "bare" spies with no underlying function implementation (unlike previous examples).

This is useful when stubbing callbacks or examining parameters passed to them.

---

## Other Spy Functionalities

 * We've covered the main use cases for spies when using Angular
 * Spy objects offer many other advanced use cases
 * For more usages of spies, see the official Jasmine docs
    * http://jasmine.github.io

---

## Questions?

 We now know how to manually build a test suite using Jasmine.

 We also learned how to swap out implementations using "spies".

 Next, we will learn how to automate this process using a "test runner".

 Any questions before we move forward?

---

## Karma

 * Previously, we learned how to build a test runner in an HTML file.
 * Keeping track of all test dependencies can become tedious and error prone.
 * To increase productivity, many JavaScript developers (even non-Angular developers) use "Karma" as a means of running a front end test suite.

---

## Why Use Karma?

 * No need to fumble with script tags and HTML files
 * Just run `karma init` from the command prompt.

Karma takes the head ache out of including script tags and manually running each browser you want to test against.

It's configuration based, but has an interactive configuration builder.

---

## How Karma Works

 > "...Karma is essentially a tool which spawns a web server that executes source code against test code for each of the browsers connected. The results for each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed.""

 -- Karma Documentation

---

## Karma Startup

 1. `karma init` generates a `karma.conf.js` file by asking you a series questions.
 2. `karma start` will run your tests using the options found in `karma.conf.js`.
 3. When run, `karma` will open a browser of your choosing against the test files specified.

```
karma start karma.conf.js
```

By default, your config file will be called karma.conf.js

---

## Installation

To gain access to the `karma` command, install `karma-cli` globally.

```
  npm install -g karma-cli
```

---

## Demo: Running 'karma init'

 In this demo, we will walk through each step of the `karma init` command.

 When we finish, we will examine the resulting `karma.conf.js`.

SEE: `unit_testing/demos/karma/karma.conf.js`.

---

## Using the Debug Tab

 * It is possible to set breakpoints (`debugger` statements) in tests.
 * Click the `debug` button on the Karma browser window and see the JavaScript console for test suite details.
 * Hit the refresh button to run the tests again.

---

## Testing Various Browsers

 * Karma supports various "launchers"
 * The most popular are Chrome (preinstalled) and IE (`karma-ie-launcher`)
 * Launchers can be installed via `npm`

```
npm install karma-firefox-launcher --save-dev

```

---

## File Patterns

 The **files:** and **exclude:** options use file matching patterns.

 - `**/*.spec.js`: All files ending with ".spec.js" and subdirectories
 - `**/!(lib).js`: Includes *.js, but excludes files like "mylib.js".
 - `**/(.spec|.test).js`: all ".spec.js" and ".test.js" files.

---

## Questions?

 Now that we have automated the testing process, let's learn about the tools provided by Angular for testing.

---

## Angular Mocks

 * Karma and Jasmine are not directly related to Angular
 * They are general use JavaScript tools that are useful for a variety of project types.
 * **"Angular Mocks"** provides testing conveniences specific to angular.js development

---

## What Does NgMock Do?

 * Easily swap out dependencies (remember "spies?") for testing purposes.
 * Easily retrieve Angular modules and providers directly.
 * Create fake AJAX endpoints.

---

## NgMock: The Basics

Most NgMock usage revolves around two methods, available as global variables within the test suite.

 * `inject()`: Allows you to access providers like controllers, services, etc.
 * `module()`: Configures the module that `inject()` will use.

```javascript

var dao; // Hoist a variable for re-use across tests.

module("myApp"); // Load "myApp" module.
inject(function(userDAO) { // Pull down dependencies for testing
  dao = userDAO; // Grab "userDAO" for test purposes.
});

```

This module and inject method are typically used in a beforeEach block

Each time you call module, the application state resets

---

## Demo

Files:

`unit_testing/demos/first_ng_mocks`

**Pay special attention to the usage of module() and inject()**.

`karma start unit_testing\demos\first_ng_mocks\karma.conf.js`

---

## Passing an Object to module()

 * Passing in a key/value object to `module()` results in the creation of a new `.value()` provider. This is useful for stubbing out dependencies.

```javascript

module("myApp", {
  // This will create (or replace) userService with the value below
  userService: {
    getUsers: function() {
     /* . . */
    }
  }
});

```

This is useful, because if we defined a userService inside of the myApp module, we just replaced it with a dummy object.

---

## Passing an Object (Cont'd)

Passing in an object such as `{ 'key': val }` is equivalent to calling `$provide.value('key', val)` (more on that next).

---

## Using module() with a Function

 * We called `module("myApp")` in the previous example to load a predefined module.
 * We also passed in an object to stub out injectables.
 * We can also pass in a function.
 * Let's take a look at an example (next slide)

---

`$provide` can be used to create factories, services, values and constants.

```javascript

module("myModule", function($provide) {
    // If this existed before, we just overwrote it.
    $provide.constant('serverPort', 1337);
});

```

This will swap out the implementation of `serverPort` for testing purposes.

---

## `inject()` Variable Naming Problems

It would seem impossible to name a variable after an injectable provider.

```javascript

var myService;

inject(function(myService) {
  // variable "myService" conflicts
  // with parameter of same name.
  //
  // "myService = myService" makes no sense!

  // How do we fix this?
});

```
How is it possible to hoist this variable out of the function AND use the same name?

---

## Underscore Wrapping

 * The injector will remove the underscores internally and find the provider.

```javascript
var myService;

inject(function(_myService_) {
   // This is OK!
   myService = _myService_;
});

```

---

  # angular.mock.dump()

  * ngMock provides a `dump()` method that stringifies objects in a more helpful manner than provided by the browser.
  * For example, when `dump()`ing scope objects, it will print a hierarchy.
  * This is helpful for debugging.

```javascript

      console.log(angular.mock.dump($rootScope));
      // Scope(1): {
      //     Scope(2): {
      //     exampleProperty: "This is a scope property"
      //   }
      //     Scope(3): {
      //     otherProperty: "This was defined in `otherModule`"
      //   }
      // }

```

---

## Questions?

 * Any questions before we move on?

---

## Testing Controllers

Controller functions act as "constructor functions that augment a scope".

Controller tests aim to answer the question:

 * Was the controller object instatiated correctly?
 * Was the scope object augmented / modified correctly?

```javascript
// $controller is the "controller lookup service"
// Us it to run a controller in isolation.
var myScope = $rootScope.$new();
var myCtrl = $controller("myCtrl", {
  $scope: myScope
});
expect(myScope.someProperty).toEqual("Some value");
```

---

## Exercise

UnitTesting/Exercises/ControllerTests/test

---

## Testing Directives.

 * Testing a directive involves running assertions against detached DOM nodes.
 * Before learning to test directives, we must learn to instantiate directives in isolation.

---

## The $compile Service

 * $compile is used to instantiate a directive on an isolated DOM node.
 * That DOM node can then be tested in isolation.
 * `$compile` takes HTML templates and links them to a `$scope` object.
 * The result is a new HTML DOM node.

```javascript
// Set up scope in preparation for compilation.
$scope.greeting = "Hello, world!";

// Templates are strings or DOM nodes.
var template = "<h1>{{ greeting }}</h1>";

// Compiles the template from the context of the $scope.
// Eg: All templates will reference the $scope passed in.
$compile(template)($scope);
// => [<h1>Hello, world!</h1>]

```

---

## Demo: DOM Manipulation and $compile

Files:

 * `unit_testing/demos/compile_service.html`

In this exercise, we will manually use `$compile` to attach a template to the DOM.

---

## Testing a Directive

 * We just saw how `$compile` can be used to create new DOM nodes from templates.
 * This makes it possible to isolate a directives output for testing.

```javascript

  var myDirective = $compile("<my-directive></my-directive>")($scope);
  expect(myDirective.scope()).toEqual($scope);

```

---

## Demo: Testing a Directive

Folder:
 `unit_testing\demos\testing_directives\`

Let's take a look at `index.html` before looking at the correspending `tests.js` file.

---

## Demo: Testing Services

files:

`unit_testing\demos\testing_services\karma.conf.js`

---

## Testing Filters

 * Filters are by far the most simple provider to test.
 * Simply fetch the filter function using `$filter` and run assertions off of filter outputs.

```javascript

inject(function($filter) {
  var myFilter = $filter("myFilter");
})

```

---

## Questions?

 We now have an understanding of basic testing in Angular.

 In the next section, we will focus on testing AJAX endpoints and asynchronous testing methods.

---

## AJAX and Testing

 * Tests are best written in isolation.
 * APIs create external dependencies which can slow down a test suite or make testing impractical.
 * External APIs may also have real world side effects that must be avoided when running a test suite.
 * In this section, we will learn how to stub out HTTP requests to keep AJAX tests fast, clean and safe.

---

## $httpBackend

 * ngMock provides `$httpBackend`, which stops `$http` from making API calls during testing.
 * It allows us to provide fake data to stub API requests
 * It allows us to "EXPECT" response when certain code is called (Eg: consider certain code broke if it doesn't make an API call).

---

## Stubbing Fake Response Data

It is possible to "train" NgMocks to respond to specific HTTP requests.

```javascript

$httpBackend
  .when('GET', '/users/1')
  .respond({userId: 1, name: "Rick"},   // Body
           {'X-Token-Example': '123'}); // Headers

```

Any HTTP requests in Angular to `/users/1` will now return the the pre-trained response above.

---

## .when() Shortcuts

The `.when(verb, url)` signature offers some shortcuts, such as:

  * "whenDELETE"
  * "whenGET"
  * "whenPUT"
  * "whenPOST"

---

## Ensuring Your Code Calls an API

`.when` will stub out an HTTP request, but it won't force you to make the request.

Calling `$httpBackend.expect(method, url, data, headers)` provides a stub response and **raises an exception if the request is not made**.

```javascript
  $httpBackend
    .expect('post', '/my_form', 'example content')
    .respond(201, '');

  // ... in the test code ...

  myForm.send('example content');

```

---

## `expect()` vs. `when()`

 Both return a "trained response" for stubbing purposes.

 What's the difference?

 * **`when`**: Will return the stub data any number of times (or not at all). Order does not matter. Tests will still pass if the request is not used.
 * **`expect`**: Request is required. Order matters. Request is only provided once. Tests will fail if not called.

---

## "Flushing" HTTP Requests

 * Test HTTP requests, by default, will not automatically complete.
 * This is useful for testing loading screens or progress dialogs.
 * `$httpBackend.flush()` will fulfill any outstanding HTTP requests.

```javascript

  $http
    .get('/users.json')
    .then(function(){
      /* Response here.
         Does not resolve until .flush() is called.
      */
    });

  $httpBackend.flush();

```

---

## Verifying Requests

**Problem:** You want to ensure that your implementation code is *actually* making calls to an API.

**Solution:** Raise an exception in tests if there are any outstanding (unhandled) HTTP requests.

```javascript

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

```

Even though "expectations" raise errors by default, **they will only do so if you call .flush()**.

verifyNoOutstandingExpectation will give assurance even if you forget to call flush();

---

## Questions?

Topics Covered:

 * Jasmine
 * Spies
 * Karma
 * NgMock
 * $httpBackend

---

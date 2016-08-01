# Angular Services and Providers

## About Services

 * Services offer a means of reusing code and sharing information
 * So far, we've only used Angular's built in services (Eg: `$http`).
 * Now, we will learn how to create our own.

## Specialized Objects

Specialized objects are those which conform to a special internal API with Angular. They typically have a very specific purpose.

 - `module.controller('name', constructor)`
 - `module.directive('name', constructor)`
 - `module.filter('name', constructor)`
 - `module.animation('name', constructor)`

## Service "Recipes"

Services are more generalized. They offer an API that is customized by the developer.

 - `module.service` (See naming note on next slide)
 - `module.factory`
 - `module.value`
 - `module.constant`
 - `module.provider` (rarely used)

Although they all serve the goal of adding modularity and maintainability, their usage rules differ slightly.

## Common Service Use Cases

 * Data access objects (DAOs)
 * Configuration sharing
 * Shared logic / information
 * A "communication bus" between controllers

## Some Notes About Services

Services are "laziliy instantiated singletons":

 * When not injected, 0 instances exist.
 * When injected, exactly 1 instance is created.
 * Regardless of how many times a service is injected, there will never be more than one instance.
 * A single service instance is shared across an application.

## A Note About Service Naming

 > Yes, we have called one of our service recipes 'Service'.
 > We regret this and know that we'll be somehow punished for our misdeed.
 > It's like we named one of our offspring 'Child'.
 > Boy, that would mess with the teachers.

 -- [Official AngularJS Documentation](https://docs.angularjs.org/guide/providers)

 ([CC-BY-3.0](http://creativecommons.org/licenses/by/3.0/))

## The .value() Recipe

 * `.value()` is the most simple of all recipes.
 * It provides a simple way to share strings, objects and other values across an application.
 * Typically, it is used for sharing configuration options.
 * Occasionally, it will be used to import 3rd party libraries into Angular.
 * Like all services in Angular, it is a singleton.
 * It is rarely used because of some limitations (covered later).

```javascript
myModule.value("serverPort", 8000);
myModule.value("serverUrl", "http://localhost");
myModule.value("serverConfig", {highSpeed: true});
```

## Using Services

Once created, custom services can be injected like any other service in Angular.

```javascript
mod.controller("myCtrl", function($scope, serverPort){
  $scope.port = serverPort;
});
```

## Value Object Demo

providers/demos/values.html

## Application Lifecycle Phases

 - `module.config(function(myService){})`
 - `module.run(function(myService){})`

Angular provides two "phases" of an application: `config` time and `run` time.

The most common example of this is configuration of [Angular's URL router](https://docs.angularjs.org/api/ngRoute).

Not all services are available during the `config` phase.

## The .constant() Recipe

 * Constants have a few differences from a `.value`:
   1. Constants are available at application `.config` time.
   2. Constants cannot be changed by a `.decorator` (covered later).
   3. Aside from these differences, they are almost identical to `.values`.
 * The name might suggest immutability, but constants are not "constant" in the traditional sense.
 * A constant content (if an object) can actually be changed!
 * Conversely, a primitive value in either a value or constant cannot change!

## Value and Constant Limitations

Values and constants are taught first because of their simplicity. But they are not used as often as other services.

The main limitation of `value` and `constant` recipes are that they can't inject dependencies of their own.

Next, we will explore the `factory` and `service` services, which are more commonly used.

## Exercise

providers/Excercises/team-values.html

## The .factory() Recipe

 * One of the most commonly used service types.
 * Allows the use of dependency injection (unlike values or constants).


DEMO: `providers/demos/factory-dao.html`

## The .service() Recipe

 * Unlike a factory, services are instantiated with the `new` keyword.
 * Instead of returning an object, simply append attributes to `this`
 * Defined differently than a factory, but end results are mostly the same.
 * `.service` is recommended over `.factory` by the official Angular style guide.

DEMO: `providers/demos/service-dao.html`

## The .decorator() Recipe

 * Sometimes, you want to modify an existing service without changing its source code.
 * The decorator allows you to "decorate" a service with additional functionality.
 * Useful when you wish to modify a 3rd party service with additional functionality.
 * Example: Sending calls to `$log.error` to an error reporting tool.

DEMO: `providers/demos/decorator.html`

## The .provider() Itself

 > ...the Provider recipe is the core recipe type and all the other recipe types are just syntactic sugar on top of it.
 > It is the most verbose recipe with the most abilities, but for most services it's overkill.

 -- [Official AngularJS Documentation](https://docs.angularjs.org/guide/providers)

 ([CC-BY-3.0](http://creativecommons.org/licenses/by/3.0/))

## Exercise

providers/Excercises/team-dao.html

## Questions?

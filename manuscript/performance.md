# Performance Considerations

## The Biggest Performance Indicator

Typically, the larger a scope's `$$watchers` attribute gets, the worse off your performance will be.

The majority of Angular performance tips revolve around reducing the size of `$$watchers`.

Watcher functions impact performance because they are run on each digest cycle.

## Tip: Use ng-bind instead of Interpolation

`ng-bind` is a faster alternative to template interpolation (`{{}}`)

```html
<p ng-bind="fast"></p>
<p> {{ slow }} </p>
```

Reason: Interpolated data gets applied on every digest cycle. `ng-bind` only applies changes when the data updates.

It also has the added benefit of not showing empty templates on page load.

## Tip: Use 'Bind Once' Syntax

'Bind Once' syntax was introduced in Angular 1.3. It will update the template at most once. The result is fewer DOM manipulations.


```javascript
<p ng-bind="::rendersOnce"></p>

```

Or, in html:

```html
<p>{{ ::rendersOnce }}</p>

```

 Bind once is useful for feeding static data into dynamic templates 

Example use case: `user.email` is unlikely to change at run time.


## $scope.$digest() vs. $scope.$apply()

Replacing `$apply()` calls with calls to `$digest()` calls can reduce computations per digest cycle.

It's a good idea to replace `$apply` with `$digest` when watching "local" data that is not used outside the current scope. This is not always possible.

Best Practice: Avoid careless use of `$scope.$apply`.

## Reduce ng-repeat Usage

`ng-repeat` is one of the least performant directives, especially for large collections.

Often, the performance hit is insignificant. For larger data sets, it may become a problem.

In cases where `ng-repeats` are a bottleneck, consider using a third party infinite scroll or bind-once library such as [bindOnce](https://github.com/Pasvaz/bindonce), [vs-repeat](https://github.com/kamilkp/angular-vs-repeat) or [ag-grid](https://www.ag-grid.com/best-angularjs-data-grid/index.php) (commercial).

If `ng-repeat` is not a bottleneck, adding a 3rd party library may outweigh any benefits.

"If it's not broke, don't fix it"

## Use "track by" in ng-repeat

 > If you are working with objects that have an identifier property, you should track by the identifier instead of the whole object . . . ngRepeat will not have to rebuild the DOM elements for items it has already rendered . . . this significantly improves rendering performance . . . track by $index can also provide a performance boost.

-- AngularJS Documentation

Adding a 'track by' statement to `ng-repeat` allows Angular to perform internal optimizations. As such, use of `track by` is encouraged.

## Keep Getters and Filters Small

 > The filter function should be a pure function, which means that it should be stateless and idempotent. Angular relies on these properties and executes the filter only when the inputs to the function change.

 -- Angular Documentation

It is common to see a filter called tens or hundreds of times in a single digest cycle.

Tips:

 * Angular cannot optimize filters that maintain an internal state.
 * Mark a filter as `.$stateful` if it is not a pure function (*highly discouraged*).

## Remember to Cancel Timers

Intervals require manual cleanup and will continue to run if you do not stop them. This can result in background jobs running even after they are not needed.

```javascript
  var callback = function(){ console.log("Hello!") };

  // $interval returns a timer ID
  var timer = $interval(callback, 1000);

  // Use the ID to cancel the time.
  var cancelTimer = function() { $interval.cancel(timer); };

  // Hook into element's $destroy event.
  element.on('$destroy', cancelTimer);

```

## Set $compileProvider to Production Mode

```javascript
mod.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);
```

This stops Angular from doing unnecessary DOM updates for CSS classes like `ng-binding` and `ng-scope`.

## Enable applyAsync

```

app.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(true);
});

```
Combines processing of multiple http responses received at around the same time.

This is useful for large apps that perform many HTTP requests at startup.

## Questions?

var adapter = new ng.upgrade.UpgradeAdapter();
// SEE: adapter.upgradeNg1Provider
//      adapter.downgradeNg2Provider

angular.module('angular-legacy', []);
angular.module('angular-legacy').directive('foo',
  function() {
    return {
      restrict: 'A',
      template: "<div></div>",
      link: function($scope, element, attrs, controller) {
        var controllerOptions, options;
        element.text('Hello, world!');
      }
    };
  }
);

var Foo2 = ng.core
  .Component({
    selector: 'foo2',
    template: 'Foo 2',
  })
  .Class({
    constructor: function() {}
  });

var AppComponent = ng.core
  .Component({
    selector: 'app',
    template: 'Foo (Ng1): <foo></foo> <br/> Foo (Ng2) <foo2></foo2>',
    directives: [adapter.upgradeNg1Component('foo'), Foo2]
  })
  .Class({
    constructor: function() {}
  });

angular.module('angular-legacy').directive('app', adapter.downgradeNg2Component(AppComponent));

adapter.bootstrap(document.body, ['angular-legacy']);
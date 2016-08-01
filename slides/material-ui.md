# Angular Material UI

---

## Material Design

 > Material Design is a specification for a unified system of visual, motion, and interaction design that adapts across different devices and different screen sizes.

-- Material UI Documentation

 * Material Design is a visual design philosophy made by Google.
 * The style is seen in many newer Android apps, as well as Google services like Google+.

---

## Angular Material UI

 * Angular Material UI is an officially supported Angular plugin that enables Material Design style.
 * It offers a coherent set of directives and APIs to build sites quickly.

---

## Tab Navigation Example (UI Layer)

![](/manuscript/images/material-ui-tabs.PNG)

---

## Tab Navigation Example (HTML)

```html
<md-content>
  <md-tabs md-dynamic-height md-border-bottom>
    <md-tab label="one">
      <md-content class="md-padding">
        <h1 class="md-display-2">Tab One</h1>
        <p>More text</p>
      </md-content>
    </md-tab>
    <md-tab label="two">
      <md-content class="md-padding">
        <h1 class="md-display-2">Tab Two</h1>
        <p>Some Text</p>
      </md-content>
    </md-tab>
  </md-tabs>
</md-content>

```

---

## App Setup

```javascript
  <head>
    <link href="angular-material.css" rel="stylesheet" />
  </head>

  <body>
    <script src="angular.js" type="text/javascript" ></script>
    <script src="angular-animate.js" type="text/javascript" ></script>
    <script src="angular-material.js" type="text/javascript" ></script>

    <script>
        angular.module('starterApp', ['ngMaterial']);
    </script>
  </body>
```

---

## The Material UI Grid

Angular Material UI uses directives to define its layout system

For example, the `layout` directive sets an element to a "row" or "column" type.

The Grid system is similar to those seen in Twitter Bootstrap or Zurb Foundation.

![](/manuscript/images/material-ui-layout.PNG)


---

## Layout Example

![](/manuscript/images/material-ui-layout.PNG)

```html
<div layout="row">
  <div flex>First item in row</div>
  <div flex>Second item in row</div>
</div>
<div layout="column">
  <div flex>First item in column</div>
  <div flex>Second item in column</div>
</div>
```

Adapted from [Material UI Documentation](https://material.angularjs.org/latest/layout/container)

---

## More on "Flex"

The `flex` directive allows creation of proportional rows and columns.

The `flex` directive can be given an arbitrary number which will create proportions for the given row or column.

This is more flexible than other systems which may only offer a 12 column grid.

![](/manuscript/images/material-ui-flex.PNG)

---

## Batteries Included

Material UI supports many commonly needed UI components, such as message dialogs (called a "toast" in Material UI parlance).

![](/manuscript/images/material-ui-toast.PNG)

```javascript
mod.controller('ctrl', function($scope, $mdToast){
  $scope.onClick = function(){
    $mdToast.showSimple("Hello, world!");
  }
})
```

---

## Many More Default Features

This is just a brief overview. Material UI offers [many other default widgets](https://material.angularjs.org/latest/demo/virtualRepeat) that are useful for most applications.


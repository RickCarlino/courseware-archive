# Angular UI Bootstrap

---

## A Brief Introduction to the Bootstrap CSS Framework

 - Bootstrap is a 3rd party CSS library maintained by Twitter.
 - Bootstrap CSS is not part of Angular, but many Angular developers use it.
 - It is extremely popular. 15% of websites globally use it.

---

## Core Bootstrap Features

 - The most fundamental bootstrap feature are the `container`, `row` and `col` classes.
 - They provide a 12 column grid that automatically stacks on small screens.

![](manuscript/images/ui-bootstrap-grid.png)

---

## Core Bootstrap Features

 - Bootstrap also provides a number of widgets and form controls.
 - Their behavior can be overridden by creating custom CSS classes.

![](manuscript/images/ui-bootstrap-buttons.png)

---

## Ng UI Bootstrap: What Is It?

 * Angular UI Bootstrap integrates AngularJS with the Twitter Bootstrap CSS framework.
 * It provides native Angular directives for common bootstrap components, such as buttons, forms, modals, etc..
 * In many cases, this can provide increased productivity and maintainability.

They maintain [very up-to-date documentation](https://angular-ui.github.io/bootstrap/).

---

## Why Not Use Native Bootstrap?

It's possible, but may have issues for some use cases (modal dialogs, carousel, accordion, etc).

 * Many bootstrap plugins rely heavily on JQuery to operate. [Example.](http://getbootstrap.com/javascript/)
 * JQuery plugins are unaware of Angular intricacies, such as the `$digest` cycle.
 * This can result in excess boilerplate code to integrate plugins.
 * In worse cases, it is possible to get "stale data" when UI components loose sync with Angular data binding.

Angular UI Bootstrap is less reliant on JQuery plugins than vanilla Bootstrap, providing better Angular integration.

---

## Do I Always Need a Plugin?

 - For *light* use of Bootstrap you may not even need to use the Angular UI Bootstrap at all.
 - UI Bootstrap is useful when JavaScript Bootstrap features are used
   - Example: Using the carousel or modal dialogs.
 - If your project does not require any of the JavaScript "extras" that come with Bootstrap, you may be better off just using the vanilla bootstrap.
 - Some developers find it easier to wrap individual bootstrap components in a directive by hand, rather than pull in a 3rd party library.
 - Every project is different, so there is no definitive answer for every use case.

---

## UI Bootstrap Setup: Dependencies

With dependencies, the library **weighs in at about ~20kB with gzip compression**.

 * Bootstrap version 3 (required)
 * HTML5 Shiv and Respond.js (For IE 8 support)
 * Angular-animate (for animation support)
 * Angular-touch (for touch support)

---

## UI Bootstrap Setup: Getting Started

Angular UI Bootstrap is a single *.js file that can be downloaded from the [Official Website](https://angular-ui.github.io/bootstrap/), Bower or NPM.

```javascript
// Application
angular
  .module("app", ['ui.bootstrap']);
```

```html
<!-- html -->
    <script src="/lib/angular.js"></script>
    <script src="/lib/ui-bootstrap.js"></script>
```

Let's take a look at a boilerplate setup.

---

## Angular UI Boilerplate

Once the scripts and modules are loaded, **various `uib-*` namespaced directives will be available for use**.

Let's take a look at a basic UI Bootstrap application setup.

**DEMO:** `ui-bootstrap/basic-setup.html`

Pay special attention to the `<head>` elements.

---

## Modal Dialogs

 - This is the most commonly used widget in UI Bootstrap
 - Unlike the original version, it does not require JQuery and is well integrated into Angular.

![](manuscript/images/ui-bootstrap-modal.png)

---

## The `$uibModal` Service

 * `$uibModal` is an Angular service that creates modals in the UI.
 * It exposes one method: `$uibModal.open()`

 **DEMO:** `ui-bootstrap\modals.html`

---

## Tabs

Tabbed navigation can be achieved via the following directives:

 * `uib-tabset`
 * `uib-tab`

![](/manuscript/images/ui-bootstrap-tabs.PNG)

---

## Tabs Example HTML

```html
  <uib-tabset>
    <uib-tab index="0" heading="My title">
      Content here
    </uib-tab>
    <uib-tab index="1" heading="Next Tab" select="myCallback()">
      {{tab.content}}
    </uib-tab>
  </uib-tabset>
```

---

## Form Controls

 * Angular UI Bootstrap exposes a number of form controls.
 * These form controls are seamlessly integrated with `ngModel` and add consistent visual styling via attribute directives.
 * Adding UI Bootstrap directives to existing for controls is simple.

`uib-btn-checkbox`, `uib-btn-radio`, `uibDateParser`, `uib-datepicker`, `uib-dropdown`, `uib-timepicker`

---



## Handling Paged Data

 * `uib-pagination`
 * `uib-pager`

---

## Navigation and Structure

 * `uib-tab` / `uib-tabset`

---

## Informational Dialogs

 * `uib-tooltip-*`

---

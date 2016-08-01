# Advanced $http

---

## $http, the Function

```javascript
$http({
 method: 'POST',
 url: '/sales',
 headers: {
   'x-auth-token': 'secret123'
 },
 data: { transaction_amount: 86753.09 }
});

```

---

## $http Shortcuts

 * $http.get(url, config)
 * $http.post(url, data, config)
 * $http.put(url, data, config)
 * $http.patch(url, data, config)
 * $http.delete(url, data, config)

---

## Some $http Config Options

 * `method`
 * `url`
 * `data`
 * `timeout` Accepts a timeout _or_ a promise.
 * `params` Querystring params (pass an object)
 * `headers` Also accepts a plain javascript object.

---

## Simple Caching

 * For simple caching use cases, simply set `cache: true` in request options.
 * All subsequent GET requests will use the locally cached data instead of making a network request.
 * A second option is to provide a custom cache built with `$cacheFactory`.


---

## A Note Before We Start Caching...

 * An Angular application is always last in line for caching:
    * The server can cache
    * The browser can cache
    * The application cannot stop caching from happening elsewhere.

---

## Control Cache with $cacheFactory

 * Instances of `$cacheFactory` act like key/value stores.
 * They persist for the lifetime of the browser session.
 * In the case of the $http, the URL serves as the key.
 * the `response` object serves as the value.

```javascript
function($cacheFactory, $http) {
  var myCache = $cacheFactory("custom-cache-id");
  $http({
    method: 'GET',
    url: '/sales',
    cache: myCache
  })
  // Later on, when clearing the cache:
  myCache.remove('a-specific-url');
  myCache.removeAll();
}

```

---

## Other Functionality in $cacheFactory

Live demo of caching:

**/ajax/cache_example.html**

```javascript
function($cacheFactory, $http) {
  var myCache = $cacheFactory("custom-cache-id");
  myCache.put("userToken", "2E45E34E2");
  myCache.get("userToken"); // => "2E45E34E2"
  cache.info() // => {id: 'custom-cache-id', size: 1})
}

```

---

## Demo: Time Expiring Cache

**ajax/timeout\_cache\_example.html**

---

## httpInterceptors

 * Angular $http provides "interceptors" for modifying all inbound and outbound HTTP traffic.
 * This is great for adding authorization tokens, sanitizing data, redirecting 401 response to login pages, etc.

**ajax/interceptor\_example.html**

A wide range of configuration options is available in the [official documentation](https://docs.angularjs.org/api/ng/service/$http#interceptors).

---

## Questions?

---

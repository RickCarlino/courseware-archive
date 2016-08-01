var $ = require("jquery");
let btn = $("#btn");

btn.on("click", function() {
    // No support for ES6 modules, yet.
    require.ensure(["lodash"], function(require) {
        var lodash = require("lodash");
    });
});

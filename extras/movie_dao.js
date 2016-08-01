angular
    .module("movies.daos", [])
    .service("movieDAO", function ($http) {
                console.log("Im in the service");

        // http://localhost:8080/movies
        this.add = function(left, right) {
            return left + right;
        }

        this.getMovies = function () {
            return $http
                .get("http://localhost:8080/movies.json")
                .then(function (resp) { return resp.data; });
        }
    });
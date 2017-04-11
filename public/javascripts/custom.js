var app = angular.module('video-rental', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/blue', {

        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var videos = $resource('/apis/videos');
        videos.query(function(video) {
            console.log(video);
            $scope.videos = video;
        })
    }
]);

//
// app.controller('HomeCtrl', function($scope, $resouce) {
//
// });

var app = angular.module('video-rental', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video', {
            templateUrl: 'partials/add_video.html',
            controller: 'addVideoCtrl'
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

app.controller('addVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.save = function() {
            console.log('data ' + $scope.description + ' ' + $scope.title);
            var videos = $resource('/apis/videos');
            videos.save($scope.video, function(video) {
                console.log('saved video ' + video.res.title);
                $location.path('/');
            });
        }
    }
]);

//
// app.controller('HomeCtrl', function($scope, $resouce) {
//
// });

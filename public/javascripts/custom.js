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
        .when('/video/:id', {
            templateUrl: 'partials/add_video.html',
            controller: 'updateVideoCtrl'
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
        $scope.action = 'Save'
        $scope.save = function() {
            var videos = $resource('/apis/videos');
            videos.save($scope.video, function(video) {
                console.log('saved video ' + video.res.title);
                $location.path('/');
            });
        }


    }
]);


app.controller('updateVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        console.log('id is ' + $routeParams.id);
        $scope.action = 'Update';
        $scope.extraButton = true;

        var video = $resource('/apis/videos/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        video.get({
            id: $routeParams.id
        }, function(video) {
            $scope.video = video;

        });
        $scope.save = function() {
            video.update($scope.video, function() {
                $location.path('/');
            });
        };

        $scope.delete = function() {
            video.delete({
                id: $routeParams.id
            }, function() {
                $location.path('/');
            });
        }
    }
]);

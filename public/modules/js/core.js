'use strict';

angular.module('index').controller('coreController', ['$scope', '$http', function ($scope, $http) {
    $scope.main_display = false;
    $scope.mainDisplay = function (img) {
        console.log(img);
        $scope.main_img = img;
        $scope.main_display = !$scope.main_display;
    };
    $scope.logout = function () {
        $http({
            method: 'POST',
            url: '/api/logout'
        }).then(function (res) {
            window.location = '/';
        });
    };
}]);

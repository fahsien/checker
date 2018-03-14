'use strict';

angular.module('index').controller('coreController', ['$scope', '$http', function ($scope, $http) {

    $scope.logout = function () {
        $http({
            method: 'POST',
            url: '/api/logout'
        }).then(function (res) {
            window.location = '/';
        });
    };
}]);

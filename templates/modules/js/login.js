'use strict';

angular.module('login', [])
    .controller('loginController', function($scope, $http) {
        $scope.submit = function(){
            $http({
                  method  : 'POST',
                  url     : '/api/login',
                  data    : {
                                email: $scope.email,
                                password: $scope.password
                            }
            }).success(function(data) {
                $scope.fail_message = '';
                window.location = '/';
            }).error(function(data, status) {
              $scope.fail_message = '登入失敗唷！';
            });
        };
    });

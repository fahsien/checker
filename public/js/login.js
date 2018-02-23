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
                window.location = '/';
            });
        }
    })

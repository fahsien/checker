'use strict';

angular.module('login', ['ngDialog']).controller('loginController', function ($scope, $http, ngDialog) {
    $scope.submit = function () {
        $http({
            method: 'POST',
            url: '/api/login',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).success(function (data) {
            $scope.fail_message = '';
            window.location = '/';
        }).error(function (data, status) {
            $scope.fail_message = '登入失敗唷！';
        });
    };

    $scope.forgetPassword = function () {
        ngDialog.open({
            template: 'forget-password-template',
            controller: ['$scope', $scope => {
                $scope.submit = function () {
                    $http({
                        method: 'POST',
                        url: '/api/findPassword',
                        data: {
                            email: $scope.email
                        }
                    }).then(function (res) {
                        if (res.data.message === 'fail') {
                            $scope.message = '無此組電子郵件';
                        } else {
                            $scope.message = '已寄出密碼到你的電子郵件';
                        }
                    });
                };
            }]
        });
    };
});

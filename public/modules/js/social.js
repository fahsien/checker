'use strict';

angular.module('checker').controller('socialController', ['$scope', '$sce', function ($scope, $sce) {
    setTimeout(function () {

        $scope.$apply(function () {
            $scope.fbArray = window.fbArray;
        });
        console.log($scope.fbArray);
    }, 2000);
    // $scope.fb_iframe = function(url){
    //     return $sce.trustAsResourceUrl(url);
    // };

    $scope.convertTime = function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() + 1; //0 is January
        var date = a.getDate();
        var hour = '0' + a.getHours();
        var min = '0' + a.getMinutes();
        var time = year + '年' + month + '月' + date + '日' + ' ' + hour.substr(-2) + ':' + min.substr(-2);
        return time;
    };
}]);

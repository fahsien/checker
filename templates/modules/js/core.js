'use strict';

angular.module('index').controller('coreController', [
    '$scope', 
    '$http',
    '$sce', 
    function($scope, $http, $sce) {
        $scope.main_display = false;
        $scope.mainDisplay = function(iframe){
            if($scope.main_display){
                $scope.main_display = false;
            }else{
                $scope.main_iframe = $sce.trustAsResourceUrl(iframe);
                $scope.main_display = true;
            }
            
        };
        $scope.logout = function(){
            $http({
                  method  : 'POST',
                  url     : '/api/logout'
            }).then(function(res) {
                window.location = '/';
            });
        };

    }]);

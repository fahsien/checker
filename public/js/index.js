angular.module('index', [])
    .controller('indexController', function($scope, $http) {
        $scope.task_input_display = [];
        $scope.task_input_name = [];
        $scope.checkers = [
                // {order:1, name: '專案A', tasks: [], previous: {exist:false, finished:true}},
                // {order:2, name: '專案B', tasks: [], previous: {exist:true, finished:true}},
                // {order:3, name: '專案C', tasks: [], previous: {exist:true, finished:false}}
            ];
        $scope.addChecker = function(){
            $scope.check_input_display = true;
            $scope.blink_animation = false;
        };
        $scope.saveChecker = function(){
            if(!$scope.check_input_name) return;
            $scope.checkers.push({order:$scope.checkers.length + 1, name: $scope.check_input_name, tasks: [], previous: {exist:$scope.checkers.length > 0, finished:false}});
            $scope.check_input_name = null;
            $scope.check_input_display = false;
            $scope.blink_animation = true;

        };

        $scope.addTask = function(order){
            $scope.task_input_display[order] = true;
        };
        $scope.saveTask = function(checker){
            if(!$scope.task_input_name[checker.order]) return;
            checker.tasks.push({name: $scope.task_input_name[checker.order]});
            $scope.task_input_name[checker.order] = null;
            $scope.task_input_display[checker.order] = false;
        };
    });

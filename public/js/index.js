angular.module('index', [])
    .controller('indexController', function($scope, $http) {
        //** Initialize **//
        $http({
              method  : 'GET',
              url     : '/api/checkers'
        }).success(function(data) {
            $scope.checkers = data.checkers;
            for(var i=0; i<$scope.checkers.length; i++){
                $scope.checkers[i].previous = {exist: i !== 0, finished:false};
            }
        });
        $scope.blink_animation = true;

        //** Checker **//
        $scope.checkerFunc = {
            content_input_display : false,
            content_input : null,
            name_input_display : [],
            add : function(){
                this.content_input_display = true;
                $scope.blink_animation = false;
            },
            save : function(){
                if(!this.content_input) return;
                $http({
                      method  : 'POST',
                      url     : '/api/checker',
                      data    : {
                                    name: this.content_input,
                                    tasks: []
                                }
                }).success(function(data) {
                    data.checker.previous = {exist:$scope.checkers.length > 0, finished:false}
                    $scope.checkers.push(data.checker);
                    $scope.checkerFunc.content_input = null;
                    $scope.checkerFunc.content_input_display = false;
                    $scope.blink_animation = true;
                });

            },
            modify : function(order){
                this.name_input_display[order] = true;
            },
            update : function(checker, order){
                $http({
                      method  : 'PUT',
                      url     : '/api/checker',
                      data    : checker
                }).success(function(data) {
                    $scope.checkerFunc.name_input_display[order] = false;
                });
            },
            delete : function(checker, order){
                $http({
                      method  : 'POST',
                      url     : '/api/deleteChecker',
                      data    : checker
                }).success(function(data) {
                    $scope.checkers.splice(order,1);
                    if(order === 0) $scope.checkers[0].previous = {exist: false, finished:false};
                });
            }
        };

        //** Task **//
        $scope.taskFunc = {
            content_input_display : [],
            content_input : [],
            name_input_display : [],
            add : function(order){
                this.content_input_display[order] = true;
            },
            save : function(checker, order){
                if(!this.content_input[order]) return;
                $http({
                      method  : 'POST',
                      url     : '/api/task',
                      data    : {
                                    name: this.content_input[order],
                                    checker: checker
                                }
                }).success(function(data) {
                    checker.tasks.push(data.task);
                    $scope.taskFunc.content_input[order] = null;
                    $scope.taskFunc.content_input_display[order] = false;
                });

            },
            modify : function(id){
                this.name_input_display[id] = true;
            },
            update : function(task){
                $http({
                      method  : 'PUT',
                      url     : '/api/task',
                      data    : task
                }).success(function(data) {
                    $scope.taskFunc.name_input_display[task._id] = false;
                });
            },
            delete : function(checker, task, order){
                $http({
                      method  : 'POST',
                      url     : '/api/deleteTask',
                      data    : task
                }).success(function(data) {
                    checker.tasks.splice(order,1);
                });
            }
        };
    });

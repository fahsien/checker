angular.module('index', [])
    .controller('indexController', function($scope, $http) {
        //** Initialize **//
        $http({
              method  : 'GET',
              url     : 'getCheckers'
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
                      url     : 'postChecker',
                      data    : {
                                    name: this.content_input,
                                    tasks: []
                                }
                }).success(function(data) {
                    $scope.checkers.push({name: $scope.checkerFunc.content_input, tasks: [], previous: {exist:$scope.checkers.length > 0, finished:false}});
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
                      url     : 'putChecker',
                      data    : checker
                }).success(function(data) {
                    $scope.checkerFunc.name_input_display[order] = false;
                });
            },
            delete : function(checker, order){
                $http({
                      method  : 'POST',
                      url     : 'deleteChecker',
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
            add : function(order){
                this.content_input_display[order] = true;
            },
            save : function(checker, order){
                if(!this.content_input[order]) return;
                checker.tasks.push({name: this.content_input[order]});
                this.content_input[order] = null;
                this.content_input_display[order] = false;
            }
        };
    });

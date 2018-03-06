angular.module('index', [])
    .controller('indexController', function($scope, $http) {
        //** Initialize **//
        $http({
              method  : 'GET',
              url     : '/api/checkers'
        }).success(function(data) {
            $scope.checkers = data.checkers;
            for(var i=0; i<$scope.checkers.length; i++){
                for(var j=0; j<$scope.checkers[i].tasks.length; j++){
                    if($scope.checkers[i].tasks[j].due_date){
                        $scope.checkers[i].tasks[j].due_date = new Date($scope.checkers[i].tasks[j].due_date);
                    }
                }
            }
        });
        $scope.blink_animation = true;
        $scope.now = new Date();
        //**Get all users**//
        $http({
              method  : 'GET',
              url     : '/api/users'
        }).success(function(data) {
            $scope.users = data.users;
        });
        //**Get account user**//
        $http({
              method  : 'GET',
              url     : '/api/me'
        }).success(function(data) {
            $scope.user = data.user;
            console.log($scope.user);
        });

        $scope.logout = function(){
            $http({
                  method  : 'POST',
                  url     : '/api/logout'
            }).success(function(data) {
                window.location = '/';
            });
        };

        //** Checker **//
        $scope.checkerFunc = {
            content_input_display : false,
            content_input : null,
            name_input_display : [],
            add : function(){
                this.content_input_display = true;
            },
            cancel : function(){
                this.content_input_display = !this.content_input_display;
            },
            save : function(){
                if(!this.content_input) return;
                $http({
                      method  : 'POST',
                      url     : '/api/checker',
                      data    : {
                                    name: this.content_input
                                }
                }).success(function(data) {
                    $scope.checkers.push(data.checker);
                    $scope.checkerFunc.content_input = null;
                    $scope.checkerFunc.content_input_display = false;
                });

            },
            modify : function(id){
                this.name_input_display[id] = true;
            },
            update : function(checker){
                $http({
                      method  : 'PUT',
                      url     : '/api/checker',
                      data    : checker
                }).success(function(data) {
                    $scope.checkerFunc.name_input_display[checker._id] = false;
                });
            },
            delete : function(checker, order){
                $http({
                      method  : 'POST',
                      url     : '/api/deleteChecker',
                      data    : checker
                }).success(function(data) {
                    $scope.checkers.splice(order,1);
                });
            }
        };

        //** Task **//
        $scope.taskFunc = {
            content_input_display : [],
            content_input : [],
            name_input_display : [],
            duedate_input_display : [],
            add : function(id){
                this.content_input_display[id] = true;
                $scope.blink_animation = false;
            },
            cancel : function(id){
                this.content_input_display[id] = !this.content_input_display[id];
            },
            save : function(checker){
                if(!this.content_input[checker._id]) return;
                $http({
                      method  : 'POST',
                      url     : '/api/task',
                      data    : {
                                    name: this.content_input[checker._id],
                                    checker: checker
                                }
                }).success(function(data) {
                    checker.tasks.push(data.task);
                    $scope.taskFunc.content_input[checker._id] = null;
                    $scope.taskFunc.content_input_display[checker._id] = false;
                    $scope.blink_animation = true;
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
                    $scope.blink_animation = true;
                });
            },
            updateFinished : function(checker, task){
                $scope.blink_animation = false;
                this.update(task);
            },
            delete : function(checker, task, order){
                $http({
                      method  : 'POST',
                      url     : '/api/deleteTask',
                      data    : task
                }).success(function(data) {
                    checker.tasks.splice(order,1);
                });
            },
            switchDateSet : function(id){
                this.duedate_input_display[id] = !this.duedate_input_display[id];
            },
            setDueDate : function(task){
                if(!task.due_date){
                    $scope.taskFunc.duedate_input_display[task._id] = false;
                    return;
                }
                $http({
                      method  : 'POST',
                      url     : '/api/setDueDate',
                      data    : task
                }).success(function(data) {
                    if(data.success){
                        alert("截止日期設定成功");
                    }else{
                        alert("截止日期設定失敗，請重新檢查日期");
                        task.due_date = "";
                    }
                    $scope.taskFunc.duedate_input_display[task._id] = false;
                });
            },
            setTaskOwner : function(task, user){
                $http({
                      method  : 'POST',
                      url     : '/api/setTaskOwner',
                      data    : {
                                    task: task,
                                    user: user
                                }
                }).success(function(data) {
                    task.owner = user;
                });
            }
        };
    });

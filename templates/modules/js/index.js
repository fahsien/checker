'use strict';

angular.module('checker').controller('indexController', [
    '$scope', 
    '$http', 
    'ngDialog', 
    'r_checkers',
    '$stateParams',
    function($scope, $http, ngDialog, r_checkers, $stateParams) {


        //** Initialize **//
        $scope.checkers = r_checkers;
        $scope.blink_animation = true;
        $scope.now = new Date();
        //**Get all users**//
        $http({
              method  : 'GET',
              url     : '/api/users'
        }).then(function(res) {
            $scope.users = res.data.users;
        });
        //**Get account user**//
        $http({
              method  : 'GET',
              url     : '/api/me'
        }).then(function(res) {
            $scope.user = res.data.user;
        });

        $scope.logout = function(){
            $http({
                  method  : 'POST',
                  url     : '/api/logout'
            }).then(function(res) {
                window.location = '/';
            });
        };

        //** Checker **//
        $scope.checkerFunc = {
            content_input_display : false,
            content_input : null,
            name_input_display : [],
            owner_display : [],
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
                                    name: this.content_input,
                                    board: $stateParams.boardId
                                }
                }).then(function(res) {
                    $scope.checkers.push(res.data.checker);
                    $scope.checkerFunc.content_input = null;
                    $scope.checkerFunc.content_input_display = false;
                });

            },
            // modify : function(id){
            //     this.name_input_display[id] = true;
            // },
            update : function(checker){
                $http({
                      method  : 'PUT',
                      url     : '/api/checker',
                      data    : checker
                }).then(function(res) {
                    $scope.checkerFunc.name_input_display[checker._id] = false;
                });
            },
            updateColor : function(checker, color){
                $http({
                      method  : 'PUT',
                      url     : '/api/checkerColor',
                      data    : {
                          _id : checker._id,
                          color : color
                      }
                }).then(function(res) {
                    checker.color = color;
                });
            },
            delete : function(checker, order){
                if(!checker.owner) return;
                if(checker.owner._id !== $scope.user._id) return;
                $http({
                      method  : 'POST',
                      url     : '/api/deleteChecker',
                      data    : checker
                }).then(function(res) {
                    $scope.checkers.splice(order,1);
                });
            },
            clickToOpen : function (checker) {
                if(!checker.owner) return;
                if(checker.owner._id !== $scope.user._id) return;
                var update = this.update,
                    updateColor = this.updateColor;
                ngDialog.open({
                    template: 'checker-template',
                    controller: ['$scope', $scope => {
                        $scope.checker = checker;
                        $scope.update = update;
                        $scope.updateColor = updateColor;
                    }]
                });
            },
            openCheckerOwner : function(checker){
                if(this.owner_display[checker._id]){
                    this.owner_display[checker._id] = !this.owner_display[checker._id];
                }else{
                    this.owner_display[checker._id] = true;
                }
            },
            setCheckerOwner : function(checker, user){
                $http({
                      method  : 'POST',
                      url     : '/api/setCheckerOwner',
                      data    : {
                                    checker: checker,
                                    user: user
                                }
                }).then(function(res) {
                    checker.owner = user;
                    $scope.checkerFunc.owner_display[checker._id] = false;
                });
            }
        };

        //** Task **//
        $scope.taskFunc = {
            content_input_display : [],
            content_input : [],
            name_input_display : [],
            duedate_input_display : [],
            owner_display: [],
            add : function(checker){
                if(!checker.owner) return;
                if(checker.owner._id !== $scope.user._id) return;
                this.content_input_display[checker._id] = true;
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
                }).then(function(res) {
                    checker.tasks.push(res.data.task);
                    $scope.taskFunc.content_input[checker._id] = null;
                    $scope.taskFunc.content_input_display[checker._id] = false;
                    $scope.blink_animation = true;
                });

            },
            // modify : function(id){
            //     this.name_input_display[id] = true;
            // },
            update : function(task){
                $http({
                      method  : 'PUT',
                      url     : '/api/task',
                      data    : task
                }).then(function(res) {
                    // $scope.taskFunc.name_input_display[task._id] = false;
                    $scope.blink_animation = true;
                });
            },
            updateFinished : function(checker, task){
                $scope.blink_animation = false;
                this.update(task);
            },
            delete : function(checker, task, order){
                if(checker.owner._id !== $scope.user._id) return;
                $http({
                      method  : 'POST',
                      url     : '/api/deleteTask',
                      data    : task
                }).then(function(res) {
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
                }).then(function(res) {
                    if(res.data.success){
                        alert('截止日期設定成功');
                    }else{
                        alert('截止日期設定失敗，請重新檢查日期');
                        task.due_date = '';
                    }
                    $scope.taskFunc.duedate_input_display[task._id] = false;
                });
            },
            openTaskOwner : function(task){
                if(this.owner_display[task._id]){
                    this.owner_display[task._id] = !this.owner_display[task._id];
                }else{
                    this.owner_display[task._id] = true;
                }
            },
            setTaskOwner : function(checker, task, user){
                if(!checker.owner) return;
                if(checker.owner._id !== $scope.user._id) return;
                $http({
                      method  : 'POST',
                      url     : '/api/setTaskOwner',
                      data    : {
                                    task: task,
                                    user: user
                                }
                }).then(function(res) {
                    task.owner = user;
                    $scope.taskFunc.owner_display[task._id] = false;
                });
            },
            clickToOpen : function (checker, task) {
                var update = this.update,
                    switchDateSet = this.switchDateSet,
                    duedate_input_display = this.duedate_input_display,
                    setDueDate = this.setDueDate,
                    user = $scope.user;
                ngDialog.open({
                    template: 'task-template',
                    controller: ['$scope', '$http', ($scope, $http) => {
                        $scope.task = task;
                        $scope.checker = checker;
                        $scope.user = user;
                        $scope.update = update;
                        $scope.setDueDate = setDueDate;
                        $scope.switchDateSet = switchDateSet;
                        $scope.duedate_input_display = duedate_input_display;
                        $scope.message_input_display = [];
                        $scope.modify = function(id){
                            this.message_input_display[id] = true;
                        };
                        $scope.updateMessage = function(message){
                            $http({
                                  method  : 'PUT',
                                  url     : '/api/message',
                                  data    : {
                                                message: message
                                            }
                            }).then(function(res) {
                                $scope.message_input_display[message._id] = false;
                            });
                        };
                        $scope.enterMessage = function(){
                            $http({
                                  method  : 'POST',
                                  url     : '/api/message',
                                  data    : {
                                                task: task._id,
                                                message: $scope.enter_message
                                            }
                            }).then(function(res) {
                                $scope.task.messages.push(res.data.message);
                                $scope.enter_message = '';
                            });
                        };
                        $scope.delete = function(task, message, order){
                            $http({
                                  method  : 'POST',
                                  url     : '/api/deleteMessage',
                                  data    : message
                            }).then(function(res) {
                                task.messages.splice(order,1);
                            });
                        };
                    }]
                });
            }
        };
    }]);

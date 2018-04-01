'use strict';

angular.module('checker').controller('indexController', ['$scope', '$http', 'ngDialog', 'r_checkers', '$stateParams', function ($scope, $http, ngDialog, r_checkers, $stateParams) {

    //** Initialize **//
    $scope.checkers = r_checkers;
    $scope.blink_animation = true;
    $scope.now = new Date();
    //**Get all users**//
    $http({
        method: 'GET',
        url: '/api/users'
    }).then(function (res) {
        $scope.users = res.data.users;
    });
    //**Get account user**//
    $http({
        method: 'GET',
        url: '/api/me'
    }).then(function (res) {
        $scope.user = res.data.user;
    });

    $scope.logout = function () {
        $http({
            method: 'POST',
            url: '/api/logout'
        }).then(function (res) {
            window.location = '/';
        });
    };
    $scope.updateOrder = function (checker) {
        var tasks = [];
        for (var i = 0; i < checker.tasks.length; i++) {
            tasks.push(checker.tasks[i]._id);
        }
        $http({
            method: 'PUT',
            url: '/api/checker',
            data: {
                _id: checker._id,
                tasks: tasks
            }
        }).then(function (res) {});
    };
    //** Checker **//
    $scope.checkerFunc = {
        content_input_display: false,
        content_input: null,
        name_input_display: [],
        add: function () {
            this.content_input_display = true;
        },
        cancel: function () {
            this.content_input_display = !this.content_input_display;
        },
        save: function () {
            if (!this.content_input) return;
            $http({
                method: 'POST',
                url: '/api/checker',
                data: {
                    name: this.content_input,
                    board: $stateParams.boardId
                }
            }).then(function (res) {
                $scope.checkers.push(res.data.checker);
                $scope.checkerFunc.content_input = null;
                $scope.checkerFunc.content_input_display = false;
            });
        },
        // modify : function(id){
        //     this.name_input_display[id] = true;
        // },
        update: function (checker) {
            $http({
                method: 'PUT',
                url: '/api/checkerName',
                data: checker
            }).then(function (res) {
                $scope.checkerFunc.name_input_display[checker._id] = false;
            });
        },
        updateColor: function (checker, color) {
            $http({
                method: 'PUT',
                url: '/api/checkerColor',
                data: {
                    _id: checker._id,
                    color: color
                }
            }).then(function (res) {
                checker.color = color;
            });
        },
        delete: function (checker, order) {
            if (!checker.owner) return;
            if (checker.owner._id !== $scope.user._id) return;
            $http({
                method: 'POST',
                url: '/api/deleteChecker',
                data: checker
            }).then(function (res) {
                $scope.checkers.splice(order, 1);
            });
        },
        clickToOpen: function (checker) {
            if (!checker.owner) return;
            if (checker.owner._id !== $scope.user._id) return;
            var update = this.update,
                updateColor = this.updateColor,
                users = $scope.users;
            ngDialog.open({
                template: 'checker-template',
                controller: ['$scope', $scope => {
                    $scope.checker = checker;
                    $scope.update = update;
                    $scope.updateColor = updateColor;
                    $scope.users = users;
                    $scope.owner_display = false;
                    $scope.userFilter = function (user) {
                        return user._id !== $scope.checker.owner._id && $scope.checker.partners.findIndex(function (partner) {
                            return partner === user._id;
                        }) < 0;
                    };
                    $scope.partnerFilter = function (user) {
                        return $scope.checker.partners.findIndex(function (partner) {
                            return partner === user._id;
                        }) >= 0;
                    };
                    $scope.openCheckerOwner = function () {
                        if ($scope.owner_display) {
                            $scope.owner_display = false;
                        } else {
                            $scope.owner_display = true;
                        }
                    };
                    $scope.setCheckerOwner = function (checker, user) {
                        if (!checker.partners) checker.partners = [];
                        checker.partners.push(user._id);
                        $http({
                            method: 'POST',
                            url: '/api/setCheckerOwner',
                            data: {
                                _id: checker._id,
                                partners: checker.partners
                            }
                        }).then(function (res) {
                            $scope.owner_display = false;
                        });
                    };
                }]
            });
        }
    };

    //** Task **//
    $scope.taskFunc = {
        content_input_display: [],
        content_input: [],
        name_input_display: [],
        duedate_input_display: [],
        owner_display: [],
        taskAuth: function (checker) {
            var not_partner = checker.partners.findIndex(function (partner) {
                return partner === $scope.user._id;
            }) < 0,
                not_owner = $scope.user._id !== checker.owner._id;
            if (not_partner && not_owner) {
                return false;
            } else {
                return true;
            }
        },
        add: function (checker) {
            if (!this.taskAuth(checker)) return;
            this.content_input_display[checker._id] = true;
            $scope.blink_animation = false;
        },
        cancel: function (id) {
            this.content_input_display[id] = !this.content_input_display[id];
        },
        save: function (checker) {
            if (!this.content_input[checker._id]) return;
            $http({
                method: 'POST',
                url: '/api/task',
                data: {
                    name: this.content_input[checker._id],
                    checker: checker
                }
            }).then(function (res) {
                checker.tasks.push(res.data.task);
                $scope.taskFunc.content_input[checker._id] = null;
                $scope.taskFunc.content_input_display[checker._id] = false;
                $scope.blink_animation = true;
            });
        },
        // modify : function(id){
        //     this.name_input_display[id] = true;
        // },
        update: function (task) {
            $http({
                method: 'PUT',
                url: '/api/task',
                data: task
            }).then(function (res) {
                // $scope.taskFunc.name_input_display[task._id] = false;
                $scope.blink_animation = true;
            });
        },
        updateFinished: function (checker, task) {
            $scope.blink_animation = false;
            this.update(task);
        },
        delete: function (checker, task, order) {
            if (checker.owner._id !== $scope.user._id) return;
            $http({
                method: 'POST',
                url: '/api/deleteTask',
                data: task
            }).then(function (res) {

                checker.tasks.splice(order, 1);
                var tasks = [];
                for (var i = 0; i < checker.tasks.length; i++) {
                    tasks.push(checker.tasks[i]._id);
                }
                $http({
                    method: 'PUT',
                    url: '/api/checker',
                    data: {
                        _id: checker._id,
                        tasks: tasks
                    }
                }).then(function (res) {});
            });
        },
        switchDateSet: function (id) {
            this.duedate_input_display[id] = !this.duedate_input_display[id];
        },
        setDueDate: function (task) {
            if (!task.due_date) {
                $scope.taskFunc.duedate_input_display[task._id] = false;
                return;
            }
            $http({
                method: 'POST',
                url: '/api/setDueDate',
                data: task
            }).then(function (res) {
                if (res.data.success) {
                    alert('截止日期設定成功');
                } else {
                    alert('截止日期設定失敗，請重新檢查日期');
                    task.due_date = '';
                }
                $scope.taskFunc.duedate_input_display[task._id] = false;
            });
        },
        openTaskOwner: function (checker, task) {
            if (!checker.owner) return;
            if (checker.owner._id !== $scope.user._id) return;
            if (this.owner_display[task._id]) {
                this.owner_display[task._id] = !this.owner_display[task._id];
            } else {
                this.owner_display[task._id] = true;
            }
        },
        setTaskOwner: function (checker, task, user) {
            if (!checker.owner) return;
            if (checker.owner._id !== $scope.user._id) return;
            $http({
                method: 'POST',
                url: '/api/setTaskOwner',
                data: {
                    task: task,
                    user: user
                }
            }).then(function (res) {
                task.owner = user;
                $scope.taskFunc.owner_display[task._id] = false;
            });
        },
        clickToOpen: function (checker, task) {
            if (!this.taskAuth(checker)) return;
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
                    $scope.checklist_input_display = [];
                    $scope.modifyMessage = function (id) {
                        this.message_input_display[id] = true;
                    };
                    $scope.updateMessage = function (message) {
                        $http({
                            method: 'PUT',
                            url: '/api/message',
                            data: {
                                message: message
                            }
                        }).then(function (res) {
                            $scope.message_input_display[message._id] = false;
                        });
                    };
                    $scope.enterMessage = function () {
                        $http({
                            method: 'POST',
                            url: '/api/message',
                            data: {
                                task: task._id,
                                message: $scope.enter_message
                            }
                        }).then(function (res) {
                            $scope.task.messages.unshift(res.data.message);
                            $scope.enter_message = '';
                        });
                    };
                    $scope.deleteMessage = function (task, message, order) {
                        $http({
                            method: 'POST',
                            url: '/api/deleteMessage',
                            data: message
                        }).then(function (res) {
                            task.messages.splice(order, 1);
                        });
                    };

                    $scope.modifyChecklist = function (id) {
                        this.checklist_input_display[id] = true;
                    };
                    $scope.updateChecklist = function (checklist) {
                        $http({
                            method: 'PUT',
                            url: '/api/checklist',
                            data: {
                                checklist: checklist
                            }
                        }).then(function (res) {
                            $scope.checklist_input_display[checklist._id] = false;
                        });
                    };
                    $scope.enterChecklist = function () {
                        $http({
                            method: 'POST',
                            url: '/api/checklist',
                            data: {
                                task: task._id,
                                checklist: $scope.enter_checklist
                            }
                        }).then(function (res) {
                            $scope.task.checklists.push(res.data.checklist);
                            $scope.enter_checklist = '';
                        });
                    };
                    $scope.deleteChecklist = function (task, checklist, order) {
                        $http({
                            method: 'POST',
                            url: '/api/deleteChecklist',
                            data: checklist
                        }).then(function (res) {
                            task.checklists.splice(order, 1);
                        });
                    };
                }]
            });
        }
    };
}]);

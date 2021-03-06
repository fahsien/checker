'use strict';

angular.module('checker').controller('boardsController', ['$scope', '$http', 'r_boards', 'r_user', function ($scope, $http, r_boards, r_user) {
    $scope.boards = r_boards;
    //**Get account user**//
    $scope.user = r_user;
    $scope.boardFunc = {
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
                url: '/api/board',
                data: {
                    name: this.content_input
                }
            }).then(function (res) {
                $scope.boards.push(res.data.board);
                $scope.boardFunc.content_input = null;
                $scope.boardFunc.content_input_display = false;
            });
        },
        delete: function (board, order) {
            if ($scope.user.role !== 'admin') {
                alert('需要有管理者權限才能做刪除唷！');
                return;
            }

            $http({
                method: 'POST',
                url: '/api/deleteBoard',
                data: board
            }).then(function (res) {
                $scope.boards.splice(order, 1);
            });
        }
    };

    $scope.find = function (board) {
        if (!board.ban_users) return false;
        var is_ban = board.ban_users.find(function (ban_user) {
            return ban_user === $scope.user._id;
        });
        return is_ban;
    };
}]);

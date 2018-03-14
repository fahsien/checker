'use strict';

angular.module('checker').controller('boardsController', ['$scope', '$http', 'r_boards', function ($scope, $http, r_boards) {
    $scope.boards = r_boards;

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
            $http({
                method: 'POST',
                url: '/api/deleteBoard',
                data: board
            }).then(function (res) {
                $scope.boards.splice(order, 1);
            });
        }
    };
}]);

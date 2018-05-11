'use strict';

angular.module('index', ['ui.router', 'ngDialog', 'dndLists']);
angular.module('checker', []);
angular.module('index').requires.push('checker');

angular.module('index').config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$urlMatcherFactoryProvider.strictMode(false);
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$stateProvider.state('boards', {
		url: '/',
		controller: 'boardsController',
		resolve: {
			r_boards: function ($http) {
				return $http({ method: 'GET', url: '/api/boards' }).then(function (res) {
					var boards = res.data.boards;
					return boards;
				});
			},
			r_user: function ($http) {
				return $http({ method: 'GET', url: '/api/me' }).then(function (res) {
					return res.data.user;
				});
			}
		},
		templateUrl: 'modules/views/boards.html'
	}).state('checkers', {
		url: '/:boardId',
		controller: 'indexController',
		resolve: {
			r_checkers: function ($stateParams, $http) {
				return $http({
					method: 'GET',
					url: '/api/checkers',
					params: {
						board: $stateParams.boardId
					}
				}).then(function (res) {
					var checkers = res.data.checkers;
					for (var i = 0; i < checkers.length; i++) {
						for (var j = 0; j < checkers[i].tasks.length; j++) {
							if (checkers[i].tasks[j].due_date) {
								checkers[i].tasks[j].due_date = new Date(checkers[i].tasks[j].due_date);
							}
						}
					}
					return checkers;
				});
			}
		},
		templateUrl: 'modules/views/checkers.html'
	});
}]);

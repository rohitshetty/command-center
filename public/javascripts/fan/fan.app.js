'use strict';

(function () {
	angular.module('fan.app',['ui.materialize']);
})();

angular
	.module('fan.app')
	.controller('fanController', ['$scope','$http',function ($scope, $http) {
		$scope.state = {
			current: 'off',
			next: 'on',
			sending: false
		};

		$scope.alarm = {
			selectables: ['on','off'],
			message: 'Schedule Fan Control'
		};

		$scope.scheduleFan = function () {
			console.log($scope.alarm);
			$http
				.post('/fan', {
					scheduler: true,
					time: $scope.alarm.time,
					status: $scope.alarm.status
				})
				.then(function (res) {
					console.log(res.data)
					$scope.alarm.message = res.data.message;
				});
		}

		$scope.statusToggle = function () {
			$scope.sending = true;
			$http
				.post('/fan', {
					status: $scope.state.next
				})
				.then(function (res) {
					$scope.state.sending = false;
					var local = $scope.state.current;
					$scope.state.current = $scope.state.next;
					$scope.state.next = local;
				});

		}

	}]);

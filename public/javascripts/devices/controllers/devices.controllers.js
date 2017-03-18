'use strict';

(function () {
	angular.module('devices.controllers',[
		'ngMaterial',
		'mdPickers',
		'ngAnimate',
		'ngAria',
    		'ngMessages',
    		'mdPickers'
	]);
})();

angular
	.module('devices.controllers')
	.controller('dashboardController', ['$scope','$http', '$mdSidenav',function ($scope, $http, $mdSidenav) {

		$scope.deviceList = ['Fan', 'Light'];

		$scope.selectedDevice = $scope.deviceList[0];


		$scope.deviceSelected = function (device) {
			$scope.selectedDevice = device;
		}

		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		}


	}])
	.controller('deviceController', ['$scope','$http', '$mdToast', '$mdpTimePicker',function ($scope, $http, $mdToast, $mdpTimePicker) {

		$scope.scheduledTime = new Date();
		//$scope.device is directive scope variable
		$scope.scheduledState = 'off';
		$scope.scheduleDevice = function () {
			var url = '/devices/' + $scope.device;
			var time = $scope.scheduledTime.getHours() + ":" + $scope.scheduledTime.getMinutes();

			$http
				.post(url, {
					scheduler: true,
					time: time,
					status: $scope.scheduledState
				})
				.then(function (res) {
					$mdToast.showSimple($scope.device + ' Scheduled  ' + $scope.scheduledState + ' for ' + $scope.scheduledTime.toLocaleTimeString());
				});
		}

		$scope.statusToggle = function () {
			var url = '/devices/'+$scope.device;
			$http
				.post(url, {
					status: $scope.state
				})
				.then(function (res) {
					$mdToast.showSimple($scope.device + ' turned ' + $scope.state);
				});
		}
	}]);

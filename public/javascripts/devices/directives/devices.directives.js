'use strict';

(function () {
	angular.module('devices.directives',[]);
})();


angular
	.module('devices.directives',[])
	.directive('deviceDashboard', function () {
	return {
		templateUrl: '/javascripts/devices/views/device-directive.html',
		controller:	'deviceController',
		scope: {
			device: '@'
		}
	};
});

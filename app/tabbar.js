(function() {

	var app = angular.module('myApp');
	app.controller('TabbarController', ['$scope', '$rootScope', 'Data',
		function($scope, $rootScope, Data) {

			$scope.active = {};
			$scope.active.tab1 = true;
			$scope.active.tab2 = false;

			$rootScope.$broadcast('hide:toolbar');
		}
	]);
})();
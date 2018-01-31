angular.module('main', ['ngMaterial'])

.controller('AppCtrl', function($scope, $mdToast) {
	$scope.keys = [true, true];
	$scope.fscreen = true;
	

  chrome.storage.sync.get(["hotkeysType", "fscreen"], function(items) {
		console.log(items);
		if (!chrome.runtime.error)
			if(items.hasOwnProperty("hotkeysType"))
				$scope.keys = items.hotkeysType;
			if(items.hasOwnProperty("fscreen"))
				$scope.fscreen = items.fscreen;
		
			$scope.$apply();
		$scope.$watch('[keys,fscreen]', function () {
			chrome.storage.sync.set({ "hotkeysType" : $scope.keys, "fscreen": $scope.fscreen }, function(){
				chrome.runtime.sendMessage({ "hotkeysType" : $scope.keys, "fscreen": true }, function(response) {
				  $mdToast.show($mdToast.simple().textContent('Updated!'));
				});
			});
		}, true);

	});
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
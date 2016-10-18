angular.module('repositoriesList',[])
.directive('repositoriesList', ['Repositories', function(Repositories){
	return {
		restrict: 'E',
		replace:true,
		templateUrl:'/js/directives/repositories-list.html',
		controller:['$scope',function($scope){
			
				
			
		}]
	};
}]);





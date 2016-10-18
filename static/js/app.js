app = angular.module('RepoGithubList', ['repositoriesList','ngMaterial'] );

app.controller('AppController',['$scope','Repositories',function($scope, Repositories){
	$scope.repositories = [];

	$scope.submit = function(){
		$scope.username = $scope.inputUser;

		Repositories.get($scope.username).success(function(response){
				if(response.length === 0){
					$scope.messageFeedback = 'Github user has no repos';
					$scope.repositories = [];
				} else{
					$scope.repositories = response;
					$scope.messageFeedback = '';
				}
				

		}).error(function(error, code){
			if(code === 404){
				$scope.messageFeedback = 'The Github user does not exist';
				$scope.repositories = [];
			} else if(code >= 500 && code <= 599 ) {
				$scope.messageFeedback = 'The Github API does not respond';
				$scope.repositories = [];
			}
		});


	}
	
}]);
		






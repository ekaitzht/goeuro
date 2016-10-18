angular.module('RepoGithubList')
.factory('Repositories',['$http', function($http){
	this.get = function(username){
	    return $http.get('https://api.github.com/users/'+username+'/repos');
	};

	return this;

}]);








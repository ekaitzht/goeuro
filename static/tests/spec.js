describe('Testing Github App', function() {

            beforeEach(module('RepoGithubList'));

            var $httpBackend;
			var $controller;
			var $scope;
			var $rootScope;

			beforeEach(inject(function ($injector) {
		 		$rootScope = $injector.get('$rootScope');
				$controller = $injector.get('$controller');
				$scope = $rootScope.$new();
				$httpBackend = $injector.get('$httpBackend');


			}));

			afterEach(function() {
            	$httpBackend.verifyNoOutstandingExpectation();
            	$httpBackend.verifyNoOutstandingRequest();
        	});  

            it('receives repositories with a correct username', function() {
            		//Arrange

            		$httpBackend.expectGET('https://api.github.com/users/goeuro/repos').respond(200,['user1','user2']);
            		AppController = $controller('AppController', {
						$scope: $scope
					});
            		$scope.inputUser = 'goeuro'

            		//Act
            		$scope.submit();
					$httpBackend.flush();
            		//Assert
    				expect($scope.repositories.length).toBeGreaterThan(1); 
            });

            it('receives username without repositories', function() {
            		//Arrange

            		$httpBackend.expectGET('https://api.github.com/users/asdfasdfasdfasdfasdf/repos').respond(200,[]);
            		AppController = $controller('AppController', {
						$scope: $scope
					});
            		$scope.inputUser = 'asdfasdfasdfasdfasdf'

            		//Act
            		$scope.submit();
					$httpBackend.flush();
            		//Assert
    				expect($scope.messageFeedback).toBe('Github user has no repos'); 
            });


            it('receives a username that does not exist', function() {
            		//Arrange

            		$httpBackend.expectGET('https://api.github.com/users/goeurousernotexist/repos').respond(404);
            		AppController = $controller('AppController', {
						$scope: $scope
					});
            		$scope.inputUser = 'goeurousernotexist'

            		//Act
            		$scope.submit();
					$httpBackend.flush();
            		//Assert
    				expect($scope.messageFeedback).toBe('The Github user does not exist'); 
            });


            it('is not responding GITHUB server', function() {
            		//Arrange

            		$httpBackend.expectGET('https://api.github.com/users/goeuro/repos').respond(500);
            		AppController = $controller('AppController', {
						$scope: $scope
					});
            		$scope.inputUser = 'goeuro'

            		//Act
            		$scope.submit();
					$httpBackend.flush();
            		//Assert
    				expect($scope.messageFeedback).toBe('The Github API does not respond'); 
            });
});
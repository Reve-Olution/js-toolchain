    var demoGruntApp = angular.module('demoGruntApp', ['ngRoute']);

    // configure our routes
    demoGruntApp.config(["$routeProvider", function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {            	
                templateUrl : 'views/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'views/contact.html',
                controller  : 'contactController'
            })

			.otherwise({
        		redirectTo: '/home'
      		});
    }]);

    // create the controller and inject Angular's $scope
    demoGruntApp.controller('mainController', ["$scope", function($scope) {
        // create a message to display in our view
        $scope.message = 'Bienvenue sur notre site !!';
    }]);

    demoGruntApp.controller('aboutController', ["$scope", function($scope) {
        $scope.message = 'A propos de nous !';
    }]);

    demoGruntApp.controller('contactController', ["$scope", function($scope) {
        $scope.message = 'Envoyez nous un petit message ! :)';
    }]);
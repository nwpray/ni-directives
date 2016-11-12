angular.module('app')
.config
(
    function($routeProvider, $locationProvider)
    {
        $routeProvider
        .when
        (
            '/',
            {
                templateUrl : '/app/pages/home/home.html',
                controller : 'HomeController',
                controllerAs : 'Home'
            }
        )
        .otherwise({redirectTo : '/'});

        //Removes # from url. To be able to enter urls without # you must also use .htaccess file.
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
);
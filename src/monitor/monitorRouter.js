angular.module('cimonmon').config(function ($stateProvider) {
    $stateProvider
        .state('monitor', {
            url: '/monitor',
            templateUrl: '/src/monitor/monitor.html'
        })
});
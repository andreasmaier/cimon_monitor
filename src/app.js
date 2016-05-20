angular.module('cimonmon', [
        'ngWebSocket',
        'ui.router'
    ])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/monitor');
    })
    .run(function ($log) {
        $log.debug('app started');
    });
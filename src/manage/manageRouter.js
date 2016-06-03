angular.module('cimonmon').config(function ($stateProvider) {
    $stateProvider
        .state('manage', {
            url: '/manage',
            templateUrl: '/src/manage/manage.html'
        });
});

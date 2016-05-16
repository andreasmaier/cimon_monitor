angular.module('cimonmon').controller('MonitorPageCtrl', function ($scope, $rootScope, $log) {
    $scope.testString1 = "my first job";
    $scope.testString2 = "the other job";
    $scope.testString3 = "job with a long description that goes on and on";
    $scope.testString4 = "yet another job";
    $scope.monitorData = [];

    $rootScope.$on('jobStatusUpdate', function (event, args) {
        $log.debug('received event:', event, args);
    });
});
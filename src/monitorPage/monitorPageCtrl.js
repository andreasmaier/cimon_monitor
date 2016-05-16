angular.module('cimonmon').controller('MonitorPageCtrl', function ($scope, $rootScope, $log) {
    $scope.testString = "foo";
    $scope.monitorData = [];

    $rootScope.$on('jobStatusUpdate', function (event, args) {
        $log.debug('received event:', event, args);
    });
});
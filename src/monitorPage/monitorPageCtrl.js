angular.module('cimonmon').controller('MonitorPageCtrl', function ($scope, $rootScope, $log, WebsocketService) {
    $scope.monitorData = [];
    $scope.monitorData.push(buildJob("My first job", "FirstJob"));
    $scope.monitorData.push(buildJob("the other job", "SecondJob"));
    $scope.monitorData.push(buildJob("job with a long description that goes on and on", "ThirdJob"));
    $scope.monitorData.push(buildJob("yet another job", "FourthJob"));

    $rootScope.$on('jobStatusUpdate', function (event, args) {
        var jobStatus = JSON.parse(args);

        $log.debug('received event:', event, jobStatus);

        var job = $scope.monitorData
            .find(function (element) {
                return element.key === jobStatus.name;
            });

        if (job) {
            switch (jobStatus.build.phase) {
                case 'STARTED':
                    job.name = "STARTED";
                    break;
                case 'COMPLETED':
                    job.name = "COMPLETED";
                    job.status = jobStatus.build.status.toLowerCase();
                    break;
                case 'FINALIZED':
                    job.name = "FINALIZED";
                    break;

                default:
                    break;
            }
        }
    });

    function buildJob(name, key) {
        return {
            name: name,
            key: key,
            isRunning: false,
            status: 'unknown'
        };
    }
});
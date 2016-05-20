angular.module('cimonmon').controller('MonitorPageCtrl', function ($scope, $rootScope, $log, $state, WebsocketService) {
    $scope.monitorData = [];
    $scope.monitorData.push(buildJob("My first job", "FirstJob"));
    $scope.monitorData.push(buildJob("the failing job", "FailingJob"));
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
                    job.runStatus = 'running';
                    break;
                case 'COMPLETED':
                    job.buildStatus = jobStatus.build.status.toLowerCase();
                    job.runStatus = 'idle';
                    break;
                case 'FINALIZED':
                    break;

                default:
                    break;
            }
        }
    });

    $scope.onManageClicked = function () {
        // $state.go('manage');
    };

    function buildJob(name, key) {
        return {
            name: name,
            key: key,
            runStatus: 'idle',
            buildStatus: 'unknown'
        };
    }
});
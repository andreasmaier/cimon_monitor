angular.module('cimonmon').controller('MonitorPageCtrl', function ($scope, $rootScope, $log, $state, WebsocketService, JobsService) {
    $scope.monitorData = [];

    JobsService.index()
        .then(function (jobs) {
            $log.info('watched jobs:', jobs);

            jobs.data.forEach(function (job) {
                console.log('job', job);

                $scope.monitorData.push(buildJob(job.path, job.path));
            });
        })
        .catch(function (error) {
            $log.error('Error fetching jobs:', error);
        });

    $rootScope.$on('jobStatusUpdate', function (event, args) {
        var jobStatus = JSON.parse(args);

        $log.debug('received event:', event, jobStatus);

        var job = $scope.monitorData
            .find(function (element) {
                return element.key === jobStatus.url;
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
        $state.go('manage');
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
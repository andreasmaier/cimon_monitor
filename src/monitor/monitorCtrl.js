angular.module('cimonmon').controller('MonitorPageCtrl', function ($scope, $rootScope, $log, $state, WebsocketService, JobsService) {
    $scope.monitorData = [];

    JobsService.index()
        .then(function (jobs) {
            $log.info('watched jobs:', jobs);

            if(Array.isArray(jobs.data.jobs)) {
                jobs.data.jobs.forEach(function (job) {
                    $scope.monitorData.push(buildJob(job.path, job.status, job.alias));
                });
            }
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

    $scope.getDisplayName = function (job) {
        return !job.alias || job.alias == '' ? job.key : job.alias;
    };

    function buildJob(key, status, alias) {
        return {
            name: name,
            key: key,
            alias: alias,
            runStatus: 'idle',
            buildStatus: status ? status.toLowerCase() : 'unknown'
        };
    }
});
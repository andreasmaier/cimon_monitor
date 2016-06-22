angular.module('cimonmon').controller('ManageCtrl', function ($scope, $state, $log, JobsService) {
    $scope.job = {};
    $scope.watchedJobs = [];
    
    $scope.watchJob = function (newJob) {
        $log.debug('watch job requested', newJob);

        JobsService.save(newJob)
            .then(function (data) {
                $log.debug('Successfully stored job!', data);

                getAllJobs();
            })
            .catch(function (error) {
                $log.error('Unable to store job [', newJob ,']. Error:', error);
            });
    };

    $scope.onBackClicked = function () {
        $state.go('monitor');
    };

    function getAllJobs() {
        JobsService.index()
            .then(function (response) {
                $log.debug('Already watched jobs:', response.data.jobs);

                $scope.watchedJobs = response.data.jobs || [];
            })
            .catch(function (error) {
                $log.error('Error getting list of watched jobs. Error:', error);
            });
    }

    getAllJobs();
});
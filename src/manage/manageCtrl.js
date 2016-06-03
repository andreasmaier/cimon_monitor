angular.module('cimonmon').controller('ManageCtrl', function ($scope, $log, JobsService) {
    $scope.job = {};
    
    $scope.watchJob = function (newJob) {
        $log.debug('watch job requested', newJob);

        JobsService.save(newJob)
            .then(function (data) {
                $log.debug('Successfully stored job!', data);
            })
            .catch(function (error) {
                $log.error('Unable to store job [', newJob ,']. Error:', error);
            });
    }
});
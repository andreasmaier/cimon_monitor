angular.module('cimonmon').factory('JobsService', function ($http, $log) {
    return {
        save: function (job) {
            $log.info('Sending', job);

            return $http({
                method: 'POST',
                url: 'http://localhost:3000/manage/jobs'
                ,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    // server: job.server,
                    path: job.path
                }
            });
        },

        index: function () {
            $log.info('Gettings watched jobs');

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/manage/jobs'
            });
        }
    }
});

// Example jenkins job update payload:
//
// var a = {
//     "name": "FirstJob",
//     "url": "job/FirstJob/",
//     "build": {
//         "number": 5,
//         "queue_id": 5,
//         "phase": "STARTED",
//         "url": "job/FirstJob/5/",
//         "scm": {},
//         "log": "",
//         "artifacts": {}
//     }
// }
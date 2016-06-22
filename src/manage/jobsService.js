angular.module('cimonmon').factory('JobsService', function ($http, $log) {
    return {
        save: function (job) {
            $log.info('Storing watched job :', job);

            return $http({
                method: 'POST',
                url: 'https://localhost:10000/v1/jobs'
                ,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    // server: job.server,
                    path: job.path,
                    alias: job.alias
                }
            });
        },

        index: function () {
            $log.info('Getting all watched jobs');

            return $http({
                method: 'GET',
                url: 'https://localhost:10000/v1/jobs'
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
angular.module('cimonmon', [
    'ngWebSocket'
]).run(function ($log) {
    $log.debug('app started');
});
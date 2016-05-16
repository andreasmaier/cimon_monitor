angular.module('cimonmon').factory('WebsocketService', function($websocket, $rootScope, $log) {
    var dataStream = $websocket('ws://localhost:3000/ws');

    dataStream.onMessage(function(message) {
        $rootScope.$broadcast('jobStatusUpdate', message.data);
    });

    dataStream.onError(function (error) {
        $log.error('Error connecting: ', error);
    });

    return {
    };
});
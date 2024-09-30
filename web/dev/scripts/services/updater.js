angular.module('rocketstudiowebApp')
    .factory('Updater', function ($http) {
        return {
            get: function (next, error) {
                $http({
                    method: 'GET',
                    url: url_server + 'updates',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data.data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            updateAll: function(next, error){
                $http({
                    method: 'POST',
                    url: url_server + 'updates/all',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data.data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            }
        }
    });
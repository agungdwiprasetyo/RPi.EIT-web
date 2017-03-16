app.controller('RealtimeCtrl', ['$scope', '$rootScope', 'socket', '$interval', function($scope, $rootScope, socket, $interval) {
    $interval(function(){},10);
    $scope.loading = false;
    if ($rootScope.piOnline) {
        $scope.alerts = [{type: 'success', msg: 'Perangkat EIT sedang Online, klik tombol dibawah ini untuk mulai mendapatkan citra dari objek'}];
        $scope.iconClass = "icon icon-control-play";
    }else{
        $scope.alerts = [{type: 'danger', msg: 'Perangkat EIT sedang Offline, hidupkan alat untuk memulai rekonstruksi citra.'}];
        $scope.iconClass = "icon icon-bulb";
    }

    socket.on('raspiStatus', function(data){
        if(data['online']){
            $scope.alerts = [{type: 'success', msg: 'Perangkat EIT sedang Online, klik tombol dibawah ini untuk mulai mendapatkan citra dari objek'}];
            $scope.iconClass = "icon icon-control-play";
        }else{
            $scope.alerts = [{type: 'danger', msg: 'Perangkat EIT sedang Offline, hidupkan alat untuk memulai rekonstruksi citra.'}];
            $scope.iconClass = "icon icon-bulb";
        }
    });

    socket.on('statusBar', function(data) {
        $scope.loading = false;
    });

    $scope.run = function(){
        if($rootScope.piOnline){
            $scope.loading = true;
            socket.emit('runReconstruction', {
                status: true,
                kerapatan: parseFloat(0.05),
                arus: parseFloat(7.5),
                data: "4",
                algor: 'BP'
            });
        }
    };
}]);

app.controller('RealtimeCtrl', ['$scope', '$rootScope', 'socket', '$interval', '$localStorage', '$http',
function($scope, $rootScope, socket, $interval, $localStorage, $http) {
    $interval(function(){},10);
    $scope.loadImage = false;
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

    $scope.run = function(){
        socket.emit('cobago', {message: "hellogo"});
        if($rootScope.piOnline){
            $scope.loadImage = true;
            socket.emit('startGetData', {
                status: true
            });
        }
    };
    $scope.delete = function() {
        var konfirm = confirm("Apakah anda yakin ingin menghapus citra?");
        if(konfirm){
            $http({
                method  : 'DELETE',
                url     : '/image',
                data    : $.param({'filename': $scope.imageName}),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data){
                console.log('sukses delete');
                $scope.loadImage = false;
                $scope.showImage = false;
            }).error(function(e){
                alert(':(');
            });
        }else{
            return false;
        }
    };

    socket.on('viewResultVoltage', function(data) {
        $scope.viewData = data;
        socket.emit('runReconstruction', {
            status: true,
            tipe: "fromraspi",
            kerapatan: parseFloat($localStorage.eitSettings.kerapatan),
            arus: parseFloat($localStorage.eitSettings.arus),
            iddata: 2,
            data: data,
            algor: $localStorage.eitSettings.algor,
            colorbar: $localStorage.eitSettings.colorbar
        });
    });
    socket.on('notifFinish', function(data) {
        $scope.loadImage = false;
        $scope.showImage = true;
        $scope.waktu = data['waktu'];
        $scope.imageName = data['filename'];
        $scope.judul5 = "Hasil";
    });

    $scope.eitSettings = $localStorage.eitSettings;
    if($scope.eitSettings.colorbar) $scope.colorbar="Yes";
    else $scope.colorbar="No";
}]);

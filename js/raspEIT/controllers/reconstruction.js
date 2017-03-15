app.controller('ReconstructionCtrl', ['$scope', 'socket', '$interval', '$rootScope', '$http', function($scope, socket, $interval, $rootScope, $http) {
    // GET data from API
    $scope.dataUkur = {};
    $http.get('http://localhost:3456/data')
        .success(function(data){
            $scope.dataUkur = data;
        })
        .error(function(err){
            alert('error');
        });
    $scope.dataAlgor = {};
    $http.get('http://localhost:3456/algor')
        .success(function(data){
            $scope.dataAlgor = data;
        })
        .error(function(err){
            alert('error');
        });

    $interval(function(){},10); // handle asynchronously
    $scope.disableBtn = !$rootScope.piOnline;
    if ($rootScope.piOnline) {
        $scope.alerts = [{type: 'success', msg: 'Perangkat EIT sedang Online'}];
    }else{
        $scope.alerts = [{type: 'danger', msg: 'Perangkat EIT sedang Offline, hidupkan alat untuk memulai rekonstruksi citra.'}];
    }

    socket.on('raspiStatus', function(data){
        $scope.raspionline = data['online'];
        if(data['online']){
            $scope.disableBtn = false;
            $scope.alerts = [{type: 'success', msg: 'Perangkat EIT sedang Online'}];
        }else{
            $scope.disableBtn = true;
            $scope.state = false;
            $scope.alerts = [{type: 'danger', msg: 'Perangkat EIT sedang Offline, hidupkan alat untuk memulai rekonstruksi citra.'}];
        }
        console.log($scope.raspionline);
    });

	$scope.reconstruction = function(){
        $scope.state = true;
        $scope.disableBtn = true;
		socket.emit('runReconstruction', {
            status: true,
            kerapatan: parseFloat($scope.valKerapatan),
            arus: parseFloat($scope.valArus),
            data: $scope.valData,
            algor: $scope.valAlgor
        });
	};

    socket.on('statusBar', function(data) {
        $scope.state = false;
        $scope.disableBtn = false;
        $scope.waktu = data['waktu'];
    });
}]);

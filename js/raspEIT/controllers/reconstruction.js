app.controller('ReconstructionCtrl', ['$scope', 'socket', '$interval', '$rootScope', function($scope, socket, $interval, $rootScope) {
    $scope.dynamic = 100;
    $interval(function(){},10); // handle asynchronously
    $scope.disableBtn = !$rootScope.piOnline;

    socket.on('raspiStatus', function(data){
        $scope.raspionline = data['online'];
        if(data['online']){
            $scope.disableBtn = false;
        }else{
            $scope.disableBtn = true;
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

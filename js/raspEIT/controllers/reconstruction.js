app.controller('ReconstructionCtrl', ['$scope', 'socket', '$interval', '$rootScope', '$http', '$timeout',
    function($scope, socket, $interval, $rootScope, $http, $timeout) {
    // GET data from API
    $scope.dataUkur = [];
    $scope.dataAlgor = [];
    $http.get('http://localhost:1993/data')
        .success(function(data){
            $scope.dataUkur = data;
        })
        .error(function(err){
            alert('error');
        });
    $http.get('http://localhost:1993/algor')
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
            $scope.loadImage = false;
            $scope.alerts = [{type: 'danger', msg: 'Perangkat EIT sedang Offline, hidupkan alat untuk memulai rekonstruksi citra.'}];
        }
        console.log($scope.raspionline);
    });

	$scope.reconstruction = function(){
        $scope.alerts = [{type: 'info', msg: 'Sedang merekonstruksi citra. (Data: '+$scope.valData.selectedData.nama_data+', Algoritma: '+$scope.valAlgor.selectedAlgor.nama_algor+')...'}];
        $scope.loadImage = true;
        $scope.judul5 = "Processing....";
		socket.emit('runReconstruction', {
            status: true,
            kerapatan: parseFloat($scope.valKerapatan),
            arus: parseFloat($scope.valData.selectedData.arus_injeksi),
            iddata: $scope.valData.selectedData.id_data,
            data: $scope.valData.selectedData.filename,
            algor: $scope.valAlgor.selectedAlgor.id_algor,
            colorbar: $scope.colorbar
        });
	};
    // $scope.showImage = true;
    // $scope.imageName = "20170314-192840-BP.png";
    socket.on('notifFinish', function(data) {
        $scope.alerts = [{type: 'success', msg: 'Perangkat EIT sedang Online'}];
        $scope.loadImage = false;
        $scope.showImage = true;
        $scope.waktu = data['waktu'];
        $scope.imageName = data['filename'];
        $scope.judul5 = "Hasil";
    });

    $scope.valKerapatan = 0.1;
    $scope.kerapatanOp = {
        min: 0.01,
        max: 0.3,
        step: 0.01,
        value: $scope.valKerapatan
    };
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.valKerapatan = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    $scope.valAlgor = {};
    $scope.valAlgor.selectedAlgor = [];
    $scope.valData = {};
    $scope.valData.selectedData = [];

    $scope.closeImage = function() {
        $scope.loadImage = false;
        $scope.showImage = false;
        $scope.judul5 = "Rekonstruksi Citra";
    }

    $scope.deleteImage = function() {
        $http({
            method  : 'DELETE',
            url     : 'http://localhost:1993/image',
            data    : $.param({'filename': $scope.imageName}),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data){
            console.log('sukses delete');
        }).error(function(e){
            alert(':(');
        });
        $scope.closeImage();
    }
}]);

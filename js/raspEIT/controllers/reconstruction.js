app.controller('ReconstructionCtrl', ['$scope', 'socket', '$interval', '$rootScope', '$http', '$timeout', '$localStorage', 'toaster',
    function($scope, socket, $interval, $rootScope, $http, $timeout, $localStorage, toaster) {
    // GET data ukur and algor from API
    $http({
        method  : 'GET',
        url     : '/data'
    }).success(function(data){
        $scope.dataUkur = data;
    }).error(function(e){
        alert(':(');
    });
    $http({
        method  : 'GET',
        url     : '/algor'
    }).success(function(data){
        $scope.dataAlgor = data;
    }).error(function(e){
        alert(':(');
    });

    $interval(function(){},10); // handle asynchronously
    $scope.disableBtn = true;
    $scope.loadImage = false;
    $scope.showImage = false;

    socket.on('notifFinish', function(data) {
        $scope.loadImage = false;
        $scope.showImage = true;
        $scope.waktu = data['waktu'];
        $scope.imageName = data['filename'];
        $scope.judul5 = "Hasil";
    });

    // form kerapatan
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

    // select form data and algor
    $scope.valAlgor = {};
    $scope.valAlgor.selectedAlgor = [];
    $scope.valData = {};
    $scope.valData.selectedData = [];

    $scope.cekData = function(){
        if($scope.valData.selectedData.id_data){
            $scope.disableBtn = false;
        }
    };
	$scope.reconstruction = function(namadata){
        $scope.alerts = [{type: 'info', msg: 'Sedang merekonstruksi citra. (Data: '+$scope.valData.selectedData.nama_data+', Algoritma: '+$scope.valAlgor.selectedAlgor.nama_algor+')...'}];
        $scope.loadImage = true;
        $scope.judul5 = "Processing....";
		socket.emit('runReconstruction', {
            status: true,
            tipe: 'fromdata',
            kerapatan: parseFloat($localStorage.eitSettings.kerapatan),
            arus: parseFloat($scope.valData.selectedData.arus_injeksi),
            iddata: $scope.valData.selectedData.id_data,
            data: namadata,
            algor: $localStorage.eitSettings.algor,
            colorbar: $localStorage.eitSettings.colorbar
        });
	};
    $scope.closeImage = function() {
        $scope.loadImage = false;
        $scope.showImage = false;
        $scope.judul5 = "Rekonstruksi Citra";
    };
    $scope.deleteImage = function() {
        $scope.alerts = [{type: 'success', msg: 'Perangkat EIT sedang Online'}];
        var konfirm = confirm("Apakah anda yakin ingin menghapus citra?");
        if(konfirm){
            $http({
                method  : 'DELETE',
                url     : '/image',
                data    : $.param({'filename': $scope.imageName}),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data){
                console.log('sukses delete');
            }).error(function(e){
                alert(':(');
            });
        }else{
            return false;
        }
        $scope.closeImage();
    };
    $scope.changeSetting = function(){
        $scope.settingSession = true;
    };
    $scope.saveSetting = function(){
        $scope.settingSession = false;
        toaster.pop("success", "Setting saved");
    };
    $scope.eitSettings = $localStorage.eitSettings;
    if($scope.eitSettings.colorbar) $scope.colorbar="Yes";
    else $scope.colorbar="No";
}]);

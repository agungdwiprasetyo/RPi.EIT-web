app.controller('DataCtrl', ['$scope', '$rootScope', '$http', 'toaster', '$interval', '$state', function($scope, $rootScope, $http, toaster, $interval, $state){
    $interval(function(){}, 10);
    $scope.judul4 = "Data Hasil Pengukuran Tegangan";

    $http.get($rootScope.host+'/data')
        .success(function(data){
            $scope.dataTegangan = data;
        })
        .error(function(e) {
            console.log("error");
        });

    $scope.mainData = true;

    $scope.cobaPrint = "detailhomedata";

    $scope.saveData = function(){
        var file = angular.element(document.querySelector('#file')).prop("files")[0];
        var namefile = $scope.valNama.replace(/\s/g, '')+".txt";
        $scope.files = [];
        $scope.files.push(file);
        console.log($scope.files);
        $http({
            method: 'POST',
            url: '/upload',
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append('nama_data', $scope.valNama);
                formData.append('filename', namefile);
                formData.append('arus_injeksi', $scope.valArus);
                formData.append('file', data.files[0]);
                return formData;
            },
            data: {
                    nama_data: $scope.valNama,
                    filename: 'cobaupload',
                    arus_injeksi: $scope.valArus,
                    files: $scope.files
                }

        }).success(function (res) {
            console.log(res);
            $interval(function(){}, 1000);
            $state.go('app.data.id', {idData: namefile.slice(0, -4)});
            toaster.pop("success", "Sukses", "Sukses upload data.");
        });
    };

    $scope.tos = function(){
        console.log("toss");
        toaster.pop("success", "Sukses", "Sukses upload data.");
    }
}]);


app.controller('DetailDataCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$interval', function($scope, $stateParams, $http, $rootScope, $interval){
    $interval(function(){}, 10);

    $http({
        method  : 'GET',
        url     : '/data',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'iddata': $stateParams.idData+'.txt' }
    }).success(function(data){
        $scope.infoData = data;
    }).error(function(e){
        alert(':(');
    });

    $scope.lbel = $stateParams.idData;
    var xData = [];
    $http.get('./data/'+$stateParams.idData+'.txt')
        .success(function(data){
            $scope.showData = data;
            var temp = new Array();
            temp = data.split("\n");
            for(var i = 0; i < temp.length; i++) {
                xData.push([i,parseFloat(temp[i])]);
            }
            $scope.XData = xData;
        })
        .error(function(e) {
            console.log("error");
        });
}]);

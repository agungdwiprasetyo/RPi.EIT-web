app.controller('DataCtrl', ['$scope', '$rootScope', '$http', 'toaster', '$interval', '$state', 'tglId',
function($scope, $rootScope, $http, toaster, $interval, $state, tglId){
    $interval(function(){}, 10);
    $scope.judul4 = "Data Hasil Pengukuran Tegangan";
    $scope.alerts = [{type: 'info', msg: 'Upload data tegangan hanya dalam file berekstensi .txt dan jumlah data dalam file sebanyak 208 data tegangan.'}];

    $http.get('/data')
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
            url: '/uploaddata',
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
        $scope.$emit("callReconstruction", {haha: 'wkwk'});
    };
}]);

 // ------------------------------------------------------------------------------------------------------------------------

app.controller('DetailDataCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$interval', function($scope, $stateParams, $http, $rootScope, $interval){
    $interval(function(){}, 10);

    $http({
        method  : 'GET',
        url     : '/data',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'iddata': $stateParams.idData+'.txt' }
    }).success(function(data){
        $scope.infoData = {
            namaData: data[0].nama_data,
            arus: data[0].arus_injeksi,
            filename: data[0].filename,
            model: data[0].model,
            citra: data[0].citra,
            datetime: data[0].datetime
        }
    }).error(function(e){
        alert(':(');
    });

    var xData = [];
    var tableData = [];
    var temp = new Array();
    $http.get('./dataObjek/'+$stateParams.idData+'.txt')
        .success(function(data){
            var elektroda=0, aPos, aNeg, vPos, vNeg;
            temp = data.split("\n");
            var dataLength = temp.length;
            for(var i = 0; i < dataLength; i++) {
                xData.push([i,parseFloat(temp[i])]);

                if(i%13==0){
                    aNeg = parseInt(i/13);
                    aPos = aNeg+1;
                    vPos = 0;
                    vNeg = vPos+1;
                    if(aPos==16) aPos=0;
                    if((aNeg==vPos) && (aPos==vNeg)){
                        vPos=2;
                        vNeg=3;
                    }else if((aNeg==vNeg) || (vPos==aPos)) {
                        vPos=aPos+1;
                        vNeg=vPos+1;
                    }
                    tableData.push({elecArus:(aNeg)+"-"+(aPos), elecTegangan:(vPos)+"-"+(vNeg),voltage:parseFloat(temp[i])});
                }else{
                    vPos++;
                    vNeg=vPos+1;
                    if((vNeg==aNeg)) {
                        vPos=aPos+1;
                        vNeg=vPos+1;
                    }
                    if(vNeg==16) vNeg=0;
                    tableData.push({elecTegangan:(vPos)+"-"+(vNeg),voltage:parseFloat(temp[i])});
                }
            }

            $scope.XData = xData;
            $scope.TableData = tableData;
        })
        .error(function(e) {
            console.log("error");
        });

    $scope.saveData = function(){
        var file = angular.element(document.querySelector('#file')).prop("files")[0];
        var namefile = $scope.valNama.replace(/\s/g, '')+".txt";
        $scope.files = [];
        $scope.files.push(file);
        console.log($scope.files);
        $http({
            method: 'POST',
            url: '/uploaddata',
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

    $scope.sweet = {};
    $scope.sweet.option = {
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "success",
        // closeOnConfirm: false,
        // showConfirmButton: false,
    }
}]);

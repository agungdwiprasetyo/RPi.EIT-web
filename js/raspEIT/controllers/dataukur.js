app.controller('DataCtrl', ['$scope', '$rootScope', '$http', 'FileUploader', function($scope, $rootScope, $http, FileUploader){
    $scope.judul4 = "Data Tegangan";

    var uploader = $scope.uploader = new FileUploader({
        url: $rootScope.host+'/data'
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length < 10;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };
    // console.log('uploader', uploader);

    $http.get($rootScope.host+'/data')
        .success(function(data){
            $scope.dataTegangan = data;
        })
        .error(function(e) {
            console.log("error");
        });
    $scope.dtOptions = {
        sAjaxDataProp: 'aaData',
        "bProcessing": true,
    };

    $scope.mainData = true;

    $scope.addData = function(){
        $scope.judul4 = "Tambah Data Baru";
    };

    $scope.closeAddData = function(){
        $scope.mainData = true;
    };
    $scope.cobaPrint = "detailhomedata";

    $scope.data = {};
    $scope.saveData = function(){
        // $http.get('./data/dataref.txt')
        //     .success(function(data){
        //         console.log(data);
        //     })
        //     .error(function(e){
        //         console.log("error");
        //     });
        console.log(JSON.stringify($scope.data));
    };
}]);


app.controller('DetailDataCtrl',['$scope', '$stateParams', '$http', function($scope, $stateParams, $http){
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

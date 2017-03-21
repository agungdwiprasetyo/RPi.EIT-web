app.controller('DataCtrl', ['$scope', '$rootScope', '$http', 'FileUploader', '$interval', function($scope, $rootScope, $http, FileUploader, $interval){
    $interval(function(){}, 10);
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
    console.log('uploader', uploader);

    $http.get($rootScope.host+'/data')
        .success(function(data){
            $scope.dataTegangan = data;
        })
        .error(function(e) {
            console.log("error");
        });

    $scope.mainData = true;

    $scope.cobaPrint = "detailhomedata";
}]);


app.controller('DetailDataCtrl',['$scope', '$stateParams', '$http', '$rootScope', '$interval', function($scope, $stateParams, $http, $rootScope, $interval){
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

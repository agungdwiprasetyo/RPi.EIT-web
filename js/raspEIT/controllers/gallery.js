app.controller('GalleryCtrl', ['$scope', '$rootScope', '$http', '$interval', 'toaster', function($scope, $rootScope, $http, $interval, toaster) {
    $scope.slides = [];
    $scope.myInterval = 10000;
    $http.get('/image').success(function(data){
        $scope.slides = data;
        console.log($scope.slides);
    });

    $scope.removeImage = function(val){
        var index = $scope.slides.indexOf(5);
        console.log(val);
    };

    $scope.$watch(function () {
        for (var i = 0; i < $scope.slides.length; i++) {
          if ($scope.slides[i].active) {
            return $scope.slides[i];
          }
        }
    }, function (currentSlide, previousSlide) {
        if (currentSlide !== previousSlide) {
          $scope.detailImage=currentSlide;
        }
    });

    $scope.sweetDelete = {
        title: "Hapus citra?",
        text: "Apakah anda yakin ingin menghapus citra ini?",
        type: "warning",
        // closeOnConfirm: false,
        showCancelButton: true,
    };
    $scope.sweetUpdate = {
        title: "Update image data profile?",
        text: "Update?",
        type: "warning",
        // closeOnConfirm: false,
        showCancelButton: true,
    };

    $scope.setDataProfile = function(iddata,filename){
        $http({
            method  : 'PUT',
            url     : '/data',
            data    : $.param({'id_data':iddata, 'citra': filename}),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data){
            console.log('sukses update');
            toaster.pop("success", "Sukses", "Success update image for this data.");
        }).error(function(e){
            console.log(e);
        });
    };
    $scope.deleteImage = function(filename){
        $http({
            method  : 'DELETE',
            url     : '/image',
            data    : $.param({'filename': filename}),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data){
            console.log('sukses delete');
            toaster.pop("success", "Sukses", "Success delete image.");
        }).error(function(e){
            console.log(e);
        });
    };
}]);

app.controller('GalleryCtrl', ['$scope', '$rootScope', '$http', '$interval', 'toaster', function($scope, $rootScope, $http, $interval, toaster) {
    $scope.slides = [];
    $scope.myInterval = 10000;
    $http.get('/image').success(function(data){
        $scope.slides = data;
    });

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

    $scope.sweet = {
        title: "Hapus citra?",
        text: "Apakah anda yakin ingin menghapus citra ini?",
        type: "warning",
        // closeOnConfirm: false,
        showCancelButton: true,
    }

    $scope.deleteImage = function(val){
          $http({
              method  : 'DELETE',
              url     : '/image',
              data    : $.param({'filename': val}),
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).success(function(data){
              console.log('sukses delete');
              toaster.pop("success", "Sukses", "Success delete image.");
          }).error(function(e){
              console.log(e);
          });
    };
}]);

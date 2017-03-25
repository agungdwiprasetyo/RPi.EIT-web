app.controller('GalleryCtrl', ['$scope', '$rootScope', '$http', '$interval', 'toaster', function($scope, $rootScope, $http, $interval, toaster) {
    $scope.slides = [];
    $scope.myInterval = 10000;
    $http.get($rootScope.host+'/image').success(function(data){
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

    $scope.deleteImage = function(val){
        var konfirm = confirm("Apakah anda yakin ingin menghapus citra "+val+"?");
        if(konfirm){
          $http({
              method  : 'DELETE',
              url     : $rootScope.host+'/image',
              data    : $.param({'filename': val}),
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).success(function(data){
              console.log('sukses delete');
              toaster.pop("success", "Sukses", "Success delete image.");
          }).error(function(e){
              alert(':(');
          });
        }else{
            return false;
        }
    };
}]);

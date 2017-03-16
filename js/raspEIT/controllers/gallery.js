app.controller('GalleryCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.dataImage = {};
    $http.get('http://localhost:1993/image').success(function(data){
        $scope.dataImage = data;
    });

    $scope.myInterval = 10000;
}]);

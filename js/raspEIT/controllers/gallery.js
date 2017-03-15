app.controller('GalleryCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.dataImage = {};
    $http.get('http://localhost:3456/image').success(function(data){
        $scope.dataImage = data;
    });

    $scope.myInterval = 10000;
}]);

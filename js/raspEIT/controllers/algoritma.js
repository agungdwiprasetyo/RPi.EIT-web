app.controller('AlgorCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
    $http({
        method  : 'GET',
        url     : '/algor',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'idalgor': $stateParams.idalgor }
    }).success(function(data){
        $scope.infoAlgor = data;
    }).error(function(e){
        alert(':(');
    });
}]);

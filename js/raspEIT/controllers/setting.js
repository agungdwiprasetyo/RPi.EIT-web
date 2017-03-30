app.controller('SettingCtrl', ['$scope', '$localStorage', 'toaster', '$http',
function($scope, $localStorage, toaster, $http) {
    $http({
        method  : 'GET',
        url     : '/algor',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.algors = data;
    }).error(function(e){
        alert(':(');
    });

    // default setting
    $scope.eitSettings = {
        algor: 'BP',
        arus: 7.5,
        kerapatan: 0.05,
        colorbar: false,
        saveData: true
    };

    if (angular.isDefined($localStorage.eitSettings) ) {
      $scope.eitSettings = $localStorage.eitSettings;
    } else {
      $localStorage.eitSettings = $scope.eitSettings;
    }

    $scope.saveSetting = function(){
        $localStorage.eitSettings = $scope.eitSettings;
        toaster.pop("success", "Sukses", "Sukses save setting.");
        // $window.history.back();
    }

    // $scope.$watch('eitSettings', function(){
    //   $localStorage.eitSettings = $scope.eitSettings;
    // }, true);

}]);

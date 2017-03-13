app.controller('ReconstructionCtrl', ['$scope', 'socket', '$interval', '$rootScope', function($scope, socket, $interval, $rootScope) {
    $scope.dynamic = 100;
    $interval(function(){},10); // handle asynchronously
    console.log($scope.valKerapatan);
    $scope.disableBtn = !$rootScope.piOnline;

    socket.on('raspiStatus', function(data){
        $scope.raspionline = data['online'];
        if(data['online']){
            $scope.disableBtn = false;
        }else{
            $scope.disableBtn = true;
        }
        console.log($scope.raspionline);
    });

	$scope.reconstruction = function(){
        $scope.state = true;
		socket.emit('runReconstruction', {
            status: true,
            kerapatan: parseFloat($scope.valKerapatan),
            arus: parseFloat($scope.valArus),
            data: $scope.valData
        });
	};

    socket.on('statusBar', function(data) {
        $scope.state = false;
        console.log($scope.state);
    });
}]);

app.controller('GalleryCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
}]);

app.controller('ShutDownCtrl', function($scope, $http, socket) {
  //
});

app.controller('TypeaheadDemoCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.selected = undefined;
  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(res){
      var addresses = [];
      angular.forEach(res.data.results, function(item){
        addresses.push(item.formatted_address);
      });
      return addresses;
    });
  };
}])
;

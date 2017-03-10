app.controller('ShutDownCtrl', function($scope, $http, socket) {
  //
});

app.controller('ReconstructionCtrl', ['$scope', 'socket', '$interval', function($scope, socket, $interval) {
	$scope.reconstruction = function(){
        $scope.dynamic = 100;
        $scope.hide = 0;
		console.log("masukk");
		socket.emit('runReconstruction', [parseInt(1)]);
	}

    function hiden(){ // asynchronous
        $scope.dynamic = 0;
        $scope.hide = 1;
        console.log('stop0ppppppppppppppppppppppppppppppp');

    }

    $scope.type = "success";
    socket.on('statusBar', function(data) {
        console.log('stop');
        hiden();
        console.log($scope.dynamic);
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

'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
          $urlRouterProvider
              .otherwise('/home');

          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '',
                  templateUrl: 'tpl/app.html'
              })
              // navigation
              .state('app.dashboard', {
                  url: '/home',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad', function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              // algor
              .state('app.algor', {
                  url: '/algoritma',
                  template: '<div ui-view class="fade-in"></div>'
              })
              .state('app.algor.fem', {
                  url: '/Finite-Element-Method',
                  templateUrl: 'tpl/raspieit/algoritma/fem.html'
              })
              .state('app.algor.art', {
                  url: '/algebraic-reconstruction-technique',
                  templateUrl: 'tpl/raspieit/algoritma/art.html'
              })
              .state('app.algor.bp', {
                  url: '/BackProjection',
                  templateUrl: 'tpl/raspieit/algoritma/bp.html'
              })
              .state('app.algor.jac', {
                  url: '/Jacobian',
                  templateUrl: 'tpl/raspieit/algoritma/jac.html'
              })
              .state('app.algor.greit', {
                  url: '/GREIT',
                  templateUrl: 'tpl/raspieit/algoritma/greit.html'
              })

              //data
              .state('data', {
                  abstract: true,
                  url: '/data',
                  templateUrl: 'tpl/app.html'
              })
              .state('data.home', {
                  url: '',
                  controller: 'DataCtrl',
                  templateUrl: 'tpl/raspieit/data/dataukur.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/raspEIT/controllers/dataukur.js');
                              }
                          );
                      }]
                  }
              })
              .state('data.id', {
                  url: '/:idData',
                  templateUrl: 'tpl/raspieit/data/details.html',
                  controller: 'DetailDataCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/raspEIT/controllers/dataukur.js');
                              }
                          );
                      }]
                  }
              })

              // image
              .state('app.reconstruction', {
                  url: '/reconstruction',
                  controller: 'ReconstructionCtrl',
                  templateUrl: 'tpl/raspieit/reconstruction.html',
                  resolve: {
                      deps: ['$ocLazyLoad', function( $ocLazyLoad){
                          return $ocLazyLoad.load('ui.select').then(
                              function(){
                                  return $ocLazyLoad.load('js/raspEIT/controllers/reconstruction.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.realtime', {
                  url: '/realtime',
                  controller: 'RealtimeCtrl',
                  templateUrl: 'tpl/raspieit/realtime.html',
                  resolve: {
                      deps: ['$ocLazyLoad', function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/raspEIT/controllers/realtime.js');
                      }]
                  }
              })
              .state('app.galeri', {
                  url: '/galeri',
                  controller: 'GalleryCtrl',
                  templateUrl: 'tpl/raspieit/gallery.html',
                  resolve: {
                      deps: ['uiLoad', function( uiLoad){
                          return uiLoad.load('js/raspEIT/controllers/gallery.js');
                      }]
                  }
              })
              .state('app.grafik', {
                  url: '/grafik',
                  templateUrl: 'tpl/chart.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('js/controllers/chart.js');
                      }]
                  }
              })
              // EIT instrument
              .state('app.shutdown', {
                  url: '/shutdown',
                  controller: 'ShutDownCtrl',
                  templateUrl: 'tpl/raspieit/shut-down.html'
              })

            //   .state('data', {
            //       url: '/data',
            //       template: '<div ui-view class="fade-in"></div>',
            //       resolve: {
            //           deps: ['uiLoad',
            //             function( uiLoad){
            //               return uiLoad.load('js/controllers/form.js');
            //           }]
            //       }
            //   })
            //   .state('app.shutdown', {
            //       url: '/shutdown',
            //       controller: 'ShutDownCtrl',
            //       templateUrl: 'tpl/raspieit/shut-down.html'
            //   })
              // end-------------
      }
    ]
  );

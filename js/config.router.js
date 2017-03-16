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
              .state('app.data', {
                  url: '/data',
                  templateUrl: 'tpl/page_profile.html'
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
              // end-------------
      }
    ]
  );

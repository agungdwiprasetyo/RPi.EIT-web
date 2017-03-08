'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
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
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              .state('app.lingkungan', {
                  url: '/lingkungan',
                  templateUrl: 'tpl/page_profile.html'
              })
              // image
              .state('app.reconstruction', {
                  url: '/reconstruction',
                  controller: 'ReconstructionCtrl',
                  templateUrl: 'tpl/raspieit/reconstruction.html'
              })
              .state('app.galeri', {
                  url: '/galeri',
                  controller: 'GalleryCtrl',
                  templateUrl: 'tpl/raspieit/gallery.html'
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
angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

   
    $stateProvider


      .state('tabsController.getARoom', {
        url: '/rooms',
        views: {
          'tab1': {
            templateUrl: 'templates/getARoom.html',
            controller: 'getARoomCtrl'
          }
        }
      })

      .state('tabsController.viewRoom', {
        url: '/room/:roomID',
        views: {
          'tab1': {
            templateUrl: 'templates/viewRoom.html',
            controller: 'getARoomCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/GaR',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })


      .state('start', {
        url: '/start',
        templateUrl: 'templates/start.html',
        controller: 'startCtrl'
      })
     
      .state('confirmation', {
        url: '/confirmation/:roomID',
        templateUrl: 'templates/confirmation.html',
        controller: 'confirmationCtrl'
      })

    $urlRouterProvider.otherwise('/start')

  });
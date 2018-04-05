

var reservation = {
  checkin: '',
  checkinString: '',
  checkout: '',
  price: '',
  noOfDays: '',
  firstName: '',
  lastName: '',
  tel: '',
  address: '',
  postal: '',
  pets: '',
  adults: 2,
  children: 2,
  hideForm: false
}

var date = {
  today: ''
}

angular.module('app.controllers', [])

  .controller('getARoomCtrl', function ($scope, $http, $stateParams, $state) {
    $http.get('js/rooms.json').success(function (data) {
      
      $scope.room = data;
    });

    
    $scope.roomId = $state.params.roomID;

    
    $scope.reservation = reservation;

    
    $scope.totalPrice = function (room) {
      reservation.price = reservation.noOfDays * room.price;
    }

    $scope.setRoom = function (room) {
      reservation.roomId = room.roomID;
    }

    $scope.sendObject = function (room) {
      reservation.roomObject = room
    }

  })

  .controller('bookingCtrl', function ($scope) {
    $scope.checkin = data;

    
    $scope.reservation = reservation;

  })

  .controller('menuCtrl', function ($scope, $stateParams) { })

  .controller('loginCtrl', function ($scope, $stateParams) { })

  .controller('mapCtrl', function ($scope, $ionicLoading, $compile) {

  })

  .controller('startCtrl', function ($scope, $stateParams) {

    
    $scope.date = date;

    
    $scope.reservation = reservation;

    
    $scope.calculateDays = function (checkin, checkout) {
      var diff = new Date(checkout) - new Date(checkin);
      var days = ((((diff / 1000) / 60) / 60) / 24);
      reservation.noOfDays = days;
    }

    $scope.today = function () {
      var today = new Date();
      var dd = today.getDate(); // hämta dagens datum
      var mm = today.getMonth() + 1; //Januari börjar på 0
      var yyyy = today.getFullYear(); // Hämta året vi befinner oss i

      if (mm < 10) 
        mm = '0' + mm.toString();
      if (dd < 10) 
        dd = '0' + dd.toString();

      var todayString = yyyy + '-' + mm + '-' + dd  
      date.today = todayString
      date.max = yyyy + 1 + '-' + mm + '-' + dd
    }

    $scope.selectedDay = function () {
      var dd = reservation.checkin.getDate(); 
      var mm = reservation.checkin.getMonth() + 1; 
      var yyyy = reservation.checkin.getFullYear(); 

      if (mm < 10)
        mm = '0' + mm.toString();
      if (dd < 10)
        dd = '0' + dd.toString();

      var tomorrowString = yyyy + '-' + mm + '-' + dd
      date.tomorrow = tomorrowString
      reservation.checkinString = tomorrowString
      date.TomorrowMax = yyyy + 1 + '-' + mm + '-' + dd
    }
  })

  .controller('aboutCtrl', function ($scope, $stateParams) {
  })

  .controller('confirmationCtrl', function ($scope, $http, $ionicPopup, $ionicSideMenuDelegate) {
    $http.get('js/rooms.json').success(function (data) {

      
      $ionicSideMenuDelegate.canDragContent(false)

      
      $scope.room = data
    });

    
    $scope.reservation = reservation

    
    $scope.showPopup = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you ready to book ' + reservation.firstName + '?',
        template: '' + reservation.adults + ' adults ' +
        'and ' + reservation.children + ' children ' + '<br><br>' +
        'You are planning on checking in  <br>' + reservation.checkinString + ' and will stay for  ' + reservation.noOfDays + ' nights' + '<br><br>' +
        'The total price is <strong>' + reservation.price + '</strong>'

      });
      confirmPopup.then(function (res) {
        if (res) {
          reservation.hideForm = true
        } else {  }
      });
    };

    
    $scope.changeHideForm = function() {
      reservation.hideForm = !reservation.hideForm
    }

    
    

  })
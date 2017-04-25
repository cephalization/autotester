mainApp.controller("examCtrl", function($scope, $http, $cookies, examService){
  var exam = examService.get();
  if (!exam.initialized) {
    window.location.href = 'dashboard';
  }
});

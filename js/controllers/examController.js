mainApp.controller("examCtrl", function($scope, $http, $cookies, examService){
    var exam = {};
    if (!examService.get().initialized) {
        window.location.href = 'dashboard';
    } else {
        exam = examService.get();
    }

    $scope.exam = exam;

    function retrieveQuestions(name, created) {
        $http.post('php/examQuestions', {name:name, created:created})
            .then(function(response){
                if (response.data.success) {
                    $scope.questions = response.data.questions;
                } else {
                    alert(response.data.message);
                    window.location.href = 'dashboard';
                }
            });
    }
});

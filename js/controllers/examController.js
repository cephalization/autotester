mainApp.controller("examCtrl", function($scope, $http, $cookies, examService){
    var exam = {};
    if (!examService.get().initialized) {
        window.location.href = 'dashboard';
    } else {
        exam = examService.get();
    }

    $scope.exam = exam;

    function retrieveQuestions(name) {
        $http.post('php/examQuestions', {name:name})
            .then(function(response){
                if (response.data.success) {
                    $scope.questions = [];
                    var sortedQuestions = response.data.questions.slice();
                    sortedQuestions.sort(function(a, b){
                      return a.number - b.number;
                    });
                    for (var i = 0; i < sortedQuestions.length; i++) {
                      $scope.questions.push(sortedQuestions[i]);
                      $scope.questions[$scope.questions.length - 1].choices = [];
                      for (var j = 0; j < response.data.choices.length; j++) {
                        if (response.data.choices[i].Questions_number == i + 1) {
                          $scope.questions[$scope.questions.length - 1]
                            .push(response.data.choices[j]);
                        }
                      }
                    }
                } else {
                    alert(response.data.message);
                    window.location.href = 'dashboard';
                }
            });
            console.log('retrieveQuestions:', $scope.questions);
    }
});

mainApp.controller("examCtrl", function($scope, $http, $cookies, examService){
    var exam = {};
    if (!examService.get().initialized) {
        window.location.href = 'dashboard';
    } else {
        exam = examService.get();
    }

    $scope.exam = exam;
    $scope.loadingQuestions = true;
    retrieveQuestions(exam.name);

    function retrieveQuestions(name) {
        $http.post('php/examQuestions', {name:name})
            .then(function(response){
                console.log('retrieveQuestions:',response);
                if (response.data.success) {
                    $scope.questions = [];

                    // Sort the incoming questions so their numbers line up
                    var sortedQuestions = response.data.results.questions.slice();
                    sortedQuestions.sort(function(a, b){
                      return a.number - b.number;
                    });

                    // For each question, add an array of its choices as a property
                    for (var i = 0; i < sortedQuestions.length; i++) {
                      $scope.questions.push(sortedQuestions[i]);
                      $scope.questions[$scope.questions.length - 1].choices = [];
                      for (var j = 0; j < response.data.results.choices.length; j++) {
                        if (response.data.results.choices[j].Questions_number == i + 1) {
                          $scope.questions[$scope.questions.length - 1].choices
                            .push(response.data.results.choices[j]);
                        }
                      }
                    }
                    console.log('retrieveQuestions:', $scope.questions);
                    $scope.loadingQuestions = false;
                } else {
                    alert(response.data.message);
                    window.location.href = 'dashboard';
                }
            });
    }
});

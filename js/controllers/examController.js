mainApp.controller("examCtrl", function($scope, $http, $cookies, examService){
    var exam = {};
    var studentID = null;
    if (!examService.get().initialized || !window.sessionStorage.getItem('student')) {
        window.location.href = 'dashboard';
    } else {
        exam = examService.get();
        studentID = window.sessionStorage.getItem('student');
    }

    $scope.exam = exam;
    $scope.loadingQuestions = true;
    $scope.loadingAnswers = true;
    $scope.taken = false;
    var chosenAnswers = [];
    retrieveQuestions(exam.name);
    retrieveTakenChoices(exam.name, studentID);

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

    function retrieveTakenChoices(name, studentID) {
      $http.post('php/takenQuestions', {name:name,ID:studentID})
        .then(function(response){
          console.log('takenQuestions:', response);
          if (response.data.success) {
            if (response.data.taken) {
              chosenAnswers = response.data.results.slice();
              $scope.taken = true;
              $scope.loadingAnswers = false;
            }
          } else {
            alert(response.data.message);
          }
        })
    }
    $scope.correct = function(choice) {
      // Check if the answer was chosen by the user
      let chosen = 0;
      for (var i = 0; i < chosenAnswers.length; i++) {
        if (choice.identifier == chosenAnswers[i].Choices_identifier && choice.Questions_number == chosenAnswers[i].Questions_number) {
            chosen = 1;
        }
      }

      // If the answer is correct and chosen by the user return 1
      // If the answer is incorrect and chosen by the user return -1
      if (chosen) {
        for (var i = 0; i < $scope.questions.length; i++) {
          if ($scope.questions[i].correct_choice == choice.identifier) {
            return chosen;
          }
        }
        return -1;
      }

      // If the answer is not chosen by the user return 0
      return chosen;
    }

    function submitChoices(choices, examName, studentID) {
      $http.post('php/submitExam', {choices:choices, exam:examName, student:studentID})
        .then(function(response){
          if (response.data.success) {
            window.location.href = 'dashboard';
          } else {
            alert(response.data.message, 'Please try the submission again later!');
          }
        })
    }

    // Track the choices that the student has chosen
    var chooses = [];

    $scope.choosing = false;
    $scope.addChoice = function(choice) {
      $scope.choosing = true;
      // Check to see if the user has already chosen for this question
      for (var i = 0; i < chooses.length; i++) {
        if (chooses[i].Questions_number == choice.Questions_number) {
          chooses.splice(i, 1);
        }
      }

      // Add choice to array
      chooses.push(choice);
      $scope.choosing = false;
      console.log('user has chosen', chooses);
    }

    $scope.chosen = function(choice) {
        for (var i = 0, len = chooses.length; i < len; i++) {
            if (chooses[i] == choice) {
                return true;
            }
        }
        return false;
    }

    $scope.numberChosen = function() {
        return chooses.length;
    }

    $scope.submit = function() {

        // Convert the string values of questions_number to int
        var cleanedChoices = [];
        for (var i = 0, len = chooses.length; i < len; i++) {
            for (var j = 0, len = chooses.length; j < len; j++) {
                if (chooses[j].Questions_number - 1 == i) {
                    cleanedChoices.push(chooses[j].identifier);
                }
            }
        }
        console.log(cleanedChoices);
        submitChoices(cleanedChoices, exam.name, studentID);
    }
});

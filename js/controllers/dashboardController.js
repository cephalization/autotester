mainApp.controller("dashboardCtrl", function($scope, $http, $cookies){
    // Load user information from cookie to make user-specific requests
    // Then load the student ID from the database
    var username = $cookies.get('username');

    $scope.loadingExams = true;
    $http.get("php/retrieveExams.php")
        .then(function(response){
            console.log('retrieveExams:',response);
            if (response.data.Success) {
                console.log('retrieveExams, exams:',response.data.Exams);
                $scope.exams = response.data.Exams;
            }
            $scope.loadingExams = false;
        });

    $scope.loadingStudent = true;
    $http.post('php/retrieveStudent.php', {username:username})
        .then(function(response){
            console.log('retrieveStudent:', response);
            if (response.data.success && response.data.student != null) {
                $scope.student = response.data.student;
                $scope.loadingStudent = false;
                loadExamResults($scope.student.student_id);
            } else {
                alert(response.data.message);
                window.googleSignOut();
            }
        });

    $scope.loadingExamResults = true;
    $scope.examResults = {};
    function loadExamResults (studentID) {
        $http.post('php/examResults.php', {ID:studentID})
            .then(function(response){
                console.log('examResults:',response);

                if (response.data.success) {
                  // Create object properties for each exam result
                  for (var i = 0; i < response.data.results.length; i++) {
                    Object.defineProperty($scope.examResults, response.data.results[i].Exam_name,{
                      enumerable: true,
                      writable: true,
                      configureable: true,
                      value: response.data.results[i].points
                    });
                  }
                }

                $scope.loadingExamResults = false;
            })
    }

    $scope.getResults = function(exam) {
        if ($scope.examResults[exam]) {
            return parseFloat($scope.examResults[exam]);
        } else {return false;}
    }

    $scope.didPass = function(score) {
        return score >= 70;
    }
});

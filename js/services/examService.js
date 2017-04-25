mainApp.service('examService', function(){
  var currentExam = sessionStorage.getItem('currentExam');

  get() {
    if (currentExam == null) {
      currentExam = {initialized:false};
    }
    return currentExam;
  }

  set(exam) {
    currentExam = exam;
    currentExam.initialized = true;
    sessionStorage.setItem('currentExam', currentExam);
  }
});

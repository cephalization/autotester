mainApp.service('examService', function(){
    var currentExam = {};

    this.get = function () {
        if (!window.sessionStorage.getItem('examName')) {
            currentExam.initialized = false;
        } else {
            currentExam.initialized = true;
            currentExam.name = window.sessionStorage.getItem('examName');
            currentExam.points = window.sessionStorage.getItem('examPoints');
            currentExam.created = window.sessionStorage.getItem('examCreated');
        }
        return currentExam;
    }

    this.set = function (exam) {
        window.sessionStorage.setItem('examName', exam.name);
        window.sessionStorage.setItem('examPoints', exam.points);
        window.sessionStorage.setItem('examCreated', exam.created);
    }
});

function View(model) {
  this.model = model;

  // DOM Manipulation is handled inside the View
  // The View is the only part which changes the DOM

  this.cont = document.getElementById("cont");
  const questionForm = document.getElementById("questionForm");

  // Creates another form in the DOM to create another question
  this.addQuestion = function() {
    let num = this.cont.childNodes.length - 1;
    const addedQuestion = questionForm.cloneNode(true);
    this.cont.appendChild(addedQuestion);

    addedQuestion.querySelector(
      '[id="questionNumber"]'
    ).innerHTML = `Question ${num}`;
    addedQuestion.querySelector('[name="editQuestion"]').value = "";
    addedQuestion.querySelectorAll('[type="text"]').value = "";

    const newInputs = addedQuestion.querySelectorAll('[type="text"]');
    const newRadios = addedQuestion.querySelectorAll('[type="radio"]');
    newRadios[0].checked = true;

    for (let i = 0; i < 4; i++) {
      newInputs[i].value = "";
      newInputs[i].className = `my-1 pl-1 qinput${num}`;
      newRadios[i].name = `answer${num}`;
    }
  };

  // Deletes the question from the DOM
  this.deleteQuestion = function(target) {
    this.cont.removeChild(target.parentNode.parentNode);
    let headings = document.querySelectorAll('[id="questionNumber"]');
    // this loop updates the question number
    // example: add Question 2, then delete Question 1,
    // the second question will then become "Question 1"
    for (let i = 1; i <= this.cont.childElementCount; i++) {
      headings[i - 1].innerText = `Question ${i}`;
    }
  };

  // Evaluates the quiz and displays the results on the DOM
  this.submitQuiz = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const correctAnswerIndicator = this.cont.querySelectorAll(
      '[id="questionDisplay"]'
    );
    let totalCorrectAnswers = 0;

    for (let i = 1; i <= quiz.length; i++) {
      let chosenAnswer = document.querySelectorAll('[name="answer' + i + '"]');

      for (let j = 0; j < 4; j++) {
        if (chosenAnswer[j].checked && quiz[i - 1].answers[j].correct) {
          totalCorrectAnswers++;
        } else {
          if (quiz[i - 1].answers[j].correct) {
            let correctAnswer = correctAnswerIndicator[i].querySelectorAll(
              '[class="qlabel"]'
            )[j];
            correctAnswer.style.color = "red";
          }
        }
      }
    }
    const modalBody = document.getElementById("modal-body");
    modalBody.innerText = `Quiz complete! You scored ${totalCorrectAnswers}/${
      quiz.length
    }`;
  };
}

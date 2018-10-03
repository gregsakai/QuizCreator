function View(controller) {
  this.controller = controller;

  // DOM Manipulation is handled inside the View
  // The View is the only part which changes the DOM

  // Creates another form in the DOM to create another question
  this.addQuestion = function() {
    const cont = document.getElementById("cont");
    const questionForm = document.getElementById("questionForm");
    let num = cont.childNodes.length - 1;
    const addedQuestion = questionForm.cloneNode(true);
    cont.appendChild(addedQuestion);

    addedQuestion.querySelector(
      '[id="questionNumber"]'
    ).innerHTML = `Question ${num}`;
    addedQuestion.querySelector('[name="editQuestion"]').value = "";
    addedQuestion.querySelectorAll('[type="text"]').value = "";

    const newInputs = addedQuestion.querySelectorAll('[type="text"]');
    const newRadios = addedQuestion.querySelectorAll('[type="radio"]');
    newRadios[0].checked = true;

    for (let x = 0; x < 4; x++) {
      newInputs[x].value = "";
      newInputs[x].className = `my-1 pl-1 qinput${num}`;
      newRadios[x].name = `answer${num}`;
    }
  };

  // Deletes the question from the DOM
  this.deleteQuestion = function() {
    cont.removeChild(this.parentNode.parentNode);
  };

  // Evaluates the quiz and displays the results on the DOM
  this.submitQuiz = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const correctAnswerIndicator = cont.querySelectorAll(
      '[id="questionDisplay"]'
    );
    let totalCorrectAnswers = 0;

    for (let n = 1; n <= quiz.length; n++) {
      let chosenAnswer = document.querySelectorAll('[name="answer' + n + '"]');

      for (let m = 0; m < 4; m++) {
        if (chosenAnswer[m].checked && quiz[n - 1].answers[m].correct) {
          totalCorrectAnswers++;
        } else {
          if (quiz[n - 1].answers[m].correct) {
            let correctAnswer = correctAnswerIndicator[n].querySelectorAll(
              '[class="qlabel"]'
            )[m];
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

  // The Controller will determine where the event is coming from,
  // and fire off the correct function based on the type of event
  this.saveButton = document.getElementById("saveButton");
  this.saveButton.addEventListener("click", controller);

  this.addButton = document.getElementById("addButton");
  this.addButton.addEventListener("click", this.addQuestion);

  this.deleteButton = document.getElementById("deleteButton");
  this.deleteButton.addEventListener("click", this.deleteQuestion);

  this.submitButton = document.getElementById("submitButton");
  this.submitButton.addEventListener("click", this.submitQuiz);
}

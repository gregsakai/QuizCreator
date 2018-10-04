function View(model) {
  this.model = model;

  // DOM Manipulation is handled inside the View
  // The View is the only part which changes the DOM

  const cont = document.getElementById("cont");
  const questionForm = document.getElementById("questionForm");

  let num = 1;

  // Creates another form in the DOM to create another question
  this.addQuestion = function() {
    ++num;
    const addedQuestion = questionForm.cloneNode(true);
    // updates the heading displaying the Question Number
    addedQuestion.querySelector(
      '[id="questionNumber"]'
    ).innerHTML = `Question ${num}`;
    // clears the fields
    addedQuestion.querySelector('[name="editQuestion"]').value = "";
    addedQuestion.querySelectorAll('[type="text"]').value = "";

    const newInputs = addedQuestion.querySelectorAll('[type="text"]');
    const newRadios = addedQuestion.querySelectorAll('[type="radio"]');

    // loops through, resets & updates values
    for (let i = 0; i < 4; i++) {
      newInputs[i].value = "";
      newInputs[i].className = `qinput${num}`;
      newRadios[i].name = `answer${num}`;
    }

    cont.appendChild(addedQuestion);
  };

  // Deletes the question from the DOM
  this.deleteQuestion = function(target) {
    --num;
    cont.removeChild(target.parentNode.parentNode);
    let headings = document.querySelectorAll('[id="questionNumber"]');
    let inputs = document.querySelectorAll('[type="text"]');
    let radios = document.querySelectorAll('[type="radio"]');
    // this loop updates the question number
    // example: add Question 2, then delete Question 1,
    // the second question will then become "Question 1"
    for (let i = 1; i <= cont.childElementCount; i++) {
      headings[i - 1].innerText = `Question ${i}`;
      for (let j = 0; j < 4; j++) {
        inputs[j].className = `qinput${i}`;
        radios[j].name = `answer${i}`;
      }
    }
  };

  // Evaluates the quiz and displays the results on the DOM
  this.submitQuiz = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const correctAnswerIndicator = cont.querySelectorAll(
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
            // if the user is incorrect, the correct answer will be highlighted
            let correctAnswer = correctAnswerIndicator[i].querySelectorAll(
              '[class="qlabel"]'
            )[j];
            correctAnswer.style.color = "red";
          }
          continue;
        }
      }
    }
    // display the users final score on the Bootstrap modal
    const modalBody = document.getElementById("modal-body");
    modalBody.innerText = `Quiz complete! You scored ${totalCorrectAnswers}/${
      quiz.length
    }`;
  };
}

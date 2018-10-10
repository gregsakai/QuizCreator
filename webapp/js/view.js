function View(model) {
  this.model = model;

  const container = document.getElementById("container");

  this.adminForm = function(num) {
    return `<div id="questionForm" class="form-group mt-3">
      <h5>Question Text *</h5>
      <textarea name="editQuestion" rows=4 cols=50 placeholder="Edit Question Text"></textarea>
      <h5>Answers *</h5>
      <div>
        <input type="radio" name="radio${num}" class="mr-2" checked /><input type="text" placeholder="Option A" class="input${num}" /><br />
        <input type="radio" name="radio${num}" class="mr-2" /><input type="text" placeholder="Option B" class="input${num}" /><br />
        <input type="radio" name="radio${num}" class="mr-2" /><input type="text" placeholder="Option C" class="input${num}" /><br />
        <input type="radio" name="radio${num}" class="mr-2" /><input type="text" placeholder="Option D" class="input${num}" /><br />
      </div>
      <button id="deleteButton" class="deleteButton btn btn-danger my-2">Delete Question</button>
    </div>`;
  };

  this.addQuestion = function() {
    let newQuestion = document.createElement("div");
    container.appendChild(newQuestion);
    this.model.numQuestions = document.querySelectorAll('[id="questionForm"]');
    newQuestion.innerHTML = this.adminForm(this.model.numQuestions.length + 1);
  };

  this.deleteQuestion = function(target) {
    container.removeChild(target.parentNode.parentNode);
  };

  this.submitQuiz = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const correctAnswerIndicator = container.querySelectorAll(
      '[id="questionDisplay"]'
    );
    let totalCorrectAnswers = 0;

    for (let i = 0; i < quiz.length; i++) {
      let chosenAnswers = document.querySelectorAll(`[name="radio${i + 1}"]`);

      for (let j = 0; j < 4; j++) {
        let correctAnswer = correctAnswerIndicator[i].querySelectorAll(
          '[class="questionLabel"]'
        )[j];
        if (chosenAnswers[j].checked && quiz[i].answers[j].correct) {
          totalCorrectAnswers++;
          if (correctAnswer.style.color === "red") {
            correctAnswer.style.color = "initial";
          }
        } else {
          if (quiz[i].answers[j].correct) {
            // if the user is incorrect, the correct answer will be highlighted
            correctAnswer.style.color = "red";
          }
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

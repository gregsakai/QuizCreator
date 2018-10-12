function View(model) {
  this.model = model;

  const container = document.getElementById("container");

  this.submitQuiz = function() {
    $.ajax({
      method: "GET",
      url: "https://quizcreatorapi.herokuapp.com/quiz",
      success: function(result) {
        const quiz = result;
        const correctAnswerIndicator = container.querySelectorAll(
          '[id="questionDisplay"]'
        );
        let totalCorrectAnswers = 0;

        for (let i = 0; i < quiz.length; i++) {
          let chosenAnswers = document.querySelectorAll(
            `[name="radio${i + 1}"]`
          );

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
      }
    });
  };
}

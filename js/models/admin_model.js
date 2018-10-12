function Model() {
  const container = document.getElementById("container");
  this.numQuestions = document.querySelectorAll('[id="questionForm"]');

  this.retrieveQuiz = function() {
    let that = this;
    $.ajax({
      method: "GET",
      url: "https://quizcreatorapi.herokuapp.com/quiz",
      success: function(result) {
        that.retrieveQuizForAdmin(result);
      }
    });
  };

  this.retrieveQuizForAdmin = function(quiz) {
    console.log(quiz);

    let num = quiz ? quiz.length : 1;

    let questionForm = `<div id="questionForm" class="form-group mt-3">
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

    if (quiz && quiz.length > 0) {
      this.numQuestions = quiz.length;
      // updates values of the DOM element with properties from the object
      for (let i = 0; i < quiz.length; i++) {
        let currentQuestion = document.createElement("div");
        currentQuestion.innerHTML = questionForm;
        currentQuestion.querySelector('[name="editQuestion"]').value =
          quiz[i].question;

        let radioArray = currentQuestion.querySelectorAll('[type="radio"]');
        let labelArray = currentQuestion.querySelectorAll('[type="text"]');

        for (let j = 0; j < 4; j++) {
          labelArray[j].value = quiz[i].answers[j].answer;
          radioArray[j].name = `radio${i + 1}`;
          radioArray[j].checked = quiz[i].answers[j].correct;
        }
        container.appendChild(currentQuestion);
      }
    } else {
      let currentQuestion = document.createElement("div");
      currentQuestion.innerHTML = questionForm;
      container.appendChild(currentQuestion);
    }
  };

  this.storeQuizIfValid = function() {
    let domQuestions = container.childNodes;
    $.ajax({
      method: "GET",
      url: "https://quizcreatorapi.herokuapp.com/quiz",
      success: function(result) {
        console.log(result);
        // numQuestions is how many are in the DOM currently
        let questionData = [];
        for (let i = 0; i < domQuestions.length; i++) {
          // answers is an array of objects with properties for the
          // answer (string) and correct answer (boolean)
          questionData.push({ question: "", answers: [] });
          let radioArray = domQuestions[i].querySelectorAll('[type="radio"]');
          let inputArray = domQuestions[i].querySelectorAll('[type="text"]');
          for (let j = 0; j < 4; j++) {
            let answer = inputArray[j].value;
            let correct = radioArray[j].checked;
            questionData[i].answers.push({ answer, correct });
          }
          const currentTextField = document.querySelectorAll(
            '[name="editQuestion"]'
          );
          questionData[i].question = currentTextField[i].value;

          if (!result[i] && questionData[i].question) {
            $.ajax({
              method: "POST",
              url: "https://quizcreatorapi.herokuapp.com/quiz",
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify(questionData[i]),
              success: function(result) {
                console.log(result);
              },
              error: function(err) {
                console.log(err);
              }
            });
          } else {
            console.log(questionData[i]);
            $.ajax({
              method: "PUT",
              url: `https://quizcreatorapi.herokuapp.com/quiz/${result[i]._id}`,
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify(questionData[i]),
              success: function(result) {
                console.log(result);
              },
              error: function(err) {
                console.log(err);
              }
            });
          }
          if (result[i].question === questionData[i].question) {
            continue;
          }
        }
      }
    });
  };

  this.storeQuiz = function() {
    let questionTextFields = document.querySelectorAll('[name="editQuestion"]');
    for (let question of questionTextFields) {
      if (!question.value) question.style.borderColor = "red";
      else question.style.borderColor = "initial";
    }

    let answerOptions = document.querySelectorAll('[type="text"]');
    for (let answer of answerOptions) {
      if (!answer.value) answer.style.borderColor = "red";
      else answer.style.borderColor = "initial";
    }

    // Checks every text input to make sure it has a value
    let allTextInputs = document.querySelectorAll('[type="text"]');
    let textInputToArray = Object.keys(allTextInputs).map(
      textInput => allTextInputs[textInput]
    );
    let checkVals = textInputToArray.every(current => current.value);

    if (this.numQuestions && allTextInputs.length && checkVals) {
      this.storeQuizIfValid();

      $.ajax({
        method: "GET",
        url: "https://quizcreatorapi.herokuapp.com/quiz",
        success: function() {
          $("#centerModal").modal("show");
          $("#exampleModalLongTitle").html("Success!");
          $("#modal-body").html("Quiz saved successfully!");
        },
        error: function() {
          $("#centerModal").modal("show");
          $("#exampleModalLongTitle").html("Error!");
          $("#modal-body").html(
            "Something went wrong. Your quiz was not saved."
          );
        }
      });
    } else {
      $("#centerModal").modal("show");
      $("#exampleModalLongTitle").html("Error!");
      $("#modal-body").html("Your quiz is incomplete.");
    }
  };

  this.deleteQuestion = function(target) {
    console.log(container.childNodes.length);
    if (container.childNodes.length > 1) {
      for (let i = 0; i < container.childNodes.length; i++) {
        if (container.childNodes[i] === target.parentNode.parentNode) {
          $.ajax({
            method: "GET",
            url: "https://quizcreatorapi.herokuapp.com/quiz",
            success: function(result) {
              $.ajax({
                method: "DELETE",
                url: `https://quizcreatorapi.herokuapp.com/quiz/${
                  result[i]._id
                }`,
                success: function() {
                  container.removeChild(target.parentNode.parentNode);
                }
              });
            }
          });
        }
      }
    } else {
      $("#centerModal").modal("show");
      $("#exampleModalLongTitle").html("Error!");
      $("#modal-body").html(
        "You can not delete when you only have one question."
      );
    }
  };
}

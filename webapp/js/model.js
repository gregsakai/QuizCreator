function Model() {
  const container = document.getElementById("container");

  this.numQuestions = document.querySelectorAll('[id="questionForm"]');

  this.storeQuizIfValid = function() {
    this.numQuestions = document.querySelectorAll('[id="questionForm"]');
    let questionData = [];
    for (let i = 0; i < this.numQuestions.length; i++) {
      // answers is an array of objects with properties for the
      // answer (string) and correct answer (boolean)

      questionData.push({ question: "", answers: [] });

      let radioArray = this.numQuestions[i].querySelectorAll(`[type="radio"]`);
      let inputArray = this.numQuestions[i].querySelectorAll(`[type="text"]`);

      for (let j = 0; j < 4; j++) {
        let answer = inputArray[j].value;
        let correct = radioArray[j].checked;
        questionData[i].answers.push({ answer, correct });
      }

      const currentTextField = document.querySelectorAll(
        '[name="editQuestion"]'
      );
      questionData[i].question = currentTextField[i].value;
    }

    console.log(questionData);
    if (questionData.length > 0) {
      localStorage.setItem("quiz", JSON.stringify(questionData));
    }
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
      const quiz = JSON.parse(localStorage.getItem("quiz"));

      if (quiz) {
        $("#centerModal").modal("show");
        $("#exampleModalLongTitle").html("Success!");
        $("#modal-body").html("Quiz saved successfully!");
      } else {
        $("#centerModal").modal("show");
        $("#exampleModalLongTitle").html("Error!");
        $("#modal-body").html("Something went wrong. Your quiz was not saved.");
      }
    } else {
      $("#centerModal").modal("show");
      $("#exampleModalLongTitle").html("Error!");
      $("#modal-body").html("Your quiz is incomplete.");
    }
  };

  this.retrieveQuiz = function() {
    let route = window.location.pathname;
    if (route === "/webapp/user.html") {
      this.retrieveQuizForUser();
    } else if (route === "/webapp/admin.html") {
      this.retrieveQuizForAdmin();
    }
  };

  this.retrieveQuizForUser = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));

    if (quiz) {
      for (let i = 0; i < quiz.length; i++) {
        let questionDisplay = document.createElement("div");
        questionDisplay.innerHTML = `<div id="questionDisplay" class="my-3">
          <h5 id="questionText">${quiz[i].question}</h5>
          <input type="radio" name="radio${i +
            1}" class="mr-2" /><label class="questionLabel"></label><br />
          <input type="radio" name="radio${i +
            1}" class="mr-2" /><label class="questionLabel"></label><br />
          <input type="radio" name="radio${i +
            1}" class="mr-2" /><label class="questionLabel"></label><br />
          <input type="radio" name="radio${i +
            1}" class="mr-2" /><label class="questionLabel"></label><br />
        </div>`;

        for (let j = 0; j < 4; j++) {
          let labelArray = questionDisplay.querySelectorAll(
            '[class="questionLabel"]'
          );
          labelArray[j].innerText = quiz[i].answers[j].answer;
        }
        container.appendChild(questionDisplay);
      }
    } else {
      document.write("Sorry, there is no quiz available! ");
      let link = document.createElement("a");
      link.innerHTML = "Click here to create one";
      link.setAttribute("href", "admin.html");
      document.body.appendChild(link);
    }
  };

  this.retrieveQuizForAdmin = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    console.log(quiz);

    console.log(quiz.length);

    let num = quiz.length || 1;

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

    if (quiz.length > 0) {
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
}

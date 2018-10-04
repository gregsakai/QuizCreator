function Model() {
  // The Model is for handling data

  // Store the JSON Object into LocalStorage
  this.storeQuiz = function() {
    const questionData = [];

    for (
      let i = 0;
      i < document.getElementById("cont").childElementCount;
      i++
    ) {
      // answers is an array of objects with properties for the
      // answer (string) and correct answer (boolean)
      questionData.push({ question: "", answers: [] });
      const radioArray = document.querySelectorAll(
        '[name="answer' + (i + 1) + '"]'
      );
      const inputArray = document.querySelectorAll(
        '[class="qinput' + (i + 1) + '"]'
      );
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

    localStorage.setItem("quiz", JSON.stringify(questionData));
    console.log(questionData);
  };

  // Retrieves the quiz data and populates the DOM
  this.retrieveQuiz = function() {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    console.log(quiz);
    const questionDisplay = document.getElementById("questionDisplay");
    questionDisplay.style.display = "none";

    if (quiz) {
      // updates values of the DOM element with properties from the object
      for (let i = 0; i < quiz.length; i++) {
        const newQuestion = questionDisplay.cloneNode(true);
        newQuestion.style.display = "block";
        document.getElementById("cont").appendChild(newQuestion);
        newQuestion.querySelector('[id="questionText"]').innerHTML =
          quiz[i].question;

        const newRadios = newQuestion.querySelectorAll('[type="radio"]');

        for (let j = 0; j < 4; j++) {
          let labelArray = newQuestion.querySelectorAll('[class="qlabel"]');
          labelArray[j].innerHTML = quiz[i].answers[j].answer;
          newRadios[j].name = `answer${i + 1}`;
        }
      }
    } else {
      document.write("Sorry, there is no quiz available! ");
      let link = document.createElement("a");
      link.innerHTML = "Click here to create one";
      link.setAttribute("href", "admin.html");
      document.body.appendChild(link);
    }
  };
}

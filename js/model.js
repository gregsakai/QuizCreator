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
      questionData.push({ question: "", answers: [] });
      const radioArray = document.querySelectorAll(
        '[name="answer' + (i + 1) + '"]'
      );
      const inputArray = document.querySelectorAll(
        '[class="my-1 pl-1 qinput' + (i + 1) + '"]'
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
      for (let l = 0; l < quiz.length; l++) {
        const newQuestion = questionDisplay.cloneNode(true);
        newQuestion.style.display = "block";
        document.getElementById("cont").appendChild(newQuestion);
        newQuestion.querySelector('[id="questionText"]').innerHTML =
          quiz[l].question;

        const newRadios = newQuestion.querySelectorAll('[type="radio"]');

        for (let k = 0; k < 4; k++) {
          let labelArray = newQuestion.querySelectorAll('[class="qlabel"]');
          labelArray[k].innerHTML = quiz[l].answers[k].answer;
          newRadios[k].name = `answer${l + 1}`;
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

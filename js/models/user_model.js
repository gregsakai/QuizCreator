function Model() {
  const container = document.getElementById("container");

  this.retrieveQuizForUser = function() {
    container.innerHTML = null;
    $.ajax({
      method: "GET",
      url: "https://quizcreatorapi.herokuapp.com/quiz",
      success: function(result) {
        let quiz = result;
        console.log(quiz);
        for (let i = 1; i <= quiz.length; i++) {
          let questionDisplay = document.createElement("div");
          questionDisplay.innerHTML = `<div id="questionDisplay" class="my-3">
              <h5 id="questionText">${quiz[i - 1].question}</h5>
              <input type="radio" name="radio${i}" class="mr-2" /><label class="questionLabel"></label><br />
              <input type="radio" name="radio${i}" class="mr-2" /><label class="questionLabel"></label><br />
              <input type="radio" name="radio${i}" class="mr-2" /><label class="questionLabel"></label><br />
              <input type="radio" name="radio${i}" class="mr-2" /><label class="questionLabel"></label><br />
            </div>`;

          for (let j = 0; j < 4; j++) {
            let labelArray = questionDisplay.querySelectorAll(
              '[class="questionLabel"]'
            );
            labelArray[j].innerText = quiz[i - 1].answers[j].answer;
          }
          container.appendChild(questionDisplay);
        }
      },
      error: function(error) {
        console.log(error);
        document.write("Sorry, there is no quiz available! ");
        let link = document.createElement("a");
        link.innerHTML = "Click here to create one";
        link.setAttribute("href", "admin.html");
        document.body.appendChild(link);
      }
    });
  };
}

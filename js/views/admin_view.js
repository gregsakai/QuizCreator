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
}

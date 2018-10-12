function Controller(model, view) {
  this.model = model;
  this.view = view;

  // when the pages loads, attempt to fetch the quiz
  window.addEventListener("load", this);

  // EVENT TRIGGERING
  this.addButton = document.getElementById("addButton");
  this.addButton.addEventListener("click", this);

  // Event bubbling is required, in order to prevent a specific edge case:
  // If all questions are deleted, there will be no elements with the ID,
  // and the event listener will not be applied when a new question is added
  document.addEventListener("click", e => {
    if (e.target.classList.contains("deleteButton")) {
      this.deleteButton = e.target;
      this.deleteButton.addEventListener("click", this.handleEvent(e));
    }
  });

  this.saveButton = document.getElementById("saveButton");
  this.saveButton.addEventListener("click", this);

  // EVENT HANDLING
  this.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        this.clickHandler(e.target);
        break;
      case "load":
        this.loadHandler(e.target);
        break;
      default:
        console.log(e.target);
    }
  };

  // CLICK EVENT HANDLER
  this.clickHandler = function(target) {
    switch (target) {
      case this.addButton:
        this.view.addQuestion();
        break;
      case this.deleteButton:
        this.model.deleteQuestion(target);
        break;
      case this.saveButton:
        this.model.storeQuiz();
        break;
      default:
        console.log(target);
    }
  };

  // LOAD EVENT HANDLER
  this.loadHandler = function(target) {
    switch (target) {
      case document:
        this.model.retrieveQuiz();
        break;
      default:
        console.log(target);
    }
  };
}

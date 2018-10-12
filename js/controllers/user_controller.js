function Controller(model, view) {
  this.model = model;
  this.view = view;

  // when the pages loads, attempt to fetch the quiz
  window.addEventListener("load", this);

  // EVENT TRIGGERING
  this.submitButton = document.getElementById("submitButton");
  this.submitButton.addEventListener("click", this);

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
      case this.submitButton:
        this.view.submitQuiz();
        break;
      default:
        console.log(target);
    }
  };

  // LOAD EVENT HANDLER
  this.loadHandler = function(target) {
    switch (target) {
      case document:
        this.model.retrieveQuizForUser();
        break;
      default:
        console.log(target);
    }
  };
}

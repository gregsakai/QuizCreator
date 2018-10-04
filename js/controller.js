function Controller(model, view) {
  this.model = model;
  this.view = view;

  // The Controller is what 'mediates' between the View and Model
  // It is used for handling events and 'client-specific logic',
  // such as the controller methods below

  let route = window.location.pathname;

  // EVENT TRIGGERING
  if (route === "/user.html") {
    // when the pages loads, attempt to fetch the quiz
    window.addEventListener("load", this);
    this.submitButton = document.getElementById("submitButton");
    this.submitButton.addEventListener("click", this);
  } else if ((route = "/admin.html")) {
    this.saveButton = document.getElementById("saveButton");
    this.saveButton.addEventListener("click", this);

    // Event bubbling is required, in order to prevent a specific edge case:
    // If all questions are deleted, there will be no elements with the ID,
    // and the event listener will not be applied when a new question is added
    document.addEventListener("click", e => {
      if (e.target.classList.contains("deleteButton")) {
        this.deleteButton = e.target;
        this.deleteButton.addEventListener("click", this.handleEvent(e));
      }
    });

    this.addButton = document.getElementById("addButton");
    this.addButton.addEventListener("click", this);
  }

  // EVENT HANDLING
  this.handleEvent = function(e) {
    e.stopPropagation();
    switch (e.type) {
      // These are the different types of events which may be called
      // This makes it easy to add event types in the future
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
      // These are different elements which may be clicked
      case this.addButton:
        this.view.addQuestion();
        break;
      case this.deleteButton:
        this.view.deleteQuestion(target);
        break;
      case this.saveButton:
        this.model.storeQuiz();
        break;
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
        this.model.retrieveQuiz();
        break;
      default:
        console.log(target);
    }
  };
}

function Controller(model, view) {
  this.model = model;
  this.view = view;

  // The Controller is what 'mediates' between the View and Model
  // It is used for handling events and 'client-specific logic',
  // such as the controller methods below

  let route = window.location.pathname;

  // EVENT TRIGGERING
  if (route === "/user.html") {
    window.addEventListener("load", this);
    this.submitButton = document.getElementById("submitButton");
    this.submitButton.addEventListener("click", this);
  } else if ((route = "/admin.html")) {
    this.saveButton = document.getElementById("saveButton");
    this.saveButton.addEventListener("click", this);

    this.deleteButton = document.getElementById("deleteButton");
    this.deleteButton.addEventListener("click", this);

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
      case addButton:
        this.view.addQuestion();
        break;
      case deleteButton:
        this.view.deleteQuestion();
        break;
      case saveButton:
        this.model.storeQuiz();
        break;
      case submitQuiz:
        this.view.submitQuiz();
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

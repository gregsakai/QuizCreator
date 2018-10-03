function Controller(model, view) {
  this.model = model;
  this.view = view;

  // The Controller is what 'mediates' between the View and Model
  // It is used for handling events and 'client-specific logic',
  // such as the controller methods below

  // EVENT HANDLING
  this.handleEvent = function(e) {
    e.stopPropagation();
    switch (e.type) {
      // These are the different types of events which may be called
      // This makes it easy to add event types in the future
      case "click":
        this.clickHandler(e.target);
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
}

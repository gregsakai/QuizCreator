(function() {
  // Instantiating instances of MVC components
  var model = new Model();
  var controller = new Controller(model, view);
  var view = new View(controller);
})();

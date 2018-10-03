(function() {
  // Instantiating instances of MVC components
  var model = new Model();
  var view = new View(model);
  var controller = new Controller(model, view);
})();

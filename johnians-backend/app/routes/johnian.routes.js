module.exports = app => {
    const johnians = require("../controllers/johnian.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", johnians.create);

    // Retrieve all Tutorials
    router.get("/", johnians.findAll);

    // Retrieve all published Tutorials
    router.get("/published", johnians.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", johnians.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", johnians.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", johnians.delete);
  
    // Delete all Tutorials
    router.delete("/", johnians.deleteAll);
   
    app.use('/api/johnians', router);
  };
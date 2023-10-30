module.exports = app => {
    const payments = require("../controllers/payment.controller.js"); // Assuming you have a "payment" controller
  
    var router = require("express").Router();
  
    // Create a new Payment
    router.post("/", payments.create);
  
    // Retrieve all Payments
    router.get("/", payments.findAll);
  
    // Retrieve all published Payments
    router.get("/published", payments.findAllPublished);
  
    // Retrieve a single Payment with id
    router.get("/:id", payments.findOne);
  
    // Update a Payment with id
    router.put("/:id", payments.update);
  
    // Delete a Payment with id
    router.delete("/:id", payments.delete);
  
    // Delete all Payments
    router.delete("/", payments.deleteAll);
  
    app.use('/api/payments', router);
  };
  
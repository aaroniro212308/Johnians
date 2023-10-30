const db = require("../models");
const Payment = db.payments; // Assuming you have a "payment" model defined in your models directory

// Create and Save a new Payment
exports.create = (req, res) => {
  if (!req.body.membershipId || !req.body.fullname || !req.body.payDate || !req.body.amount || !req.body.paymentMethod) {
    res.status(400).send({ message: "Membership ID, Full Name, Pay Date, Amount, and Payment Method are required fields!" });
    return;
  }

  // Create a new Payment
  const payment = new Payment({
    membershipId: req.body.membershipId,
    fullname: req.body.fullname,
    payDate: req.body.payDate,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    upload: req.body.upload || "",
    published: req.body.published || true,
  });

  // Save Payment in the database
  payment
    .save()
    .then(data => {
      res.status(201).send({
        message: "Payment created successfully!",
        payment: data,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the payment.",
      });
    });
};

// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
  Payment.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Payment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Payment with id=" + id });
    });
};

// Update a Payment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Payment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Payment with id=${id}. Maybe Payment was not found!`,
        });
      } else res.send({ message: "Payment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment with id=" + id,
      });
    });
};

// Delete a Payment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`,
        });
      } else {
        res.send({
          message: "Payment was deleted successfully!",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payment with id=" + id,
      });
    });
};

// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
  Payment.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Payments were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all payments.",
      });
    });
};

// Find all published Payments
exports.findAllPublished = (req, res) => {
  Payment.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payments.",
      });
    });
};

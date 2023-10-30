const db = require("../models");
const Johnian = db.johnians;

// Create and Save a new Tutorial
exports.create = (req, res) => {
 
  if (!req.body.fname || !req.body.lname) {
    res.status(400).send({ message: "First Name and Last Name are required!" });
    return;
  }

  // Create a new Johnian
  const johnian = new Johnian({
    fname: req.body.fname,
    lname: req.body.lname,
    bod: req.body.bod,
    nic: req.body.nic,
    admissionNo: req.body.admissionNo,
    contactNo: req.body.contactNo,
    email: req.body.email,
    joinYear: req.body.joinYear,
    olyear: req.body.olyear,
    alyear: req.body.alyear,
    games: req.body.games || [],
    interest: req.body.interest || [],
    membershipId: req.body.membershipId,
    published: req.body.published ? req.body.published : true,
  });

  // Save Johnian in the database
  johnian
    .save(johnian)
    .then(data => {
      res.send({
        message:"User created successfully!!",
        user:data
    });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Johnian."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Johnian.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving data.',
      });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Johnian.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Johnian.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Johnian.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Johnian.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  exports.findAllPublished = (req, res) => {
    Johnian.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
};
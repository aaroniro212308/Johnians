module.exports = mongoose => {
  var schema = mongoose.Schema(
      {
          fname: String,
          lname: String,
          bod: Date,
          nic: String,
          admissionNo: String,
          contactNo: String,
          email: String,
          joinYear: String,
          olyear: String,
          alyear: String,
          games: [String],
          interest: [String],
          membershipId: String,
          published: Boolean
      },
      { timestamps: true }
  );

  const Johnian = mongoose.model("johnian", schema);
  return Johnian;
};
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            membershipId: String,
            fullname: String,
            payDate: Date,
            amount: Number, // Change 'double' to 'Number'
            paymentMethod: String,
            upload: String,
            published: Boolean
        },
        { timestamps: true }
    );
  
    const Payment = mongoose.model("payment", schema);
    return Payment;
  };
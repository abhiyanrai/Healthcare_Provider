const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_KEY, JWT_EXPIRES_IN } = process.env;


const userSchema = new mongoose.Schema({
  salutation: { type: String },
  firstName: { type: String, required: true },
  lastName: String, 
  email: { type: String, required: true },
  contactNo: { type: String },
  password: { type: String, },  
  clinicId: { type: Number, default: null},
  invoiceStartingNumber: { type: Number, default: null },
  otp: { type: String },
  role: { type: String, required: true, default: "Health care provider" },
  profilePic: { type: String, },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });



userSchema.methods.generateAuthToken = function (acceptCheckbox) {
  const expiresIn = acceptCheckbox ? "180d" : "8h";
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
  };
  const token = jwt.sign(payload, SECRET_ACCESS_KEY);
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;


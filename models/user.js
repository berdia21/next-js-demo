import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: [2, "Your user name must be at least 6 characters long"],
    unique: [true, "Account already exists"],
    // validate: [validator., "Please enter a valid userName"],
  },
  password: {
    type: String,
    required: [true, "Please enter your userName"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false, //dont send back password after request
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ENCRYPTION
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);

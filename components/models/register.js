import mongoose, { Schema } from "mongoose";

const RegisterSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: [true, "Username is required."],
    trim: true,
    minLength: [3, "Username must be at least 3 characters"],
    maxLength: [30, "Username must be at most 30 characters"],
    unique: true,
  },

  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [2, "Name must be at least 2 characters"],
    maxLength: [50, "Name must be at most 50 characters"],
  },

  surname: {
    type: String,
    required: [true, "Surname is required."],
    trim: true,
    minLength: [2, "Surname must be at least 2 characters"],
    maxLength: [50, "Surname must be at most 50 characters"],
  },

  mobile: {
    type: String,
    required: [true, "Mobile number is required."],
    match: [/^\+?\d{10,15}$/, "Please enter a valid mobile number"],
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [6, "Password must be at least 6 characters"],
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required."],
  },

  city: {
    type: String,
    required: [true, "City is required."],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Register = mongoose.models.Register || mongoose.model("register-data", RegisterSchema);

export default Register;

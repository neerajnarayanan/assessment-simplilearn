import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config/config'
import validator from "validator";

const jwtPrivateSecret = config.JWT_PRIVATE_SECRET.replace(/\\n/gm, '\n')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email address"],
    required: [true, 'Email is required'],
    unique: true

  },
  userName: {
    type: String,
    required: [true, 'userName is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next;

  this.password = await bcrypt.hash(
    this.password,
    parseInt(config.HASH)
  );
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, jwtPrivateSecret.trim());
};

userSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await User.findOne({ [`${field}`]: value });
  
    return checkField;
};

const User = mongoose.model("User", userSchema);

export default User;
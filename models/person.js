import mongoose from "mongoose";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  try {
    const person = this;

    if (!person.isModified("password")) {
      return next();
    }

    const hashPassword = await bcrypt.hash(person.password, 10);
    person.password = hashPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    const passwordMatch = await bcrypt.compare(enteredPassword, this.password);
    return passwordMatch;
  } catch (error) {
    throw error;
  }
};

const Person = mongoose.model("Person", personSchema);

export default Person;

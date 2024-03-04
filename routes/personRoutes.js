import express from "express";
import Person from "../models/person.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savePerson = await newPerson.save();
    res.status(201).json(savePerson);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

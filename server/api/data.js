import express from "express";

// grab connection export
import db from "../db/connection.js";

// coverts id value to _id ObjectId value
import { ObjectId } from "mongodb";

// used to define API routes
const router = express.Router();

// get a list of all employees: db.employees.find()
router.get("/", async (req, res) => {
  let collection = await db.collection("employees");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// get a single employee by id: db.employees.find(_id: <id>)
router.get("/:id", async (req, res) => {
  let collection = await db.collection("employees");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// create a new employee: db.employees.insertOne({<fields>})
router.post("/", async (req, res) => {
  try {
    let newDocument = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        salary: req.body.salary,
    };
    let collection = await db.collection("employees");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding employee");
  }
});

// update an employee by id: db.employees.updateOne({<employee_to_update>}, {<new_values>})
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        salary: req.body.salary,
      },
    };

    let collection = await db.collection("employees");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating employee");
  }
});

// delete an employee by id: db.employees.deleteOne({<id>})
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("employees");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting employee");
  }
});

export default router;
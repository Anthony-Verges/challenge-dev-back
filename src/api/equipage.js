const express = require("express");
const connection = require("../config");

const router = express.Router();

//GET ALL MEMBERS OF EQUIPAGE
router.get("/", (req, res) => {
  const sql = "SELECT * FROM equipage";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your equipage members");
    } else {
      res.status(200).send(results);
    }
  });
});

// GET MEMBER OF EQUIPAGE BY ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM equipage WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your member of equipage");
    } else {
      res.status(200).json(results);
    }
  });
});

//POST A MEMBER OF EQUIPAGE
router.post("/", (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO equipage (name) VALUES (?)";
  const newMember = connection.query(sql, [name], (err, results) => {
    if (err) {
      res.status(500).send("Error when you post your member of equipage");
    }
    return connection.query(
      "SELECT * FROM equipage WHERE id = ?",
      results.insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const createMemberEquipage = records[0];
        return res.status(200).json(createMemberEquipage);
      }
    );
  });
});

module.exports = router;

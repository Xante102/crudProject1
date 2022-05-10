var express = require("express");
var router = express.Router();
var connection = require("../lib/db");

/* GET notes page. */
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM notes ORDER BY id", function (err, rows) {
    if (err) {
      //req.flash('error', err);
      res.render("notes", {
        page_title: "Notes",
        data: "",
      });
    } else {
      res.render("notes", {
        page_title: "Notes",
        data: rows,
      });
    }
  });
});

/* GET notes edit page. */
router.get("/notes/edit/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM notes WHERE Id=" + req.params.id,
    function (err, row) {
      if (err) {
        //req.flash('error', err);
        res.render("notes", {
          page_title: "Notes ",
          project: "",
        });
      } else {
        res.render("notes", {
          page_title: "Notes",
          note: row,
        });
      }
    }
  );
});

/* GET create notes page. */
router.get("/create-project", (req, res, next) => {
  res.render("projects/create");
});

module.exports = router;

// add
router.post("/add", (req, res) => {
  const data = {
    note: req.body.note,
    active_date: req.body.active_date,
    project_id: req.body.project_id,
    id: req.body.id,
  };

  connection.query(`INSERT INTO projects SET ?`, data, (err, results) => {
    if (err) throw err;

    res.redirect("/projects");
  });
});

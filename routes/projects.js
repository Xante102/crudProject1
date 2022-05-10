var express = require("express");
var router = express.Router();
var connection = require("../lib/db");

/* GET projects page. */
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM projects ORDER BY id", function (err, rows) {
    if (err) {
      //req.flash('error', err);
      res.render("projects", {
        page_title: "Projects",
        data: "",
      });
    } else {
      res.render("projects", {
        page_title: "Projects",
        data: rows,
      });
    }
  });
});

/* GET projects edit page. */
router.get("/edit/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM projects WHERE id=" + req.params.id,
    function (err, row) {
      if (err) {
        //req.flash('error', err);
        res.render("update-project", {
          page_title: "Edit Project",
          project: "",
        });
      } else {
        res.render("update-project", {
          page_title: "Edit Project",
          project: row,
        });
      }
    }
  );
});

/* POST projects edit page. */
router.post("/projects/edit/", function (req, res, next) {
  let sqlQuery =
    "UPDATE projects SET project_title ='" +
    req.body.project_title +
    "', project_description ='" +
    req.body.project_description +
    "', project_start_dt ='" +
    req.body.project_start_dt +
    "', project_due_dt ='" +
    req.body.project_due_dt +
    "' WHERE id = " +
    req.body.id;

  connection.query(sqlQuery, function (err, rows) {
    //req.flash('error', err);
    res.redirect("/projects/projects");
    next();
  });
});

// update
// router.get("/update/:id", (req, res) => {
//   const data = {
//     project_title: req.body.project_title,
//     project_description: req.body.project_description,
//     project_start_dt: req.body.project_start_dt,
//     project_due_dt: req.body.project_due_dt,
//   };

//   connection.query(
//     `UPDATE projects SET ? WHERE id = ${req.params.id}`,
//     data,
//     (err, results) => {
//       if (err) throw err;

//       res.redirect("/projects");
//     }
//   );
// });

  //  SELECT * FROM projects WHERE id = ' + req.params.id, (err, row) => {
//       if(err){
//           console.log(err)
//       } else {
//           console.log(row[0])

//           // dynamically change the fields of the edited project to sync with its project
//           // new Date(<date>).toISOString().split('T')[0]

//           res.render('add', {
//               id: data[i].id,
//               project_title: data[i].project_title,
//               project_description: data[i].project_description,
//               project_start_dt: new Date(data[i].project_start_dt).toDateString('fr-CA').split('T')[i],
//               project_due_dt: new Date(data[i].project_due_dt).toDateString('fr-CA').split('T')[i]  
              
//           });
//       }
//   })
// })




// add
router.post("/add", (req, res) => {
  const data = {
    project_title: req.body.project_title,
    project_description: req.body.project_description,
    project_start_dt: req.body.project_start_dt,
    project_due_dt: req.body.project_due_dt,
  };

  connection.query(`INSERT INTO projects SET ?`, data, (err, results) => {
    if (err) throw err;

    res.redirect("/projects");
  });
});

// delete

router.get("/delete/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (id == NaN) error(res, "use a number for the projects id", 422);

  connection.query(`DELETE FROM projects WHERE id = ${id};`, (err, row) => {
    if (err) {
      req.flash("error", err);
    } else {
      req.flash("success", "Deleted successfully!!");
      res.redirect("/projects");
      next();
    }
  });
});

// edit view
// router.get("/edit/:id", (req, res) => {
//   const id = Number(req.params.id);
//   if (id == NaN) error(res, "use a number for the trainer id", 422);

//   conn.query(
//     `SELECT id,title,first_nm as first_name, last_nm as last_name FROM amberapp1.trainers WHERE id = ${id};`,
//     (err, results) => {
//       if (err) throw err.toString();

//       res.render("trainer/edit", { trainer: results });
//     }
//   );
// });

// // index
// router.get("/all", (req, res) => {
//   conn.query("SELECT * FROM amberapp1.trainers;", (err, results) => {
//     if (err) throw err.toString();
//     return success(res, results);
//   });
// });
module.exports = router;

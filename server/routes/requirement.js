const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const admin = require("../middleware/admin");

const util = require("util"); // helper 

// CREATE  [ADMIN]
router.post(
    "",
    admin,
    body("job_id").isNumeric().withMessage("please enter a valid job ID"),
    body("requirement").isString().withMessage("please enter a valid requirement	"),
    async (req, res) => {
      try {
        const query = util.promisify(conn.query).bind(conn);
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF job EXISTS OR NOT
        const job = await query("select * from job where id = ?", [
          req.body.job_id,
        ]);
        if (!job[0]) {
          res.status(404).json({ ms: "job not found !" });
        }
  
        // 3 - PREPARE job requirememt OBJECT
        const requirementObj = {
          
            job_id: job[0].id,
            requirement: req.body.requirement,
        };
  
        // 4- INSERT job requirememt OBJECT INTO DATABASE
        await query("insert into qualification set ?",  requirementObj);
  
        res.status(200).json({
          msg: " requirement added successfully !",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
  // UPDATE requirement [ADMIN]
router.put(
  "/:id", // params
  admin,
 
  body("requirement").isString().withMessage("please enter a valid requirement	"),

  

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF requirement EXISTS OR NOT
      const requirement = await query("select * from qualification where id = ?", [
        req.params.id,
      ]);
      if (!requirement[0]) {
        res.status(404).json({ ms: "requirement not found !" });
      }

      // 3- PREPARE requirement OBJECT
      const requirementObj = {
        requirement: req.body.requirement,
         
      };

      // 4- UPDATE requirement
      await query("update qualification set ? where id = ?", [requirementObj, requirement[0].id]);

      res.status(200).json({
        msg: "job  updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// DELETE requirement [ADMIN]
router.delete(
    "/:id", // params
    admin,
    async (req, res) => {
      try {
        // 1- CHECK IF requirement EXISTS OR NOT
        const query = util.promisify(conn.query).bind(conn);
        const requirement = await query("select * from qualification where id = ?", [
          req.params.id,
        ]);
        if (!requirement[0]) {
          res.status(404).json({ ms: "requirement not found !" });
        }
        // 2- REMOVE requirement 
        await query("delete from qualification where id = ?", [requirement[0].id]);
        res.status(200).json({
          msg: "requirement delete successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  
  // LIST  [ADMIN, USER]
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  
  const requirement = await query(`select * from qualification`);
  
  res.status(200).json(requirement);
});
  module.exports = router ;
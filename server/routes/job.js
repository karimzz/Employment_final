const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const admin = require("../middleware/admin");

const util = require("util"); // helper 

// CREATE job [ADMIN]
router.post(
    "",
    // admin,   /Marwan !!!!!!!!
    body("position")
      .isString()
      .withMessage("please enter a valid job position")
      .isLength({ min: 5 })
      .withMessage("job position should be at lease 5 characters"),
  
    body("description")
      .isString()
      .withMessage("please enter a valid description ")
      .isLength({ min: 20 })
      .withMessage("description  should be at lease 20 characters"),

      body("offer")
      .isString()
      .withMessage("please enter a valid job offer")
      .isLength({ min: 20 })
      .withMessage("job offer should be at lease 20 characters"),

      body("max_candidate_number")
      .isNumeric()
      .withMessage("please enter a valid max-candidate-number"),

    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
  
        // 3- PREPARE MOVIE OBJECT
        const job = {
          position: req.body.position,
          description: req.body.description,
          offer: req.body.offer,
          max_candidate_number :req.body.max_candidate_number
         
        };
  
        // 4 - INSERT MOVIE INTO DB
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into  job set ? ",  job);
        res.status(200).json({
          msg: " job created successfully !",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
  // UPDATE job [ADMIN]
router.put(
    "/:id", // params
    
    body("position")
      .isString()
      .withMessage("please enter a valid job position")
      .isLength({ min: 5 })
      .withMessage("job position should be at lease 5 characters"),
  
    body("description")
      .isString()
      .withMessage("please enter a valid description ")
      .isLength({ min: 20 })
      .withMessage("description  should be at lease 20 characters"),

      body("offer")
      .isString()
      .withMessage("please enter a valid job offer")
      .isLength({ min: 20 })
      .withMessage("job offer should be at lease 20 characters"),

      body("max_candidate_number")
      .isNumeric()
      .withMessage("please enter a valid max-candidate-number"),

    

    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF job EXISTS OR NOT
        
        const job = await query("select * from job where id = ?", [
          req.params.id,
        ]);
        if (!job[0]) {
          return res.status(404).json({ ms: "job not found !" });
        }
  
        // 3- PREPARE job OBJECT
        const jobObj = {
            position: req.body.position,
            description: req.body.description,
            offer: req.body.offer,
            max_candidate_number :req.body.max_candidate_number
        };
  
        // 4- UPDATE job
        await query("update job set ? where id = ?", [jobObj, job[0].id]);
  
        res.status(200).json({
          msg: "job  updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  // DELETE job [ADMIN]
router.delete(
    "/:id", // params
    admin,
    async (req, res) => {
      try {
        // 1- CHECK IF job EXISTS OR NOT
        const query = util.promisify(conn.query).bind(conn);
        const job = await query("select * from job where id = ?", [
          req.params.id,
        ]);
        if (!job[0]) {
          res.status(404).json({ ms: "job not found !" });
        }
        // 2- REMOVE job 
        await query("delete from job where id = ?", [job[0].id]);
        res.status(200).json({
          msg: "job delete successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  // LIST  [ADMIN, USER]
  
router.get("", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    
    const job = await query(`select * from job`);
    
    res.status(200).json(job);
  });

  

   

module.exports = router ;
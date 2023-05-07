const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const util = require("util"); // helper 

// CREATE applicant [ADMIN]

router.post(
    "",
    body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) character"),

    body("email").isEmail().withMessage("please enter a valid email!"),

    body("phone")
      .isMobilePhone()
      .withMessage("please enter a valid phone number")
      .isLength({ min: 11, max: 11 })
      .withMessage("mobile number should be 11 number "),

    body("password")
      .isLength({ min: 8, max: 30 })
      .withMessage("password should be between (8-12) character"),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       
 
        // 2- CHECK IF EMAIL EXISTS
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const checkEmailExists = await query(
          "select * from  users where email = ?",
          [req.body.email]
        );
        if (checkEmailExists.length > 0) {
          res.status(400).json({
            errors: [ 
              {
                msg: "email already exists !",
              },
            ],
          });
        }
   
        // 3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: await bcrypt.hash(req.body.password, 10),
          token: crypto.randomBytes(16).toString("hex"), // JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
        };
  
        // 4- INSERT USER OBJECT INTO DB
        await query("insert into users set ? ", userData);
        delete userData.password;
        res.status(200).json(userData);

      }  catch (err) {
        res.status(500).json({ err: err });
      }
    }
  );
  //update applicant
   
router.put(
    "/:id", // params
    
    body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10, max: 30 })
    .withMessage("name should be between (10-20) character"),

    body("email").isEmail().withMessage("please enter a valid email!"),

    body("phone")
      .isMobilePhone()
      .withMessage("please enter a valid phone number")
      .isLength({ min: 11, max: 11 })
      .withMessage("mobile number should be 11 number "),

    body("password")
      .isLength({ min: 8, max: 24 })
      .withMessage("password should be between (8-12) character"),

    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF applicant EXISTS OR NOT
        const applicant = await query("select * from users where id = ?", [
          req.params.id,
        ]);
        if (!applicant[0]) {
          res.status(404).json({ ms: "applicant not found !" });
        }
          // 3- CHECK IF EMAIL EXISTS
        
        const checkEmailExists = await query(
          "select * from  users where email = ?",
          [req.body.email]
        );
        //if (checkEmailExists.length ==1 &&   req.params.id==checkEmailExists[0].id) {
          if (checkEmailExists.length > 0 && req.params.id!==checkEmailExists[0].id) {
          return res.status(400).json({
            errors: [ 
              {
                msg: "email already exists for anthor user !",
              },
            ],
          });
        }
   
        // 4- PREPARE applicant OBJECT
        const applicantObj = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: await bcrypt.hash(req.body.password, 10),
          
        };
  
        // 4- UPDATE applicant
        await query("update users set ? where id = ?", [applicantObj, applicant[0].id]);
  
        res.status(200).json({
          msg: "applicant  updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
// DELETE applicant [ADMIN]
router.delete(
    "/:id", // params
    admin,
    async (req, res) => {
      try {
        // 1- CHECK IF applicant EXISTS OR NOT
        const query = util.promisify(conn.query).bind(conn);
        const applicant = await query("select * from users where id = ?", [
          req.params.id,
        ]);
        if (!applicant[0]) {
          res.status(404).json({ ms: "applicant not found !" });
        }
        // 2- REMOVE applicant 
        await query("delete from users where id = ?", [applicant[0].id]);
        res.status(200).json({
          msg: "applicant delete successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
   // LIST  [ADMIN, USER]
router.get("", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    
    const applicant = await query(`select * from users`);
    
    res.status(200).json(applicant);
  });
  


module.exports = router ;
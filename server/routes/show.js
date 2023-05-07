const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const admin = require("../middleware/admin");
const authorized = require("../middleware/authorize");


const util = require("util"); // helper 

//Show a history of job searches related to his account only
router.get(
  "/history",authorized,
    async (req, res) => {
 
        // CHECK IF keyword  EXISTS in table job
        const x=res.locals.user.id;
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const searchhistory = await query(
          "select * from  search_history where user_id = ?", x);

          res.status(200).json(searchhistory);
      
    }
  );
  

//search with word    
router.get(
  "",authorized,
  body("search")
  .isString()
  .withMessage("please enter a valid search"),


  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     

      // 2- CHECK IF job EXISTS
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const checJobExists = await query(
          `select * from  job where position= ? or position LIKE '%${req.body.search}%' `,
          [req.body.search],
        );
        
        if ( !checJobExists[0]) {
          return res.status(401).json({
            errors: [ 
              {
                msg: " no match !",
              },
            ],
          });
        }
        //save search keyword in db
        const saveKeyword = {
          user_id: res.locals.user.id,
          keyword:req.body.search ,
          
        };
        await query("insert into  search_history set ?  ", saveKeyword);
        
        //display searh result
      res.status(200).json(checJobExists);
    }  catch (err) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  }
);

  
  //show requests of special applicant admin 
  router.get("/showRequests",/*admin, */
  body("user_id")
  .isNumeric()
  .withMessage("please enter a valid user_id"),

  
  
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     

      // 2- CHECK IF user EXISTS
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const show = await query(
          "select * from   request_history where user_id = ?",
          [req.body.user_id]
        );
        
        if (!show[0]) {
          return res.status(401).json({
            errors: [ 
              {
                msg: "user doesnot request for a job exists !",
              },
            ],
          });
        }
        res.status(200).json(show);

     
    }  catch (err) {
      console.log(err);
     
      res.status(500).json({ err: err });
    }
  }
); 
  
  module.exports = router ;
  
const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");


const util = require("util"); // helper 

// CREATE request to available job [user]

router.post(
    "/:id",
    body("user_id")
    .isNumeric()
    .withMessage("please enter a valid user_id"),

    body("qualification").isString().withMessage("please enter a valid qualification!"),

    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       
 
        // 2- CHECK IF user EXISTS
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const checUserExists = await query(
            "select * from  users where id = ?",
            [req.body.user_id]
          );
          
          if ( checUserExists.length !=1) {
            res.status(400).json({
              errors: [ 
                {
                  msg: " user not exists !",
                },
              ],
            });
          }
          const checJobExists = await query(
            "select * from  job where id = ?",
            [req.params.id]
          );
          
          if ( checJobExists.length !=1) {
            res.status(401).json({
              errors: [ 
                {
                  msg: "job  not exists !",
                },
              ],
            });
          }
        
        
        
   
        // 3- PREPARE request TO -> SAVE
        const requestData = {
          user_id: req.body.user_id,
          job_id:req.params.id,
          qualification: req.body.qualification,
          
        };
  
        // 4- INSERT request INTO DB
        await query("insert into request_history set ? ", requestData);
        res.status(200).json("reqest sent ");

      }  catch (err) {
       
        res.status(500).json({ err: err });
      }
    }
  );
  
module.exports = router ;
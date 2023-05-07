const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const admin = require("../middleware/admin");


const util = require("util"); // helper 

// CREATE response to available job [user]

router.post(
    "",admin,
    body("request_id")
    .isNumeric()
    .withMessage("please enter a valid request_id"),

    body("response").isBoolean().withMessage("please enter 0->for reject and 1->for accept"),

    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       
 
        // 2- CHECK IF request EXISTS
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const checRequestExists = await query(
            "select * from  request_history where id = ?",
            [req.body.request_id]
          );
          
          if ( checRequestExists.length !=1) {
            return res.status(400).json({
              errors: [ 
                {
                  msg: "request not exists !",
                },
              ],
            });
          }
           //check if there is response for the same request
          const checResponseExists = await query(
            "select * from  response where request_id = ?",
            [req.body.request_id]
          );
          
          if ( checResponseExists.length >0) {
           return res.status(401).json({
              errors: [ 
                {
                  msg: "response for this request is already  exists !",
                },
              ],
            });
          }
        
        
        
   
        // 3- PREPARE request TO -> SAVE
        const responseData = {
          request_id: req.body.request_id,
          
          response: req.body.response,
          
        };
  
        // 4- INSERT request INTO DB
        await query("insert into response set ? ", responseData);
        res.status(200).json(responseData);

      }  catch (err) {
        
       
        res.status(500).json({ err: err });
      }
    }
  );
  
    // UPDATE response [ADMIN]
router.put(
    "/:id", // params
    admin,
    body("request_id")
    .isNumeric()
    .withMessage("please enter a valid user_id"),

    body("response").isBoolean().withMessage("please enter 0->for reject and 1->for accept"),
    

    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF response EXISTS OR NOT
        
        const response = await query("select * from  response where id = ?", [
          req.params.id,
        ]);
        if (!response[0]) {
          return res.status(404).json({ ms: "response not found !" });
        }
       
        //  CHECK IF request EXISTS

        const checRequestExists = await query(
            "select * from  request_history where id = ?",
            [req.body.request_id]
          );
          
          if ( checRequestExists.length !=1) {
            return res.status(401).json({
              errors: [ 
                {
                  msg: "request not exists !",
                },
              ],
            });
          }
          //check if there is response for the same request
          const checResponseExists = await query(
            "select * from  response where request_id = ?",
            [req.body.request_id]
          );
          
          if ( checResponseExists.length >0&&req.params.id!=checResponseExists[0].id) {
           return res.status(402).json({
              errors: [ 
                {
                  msg: "response for this request is already  exists !",
                },
              ],
            });
          }
        // 3- PREPARE job OBJECT
        const responseObj = {
            request_id: req.body.request_id,
            response: req.body.response,
            
        };
  
        // 4- UPDATE job
        await query("update response set ? where id = ?", [responseObj, response[0].id]);
  
        res.status(200).json({
          msg: "response  updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  // DELETE response [ADMIN]
router.delete(
    "/:id", // params
    admin,
    async (req, res) => {
      try {
        // 1- CHECK IF response EXISTS OR NOT
        const query = util.promisify(conn.query).bind(conn);
        const response = await query("select * from response where id = ?", [
          req.params.id,
        ]);
        if (!response[0]) {
          res.status(404).json({ ms: "response not found !" });
        }
        // 2- REMOVE job 
        await query("delete from response where id = ?", [response[0].id]);
        res.status(200).json({
          msg: "response delete successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  // LIST  [ADMIN, USER]
router.get("",admin, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    
    const response = await query(`select * from response`);
    
    res.status(200).json(response);
  });
  

module.exports = router ;
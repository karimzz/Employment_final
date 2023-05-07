 // ==================== INITIALIZE EXPRESS APP ====================
 const express = require("express");
 const app = express();
 
 // ====================  GLOBAL MIDDLEWARE ====================
 app.use(express.json());
 app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
 const cors = require("cors");
 app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS
 
 // ====================  Required Module ====================
 const auth = require("./routes/Auth");
 const job = require("./routes/job");
 const requirement  = require("./routes/requirement");
 const applicant  = require("./routes/applicant");
 const request  = require("./routes/request");
 const response  = require("./routes/response");
 const show= require("./routes/show");


 
 // ====================  RUN THE APP  ====================
 app.listen(4000, "localhost", () => {
   console.log("SERVER IS RUNNING ");
 });
 
 // ====================  API ROUTES [ ENDPOINTS ]  ====================
 app.use("/auth", auth);
 app.use("/job", job);
 app.use("/requirement", requirement);
 app.use("/applicant", applicant);
 app.use("/request", request);
 app.use("/response", response);
 app.use("/show", show);



const express=require("express");
const bodyParser = require("body-parser");
//const auth = require("./helper/auth");

const fs = require("fs");
const dataPath = require('./details/users.json'); // path to our JSON file

const app = express()  //creating our express app
app.use(express.json());  //required to parse the request body

//middleware
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.urlencoded({ extened: true }));
app.use(express.static("public"));
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

// util functions
// const saveAccountData = (data) => {
//     const stringifyData = JSON.stringify(data)
//     fs.writeFileSync(dataPath, stringifyData)
// }
// const getAccountData = () => {
//     const jsonData = fs.readFileSync(dataPath)
//     return JSON.parse(jsonData)   
// }

/* Create - POST method */
app.post("/user/add",  (req, res) => {
    const existUsers = getUserData();  //get the existing user data
    const userinfo = req.body;  //get the new user data from post request
  
    if (
      userinfo.FullName == null ||
      userinfo.password == null ||
      userinfo.email == null ||
      userinfo.address == null
    ) {
      return res.status(401).send({ success: false, msg: "User information is missing" });
    }
  
    //for the useremail exist already
    const findExist = existUsers.find(
      (dataPath) => dataPath.email === userinfo.email
    );
    if (findExist) {
      return res
        .status(409)
        .send({ success: false, msg: "email is already exist" });
    }

    //append the user data
  existUsers.push(userinfo);

  //save the new user data
  saveUserData(existUsers);
  res.send({ success: true, msg: "User information added successfully" });
});

/* Read - GET method */
app.get("/user/list", (req, res) => {
  const users = getUserData();
  res.send(users);
});


//Update API
app.put("/user/update/:email", (req, res) => {
    const useremail = req.params.email;  //get the useremail from url
    const userData = req.body;  //get the update data
  
    //get the existing user data
    const existUsers = getUserData();
  
    //check if the useremail exist or not
    const findExist = existUsers.find((user) => user.useremail === useremail);
    if (!findExist) {
      return res.status(409).send({ error: true, msg: "useremail not exist" });
    };

    //filter the userdata
  const updateUser = existUsers.filter((user) => user.useremail !== useremail);

  //push the updated data
  updateUser.push(userData);

  //finally save it
  saveUserData(updateUser);

  res.send({ success: true, msg: "User data updated successfully" });

})
  


//route
const routes =require('./routes/Routes');
const { urlencoded } = require("body-parser");
app.use("/", routes);


// login api
app.post("/login", (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    let = user.find({email: email}, (err, foundResults) =>{
      if(err) {
        console.log(err);
      }
      else{
        if(foundResults.password === password){
          res.send("You Logged In!")
        }
        else{
          res.send("Incorrect Email or Password.")
        }
      }
    })
  })
  //read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync("users.json", stringifyData);
  };
  
  //get the user data from json file
  const getUserData = () => {
    const jsonData = fs.readFileSync("users.json");
    



app.listen(3000, ()=>{
    console.log("listening at port:3000")
})};

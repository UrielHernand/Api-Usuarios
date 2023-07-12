const express = require("express");
const Controller = require("./controller")
const router =  express.Router();

function addUser(req, res){
  const {auth} =  req;
  const {
    email,
    password,
    displayName
  } =  req.body
  Controller.addUser({
    auth,
    email,
    password,
    displayName
})

.then((result) =>  res.send(result))
.catch((error) => res.send(error))

}

function getUser(req, res){
  const {auth} =  req;
  const {
   
    email
  } =  req.body
  Controller.getUser({
    auth,
    email
})

.then((result) =>  res.send(result))
.catch((error) => res.send(error))

}


function updateUser(req, res){
  const {auth} =  req;
  const {
   
    newDisplayName,newPassword,email
  } =  req.body
  Controller.updateUser({
    auth,
    newDisplayName,newPassword,email
   
})

.then((result) =>  res.send(result))
.catch((error) => res.send(error))

}



router.post("/",addUser);
router.get("/", getUser);
router.patch("/", updateUser)




module.exports = router
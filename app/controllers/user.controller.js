const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users
// Create and Save a new user
exports.create = async(req, res) => {
    // Create a user
    const user = {
      email: req.body.email,
      password: req.body.password
    };
  
    // Save User in the database
    await User.create(user)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the USER."
        });
      });
  };

  //login a new user
exports.login = async(req, res) => {
    if(!req.body.email || !req.body.password){
        res.send({
            message:"email and password required"
        })
    }
   let user = await User.findOne({
        where:{email:req.body.email}
    })
    if(user==null){
                   return res.send({
                        message:'user not found .please enter valid emailid'
                    })
                }
                if(user.dataValues.password !== req.body.password){
                               return res.send({
                                    message:"Incorrect Password!"
                                })
                       }
                       //logging in user
                         user.loggedin=true
                         await user.save()
                         res.send(user)
    
  };
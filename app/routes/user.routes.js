module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    //login user
    router.post("/login", users.login);
    // login to new User
    app.use('/api/users', router);
  };
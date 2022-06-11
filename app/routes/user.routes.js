module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    //login user
    router.post("/login", users.login);
    // logout  User
    router.get("/logout/:email", users.logout);

    app.use('/api/users', router);
  };
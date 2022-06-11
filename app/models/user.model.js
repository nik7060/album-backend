module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      loggedin:{
          type:Sequelize.BOOLEAN,
          defaultValue:false,
          allowNull:false
      }
    });
    return User;
  };
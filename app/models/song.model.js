module.exports = (sequelize, Sequelize) => {
  const Song = sequelize.define("song", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
   
  });
  return Song;
};
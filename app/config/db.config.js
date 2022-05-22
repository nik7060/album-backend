module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "nikhil",
  DB: "tutoriallessons",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
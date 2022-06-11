const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.albums = require("./album.model.js")(sequelize, Sequelize);
db.songs = require("./song.model.js")(sequelize, Sequelize);
db.artists = require("./artist.model.js")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize,Sequelize)
db.albums.hasMany(db.songs, {
  as: 'song'
});
db.songs.belongsTo(db.albums, {
  foreignKey: 'albumId', as: 'album',
});
db.albums.hasMany(db.artists, {
  as: 'artist'
});
db.artists.belongsTo(db.albums, {
  foreignKey: 'albumId', as: 'album',
});


module.exports = db;
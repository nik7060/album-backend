module.exports = app => {
  const albums = require("../controllers/album.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/", albums.create);
  // Retrieve all albums
  router.get("/", albums.findAll);
  // Retrieve all published albums
  router.get("/published", albums.findAllPublished);
  //search albums
  router.get("/search", albums.searchAlbum);
  // Retrieve a single Album with id
  router.get("/:id", albums.findOne);
  // Update a ALbum with id
  router.put("/:id", albums.update);
  // Delete a Album with id
  router.delete("/:id", albums.delete);
  // Delete all albums
  router.delete("/", albums.deleteAll);

  app.use('/api/albums', router);
};
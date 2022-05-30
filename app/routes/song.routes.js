module.exports = app => {
  const songs = require("../controllers/song.controller.js");
  var router = require("express").Router();
  // Create a new Lesson for a Tutorial
  router.post("/:albumId/songs/", songs.create);
  // Retrieve all songs for a Tutorial
  router.get("/:albumId/songs/", songs.findAll);
  // Retrieve all published songs for a Tutorial
  router.get("/:albumId/songs/published", songs.findAllPublished);
  // Retrieve a single Lesson with id
  router.get("/:albumId/songs/:id", songs.findOne);
  // Update a Lesson with id
  router.put("/:albumId/songs/:id", songs.update);
  // Delete a Lesson with id
  router.delete("/:albumId/songs/:id", songs.delete);
  // Delete all songs
  router.delete("/:albumId/songs/:id", songs.deleteAll);
  app.use('/api/albums', router);
};
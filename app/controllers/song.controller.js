const db = require("../models");
const Song = db.songs;
const Op = db.Sequelize.Op;

// add song to album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // add a Song
  const song = {
    albumId: req.params.albumId,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save Song in the database
  Song.create(song)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " error occurred while adding the song."
      });
    });
};


// Retrieve all songs from the database.
exports.findAll = (req, res) => {
  const albumId = req.params.albumId;
  Song.findAll({ 
    where: {albumId:albumId}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving songs."
      });
    });
};
// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Lesson.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lesson with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Lesson with id=" + id
      });
    });
};

// Update a Song by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Song.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Song was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Song with id=${id}. Maybe Song was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Song with id=" + id
      });
    });
};
// Delete a Song with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Song.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Song was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Song with id=${id}. Maybe Song was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Song with id=" + id
      });
    });
};
// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
  Song.destroy({
    where: {albumId:req.params.albumId},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `all songs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all songs."
      });
    });
};
// Find all published Lessons
exports.findAllPublished = (req, res) => {
  const lessonId = req.query.lessonId;

  Lesson.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons."
      });
    });
};
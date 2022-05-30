const db = require("../models");
const Album = db.albums;
const Artist = db.artists
const Op = db.Sequelize.Op;
// Create and Save a new Album
exports.create = async(req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  //artist name mandatory
  if (!req.body.artist) {
    res.status(400).send({
      message: "artist name cannot not be empty!"
    });
    return;
  }
  // Create a album
  const album = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  let response;
  // Save Album in the database
  await Album.create(album)
    .then(data => {
      response = data.dataValues
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });

    //create Artist
  const artist = {
    name : req.body.artist,
     albumId:response.id
  }
      // Save Atist in the database
     await Artist.create(artist)
    .then(data => {
      response.artist = data.name
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });
res.send(response)
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
 
  Album.findAll(
    {
      include: [
     { model: db.artists, as: 'artist' }
    ]      
    }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Album with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Album.findByPk(id)
    .then(async data => {
      if (data) {
       let artist =await Artist.findOne({
         where:{albumId:id}
       })
        if(artist){
          data.dataValues.artist = artist.dataValues.name
        }
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Album with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Album with id=" + id
      });
    });
};
// Update a Album by the id in the request
exports.update =async (req, res) => {
  var onlyArtist = false
  const id = req.params.id;
  if (req.body.artist) {
   await Artist.update({ name: req.body.artist }, {
      where: { albumId: id }
    })
      .then(num => {
        if (num == 1 ) {
          onlyArtist = true
          console.log("artist name updated successfully")
        } else {
          return res.send({
          message:  'Error updating Artist name'
          })
        }
      
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating artist with albumId=" + id
        });
      });
  }
  if(req.body.title || req.body.description || req.body.published){
    console.log("inn")
   await Album.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log("num",11)
          res.send({
            message: "Album was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Album with id=${id}. Maybe Album was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Album with id=" + id
        });
      });
    }else{
    if(onlyArtist){
      console.log("in")
      res.send('artist name updated successfully')
    }else{
      res.send("some error occured")
    }
  }
  }


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Album was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Album with id=${id}. Maybe Album was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Album with id=" + id
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Album.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} albums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all albums."
      });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.searchAlbum = (req, res) => {
  const title = req.query.title;
  console.log("jjaj",title)
   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Album.findAll({
    where: condition,
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching all albums."
      });
    });
};

import albuns from "../models/Album.js";

class AlbumController {

  static listarAlbuns = (req, res) => {
    albuns.find()
      .exec((err, albuns) => {
        res.status(200).json(albuns)
  })
  }

  static listarAlbumPorId = (req, res) => {
    const id = req.params.id;

    albuns.findById(id)
      .exec((err, albuns) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do album não localizado.`})
      } else {
        res.status(200).send(albuns);
      }
    })
  }

  static cadastrarAlbum = (req, res) => {
    let album = new albuns(req.body);

    album.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar album.`})
      } else {
        res.status(201).send(album.toJSON())
      }
    })
  }

  static atualizarAlbum = (req, res) => {
    const id = req.params.id;

    albuns.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Album atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static excluirAlbum = (req, res) => {
    const id = req.params.id;

    albuns.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Album removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default AlbumController
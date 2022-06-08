import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    id: {type: String},
    nomeAlbum: {type: String, required: true},
    pokemonsIds: {type: String}
  }
);

const albuns= mongoose.model('albuns', albumSchema);

export default albuns;
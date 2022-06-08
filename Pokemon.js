import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema(
  {
    id: {type: String},
    nomePokemon: {type: String, required: true},
    numeroPokemon: {type: Number, required: true},
    velocidade: {type: Number, required: true},
    hp: {type: Number, required: true},
    ataque: {type: Number, required: true},
    defesa: {type: Number, required: true},
    ataqueEspecial: {type: Number, required: true},
    defesaEspecial: {type: Number, required: true},
    linkDaFoto: {type: String, required: true}
  }
);

const pokemons= mongoose.model('pokemons', pokemonSchema);

export default pokemons;
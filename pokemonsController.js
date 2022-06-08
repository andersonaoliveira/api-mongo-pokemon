import pokemons from "../models/Pokemon.js";

class PokemonController {

  static listarPokemons = (req, res) => {
    pokemons.find()
      .exec((err, pokemons) => {
        res.status(200).json(pokemons)
  })
  }

  static listarPokemonPorId = (req, res) => {
    const id = req.params.id;

    pokemons.findById(id)
      .exec((err, pokemons) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do pokemon não localizado.`})
      } else {
        res.status(200).send(pokemons);
      }
    })
  }

  static cadastrarPokemon = (req, res) => {
    let pokemon = new pokemons(req.body);

    pokemon.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar pokemon.`})
      } else {
        res.status(201).send(pokemon.toJSON())
      }
    })
  }

  static atualizarPokemon = (req, res) => {
    const id = req.params.id;

    pokemons.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Pokemon atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static excluirPokemon = (req, res) => {
    const id = req.params.id;

    pokemons.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Pokemon removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default PokemonController
import express from "express";
import PokemonController from "../controllers/pokemonsController.js";

const router = express.Router();

router
  .get("/pokemons", PokemonController.listarPokemons)
  .get("/pokemons/:id", PokemonController.listarPokemonPorId)
  .post("/pokemons", PokemonController.cadastrarPokemon)
  .put("/pokemons/:id", PokemonController.atualizarPokemon)
  .delete("/pokemons/:id", PokemonController.excluirPokemon)

export default router;   
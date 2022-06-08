import express from "express";
import albuns from "./albunsRoutes.js"
import pokemons from "./pokemonsRoutes.js"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.sendFile('index.html', { root: '.' })
  })

  app.use(
    express.json(),
    albuns,
    pokemons
  )

  app.use(express.static("."))

}

export default routes
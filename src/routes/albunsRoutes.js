import express from "express";
import AlbumController from "../controllers/albunsController.js";

const router = express.Router();

router
  .get("/albuns", AlbumController.listarAlbuns)
  .get("/albuns/:id", AlbumController.listarAlbumPorId)
  .post("/albuns", AlbumController.cadastrarAlbum)
  .put("/albuns/:id", AlbumController.atualizarAlbum)
  .delete("/albuns/:id", AlbumController.excluirAlbum)

export default router;   
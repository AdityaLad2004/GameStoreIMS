const express = require("express");
const router = express.Router();
const Game = require("../model/Game");
const gamesController = require("../controllers/games-controller");

router.get("/", gamesController.getAllGames);
router.post("/", gamesController.addGame);
router.get("/:id", gamesController.getById);
router.put("/:id", gamesController.updateGame);
router.delete("/:id", gamesController.deleteGame);

module.exports = router;

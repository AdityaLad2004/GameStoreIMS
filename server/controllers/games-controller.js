const Game = require("../model/Game");

const getAllGames = async (req, res, next) => {
  let games;
  try {
    games = await Game.find();
  } catch (err) {
    console.log(err);
  }

  if (!games) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ games });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let game;
  try {
    game = await Game.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!game) {
    return res.status(404).json({ message: "No game found" });
  }
  return res.status(200).json({ game });
};

const addGame = async (req, res, next) => {
  const { name, devs, description, price, available, image } = req.body;
  let game;
  try {
    game = new Game({
      name,
      devs,
      description,
      price,
      available,
      image,
    });
    await game.save();
  } catch (err) {
    console.log(err);
  }

  if (!game) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ game });
};

const updateGame = async (req, res, next) => {
  const id = req.params.id;
  const { name, devs, description, price, available, image } = req.body;
  let game;
  try {
    game = await Game.findByIdAndUpdate(id, {
      name,
      devs,
      description,
      price,
      available,
      image,
    });
    game = await game.save();
  } catch (err) {
    console.log(err);
  }
  if (!game) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ game });
};

const deleteGame = async (req, res, next) => {
  const id = req.params.id;
  let game;
  try {
    game = await Game.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!game) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllGames = getAllGames;
exports.addGame = addGame;
exports.getById = getById;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;

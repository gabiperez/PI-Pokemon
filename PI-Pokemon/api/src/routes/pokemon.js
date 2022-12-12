const { Router } = require('express');
const router = Router();
const { getAllPoke, createPoke } = require('./functions');

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (name) {
    const allPoke = await getAllPoke();
    let pokeName = allPoke.filter(
      (e) => e.name.toLowerCase().includes(name.toLocaleLowerCase()) //filtra el poke que conincida con el poke de query
    );
    pokeName.length > 0
      ? res.status(200).send(pokeName)
      : res.status(400).send('Pokemon don´t exist');
  } else {
    try {
      let allPokemon = await getAllPoke();
      res.status(200).send(allPokemon);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let pokeById = await getAllPoke();
    let poke = pokeById.filter((e) => e.id == id);
    let filterPoke = poke[0];
    poke.length;
    res.status(200).jason(filterPoke);
  } catch (err) {
    res.status(400).send(`ID '${id}' doesnt exist`);
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
    img,
    createDb,
  } = req.body;
  try {
    let newPokemon = await createPoke(
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      img,
      createDb
    );
    res.status(200).json(newPokemon);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

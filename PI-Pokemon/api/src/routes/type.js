const { Router } = require('express');
const Type = require('../db.js');
const { getPokeTypes } = require('../routes/functions.js');
const router = Router();

router.get('/', async (req, res) => {
  try {
    let allPokeTypes = await getPokeTypes();
    res.status(200).json(allPokeTypes);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;

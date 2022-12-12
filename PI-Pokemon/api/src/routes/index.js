const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const pokeRouter = require('./pokemon');
const typeRouter = require('./type');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', pokeRouter);
router.use('/type', typeRouter);

module.exports = router;

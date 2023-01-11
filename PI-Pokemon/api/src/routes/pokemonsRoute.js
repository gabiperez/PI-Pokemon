const express = require('express');
const { Pokemon, Type } = require('../db');
const { getAllPokemon } = require('./functions');

const router = express.Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    const allPokesName = await getAllPokemon(name);

    try {
        if (name) {
            console.info(allPokesName);
            let poke = allPokesName.filter(e => e.name.toLowerCase() === name.toLowerCase());
            poke.length ? res.status(200).send(poke) : res.status(404).send('Pokemon not found');
        } else {
            return res.status(200).send(allPokesName);
        }
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allPokesId = await getAllPokemon();
    try {
        if (id) {
            let pokemonById = allPokesId.filter(e => e.id == id);
            pokemonById.length ? res.status(200).send(pokemonById) : res.status(404).send('Pokemon not found')
        }
    } catch (e) {
        console.log(e);
    }
});


router.post('/', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;

    try {
        if (!name) return res.status(400).send('Pokemon name is mandatory');

        const allPoke = await getAllPokemon(name);
        const exists = allPoke.length > 0;

        if (exists) {
            return res.status(409).send('Pokemon name already exists')
        }

        const pokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        });

        const pokemonTypes = await Type.findAll({
            where: {
                name: types,
            }
        });

        pokemon.addType(pokemonTypes);

        await pokemon.save();

        return res.status(201).send(pokemon);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

module.exports = router;

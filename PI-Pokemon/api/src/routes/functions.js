const axios = require('axios');
const Sequelize = require('sequelize');
const { Pokemon, Type } = require('../db');

async function getListOfPokemons() {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon';

        let pokemones = [];

        do {
            let info = await axios.get(url);

            let pokemonesApi = info.data;

            let auxPokemones = pokemonesApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemones.push(...auxPokemones);
            url = pokemonesApi.next;
        } while (pokemones.length < 40); //LIMITO LA CANTIDAD DE POKEMONS

        let pokesWithData = await Promise.all(pokemones.map(async e => {
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map(e => {
                    return ({
                        name: e.type.name,
                        img: `https://typedex.app/app/images/ui/types/light/${e.type.name}.svg`,
                    })
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                createdInDb: false
            }
        }));

        return pokesWithData;
    } catch (e) {
        console.error(e);
        return [];
    };
};

async function getPokemonByName(name) {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

        let info = await axios.get(url);

        let pokemon = info.data;

        if (!pokemon) return null;

        return {
            id: pokemon.id,
            name: pokemon.name,
            img: pokemon.sprites.other.home.front_default,
            types: pokemon.types.map(e => {
                return {
                    name: e.type.name,
                    img: `https://typedex.app/app/images/ui/types/light/${e.type.name}.svg`,
                }
            }),
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            createdInDb: false
        }
    } catch (e) {
        console.error(e.message);
        return null;
    };
};



//TRAIGO DATOS DE LA API, HAGO OTRO LLAMADO Y TRAIGO DATOS (NOMBRE, IMAGEN, TIPO).
/**
 * 
 * @param {string | undefined} name 
 */
const getApiInfo = async (name) => {
    try {

        let pokemones = [];

        if (name) {
            const pokeByName = await getPokemonByName(name);

            if (pokeByName) {
                pokemones.push(pokeByName)
            }
        } else {
            pokemones = process.env.fourthyKokemone ? JSON.parse(process.env.fourthyKokemone) : [];
        }
        return pokemones;
    } catch (e) {
        console.error(e);
        return [];
    };
};

//TRAIGO POKEMON POR PARAMS (ID) / O QUERY (NAME) CON DATOS PARA DETAIL.
async function getPokemonDetail(arg) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`);
        const data = await apiData.data;
        const pokemonData = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            types: data.types.map(e => {
                return ({
                    name: e.type.name,
                    img: `https://typedex.app/app/images/ui/types/light/${e.type.name}.svg`,
                })
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            createdInDb: false
        };
        return pokemonData;
    } catch (e) {
        console.log(e);
    };
};




//TRAIGO POKEMONES DE DB, Y LA TABLA TYPE CON SU ATRIBUTO NAME.
/**
 * @param {string | undefined} name 
 */
const getDbInfo = async (name) => {
    let data = [];

    if (name) {
        console.info("voy a buscar un pokemon con name", name);
        const pokemon = await Pokemon.findOne({
            where: {
                name: {
                    [Sequelize.Op.iLike]: name
                }
            },
            include: {
                model: Type,
            },
        });

        if (pokemon) {
            data.push(pokemon);
        }
    } else {
        data = await Pokemon.findAll({
            include: {
                model: Type,
            },
        });
    }


    return data.map(p => {
        return {
            id: p.dataValues.id,
            name: p.dataValues.name,
            img: p.dataValues.img,
            types: p.dataValues.types.map(type => {
                return ({
                    name: type.dataValues.name,
                    img: `https://typedex.app/app/images/ui/types/light/${type.dataValues.name}.svg`,
                })
            }),
            hp: p.dataValues.hp,
            attack: p.dataValues.attack,
            defense: p.dataValues.defense,
            speed: p.dataValues.speed,
            height: p.dataValues.height,
            weight: p.dataValues.weight,
            createdInDb: true
        }

    })
};

//TRAIGO TODOS LOS POKEMONES, API + DB

/**
 * 
 * @param {string | undefined} name 
 */
const getAllPokemon = async (name) => {

    const apiInfo = await getApiInfo(name);
    const dbInfo = await getDbInfo(name);

    let pokemons = [];

    if (apiInfo.length) {
        pokemons = pokemons.concat(apiInfo);
    }

    if (dbInfo.length) {
        pokemons = pokemons.concat(dbInfo);
    }

    return pokemons;
};


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemon,
    getPokemonDetail,
    getListOfPokemons
}
const axios = require('axios');
const { Pokemon, Type } = require('../db');

//traigo de API
async function getPokeApi() {
  const arrPoke = [];
  const firstPokeApi = await axios('https://pokeapi.co/api/v2/pokemon');
  const secPokeApi = await axios(firstPokeApi.data.next);

  const firstPokeUrl = firstPokeApi.data.results.map((e) => e.url);
  const secPokeUrl = secPokeApi.data.results.map((e) => e.url);

  const allPokeUrl = firstPokeUrl.concat(secPokeUrl);
  const allPromise = await Promise.all(allPokeUrl);

  for (i = 0; i < allPromise.length; i++) {
    const url = await axios(allPromise[i]);
    arrPoke.push({
      id: url.data.id,
      name: url.data.name,
      types: url.data.types.map((e) => e.type.name),
      img: url.data.sprites.front_default,
      attack: url.data.stats[1].base_stat,
    });
  }
  return arrPoke;
}

//traigo de Db
async function getPokeDb() {
  let pokeDb = Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  return pokeDb;
}

//combino API y Db en una var
async function getAllPoke() {
  const apiInfo = await getPokeApi();
  const dbInfo = await getPokeDb();

  const getAllPoke = apiInfo.concat(dbInfo);
  return getAllPoke;
}

async function getType() {
  const { data } = await axios.get('https://pokeapi.co/api/v2/type');

  return data.results.map((type) => type.name);
}

async function findPokeInApi(name) {
  let existPokeInApi = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
    .catch(() => {
      return false;
    });
  if (existPokeInApi) return true;
}

async function createPoke(
  name,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  type,
  img,
  createDb
) {
  if (await findPokeInApi(name))
    throw new Error(`"${name}"  already exists, try another name`);

  let existPokeInDb = await Pokemon.findOne({ where: { name } });
  if (existPokeInDb)
    throw new Error(`"${PokemonInDb.name}"  already exists, try another name`);

  const pokemonCreate = await Pokemon.create({
    name: name.toLowerCase(),
    life: parseInt(life, 10),
    attack: parseInt(attack, 10),
    defense: parseInt(defense, 10),
    speed: parseInt(speed, 10),
    height: parseInt(height, 10),
    weight: parseInt(weight, 10),
    img: img,
    createDb: createDb,
  });

  getPokeTypes(); //eliminar una vez q el force este true
  let typesDb = await Types.findAll({
    where: { name: type },
  });

  await pokemonCreate.addTypes(typesDb);
  //si o si hay q elegir un tipo de pokeweon
  return pokemonCreate;
}

module.exports = {
  getAllPoke,
  getType,
  createPoke,
  //getPokeById
};

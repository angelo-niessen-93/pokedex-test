const pokedex = document.getElementById("pokedex");
const video = document.getElementById("loadingVideo");
const loader = document.getElementById("loader");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

let allPokemons = [];
let currentIndex = 0;

async function fetchData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  allPokemons = await Promise.all(data.results.map(loadPokemon));
  renderPokemons(allPokemons);
}

async function loadPokemon(pokemon) {
  const { name, sprites, stats, types, abilities, height, weight } = await (
    await fetch(pokemon.url)
  ).json();

  return {
    name,
    image: sprites.front_default,
    hp: stats.find((s) => s.stat.name === "hp").base_stat,
    types: types.map((t) => t.type.name),
    abilities: abilities.map((a) => ({
      name: a.ability.name,
      hidden: a.is_hidden,
    })),
    height: height / 10,
    weight: weight / 10,
  };
}

video.onended = () => {
  loader.style.display = "none";
  document.body.classList.remove("loading");
};

fetchData();

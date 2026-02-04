const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

let allPokemons = [];
let currentIndex = 0;

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const promises = data.results.map((pokemon) => loadPokemon(pokemon));
    allPokemons = await Promise.all(promises);
    renderPokemons(allPokemons);
  } catch (error) {
    console.error(error);
  }
}

async function loadPokemon(pokemon) {
  const response = await fetch(pokemon.url);
  const data = await response.json();

  return {
    name: data.name,
    image: data.sprites.front_default,
    hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      hidden: a.is_hidden,
    })),
  };
}

function renderPokemons(pokemons) {
  pokedex.innerHTML = "";
  const availableFrames = [
    "fire",
    "electric",
    "grass",
    "normal",
    "poison",
    "water",
  ];
  pokemons.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    let type = "classic";
    if (pokemon.types.length > 0) {
      const firstType = pokemon.types[0].toLowerCase();
      type = availableFrames.includes(firstType) ? firstType : "normal";
    }

    const framePath = `assets/png/${type}.png`;
    card.style.backgroundImage = `url('${framePath}')`;
    card.innerHTML = `
      <div class="card-header">
        <h3>${pokemon.name}</h3>
        <p class="card-hp">HP: ${pokemon.hp}</p>
      </div>
      <div class="card-image">
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>
      <div class="card-abilities">
        <p>Fähigkeiten: ${pokemon.abilities.map((a) => (a.hidden ? a.name + " (hidden)" : a.name)).join(", ")}</p>
      </div>`;
    pokedex.appendChild(card);
    card.addEventListener("click", () => {
      currentIndex = allPokemons.indexOf(pokemon);
      openModal(pokemon);
    });
  });
}

function searchPokemon() {
  const searchTerm = searchInput.value.toLowerCase();
  pokedex.innerHTML = "";
  const filtered = allPokemons.filter((p) => p.name.includes(searchTerm));
  renderPokemons(filtered);
}

searchBtn.addEventListener("click", searchPokemon);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchPokemon();
});

function openModal(pokemon) {
  document.getElementById("pokedex-modal").classList.remove("hidden");
  updateModal(pokemon);
}

function updateModal(pokemon) {
  document.getElementById("modal-image").src = pokemon.image;
  document.getElementById("modal-name").textContent = pokemon.name;
}

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + allPokemons.length) % allPokemons.length;
  updateModal(allPokemons[currentIndex]);
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % allPokemons.length;
  updateModal(allPokemons[currentIndex]);
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("pokedex-modal").classList.add("hidden");
});

document.body.classList.add("loading");
const video = document.getElementById("loadingVideo");
const loader = document.getElementById("loader");

video.onended = () => {
  loader.style.display = "none";
  document.body.classList.remove("loading");
};

fetchData();

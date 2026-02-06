function renderPokemons(pokemons) {
  const availableFrames = [
    "fire",
    "electric",
    "grass",
    "normal",
    "poison",
    "water",
  ];

  pokemons.forEach((pokemon) => {
    let type = "classic";

    if (pokemon.types.length > 0) {
      const firstType = pokemon.types[0];
      type = availableFrames.includes(firstType) ? firstType : "normal";
    }

    pokedex.innerHTML += pokemonCardTemplate(pokemon, type);
  });
}

pokedex.addEventListener("click", (event) => {
  const card = event.target.closest(".pokemon-card");
  if (!card) return;

  const index = Array.from(pokedex.children).indexOf(card);
  currentIndex = index;
  openModal(allPokemons[index]);
});

document.getElementById("loadMore").addEventListener("click", () => {
  offset += limit;
  fetchData();
});

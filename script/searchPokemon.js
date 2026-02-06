const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

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

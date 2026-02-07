const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

function searchPokemon() {
  const searchTerm = searchInput.value.toLowerCase();
  pokedex.innerHTML = "";
if (searchTerm === "") {
  renderPokemons(allPokemons);
  return;
}

  const filtered = allPokemons.filter((p) => p.name.includes(searchTerm));
  renderPokemons(filtered);

}
searchInput.addEventListener("input", searchPokemon);
searchBtn.addEventListener("click", searchPokemon);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchPokemon();
});

function pokemonCardTemplate(pokemon, type) {
  return `
    <div class="pokemon-card"
         data-name="${pokemon.name}"
         style="background-image: url('assets/png/${type}.png')">
      <div class="card-header">
        <h3>${pokemon.name}</h3>
        <p class="card-hp">HP: ${pokemon.hp}</p>
      </div>
      <div class="card-image">
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>
      <div class="card-abilities">
        <p>Skills: ${pokemon.abilities.map(a => a.name).join(", ")}</p>
      </div>
      <div class="card-stats">
        <p>Height: ${pokemon.height} m</p>
        <p>Weight: ${pokemon.weight} kg</p>
      </div>
    </div>
  `;
}

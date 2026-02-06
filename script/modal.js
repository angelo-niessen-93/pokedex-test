const modal = document.getElementById("pokedex-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalAbilities = document.getElementById("modal-abilities");
const modalHeight = document.getElementById("modal-height");
const modalWeight = document.getElementById("modal-weight");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const closeBtn = document.getElementById("close-modal");

function updateModal(pokemon) {
  modalImage.src = pokemon.image;
  modalName.textContent = pokemon.name;
  modalAbilities.textContent = `Skills: ${pokemon.abilities.map(a => a.name).join(", ")}`;
  modalHeight.textContent = `Height: ${pokemon.height}m`;
  modalWeight.textContent = `Weight: ${pokemon.weight}kg`;
}

function openModal(pokemon) {
  modal.classList.remove("hidden");
  updateModal(pokemon);
}

function closeModal() {
  modal.classList.add("hidden");
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + allPokemons.length) % allPokemons.length;
  updateModal(allPokemons[currentIndex]);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % allPokemons.length;
  updateModal(allPokemons[currentIndex]);
});

closeBtn.addEventListener("click", closeModal);

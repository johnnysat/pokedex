const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');

const formPokemon = document.querySelector('.form');
const inputPokemon = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 501;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if(data){ 
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.style.display = 'block';
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    inputPokemon.value = '';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Not Found :C';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }
}

formPokemon.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(inputPokemon.value.toLowerCase());
  })

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
  })

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1){ 
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }  
    })


renderPokemon(searchPokemon);
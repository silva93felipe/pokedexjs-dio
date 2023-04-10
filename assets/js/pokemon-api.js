
let pokemonAPi = {};

function convertPokemonApiPokemonModel(pokemon) {
    let pokemonModel = new Pokemon();
    pokemonModel.numberId = pokemon.id
    pokemonModel.name = pokemon.name;

    const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
    const [ typePrincipal ]= types

    pokemonModel.types = types;
    pokemonModel.typePrincipal = typePrincipal;
    pokemonModel.photo = pokemon.sprites.other.dream_world.front_default;
    return pokemonModel;
}

pokemonAPi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((res) => res.json()
            .then(convertPokemonApiPokemonModel)
            );
}

pokemonAPi.getAllPokemons = (offset = 0, limit = 5) => {
    const URL_BASE = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(URL_BASE)
        .then((res) => res.json())
        .then((data) => data.results)
        .then((pokemons) => pokemons.map(pokemonAPi.getPokemonDetail))
        .then((detailsPokemons) => Promise.all(detailsPokemons))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((err) => console.log(err));
}
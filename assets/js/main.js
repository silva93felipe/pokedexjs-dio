
let listaPokemons = document.querySelector(".pokemons");
let btnLoadMorePokemons = document.querySelector("#load");
let limit = 5;
let offset = 0;
let maxRecords = 15;

function geraPokemon(pokemon) {
    return `
        <li class="pokemon ${pokemon.typePrincipal}" >
            <span class="numero">#${pokemon.numberId}</span> 
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`;
}

function loadPokemonItens(offset, limit) {
    pokemonAPi.getAllPokemons(offset, limit).then((pokemons = [])=>{
        
        // FORMA 1 
        // for (let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
    
        //     Dessa forma o JS estava renderizando a cada laço
        //     listaPokemons.innerHTML += (geraPokemon(pokemon));
    
        //     newListPokemons.push(pokemon);
        // }
    
        // FORMA 2
        // const newListPokemons = pokemons.map((pokemon) => {
        //     return geraPokemon(pokemon);
        // });
    
        const newListPokemons = pokemons.map(geraPokemon);
        const listaConvertida = newListPokemons.join("");
    
        listaPokemons.innerHTML += listaConvertida;
    
    });    
}

//Carregar a primeira vez
loadPokemonItens();

btnLoadMorePokemons.addEventListener('click', ()=>{
    offset += limit;

    const qtdRecordMaxPages = offset + limit;
    if(qtdRecordMaxPages >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        btnLoadMorePokemons.parentElement.removeChild(btnLoadMorePokemons);

    }else{
        loadPokemonItens(offset, limit);
    }
})

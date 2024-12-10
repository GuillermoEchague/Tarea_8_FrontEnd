// Función asíncrona para obtener los Pokémon
async function fetchPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');
    const errorMessage = document.getElementById('error-message');

    try {
        // Consumir el endpoint usando Fetch
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parsear la respuesta JSON
        const data = await response.json();
        
        // Iterar sobre los primeros 20 Pokémon
        for (const pokemon of data.results) {
            // Obtener detalles de cada Pokémon
            const pokemonDetailResponse = await fetch(pokemon.url);
            const pokemonDetail = await pokemonDetailResponse.json();
            
            // Crear tarjeta de Pokémon
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            
            pokemonCard.innerHTML = `
                <img src="${pokemonDetail.sprites.front_default}" alt="${pokemonDetail.name}">
                <h2>${pokemonDetail.name}</h2>
            `;
            
            pokemonContainer.appendChild(pokemonCard);
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener Pokémon:', error);
        errorMessage.textContent = `Ocurrió un error: ${error.message}`;
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchPokemon);
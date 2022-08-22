<template>
<div id="Header">
  <h1>Pokedex</h1>
</div>
 <ul data-js="pokedex" class="Container"></ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  created(){
    const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromises = []
    for (let i = 1; i <=898 ; i++){
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
    .then(pokemons => {
    const lisPokemons = pokemons.reduce((accumulator,pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      const stats = pokemon.stats.map(statInfo => statInfo.stat.name)
      const base = pokemon.stats.map((el) => el.base_stat)
        accumulator +=
        `
        <div id="pokedex">
        <ul id="Pokemon">
        <li  id="imagePokemon">
        <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
        <li id="id">Nº${pokemon.id}</id>
        <li id="NomePoke">${pokemon.name}</li>
        <li id="Ocultar">${stats.join('<br>')}</li>
        <li id="Ocultar">${base.join('<br>')}</li>
        <br>
        <li id="Ocultar">Peso: ${pokemon.weight}kg</li>
        <li id="Ocultar">Tamanho: ${pokemon.height}m</li>
        <li id="Type">${types.join(' / ')}</li>
        </li>
        </ul>
        </div>
        `
        return accumulator
    },'')
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = lisPokemons
})
}
fetchPokemon()
}
})
</script>

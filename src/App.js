/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

function App() {
  const url = "https://pokeapi.co/api/v2/type/flying";
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data.pokemon);
    // console.log(data.pokemon);
  };

  return (
    <div className="App">
      <h1 class="title">The Pokedex</h1>
      <div className="pokemon-list">
        {pokemon.map((pokemon) => {
          return (
            <PokemonCard key={pokemon.pokemon.name} pokemon={pokemon.pokemon} />
          );
        })}
      </div>
    </div>
  );
}

export default App;

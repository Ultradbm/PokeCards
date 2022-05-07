/** @format */

import React, { useState, useEffect } from "react";
import "./App.css";
import Tilt from "react-parallax-tilt";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function PokemonCard(pokemon) {
  // const [description, setDescription] = useState("");
  const [pokemonData, setPokemonData] = useState(-1);
  const [pokemonExtraData, setPokemonExtraData] = useState(-1);

  const getPokemonData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`
    );
    if (!response.ok) {
    } else {
      const data = await response.json();
      setPokemonData(data);
    }
  };
  const getPokemonExtraData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon.pokemon.name}`
    );
    if (!response.ok) {
    } else {
      const data = await response.json();
      setPokemonExtraData(data);
      // console.log(data);
    }
  };

  useEffect(() => {
    getPokemonData();
    getPokemonExtraData();
  }, []);

  let description = "";
  if (pokemonExtraData !== -1) {
    description = pokemonExtraData.flavor_text_entries
      .find((element) => {
        return element.language.name === "en";
      })
      .flavor_text.replace(/[]/g, " ");
  }
  let pokemonNo = "";
  let spriteSrc = "";
  if (pokemonData !== -1) {
    spriteSrc = pokemonData.sprites.front_default;
    pokemonNo = pokemonData.id;
  }

  // console.log(pokemon);
  return (
    <div className="card-container">
      <Tilt
        perspective={1500}
        glareEnable
        glareColor="#ff00ff"
        glareMaxOpacity={0.15}
        glarePosition="all"
        glareBorderRadius={"25px"}
      >
        <div className="card-frame">
          <div className="pokemon-card">
            <div className="pokemon-text-container">
              {capitalize(pokemon.pokemon.name)}
              <div className="pokemon-number">
                {pokemonNo ? "No. " + pokemonNo : ""}
              </div>
            </div>

            <img className="pokemon-image pixelated" src={spriteSrc} alt={""} />
            <p>{description}</p>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default PokemonCard;

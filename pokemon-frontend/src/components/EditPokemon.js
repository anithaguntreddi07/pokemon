import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonOwnerName, setPokemonOwnerName] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pokemon`);
        const pokemon = response.data.find(p => p.id === id);
        setPokemon(pokemon);
        if (pokemon) {
          setPokemonName(pokemon.pokemonName);
          setPokemonOwnerName(pokemon.pokemonOwnerName);
          setInitialPositionX(pokemon.initialPositionX);
          setInitialPositionY(pokemon.initialPositionY);
          setSpeed(pokemon.speed);
          setDirection(pokemon.direction);
          setPokemonAbility(pokemon.pokemonAbility);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, [id]);

  const handlePokemonChange = async (name) => {
    setPokemonName(name);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (response.data.abilities.length === 1) {
        setPokemonAbility(response.data.abilities[0].ability.name);
      } else {
        setAbilities(response.data.abilities.map(a => a.ability.name));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const updatedPokemon = {
      id,
      pokemonOwnerName,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
      pokemonName,
      pokemonAbility,
    };
    try {
      await axios.put(`http://localhost:5000/api/edit-pokemon/${id}`, updatedPokemon);
      alert('Pokemon updated successfully!');
      navigate('/list-pokemons'); // Navigate back to list after editing
    } catch (error) {
      console.error(error);
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Pokemon</h1>
      <div>
        <label>Pokemon Owner Name:</label>
        <input type="text" value={pokemonOwnerName} onChange={(e) => setPokemonOwnerName(e.target.value)} />
      </div>
      <div>
        <label>Pokemon Name:</label>
        <input list="pokemon-names" value={pokemonName} onChange={(e) => handlePokemonChange(e.target.value)} />
        <datalist id="pokemon-names">
          {/* Populate with all Pokemon names from your API */}
        </datalist>
      </div>
      <div>
        <label>Pokemon Ability:</label>
        {abilities.length === 1 ? (
          <input type="text" value={pokemonAbility} readOnly />
        ) : (
          <select value={pokemonAbility} onChange={(e) => setPokemonAbility(e.target.value)}>
            {abilities.map(ability => <option key={ability} value={ability}>{ability}</option>)}
          </select>
        )}
      </div>
      <div>
        <label>Initial Position X:</label>
        <input type="text" value={initialPositionX} onChange={(e) => setInitialPositionX(e.target.value)} />
      </div>
      <div>
        <label>Initial Position Y:</label>
        <input type="text" value={initialPositionY} onChange={(e) => setInitialPositionY(e.target.value)} />
      </div>
      <div>
        <label>Speed:</label>
        <input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
      </div>
      <div>
        <label>Direction:</label>
        <input type="text" value={direction} onChange={(e) => setDirection(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Update Pokemon</button>
    </div>
  );
};

export default EditPokemon;

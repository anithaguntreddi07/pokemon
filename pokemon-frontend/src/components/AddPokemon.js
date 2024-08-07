import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AddPokemon.css';

const AddPokemon = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonOwnerName, setPokemonOwnerName] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=100');
        setAllPokemonNames(response.data.results.map(p => p.name));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonNames();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pokemonData = {
      pokemonOwnerName,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
      pokemonName,
      pokemonAbility,
    };
    try {
      await axios.post('http://localhost:5000/api/add-pokemon', pokemonData);
      alert('Pokemon added successfully!');
      navigate('/list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Add Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pokemon Owner Name:</label>
          <input type="text" value={pokemonOwnerName} onChange={(e) => setPokemonOwnerName(e.target.value)} required />
        </div>
        <div>
          <label>Pokemon Name:</label>
          <input list="pokemon-names" value={pokemonName} onChange={(e) => handlePokemonChange(e.target.value)} required />
          <datalist id="pokemon-names">
            {allPokemonNames.map(name => <option key={name} value={name} />)}
          </datalist>
        </div>
        <div>
          <label>Pokemon Ability:</label>
          {abilities.length === 1 ? (
            <input type="text" value={pokemonAbility} readOnly required />
          ) : (
            <select value={pokemonAbility} onChange={(e) => setPokemonAbility(e.target.value)} required>
              <option value="">Select Ability</option>
              {abilities.map(ability => <option key={ability} value={ability}>{ability}</option>)}
            </select>
          )}
        </div>
        <div>
          <label>Initial Position X:</label>
          <input type="number" value={initialPositionX} onChange={(e) => setInitialPositionX(e.target.value)} required />
        </div>
        <div>
          <label>Initial Position Y:</label>
          <input type="number" value={initialPositionY} onChange={(e) => setInitialPositionY(e.target.value)} required />
        </div>
        <div>
          <label>Speed:</label>
          <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} required />
        </div>
        <div>
          <label>Direction:</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} required>
            <option value="">Select Direction</option>
            <option value="North">North</option>
            <option value="East">East</option>
            <option value="South">South</option>
            <option value="West">West</option>
          </select>
        </div>
        <button type="submit">Add Pokemon</button>
      </form>
      <Link to="/list" className="back-link">Back to List</Link>
    </div>
  );
};

export default AddPokemon;

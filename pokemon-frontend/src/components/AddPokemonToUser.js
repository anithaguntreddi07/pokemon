// src/components/AddPokemonToUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPokemon.css';

const AddPokemonToUser = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [noOfPokemon, setNoOfPokemon] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [pokemonOwners, setPokemonOwners] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);

  useEffect(() => {
    const fetchPokemonOwners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pokemon-owners');
        setPokemonOwners(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/');
        setAllPokemonNames(response.data.results.map(p => p.name));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonOwners();
    fetchPokemonNames();
  }, []);

  const handleOwnerChange = async (ownerName) => {
    setSelectedOwner(ownerName);
    try {
      const response = await axios.get(`http://localhost:5000/api/pokemon-by-owner/${ownerName}`);
      setNoOfPokemon(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

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
    const pokemonData = {
      pokemonName,
      pokemonAbility,
      pokemonOwnerName: selectedOwner,
    };
    try {
      await axios.post('http://localhost:5000/api/add-pokemon-to-user', pokemonData);
      alert('Pokemon added successfully to the user!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Add Pokemon to User</h1>
      <div>
        <label className="label">Pokemon Owner:</label>
        <select
          className="select"
          value={selectedOwner}
          onChange={(e) => handleOwnerChange(e.target.value)}
          required
        >
          <option value="">Select Owner</option>
          {pokemonOwners.map((owner) => (
            <option key={owner.id} value={owner.name}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Number of Pokemon:</label>
        <input type="number" className="input" value={noOfPokemon} readOnly />
      </div>
      <div>
        <label className="label">Pokemon Name:</label>
        <input
          list="pokemon-names"
          className="input"
          value={pokemonName}
          onChange={(e) => handlePokemonChange(e.target.value)}
          required
        />
        <datalist id="pokemon-names">
          {allPokemonNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>
      <div>
        <label className="label">Pokemon Ability:</label>
        {abilities.length === 1 ? (
          <input type="text" className="input" value={pokemonAbility} readOnly required />
        ) : (
          <select
            className="select"
            value={pokemonAbility}
            onChange={(e) => setPokemonAbility(e.target.value)}
            required
          >
            {abilities.map((ability) => (
              <option key={ability} value={ability}>
                {ability}
              </option>
            ))}
          </select>
        )}
      </div>
      <button className="button" onClick={handleSubmit}>
        Add Pokemon to User
      </button>
    </div>
  );
};

export default AddPokemonToUser;

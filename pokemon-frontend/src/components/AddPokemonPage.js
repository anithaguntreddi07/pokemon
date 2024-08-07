import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPokemonPage.css';

const AddPokemonPage = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [numberOfPokemons, setNumberOfPokemons] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pokemon-owners');
        setOwners(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOwners();
  }, []);

  const handleOwnerChange = (event) => {
    const selectedOwnerName = event.target.value;
    setSelectedOwner(selectedOwnerName);

    // Find the selected owner and update numberOfPokemons
    const owner = owners.find(owner => owner.name === selectedOwnerName);
    if (owner) {
      setNumberOfPokemons(owner.pokemonCount);
    } else {
      setNumberOfPokemons('');
    }
  };

  const handleSubmit = async () => {
    const pokemonData = {
      pokemonOwnerName: selectedOwner,
      pokemonName,
      pokemonAbility,
      numberOfPokemons
    };
    try {
      await axios.post('http://localhost:5000/api/add-pokemon', pokemonData);
      alert('Pokemon added successfully!');
      setPokemonName('');
      setPokemonAbility('');
      setNumberOfPokemons('');
      setSelectedOwner('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Add Pokemon</h1>
      <form>
        <label className="label">Select Pokemon Owner:</label>
        <select
          value={selectedOwner}
          onChange={handleOwnerChange}
          className="select"
          required
        >
          <option value="">Select an owner</option>
          {owners.map(owner => (
            <option key={owner.name} value={owner.name}>{owner.name}</option>
          ))}
        </select>

        <label className="label">Pokemon Name:</label>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          required
        />

        <label className="label">Pokemon Ability:</label>
        <input
          type="text"
          value={pokemonAbility}
          onChange={(e) => setPokemonAbility(e.target.value)}
          required
        />

        <label className="label">Number of Pokemons:</label>
        <input
          type="number"
          value={numberOfPokemons}
          readOnly
        />

        <button type="button" className="button" onClick={handleSubmit}>Add Pokemon</button>
      </form>
    </div>
  );
};

export default AddPokemonPage;

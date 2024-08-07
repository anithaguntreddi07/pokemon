import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ListPokemons.css';

const ListPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemons();
    fetchOwners(); // Fetch owners or users
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pokemon');
      setPokemons(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/owners');
      setOwners(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-pokemon/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-pokemon/${id}`);
      setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>List of Pokemons</h1>
      <Link to="/add-pokemon-page" className="link">Add Pokemon to Existing Owner</Link>
      <Link to="/add" className="add-button">Add Pokemon</Link>
      
      <h2>Owners List</h2>
      <ul>
        {owners.map(owner => (
          <li key={owner.id}>{owner.name}</li>
        ))}
      </ul>

      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Pokemon Name</th>
            <th>Ability</th>
            <th>Initial Position X</th>
            <th>Initial Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.pokemonOwnerName}</td>
              <td>{pokemon.pokemonName}</td>
              <td>{pokemon.pokemonAbility}</td>
              <td>{pokemon.initialPositionX}</td>
              <td>{pokemon.initialPositionY}</td>
              <td>{pokemon.speed}</td>
              <td>{pokemon.direction}</td>
              <td>
                <button className="action-button edit" onClick={() => handleEdit(pokemon.id)}>Edit</button>
                <button className="action-button delete" onClick={() => handleDelete(pokemon.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPokemons;

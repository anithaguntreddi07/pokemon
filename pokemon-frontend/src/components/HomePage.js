import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonPositions, setPokemonPositions] = useState({});
  const [isPokemonVisible, setIsPokemonVisible] = useState({});
  const [isPokemonFrozen, setIsPokemonFrozen] = useState({});

  useEffect(() => {
    // Fetch users
    axios.get('http://localhost:5000/api/pokemon-owners').then(response => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Fetch pokemons for the selected user
      axios.get('http://localhost:5000/api/pokemon').then(response => {
        const userPokemons = response.data.filter(pokemon => pokemon.pokemonOwnerName === selectedUser);
        setPokemons(userPokemons);

        const initialPositions = {};
        const initialVisibility = {};
        const initialFrozenState = {};

        userPokemons.forEach(pokemon => {
          initialPositions[pokemon.id] = { top: 0, left: 0 };
          initialVisibility[pokemon.id] = true;
          initialFrozenState[pokemon.id] = false;
        });

        setPokemonPositions(initialPositions);
        setIsPokemonVisible(initialVisibility);
        setIsPokemonFrozen(initialFrozenState);
      });
    }
  }, [selectedUser]);

  const handlePokemonGo = (pokemon) => {
    if (isPokemonFrozen[pokemon.id]) return;

    const speed = pokemon.speed; // speed in m/s
    const velocity = pokemon.velocity; // velocity in pixels per second

    const newPosition = { ...pokemonPositions[pokemon.id] };

    const intervalId = setInterval(() => {
      newPosition.left += velocity;
      if (newPosition.left >= 300 || newPosition.left <= 0) {
        clearInterval(intervalId);
        setIsPokemonVisible(prevState => ({ ...prevState, [pokemon.id]: false }));
      } else {
        setPokemonPositions(prevState => ({ ...prevState, [pokemon.id]: newPosition }));
      }
    }, 1000 / speed);
  };

  const handlePokemonFlee = (pokemon) => {
    setIsPokemonVisible(prevState => ({ ...prevState, [pokemon.id]: !prevState[pokemon.id] }));
  };

  const handlePokemonCease = (pokemon) => {
    setIsPokemonFrozen(prevState => ({ ...prevState, [pokemon.id]: !prevState[pokemon.id] }));
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/add">Add Pokémon</a></li>
            <li><a href="/add-pokemon-page">Add Pokémon to Existing User</a></li>
            <li><a href="/list">List Pokémon Owners</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1 className="main-heading">Pokémon Collection</h1>
        <div className="selection-container">
          <label htmlFor="userSelect"><b>List of Pokémon Owners</b></label>
          <select id="userSelect" onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ability</th>
                  <th>Speed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map(pokemon => (
                  <tr key={pokemon.id}>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.ability}</td>
                    <td>{pokemon.speed}</td>
                    <td>
                      <button onClick={() => handlePokemonGo(pokemon)}>Pokemon Go</button>
                      <button onClick={() => handlePokemonFlee(pokemon)}>Pokemon Flee</button>
                      <button onClick={() => handlePokemonCease(pokemon)}>Pokemon Cease</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pokemon-container">
              {pokemons.map(pokemon => (
                isPokemonVisible[pokemon.id] && (
                  <div
                    key={pokemon.id}
                    className="pokemon"
                    style={{
                      top: `${pokemonPositions[pokemon.id].top}px`,
                      left: `${pokemonPositions[pokemon.id].left}px`,
                    }}
                  />
                )
              ))}
            </div>
          </div>
        )}

        <div className="pikachu-image-container">
          <img src="/pikachu.png" alt="Pikachu" className="pikachu-image" />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; anitha@2024 Pokémon Collection. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

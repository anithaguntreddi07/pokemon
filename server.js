const express = require('express');
const cors = require('cors');
//const axios = require('axios');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let pokemonList = [
  // Generation I
  { id: 1, name: 'Pikachu', ability: 'Electric', speed: 2, velocity: 10, pokemonOwnerName: 'Ash' },
  { id: 2, name: 'Charizard', ability: 'Fire', speed: 3, velocity: 15, pokemonOwnerName: 'Ash' },
  { id: 3, name: 'Squirtle', ability: 'Water', speed: 2, velocity: 8, pokemonOwnerName: 'Misty' },
  { id: 4, name: 'Bulbasaur', ability: 'Grass', speed: 1, velocity: 7, pokemonOwnerName: 'Brock' },
  { id: 5, name: 'Jigglypuff', ability: 'Fairy', speed: 1, velocity: 5, pokemonOwnerName: 'Brock' },
  { id: 6, name: 'Meowth', ability: 'Normal', speed: 2, velocity: 6, pokemonOwnerName: 'Jessie' },
  { id: 7, name: 'Eevee', ability: 'Normal', speed: 2, velocity: 9, pokemonOwnerName: 'James' },
  { id: 8, name: 'Gengar', ability: 'Ghost', speed: 3, velocity: 12, pokemonOwnerName: 'Misty' },
  { id: 9, name: 'Onix', ability: 'Rock', speed: 1, velocity: 5, pokemonOwnerName: 'Brock' },
  { id: 10, name: 'Psyduck', ability: 'Water', speed: 2, velocity: 6, pokemonOwnerName: 'Misty' },

  // Generation II
  { id: 11, name: 'Chikorita', ability: 'Grass', speed: 2, velocity: 8, pokemonOwnerName: 'Cyndaquil' },
  { id: 12, name: 'Cyndaquil', ability: 'Fire', speed: 2, velocity: 9, pokemonOwnerName: 'Silver' },
  { id: 13, name: 'Totodile', ability: 'Water', speed: 3, velocity: 10, pokemonOwnerName: 'Gold' },
  { id: 14, name: 'Pichu', ability: 'Electric', speed: 2, velocity: 10, pokemonOwnerName: 'Gold' },
  { id: 15, name: 'Cleffa', ability: 'Fairy', speed: 1, velocity: 5, pokemonOwnerName: 'Silver' },

  // Generation III
  { id: 16, name: 'Treecko', ability: 'Grass', speed: 3, velocity: 11, pokemonOwnerName: 'May' },
  { id: 17, name: 'Torchic', ability: 'Fire', speed: 2, velocity: 9, pokemonOwnerName: 'Brendan' },
  { id: 18, name: 'Mudkip', ability: 'Water', speed: 2, velocity: 8, pokemonOwnerName: 'May' },
  { id: 19, name: 'Wingull', ability: 'Water', speed: 3, velocity: 10, pokemonOwnerName: 'Brendan' },
  { id: 20, name: 'Ralts', ability: 'Psychic', speed: 2, velocity: 7, pokemonOwnerName: 'May' },

  // Generation IV
  { id: 21, name: 'Turtwig', ability: 'Grass', speed: 2, velocity: 8, pokemonOwnerName: 'Dawn' },
  { id: 22, name: 'Chimchar', ability: 'Fire', speed: 3, velocity: 12, pokemonOwnerName: 'Ash' },
  { id: 23, name: 'Piplup', ability: 'Water', speed: 2, velocity: 9, pokemonOwnerName: 'Dawn' },
  { id: 24, name: 'Bidoof', ability: 'Normal', speed: 1, velocity: 6, pokemonOwnerName: 'Barry' },
  { id: 25, name: 'Luxray', ability: 'Electric', speed: 3, velocity: 10, pokemonOwnerName: 'Barry' },

  // Generation V
  { id: 26, name: 'Snivy', ability: 'Grass', speed: 2, velocity: 9, pokemonOwnerName: 'Ash' },
  { id: 27, name: 'Tepig', ability: 'Fire', speed: 2, velocity: 8, pokemonOwnerName: 'Clemont' },
  { id: 28, name: 'Oshawott', ability: 'Water', speed: 2, velocity: 7, pokemonOwnerName: 'Clemont' },
  { id: 29, name: 'Sandile', ability: 'Ground', speed: 2, velocity: 8, pokemonOwnerName: 'Clemont' },
  { id: 30, name: 'Scraggy', ability: 'Dark', speed: 2, velocity: 7, pokemonOwnerName: 'Clemont' },

  // Generation VI
  { id: 31, name: 'Chespin', ability: 'Grass', speed: 2, velocity: 8, pokemonOwnerName: 'Ash' },
  { id: 32, name: 'Fennekin', ability: 'Fire', speed: 2, velocity: 9, pokemonOwnerName: 'Serena' },
  { id: 33, name: 'Frogadier', ability: 'Water', speed: 3, velocity: 10, pokemonOwnerName: 'Serena' },
  { id: 34, name: 'Bunnelby', ability: 'Normal', speed: 2, velocity: 8, pokemonOwnerName: 'Serena' },
  { id: 35, name: 'Pancham', ability: 'Fighting', speed: 2, velocity: 7, pokemonOwnerName: 'Serena' },

  // Generation VII
  { id: 36, name: 'Rowlet', ability: 'Grass', speed: 2, velocity: 8, pokemonOwnerName: 'Ash' },
  { id: 37, name: 'Litten', ability: 'Fire', speed: 2, velocity: 9, pokemonOwnerName: 'Lana' },
  { id: 38, name: 'Popplio', ability: 'Water', speed: 2, velocity: 7, pokemonOwnerName: 'Lana' },
  { id: 39, name: 'Grubbin', ability: 'Bug', speed: 1, velocity: 6, pokemonOwnerName: 'Kiawe' },
  { id: 40, name: 'Rockruff', ability: 'Rock', speed: 2, velocity: 8, pokemonOwnerName: 'Kiawe' },

  // Generation VIII
  { id: 41, name: 'Grookey', ability: 'Grass', speed: 2, velocity: 8, pokemonOwnerName: 'Ash' },
  { id: 42, name: 'Scorbunny', ability: 'Fire', speed: 3, velocity: 10, pokemonOwnerName: 'Goh' },
  { id: 43, name: 'Sobble', ability: 'Water', speed: 2, velocity: 7, pokemonOwnerName: 'Goh' },
  { id: 44, name: 'Skwovet', ability: 'Normal', speed: 2, velocity: 7, pokemonOwnerName: 'Goh' },
  { id: 45, name: 'Corviknight', ability: 'Flying', speed: 2, velocity: 9, pokemonOwnerName: 'Goh' },

  // Additional Pokémon from Various Generations
  { id: 46, name: 'Lucario', ability: 'Fighting', speed: 3, velocity: 11, pokemonOwnerName: 'Ash' },
  { id: 47, name: 'Greninja', ability: 'Water', speed: 3, velocity: 12, pokemonOwnerName: 'Ash' },
  { id: 48, name: 'Gardevoir', ability: 'Psychic', speed: 2, velocity: 8, pokemonOwnerName: 'Dawn' },
  { id: 49, name: 'Togekiss', ability: 'Fairy', speed: 2, velocity: 10, pokemonOwnerName: 'Clemont' },
  { id: 50, name: 'Garchomp', ability: 'Dragon', speed: 3, velocity: 12, pokemonOwnerName: 'Kiawe' }
]; // Expanded and diversified Pokémon data

let pokemonOwners = [
  { id: 1, name: 'Ash', pokemonCount: 10 },
  { id: 2, name: 'Misty', pokemonCount: 5 },
  { id: 3, name: 'Brock', pokemonCount: 8 },
  { id: 4, name: 'Jessie', pokemonCount: 4 },
  { id: 5, name: 'James', pokemonCount: 4 },
  { id: 6, name: 'Clemont', pokemonCount: 6 },
  { id: 7, name: 'Serena', pokemonCount: 5 },
  { id: 8, name: 'Dawn', pokemonCount: 4 },
  { id: 9, name: 'Lana', pokemonCount: 2 },
  { id: 10, name: 'Kiawe', pokemonCount: 2 },
  { id: 11, name: 'Gold', pokemonCount: 1 },
  { id: 12, name: 'Silver', pokemonCount: 1 },
  { id: 13, name: 'Brendan', pokemonCount: 2 },
  { id: 14, name: 'Barry', pokemonCount: 2 },
  { id: 15, name: 'Goh', pokemonCount: 5 }
];

// List Pokémon
app.get('/api/pokemon', (req, res) => {
  res.json(pokemonList);
});

// Add Pokémon
app.post('/api/add-pokemon', (req, res) => {
  const pokemon = req.body;
  pokemonList.push(pokemon);

  // Update owner data
  const ownerIndex = pokemonOwners.findIndex(owner => owner.name === pokemon.pokemonOwnerName);
  if (ownerIndex === -1) {
    pokemonOwners.push({ name: pokemon.pokemonOwnerName, pokemonCount: 1 });
  } else {
    pokemonOwners[ownerIndex].pokemonCount += 1;
  }

  res.status(201).json(pokemon);
});

// List Pokémon Owners
app.get('/api/pokemon-owners', (req, res) => {
  res.json(pokemonOwners);
});

// Edit Pokémon
app.put('/api/edit-pokemon/:id', (req, res) => {
  const { id } = req.params;
  const updatedPokemon = req.body;
  pokemonList = pokemonList.map(pokemon =>
    pokemon.id === parseInt(id) ? updatedPokemon : pokemon
  );
  res.json(updatedPokemon);
});

// Delete Pokémon
app.delete('/api/delete-pokemon/:id', (req, res) => {
  const { id } = req.params;
  const pokemon = pokemonList.find(pokemon => pokemon.id === parseInt(id));
  if (pokemon) {
    pokemonOwners = pokemonOwners.map(owner => {
      if (owner.name === pokemon.pokemonOwnerName) {
        return { ...owner, pokemonCount: owner.pokemonCount - 1 };
      }
      return owner;
    });
  }
  pokemonList = pokemonList.filter(pokemon => pokemon.id !== parseInt(id));
  res.status(204).end();
});

// Get Pokémons by owner
app.get('/api/users/:userId/pokemons', (req, res) => {
  const { userId } = req.params;
  const user = pokemonOwners.find(owner => owner.id === parseInt(userId));
  if (user) {
    const userPokemons = pokemonList.filter(pokemon => pokemon.pokemonOwnerName === user.name);
    res.json(userPokemons);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

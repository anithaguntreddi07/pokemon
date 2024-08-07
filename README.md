
# Pokémon

This application allows users to manage Pokémon, view Pokémon owners, and interact with Pokémon on a graphical interface. The application is built with React for the frontend and Express for the backend.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Detailed Explanation](#detailed-explanation)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
    
    git clone https://github.com/your-username/pokemon-management.git
    cd pokemon-frontend
    

2. Install frontend dependencies:
    
    cd client
    npm install
    # or
    yarn install
   

3. Install backend dependencies:
    
    cd ../server
    npm install
    # or
    yarn install
   

## Running the Application

### Start the Backend Server

1. Navigate to the `server` directory:
    cd server

2. Start the server:
 
    npm start
    # or
    yarn start
 

3. The backend server will be running at `http://localhost:5000`.

### Start the Frontend Application

1. Navigate to the `client` directory:
    
    cd client
   

2. Start the React application:
   
    npm start
    # or
    yarn start
    

3. The frontend application will be running at `http://localhost:3000`.

## Project Structure

pokemon-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddPokemon.js
│   │   ├── AddPokemonPage.js
│   │   ├── EditPokemon.js
│   │   ├── HomePage.js
│   │   ├── ListPokemons.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── App.css
├── server.js
├── .gitignore
├── README.md
└── package.json

## Detailed Explanation

### Backend (`server/index.js`)

The backend server is an Express application that provides APIs to manage Pokémon and Pokémon owners. It includes endpoints for listing, adding, editing, and deleting Pokémon, as well as listing Pokémon owners.

- **Endpoints:**
  - `GET /api/pokemon`: Lists all Pokémon.
  - `POST /api/add-pokemon`: Adds a new Pokémon.
  - `GET /api/pokemon-owners`: Lists all Pokémon owners.
  - `PUT /api/edit-pokemon/:id`: Edits a Pokémon by ID.
  - `DELETE /api/delete-pokemon/:id`: Deletes a Pokémon by ID.

The server uses `cors` to handle cross-origin requests and `express.json` to parse JSON request bodies.

### Frontend (`client/src/App.js` and Components)

The frontend is a React application that interacts with the backend server to manage and display Pokémon and Pokémon owners. It uses React Router for navigation and includes several components:

- **HomePage:** Displays a dropdown to select Pokémon owners, a table of their Pokémon, and controls to interact with the Pokémon.
- **AddPokemon:** A form to add new Pokémon.
- **EditPokemon:** A form to edit existing Pokémon.
- **ListPokemons:** Displays a list of all Pokémon.
- **AddPokemonPage:** Another form to add new Pokémon with additional details.

The application uses state management to handle the list of Pokémon and their owners, and it updates the UI dynamically based on user interactions.

### CSS Styling

The application uses basic CSS for styling, ensuring the UI is responsive and user-friendly. The styles are defined in the `client/src/App.css` file, which includes base styles, responsive styles, and specific styles for different components.

### Example Usage

1. **Add a Pokémon:**
   - Navigate to the "Add Pokemon" page.
   - Fill in the details and submit the form.
   - The Pokémon will be added to the list and associated with the specified owner.

2. **View Pokémon Owners:**
   - Navigate to the "List Pokemons" page.
   - The page displays all Pokémon along with their abilities and owners.

3. **Interact with Pokémon:**
   - On the HomePage, select a Pokémon owner from the dropdown.
   - The owner's Pokémon will be listed.
   - Use the buttons to make the Pokémon move, flee, or cease.
   
### Features

1. **Home Page**: 
   - Dropdown to select a Pokémon owner.
   - List of Pokémon owned by the selected owner.
   - Buttons to move, hide, and freeze Pokémon.

2. **List Page**:
   - List all Pokémon with their details.
   - Edit and delete functionality.

3. **Add Pokémon**:
   - Form to add a new Pokémon.

4. **Add Pokémon to Existing Owner**:
   - Dropdown to select an existing owner.
   - Form to add a new Pokémon to the selected owner.

### Future Improvements

- Persist data using a database.
- Enhance the UI for better user experience.
- Implement user authentication.


This project demonstrates a simple yet comprehensive Pokémon management system using React and Express. The backend provides robust APIs, while the frontend offers an intuitive interface for managing and interacting with Pokémon.
Features

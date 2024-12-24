<img src="Images/interface.png" alt="Thought Space Web App Interface" width="100%">

## Thought Space

Thought Space is a web application designed to let users freely express and share their thoughts. Inspired by a virtual "thought cloud," the app provides a calming and creative space for users to submit, view, and reflect on their thoughts.

## Features

- **Thought Space:** Displays user-submitted thoughts in a random, free-flowing layout.
- **Thought Input:** A simple interface for users to submit their thoughts.
- **Responsive Design:** Fully optimized for both desktop and mobile screens.
- **Calming UI:** A soothing color palette to create a relaxing experience.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js
- **Database:** MongoDB
- **Styling:** CSS with animations

## Installation

### Method 1: Automatic Installation

1. Download the latest release from the [ThoughtSpace v0.1.0 Release](https://github.com/shadan-pk/Thought-Space/releases/tag/v0.1.0).
2. Extract the downloaded folder.
3. Locate the `ThoughtSpace.bat` file in the extracted folder.
4. Run the `ThoughtSpace.bat` file:
   - Follow the prompts to provide your MongoDB connection string.
   - The script will automatically install all required dependencies and start both the frontend and backend servers.
5. Once completed, open the app in your browser at `http://localhost:3000`.

### Method 2: Manual Installation

1. Clone the repository:
   ```bash
   https://github.com/shadan-pk/Thought-Space.git
   ```

2. Navigate to the project directory:
   ```bash
   cd thought-space
   ```

3. Install dependencies:
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd ../backend
     npm install
     ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

5. Start the development servers:
   - Backend:
     ```bash
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```

6. Open the app in your browser at `http://localhost:3000`.

## Usage

1. Submit your thoughts using the input field at the bottom.
2. View your thoughts scattered in the main thought space.

## Contribution

We welcome contributions to improve Thought Space! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

### Stay Inspired
Thought Space is designed to foster creativity, mindfulness, and connection. Share your thoughts and explore the power of collective inspiration!

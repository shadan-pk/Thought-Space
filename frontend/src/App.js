import React, { useState } from 'react';
import './App.css'; // Import styles for the App
import axios from 'axios';
import { FaHistory } from 'react-icons/fa'; // Importing history icon from react-icons
import ThoughtInput from './components/ThoughtInput'; // Import the ThoughtInput component
import ThoughtSpace from './components/ThoughtSpace'; // Import the ThoughtSpace component

function App() {
  const [thought, setThought] = useState('');
  const [thoughts, setThoughts] = useState([]); // To store and display thoughts
  const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

  const handleInputChange = (event) => {
    setThought(event.target.value);
  };

  const handleSendClick = async () => {
    if (thought.trim()) {
      try {
        const randomRotation = Math.random() * 20 - 10;
        const containerWidth = 500; // Width of the container (adjust as needed)
        const containerHeight = 500; // Height of the container (adjust as needed)
        const initialLeft = Math.random() * (containerWidth - 300); // Random left position within the container
        const initialTop = Math.random() * (containerHeight - 300); // Random top position within the container

        const newThought = {
          content: thought,
          rotation: randomRotation,
          left: initialLeft,
          top: initialTop,
        };

        const response = await axios.post('http://localhost:5000/thoughts', newThought);
        setThoughts((prevThoughts) => [
          { ...newThought, _id: response.data._id }, // Include backend ID
          ...prevThoughts,
        ]);
        setThought(''); // Clear the input field
      } catch (error) {
        console.error('Error sending thought:', error);
      }
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleThoughtMove = (id, left, top) => {
    setThoughts((prevThoughts) =>
      prevThoughts.map((thought) =>
        thought._id === id ? { ...thought, left, top } : thought
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ThoughtSpace</h1>
      </header>
      <ThoughtInput
        thought={thought}
        onInputChange={handleInputChange}
        onSendClick={handleSendClick}
      />
      <ThoughtSpace thoughts={thoughts} onThoughtMove={handleThoughtMove} />

      <div className="hole-effect"></div>

      {/* History Button */}
            <div className="history-button" onClick={toggleHistory}>
              <FaHistory size={24} color="#fff" />
            </div>
      
            {/* Display History */}
            {showHistory && (
              <div className="history-panel">
                <h3>History of Thoughts</h3>
                {thoughts.length === 0 ? (
                  <p>No thoughts yet...</p>
                ) : (
                  thoughts.map((thought, index) => (
                    <div key={index} className="thought-history-item">
                      {thought.content}
                    </div>
                  ))
                )}
              </div>
            )}

    </div>
  );
}

export default App;
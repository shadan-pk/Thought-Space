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
        const randomLeft = Math.random() * 80;
        const randomTop = Math.random() * 80;

        const newThought = {
          content: thought,
          rotation: randomRotation,
          left: randomLeft,
          top: randomTop,
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

  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <h1>Thought Space</h1>
        <p>A creative space to share and reflect on your thoughts.</p>
      </header>

      {/* Thought Input Section */}
      <ThoughtInput thought={thought} onInputChange={handleInputChange} onSendClick={handleSendClick} />

      {/* Thought Space (Display Thoughts) */}
      <ThoughtSpace thoughts={thoughts} />

      {/* Footer Section */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Thought Space</p>
      </footer>

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














// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';
// import ThoughtInput from '../src/components/ThoughtInput';
// import ThoughtSpace from '../src/components/ThoughtSpace';

// function App() {
//   const [thought, setThought] = useState('');
//   const [thoughts, setThoughts] = useState([]);

//   const handleInputChange = (event) => {
//     setThought(event.target.value);
//   };

//   const handleSendClick = async () => {
//     if (thought.trim()) {
//       try {
//         const randomRotation = Math.random() * 20 - 10; 
//         const randomLeft = Math.random() * 80; 
//         const randomTop = Math.random() * 80;

//         const newThought = {
//           content: thought,
//           rotation: randomRotation,
//           left: randomLeft,
//           top: randomTop,
//         };

//         console.log('Sending thought:', newThought);

//         const response = await axios.post('http://localhost:5000/thoughts', newThought);

//         setThoughts((prevThoughts) => [
//           { ...newThought, _id: response.data._id }, // Include backend ID
//           ...prevThoughts,
//         ]);
//         setThought('');
//       } catch (error) {
//         console.error('Error sending thought:', error);
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Thought Space</h1>
//         <p>A creative space to share and reflect on your thoughts.</p>
//       </header>
//       <ThoughtInput
//         thought={thought}
//         onInputChange={handleInputChange}
//         onSendClick={handleSendClick}
//       />
//       <ThoughtSpace thoughts={thoughts} />
//       <footer>
//         <p>&copy; {new Date().getFullYear()} Thought Space</p>
//       </footer>
//     </div>
//   );
// }

// export default App;







// import React, { useState } from 'react';
// import './App.css'; // Import styles for the App
// import axios from 'axios';
// import ThoughtInput from './components/ThoughtInput'; // Import the ThoughtInput component
// import ThoughtSpace from './components/ThoughtSpace'; // Import the ThoughtSpace component

// function App() {
//   // State to hold the user's thought input
//   const [thought, setThought] = useState('');
//   const [thoughts, setThoughts] = useState([]); // To store and display thoughts

//   // Handle text area change
//   const handleInputChange = (event) => {
//     setThought(event.target.value);
//   };

//   // Handle button click to send the thought
//   const handleSendClick = async () => {
//     if (thought.trim()) {
//       try {
//         // Generate random values for position and rotation only once when the message is sent
//         const randomRotation = Math.random() * 20 - 10; // Rotate between -10 and 10 degrees
//         const randomLeft = Math.random() * 80; // Random left position (percentage)
//         const randomTop = Math.random() * 80; // Random top position (percentage)

//         // Create the thought object with the random values
//         const newThought = {
//           content: thought,
//           rotation: randomRotation,
//           left: randomLeft,
//           top: randomTop,
//         };

//         // Send the thought to the backend API (if backend is required)
//         const response = await axios.post('http://localhost:5000/thoughts', newThought);

//         // Add the new thought to the state
//         setThoughts((prevThoughts) => [response.data, ...prevThoughts]);
//         setThought(''); // Clear the input field
//       } catch (error) {
//         console.error('Error sending thought:', error);
//       }
//     }
//   };

//   return (
//     <div className="App">
//       {/* Header Section */}
//       <header className="App-header">
//         <h1>Thought Space</h1>
//         <p>A creative space to share and reflect on your thoughts.</p>
//       </header>

//       {/* Thought Input Section */}
//       <ThoughtInput thought={thought} onInputChange={handleInputChange} onSendClick={handleSendClick} />

//       {/* Thought Space (Display Thoughts) */}
//       <ThoughtSpace thoughts={thoughts} />

//       {/* Footer Section */}
//       <footer>
//         <p>&copy; {new Date().getFullYear()} Thought Space</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

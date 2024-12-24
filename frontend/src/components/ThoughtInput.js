import React from 'react';
import './ThoughtInput.css'; // Styles for the ThoughtInput component

function ThoughtInput({ thought, onInputChange, onSendClick }) {
  return (
    <div className="thought-input">
      <textarea
        value={thought}
        onChange={onInputChange}
        placeholder="What's on your mind?"
        aria-label="Thought Input"
      ></textarea>
      <button className="send-button" onClick={onSendClick}>
        Send
      </button>
    </div>
  );
}

export default ThoughtInput;

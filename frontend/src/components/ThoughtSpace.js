import React from 'react';
import './ThoughtSpace.css'; // Styles for the ThoughtSpace component

function ThoughtSpace({ thoughts }) {
  return (
    <div className="thought-space">
      {thoughts.length === 0 ? (
        <p>No thoughts yet...</p>
      ) : (
        thoughts.map((thought) => (
          <div
            key={thought._id}
            className="thought-item"
            style={{
              transform: `rotate(${thought.rotation}deg)`,
              left: `${thought.left}%`,
              top: `${thought.top}%`,
            }}
          >
            {thought.content}
          </div>
        ))
      )}
    </div>
  );
}

export default ThoughtSpace;

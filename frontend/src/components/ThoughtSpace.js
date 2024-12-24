import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ThoughtSpace.css';

function ThoughtSpace({ thoughts, onThoughtMove }) {
  const thoughtSpaceRef = useRef(null);
  const previousThoughtsRef = useRef([]);

  const [draggingThought, setDraggingThought] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState({});

  useEffect(() => {

    // Identify newly added thoughts
    const previousThoughts = previousThoughtsRef.current.map((t) => t._id);
    const newThoughts = thoughts.filter((thought) => !previousThoughts.includes(thought._id));

    // Set initial positions for new thoughts
    newThoughts.forEach((newThought) => {
      setPositions((prevPositions) => ({
        ...prevPositions,
        [newThought._id]: { left: newThought.left, top: newThought.top },
      }));
      if (onThoughtMove) {
        onThoughtMove(newThought._id, newThought.left, newThought.top);
      }
    });

    // Update previous thoughts reference
    previousThoughtsRef.current = thoughts;
  }, [thoughts, onThoughtMove]); // Runs whenever `thoughts` changes

  // Dragging handlers
  const onMouseDown = (e, thought) => {
    setDraggingThought(thought);
    const initialPosition = positions[thought._id] || { left: thought.left, top: thought.top };
    setOffset({
      x: e.clientX - initialPosition.left,
      y: e.clientY - initialPosition.top,
    });
    e.target.classList.add('grabbing'); // Change cursor when dragging starts
  };

  const onMouseMove = useCallback((e) => {
    if (!draggingThought) return;

    const thoughtItem = document.querySelector(`[data-id="${draggingThought._id}"]`);
    if (thoughtItem) {
      const newLeft = e.clientX - offset.x;
      const newTop = e.clientY - offset.y;
      thoughtItem.style.left = `${newLeft}px`;
      thoughtItem.style.top = `${newTop}px`;

      setPositions((prevPositions) => ({
        ...prevPositions,
        [draggingThought._id]: { left: newLeft, top: newTop },
      }));

      if (onThoughtMove) {
        onThoughtMove(draggingThought._id, newLeft, newTop); // Update position
      }
    }
  }, [draggingThought, offset, onThoughtMove]);

  const onMouseUp = useCallback(() => {
    if (draggingThought) {
      const thoughtItem = document.querySelector(`[data-id="${draggingThought._id}"]`);
      if (thoughtItem) {
        thoughtItem.classList.remove('grabbing');
      }
    }

    setDraggingThought(null);
  }, [draggingThought]);

  // Add event listeners to handle dragging globally
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className="thought-space" ref={thoughtSpaceRef}>
      {thoughts.length === 0 ? (
        <p>No thoughts yet...</p>
      ) : (
        thoughts.map((thought) => {
          const position = positions[thought._id] || { left: thought.left, top: thought.top };
          return (
            <div
              key={thought._id}
              data-id={thought._id} // Use data-id for easier DOM targeting
              className="thought-item"
              style={{
                transform: `rotate(${thought.rotation}deg)`,
                left: `${position.left}px`,
                top: `${position.top}px`,
              }}
              onMouseDown={(e) => onMouseDown(e, thought)} // Start dragging
            >
              {thought.content}
            </div>
          );
        })
      )}
    </div>
  );
}

export default ThoughtSpace;

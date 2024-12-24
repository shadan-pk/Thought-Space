import React, { useState, useEffect } from 'react';
import './App.css'; // Include your styles

const ThoughtItem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const thoughtItemRef = React.useRef(null);

  useEffect(() => {
    const thoughtItem = thoughtItemRef.current;

    const onMouseMove = (e) => {
      if (isDragging) {
        // Update the position based on the mouse movement
        thoughtItem.style.left = `${e.clientX - offsetX}px`;
        thoughtItem.style.top = `${e.clientY - offsetY}px`;
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      thoughtItem.style.cursor = 'grab'; // Reset cursor when dragging stops
    };

    // Attach the events to the document to handle dragging anywhere on the page
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, offsetX, offsetY]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    const boundingRect = thoughtItemRef.current.getBoundingClientRect();
    setOffsetX(e.clientX - boundingRect.left); // Correcting the offset
    setOffsetY(e.clientY - boundingRect.top);  // Correcting the offset
    thoughtItemRef.current.style.cursor = 'grabbing'; // Change cursor to grabbing
  };

  return (
    <div
      ref={thoughtItemRef}
      className="thought-item"
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        cursor: 'grab', // Initial cursor style
        top: '400px', // Initial position
        left: '400px', // Initial position
      }}
    >
      Your draggable message here
    </div>
  );
};

export default ThoughtItem;

// Generate random values for X and Y
const randomX = Math.random() * 100 + 'px'; // Random value between 0 and 100px for X-axis
const randomY = Math.random() * 100 + 'px'; // Random value between 0 and 100px for Y-axis

// Set the CSS variables dynamically
document.documentElement.style.setProperty('--random-x', randomX);
document.documentElement.style.setProperty('--random-y', randomY);

// Optionally, trigger the animation here
const thoughtItem = document.querySelector('.thought-item');
thoughtItem.classList.add('throw');


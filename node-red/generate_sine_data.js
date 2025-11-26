const timestamp = Date.now(); // Current timestamp in milliseconds
const frequency = 1; // 1 Hz (one cycle per second)
const amplitude = 0.5; // Peak value of the wave
const phaseShift = 0; // Initial phase offset in radians

const timeInSeconds = timestamp / 1000;

// Calculate the angle for the sine function.
// 2 * Math.PI ensures a full cycle for a frequency of 1 Hz.
const angle = 2 * Math.PI * frequency * timeInSeconds + phaseShift;

// Calculate the sine wave value.
const value = amplitude * (Math.sin(angle) + 1);
msg.payload = value;

return msg;

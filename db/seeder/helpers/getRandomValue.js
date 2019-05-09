export default object => {
  if(!object) return Math.random() > 0.5; // Boolean
  return object[Math.floor(Math.random() * object.length)]; // Array
};
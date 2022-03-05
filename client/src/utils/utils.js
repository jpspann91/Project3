
const getObjectID = (size = 24) => {
  const chars = '0123456789abcdef';

  let id = '';
  for (let i = 0; i < size; i++) {
    id += chars[Math.floor(Math.random()*chars.length)]
  }
  return id
}

module.exports = {
  getObjectID,
};
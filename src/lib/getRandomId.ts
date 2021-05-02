const getRandomId = (prefix = '') => {
  const randomId = Math.random().toString(36).substr(2, 9);
  return prefix + randomId;
};

export default getRandomId;

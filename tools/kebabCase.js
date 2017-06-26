module.exports = function kebabCase(str) {
  return str.replace(/\s|\W/g, "-").replace(/[A-Z]/g, match => match.toLowerCase());
};



const checkBody = (req, inputs) => inputs.every(el => req[el]?.trim());

module.exports = checkBody; 
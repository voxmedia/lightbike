module.exports = function(str) {
  if (str.length > 80) {
    return str.substr(0, 40) + '...' + str.substr(str.length-40, str.length);
  }
  return str;
}
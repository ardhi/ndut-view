const toggleButton = require('./toggle-button')

module.exports = function (content, opts = {}) {
  return toggleButton.call(this, content, opts, true)
}

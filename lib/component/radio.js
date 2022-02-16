const checkbox = require('./checkbox')

module.exports = function (content, opts = {}) {
  return checkbox.call(this, content, opts, true)
}

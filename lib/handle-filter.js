const iterator = require('./iterator')

const handler = function (name, mod) {
  const { _ } = this.ndut.helper
  if (_.isFunction(mod)) mod = mod.bind(this)
  this.ndutView.env.addFilter(name, mod)
}

module.exports = async function () {
  iterator.call(this, 'filter', handler.bind(this))
}

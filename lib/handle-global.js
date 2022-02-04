const iterator = require('./iterator')

const handler = function (name, mod) {
  const { _ } = this.ndut.helper
  if (_.isFunction(mod)) mod = mod.bind(this)
  this.ndutView.env.addGlobal(name, mod)
}

module.exports = async function () {
  iterator.call(this, 'global', handler.bind(this))
}

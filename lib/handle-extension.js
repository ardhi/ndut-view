const iterator = require('./iterator')

const handler = function (name, mod) {
  const { _ } = this.ndut.helper
  if (_.isFunction(mod)) mod = mod.call(this)
  this.ndutView.env.addGlobal(name, mod)
}

module.exports = async function () {
  await iterator.call(this, 'extension', handler.bind(this))
}

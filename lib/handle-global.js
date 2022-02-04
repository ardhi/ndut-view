const iterator = require('./iterator')

const handler = function (name, mod) {
  const { _ } = this.ndut.helper
  if (_.isFunction(mod)) mod = mod.bind(this)
  this.ndutView.env.addGlobal(name, mod)
}

module.exports = async function () {
  if (this.ndutI18N) {
    this.ndutView.env.addGlobal('t', this.ndutI18N.helper.t)
    this.ndutView.env.addGlobal('te', this.ndutI18N.helper.exists)
  }
  iterator.call(this, 'global', handler.bind(this))
}

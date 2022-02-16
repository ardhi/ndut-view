module.exports = async function () {
  const { _, fs, getNdutConfig } = this.ndut.helper
  const cfg = getNdutConfig('ndut-view')
  let handler = function (name, content, options = {}) {
    let file = `${cfg.dir}/lib/component/${_.kebabCase(name)}.js`
    if (fs.existsSync(file)) return require(file).call(this, content, options)
    file = `${cfg.dir}/lib/component/_misc.js`
    return require(file).call(this, name.toLowerCase(), content, options)
  }
  handler = handler.bind(this)
  this.ndutView.env.addGlobal('component', handler)
  this.ndutView.env.addGlobal('c', handler)
}

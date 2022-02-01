const path = require('path')

module.exports = async function (type, handler) {
  const { _, getConfig, getNdutConfig, fastGlob } = this.ndut.helper
  const config = getConfig()
  for (const n of config.nduts) {
    const cfg = getNdutConfig(n)
    const files = await fastGlob(`${cfg.dir}/ndutView/${type}/*.js`)
    for (const f of files) {
      const name = _.camelCase(`${cfg.alias} ${path.basename(f, '.js')}`)
      const mod = require(f)
      handler.call(this, name, mod)
    }
  }
}

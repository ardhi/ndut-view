const path = require('path')

module.exports = async function (type, handler) {
  const { _, fastGlob, iterateNduts } = this.ndut.helper
  await iterateNduts(async function (cfg) {
    const files = await fastGlob(`${cfg.dir}/ndutView/${type}/*.js`)
    for (const f of files) {
      const name = _.camelCase(`${cfg.alias} ${path.basename(f, '.js')}`)
      const mod = require(f)
      handler.call(this, name, mod)
    }
  })
}

// TODO: caching
module.exports = function (name, locals, request) {
  const { _, getNdutConfig, getConfig } = this.ndut.helper
  const { minify } = this.ndutView.helper
  const config = getConfig()
  const cfg = getNdutConfig('ndut-view')
  const themeDef = this.ndutView.helper.detectTheme(request)
  const getCfg = () => {
    const cfgStatic = getNdutConfig('ndut-static')
    return {
      staticPrefix: cfgStatic.prefix,
      theme: _.omit(themeDef, ['dir'])
    }
  }
  const env = this.ndutView.env
  env.addGlobal('getCfg', getCfg)
  let result = env.render(name, locals, themeDef.name)
  if (cfg.minify && !config.debug) result = minify(result, cfg.minify)
  return result
}

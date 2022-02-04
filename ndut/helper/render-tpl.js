// TODO: caching
module.exports = function (name, locals, request) {
  const { _, getNdutConfig, getConfig } = this.ndut.helper
  const { minify } = this.ndutView.helper
  const config = getConfig()
  const cfg = getNdutConfig('ndut-view')
  const themeDef = this.ndutView.helper.detectTheme(request)
  const env = this.ndutView.env
  const getCfg = () => {
    const cfgStatic = getNdutConfig('ndut-static')
    return {
      staticPrefix: cfgStatic.prefix,
      lang: request.lang,
      theme: _.omit(themeDef, ['dir'])
    }
  }
  env.addGlobal('getCfg', getCfg)
  if (request.i18n) {
    this.ndutView.env.addGlobal('t', request.i18n.t)
    this.ndutView.env.addGlobal('te', request.i18n.exists)
  }
  let result = env.render(name, locals, themeDef.name)
  if (cfg.minify && !config.debug) result = minify(result, cfg.minify)
  return result
}

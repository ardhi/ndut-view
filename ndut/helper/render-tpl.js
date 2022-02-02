// TODO: caching

module.exports = function (name, locals, request) {
  const { getNdutConfig, getConfig } = this.ndut.helper
  const { minify } = this.ndutView.helper
  const config = getConfig()
  const cfg = getNdutConfig('ndut-view')
  let result = this.ndutView.env.render(name, locals, request)
  if (cfg.minify && !config.debug) result = minify(result, cfg.minify)
  return result
}

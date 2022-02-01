// TODO: caching

module.exports = function (name, locals) {
  const { getNdutConfig } = this.ndut.helper
  const { minify } = this.ndutView.helper
  const cfg = getNdutConfig('ndut-view')
  let result = this.ndutView.env.render(name, locals)
  if (cfg.minify) result = minify(result, cfg.minify)
  return result
}

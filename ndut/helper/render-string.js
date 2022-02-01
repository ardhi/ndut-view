module.exports = function (text, locals) {
  const { getNdutConfig } = this.ndut.helper
  const { minify } = this.ndutView.helper
  const cfg = getNdutConfig('ndut-view')
  let result = this.ndutView.env.renderString(text, locals)
  if (cfg.minify) result = minify(result, cfg.minify)
  return result
}

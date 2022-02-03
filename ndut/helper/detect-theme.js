module.exports = function (request, defIfNotFound = true) {
  const { _, getNdutConfig } = this.ndut.helper
  const options = getNdutConfig('ndut-view')
  let theme = 'default'
  if (options.theme === 'auto') theme = _.get(request, 'site.pref.theme', 'default')
  else theme = options.theme
  const item = _.find(this.ndutView.themes, { name: theme })
  if (item) return item
  return defIfNotFound ? _.find(this.ndutView.themes, { name: 'default'}) : null
}

module.exports = function (name, defIfNotFound = true) {
  const { _ } = this.ndut.helper
  const theme = _.find(this.ndutView.themes, { name })
  if (theme) return theme
  return defIfNotFound ? _.find(this.ndutView.themes, { name: 'default' }) : null
}

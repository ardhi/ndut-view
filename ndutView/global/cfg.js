module.exports = function () {
  const { getNdutConfig } = this.ndut.helper
  const cfgStatic = getNdutConfig('ndut-static')
  return {
    staticPrefix: cfgStatic.prefix
  }
}

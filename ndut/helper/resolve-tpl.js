const path = require('path')

module.exports = function (name, defTheme = 'default') {
  const { _, fs, getNdutConfig } = this.ndut.helper
  let [ ns, file, theme ] = name.split(':')
  if (_.isEmpty(file)) {
    file = ns
    ns = 'app'
  }
  theme = theme || defTheme
  const cfg = getNdutConfig(ns)
  if (!cfg) throw new Error(`Unknwon namespace '${ns}'`)
  if (file[0] === '.') throw new Error('Relative path is unsupported')
  let ext = path.extname(file)
  if (_.isEmpty(ext)) ext = '.html'
  let newFile = null
  if (theme !== 'default') {
    const tcfg = getNdutConfig(theme)
    if (tcfg) {
      newFile = `${tcfg.dir}/ndutView/theme/${cfg.alias}/${_.trimStart(file, '/')}${ext}`
      if (!fs.existsSync(newFile)) newFile = null
    }
  }
  if (!newFile) newFile = `${cfg.dir}/ndutView/template/${_.trimStart(file, '/')}${ext}`
  return newFile
}

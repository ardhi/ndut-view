const nunjucks = require('nunjucks')
const path = require('path')

module.exports = function (scope, opts) {
  const { _, fs, getConfig, getNdutConfig, aneka } = scope.ndut.helper
  const { renderTpl } = scope.ndutRoute.helper
  const { chokidar } = scope.ndutExtra.helper
  const config = getConfig()
  if (config.debug) opts.watch = true

  const filename2name = (filename = '') => {
    let [dir, file] = filename.split('/ndutView/template/')
    let theme = 'default'
    if (!file) {
      let [ndir, nfile] = filename.split('/ndutView/theme/')
      if (!nfile) return { filename }
      const [alias, ...files] = nfile.split('/')
      file = files.join('/')
      const cfgTheme = getNdutConfig(ndir)
      theme = cfgTheme.alias
      const cfg = getNdutConfig(alias)
      dir = cfg.dir
      filename = `${cfg.dir}/ndutView/template/${file}`
    }
    let name
    for (const n of config.nduts) {
      const cfg = getNdutConfig(n)
      if (cfg.dir.startsWith(dir)) {
        const po = path.parse(file)
        const base = '/' + po.dir
        name = `${cfg.alias}:${base === '/' ? '' : base}/${po.name}:${theme}`
      }
    }
    console.log(name, filename)
    return { name, filename }
  }

  const Loader = nunjucks.Loader.extend({
    init: function () {
      if (opts.watch) {
        const paths = []
        for (const n of config.nduts) {
          const cfg = getNdutConfig(n)
          const dirs = [
            `${cfg.dir}/ndutView/template`,
            `${cfg.dir}/ndutView/theme`
          ]
          for (const d of dirs) {
            if (fs.existsSync(d)) paths.push(d)
          }
        }
        if (paths.length > 0) {
          const watcher = chokidar.watch(paths)
          watcher.on('all', (evt, fname) => {
            fname = aneka.pathResolve(fname)
            if (['add', 'change', 'unlink'].includes(evt)) {
              const { name, filename } = filename2name(fname)
              if (name) this.emit('update', name, filename)
            }
          })
          watcher.on('error', err => {
            scope.log.error(err.message)
          })
        }
      }
    },
    getSource: function (name, theme) {
      const { source, file } = renderTpl(name, 'ndutView', theme)
      return { src: source, path: file }
    }
  })

  return Loader
}
const nunjucks = require('nunjucks')
const path = require('path')

module.exports = function (scope, opts) {
  const { _, fs, getConfig, getNdutConfig, aneka } = scope.ndut.helper
  const { renderTpl } = scope.ndutRoute.helper
  const { chokidar } = scope.ndutExtra.helper
  const config = getConfig()
  if (config.debug) opts.watch = true

  const filename2name = (filename = '') => {
    let [ns, file] = filename.split('/ndutView/template/')
    if ((file || '').startsWith('override/')) {
      file = file.slice(9)
      const [newNs, ...files] = file.split('/')
      file = files.join('/')
      const cfg = getNdutConfig(newNs)
      ns = cfg.dir
      filename = `${cfg.dir}/ndutView/template/${file}`
    }
    let name
    for (const n of config.nduts) {
      const cfg = getNdutConfig(n)
      if (cfg.dir.startsWith(ns)) {
        const po = path.parse(file)
        const dir = '/' + po.dir
        name = `${cfg.alias}:${dir === '/' ? '' : dir}/${po.name}`
      }
    }
    return { name, filename }
  }

  const Loader = nunjucks.Loader.extend({
    init: function () {
      if (opts.watch) {
        const paths = []
        for (const n of config.nduts) {
          const cfg = getNdutConfig(n)
          const dir = `${cfg.dir}/ndutView/template`
          if (fs.existsSync(dir)) paths.push(dir)
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
    getSource: function (name) {
      const { source, file } = renderTpl(name, 'ndutView')
      return { src: source, path: file }
    }
  })

  return Loader
}
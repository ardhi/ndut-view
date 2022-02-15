const nunjucks = require('nunjucks')
const path = require('path')

const inBetween = (str, quote = '"') => {
  const matches = str.split(quote)
  return matches[1]
}

module.exports = function (scope, opts) {
  const { _, fs, getConfig, getNdutConfig, aneka } = scope.ndut.helper
  const { resolveTpl } = scope.ndutView.helper
  const config = getConfig()
  if (config.debug) {
    opts.watch = true
    opts.noCache = true
  }

  const getSourceAndFile = (name, theme = 'default') => {
    const file = resolveTpl(name, theme)
    let source = fs.readFileSync(file, 'utf-8' )
    const sources = source.split('\n')
    const tags = ['{% extends', '{% include', '{% import', '{%extends', '{%include', '{%import']
    for (const i in sources) {
      const s = sources[i]
      let found = false
      for (const t of tags) {
        if (s.includes(t)) found = true
      }
      if (!found) continue
      let link = inBetween(s)
      if (!link) link = inBetween(s, "'")
      if (!link) continue
      sources[i] = s.replace(link, link + ':' + theme)
    }
    source = sources.join('\n')
    return { source, file }
  }

  const filename2name = (filename = '') => {
    let [dir, file] = filename.split('/ndutView/template/')
    let theme = 'default'
    if (!file) {
      let [ndir, nfile] = filename.split('/ndutView/theme/')
      if (!nfile) return { filename }
      const [tm, alias, ...files] = nfile.split('/')
      file = files.join('/')
      const cfgTheme = getNdutConfig(ndir)
      theme = `${cfgTheme.alias}-${tm}`
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
    return { name, filename }
  }

  const Loader = nunjucks.Loader.extend({
    init: function () {
      if (opts.watch && scope.ndutExtra) {
        const { chokidar } = scope.ndutExtra.helper
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
              if (scope.ndut.ready) scope.log.debug(`[TemplateWatcher] name: '${name}', file: '${filename}'`)
            }
          })
          watcher.on('error', err => {
            scope.log.error(err.message)
          })
        }
      }
    },
    getSource: function (name, theme) {
      const { source, file } = getSourceAndFile(name, theme)
      return { src: source, path: file, noCache: opts.noCache }
    }
  })

  return Loader
}
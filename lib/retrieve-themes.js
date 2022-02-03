const path = require('path')

module.exports = async function (options) {
  const { _, fs, fastGlob, getConfig, getNdutConfig } = this.ndut.helper
  const all = [{ name: 'default', pkg: 'ndut-view', dir: `${options.dir}/ndutView/template`, title: 'Default' }]
  const config = getConfig()
  for (const n of config.nduts) {
    const cfg = getNdutConfig(n)
    const files = await fastGlob(`${cfg.dir}/ndutView/theme/*`, { onlyDirectories: true })
    for (const f of files) {
      const base = path.basename(f)
      const name = `${cfg.alias}-${base}`
      const title = _.get(cfg, `theme.${base}.title`, _.map(name.split('-'), n => _.upperFirst(n)).join(' '))
      if (fs.lstatSync(f).isDirectory()) {
        const exist = _.find(all, { name })
        if (!exist) all.push({ name, dir: f, pkg: cfg.name, title })
        else throw new Error(`Theme '${name}' already exists in '${exist.ndut}'`)
      }
    }
  }
  return all
}

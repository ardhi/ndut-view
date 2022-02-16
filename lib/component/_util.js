const mod = {}
const nl = '\r\n'

mod.open = function (opts = {}) {
  const { _, aneka } = this.ndut.helper
  const attrs = []
  const options = _.omit(opts, ['content', 'el', 'newLine', 'selfClose'])
  _.forOwn(options, (v, k) => {
    if (_.isArray(v)) v = _.uniq(v).join(' ')
    if (_.isObject(v)) v = mod.stringifyObject.call(this, v)
    k = _.kebabCase(_.trim(k))
    if (['readonly', 'multiple', 'disabled', 'selected', 'checked'].includes(k)) attrs.push(k)
    else {
      if (!aneka.isSet(v)) return
      v = v + ''
      if (_.isEmpty(v)) return
      attrs.push(_.trim(`${k}="${_.trim(v)}"`))
    }
  })
  return `<${opts.el}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}${opts.selfClose ? '/>' : '>'}${opts.newLine ? nl : ''}`
}

mod.close = function (opts = {}) {
  return `</${opts.el}>${opts.newLine ? nl : ''}`
}

mod.write = function (opts = {}) {
  const { _ } = this.ndut.helper
  const result = []
  const nopts = _.omit(opts, ['content'])
  nopts.newLine = false
  nopts.selfClose = !!!opts.content
  result.push(mod.open.call(this, nopts))
  if (opts.content) {
    result.push(opts.content)
    result.push(mod.close.call(this, nopts))
  }
  return result.join(opts.newLine ? nl : '') + (opts.newLine ? nl : '')
}

mod.normalizeArray = function (item = [], opts = {}) {
  const { _ } = this.ndut.helper
  opts.default = opts.default || []
  opts.common = opts.common || []
  if (_.isString(item)) item = _.map(item.split(' '), i => _.trim(i))
  if (!_.isEmpty(item)) opts.default = []
  return _.without(_.concat(opts.common, opts.default, item), null, undefined, '')
}

mod.camelCaseKeys = function (item) {
  const { _ } = this.ndut.helper
  const result = {}
  _.forOwn(item, (v, k) => {
    result[_.camelCase(k)] = v
  })
  return result
}

mod.normalizeObject = function (item = {}, opts = {}) {
  const { _ } = this.ndut.helper
  opts.default = mod.camelCaseKeys.call(this, opts.default) || {}
  opts.common = mod.camelCaseKeys.call(this, opts.common) || {}
  if (_.isString(item)) {
    const obj = {}
    _.each(_.map(item.split(';'), i => _.trim(i)), v => {
      const pair = _.map(v.split(':'), i => _.trim(i))
      obj[pair[0]] = pair[1]
    })
    item = mod.camelCaseKeys.call(this, obj)
  }
  item = _.merge(opts.default, item)
  item = _.merge(opts.common, item)
  return item
}

mod.stringifyObject = function (item) {
  const { _ } = this.ndut.helper
  const result = []
  _.forOwn(item, (v, k) => {
    result.push(`${_.kebabCase(k)}: ${v}`)
  })
  return result.join('; ')
}

mod.prep = function (el, content, opts = {}) {
  const { _ } = this.ndut.helper
  if (_.isPlainObject(content)) opts = content
  if (_.isString(content)) opts.content = content
  if (el) opts.el = el
  return opts
}

mod.filterOpts = function (key, opts = {}) {
  const { _ } = this.ndut.helper
  const filtered = {}
  const all = _.keys(opts)
  const rest = []
  _.forOwn(opts, (v, k) => {
    const [name, ...parts] = _.kebabCase(k).split('-')
    if (name === key && parts.length > 0) {
      filtered[_.camelCase(parts.join('-'))] = v
    } else {
      rest.push(k)
    }
  })
  if (key === 'label') {
    if (opts.id) filtered.for = opts.id
    if (opts.label) {
      filtered.content = opts.label
      _.pull(rest, 'label')
    }
  }
  _.each(all, a => {
    if (!rest.includes(a)) delete opts[a]
  })
  return filtered
}

module.exports = mod

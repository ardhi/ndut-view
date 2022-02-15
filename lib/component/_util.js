const mod = {}
const nl = '\r\n'

mod.open = function (tag, attr = {}, selfClose, newLine = true) {
  const { _ } = this.ndut.helper
  const attrs = []
  _.forOwn(attr, (v, k) => {
    if (['disabled'].includes(k)) v = k
    if (_.isArray(v)) v = _.uniq(v).join(' ')
    k = _.kebabCase(_.trim(k))
    if (_.isEmpty(v)) return
    attrs.push(_.trim(`${k}="${_.trim(v)}"`))
  })
  return `<${tag}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}${selfClose ? '/>' : '>'}${newLine ? nl : ''}`
}

mod.close = function (tag, newLine = true) {
  return `</${tag}>${newLine ? nl : ''}`
}

mod.write = function (tag, attr, content, newLine = true) {
  const result = []
  result.push(mod.open.call(this, tag, attr, !!!content, false))
  if (content) {
    result.push(content)
    result.push(mod.close.call(this, tag, false))
  }
  console.log(result)
  return result.join(newLine ? nl : '') + (newLine ? nl : '')
}

mod.normalizeArray = function (item, opts = {}) {
  const { _ } = this.ndut.helper
  opts.default = opts.default || []
  opts.common = opts.common || []
  if (_.isString(item)) item = _.map(item.split(' '), i => _.trim(i))
  if (!_.isEmpty(item)) opts.default = []
  return _.without(_.concat(opts.common, opts.default, item), null, undefined, '')
}

mod.prepContent = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  if (_.isPlainObject(content)) opts = content
  if (_.isString(content)) opts.content = content
  return opts
}

module.exports = mod

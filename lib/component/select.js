const util = require('./_util')
const option = require('./option')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  opts = util.prep.call(this, 'select', content, opts)
  opts.class = util.normalizeArray.call(this, opts.class, { common: ['form-select'] })
  opts.style = util.normalizeObject.call(this, opts.style)
  if (opts.size) opts.class.push(`form-select-${opts.size}`)
  delete opts.content
  const options = []
  if (opts.options) {
    _.each(opts.options, o => {
      if (_.isString(o)) o = { content: o }
      if (o.label) {
        o.content = o.label
        delete o.label
      }
      options.push(option.call(this, o))
    })
  }
  if (options.length > 0) opts.content = options.join('\n')
  return util.write.call(this, _.omit(opts, ['size', 'options']))
}

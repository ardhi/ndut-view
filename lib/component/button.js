const util = require('./_util')

module.exports = function (content, opts = {}) {
  opts = util.prep.call(this, opts.el || 'button', content, opts)
  opts.class = util.normalizeArray.call(this, opts.class, { default: ['btn-default'], common: ['btn'] })
  opts.style = util.normalizeObject.call(this, opts.style)
  if (opts.active) opts.class.push('active')
  if (opts.el === 'a') {
    opts.role = 'button'
    opts.href = opts.href || '#'
    if (opts.disabled) {
      delete opts.disabled
      opts.class.push('disabled')
    }
  }
  return util.write.call(this, opts)
}

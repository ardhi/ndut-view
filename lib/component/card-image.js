const image = require('./image')

module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  if (opts.position && ['top', 'bottom'].includes(opts.position)) opts.class.push(`card-img-${opts.position}`)
  return image.call(this, opts)
}

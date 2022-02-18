const label = require('./label')

module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  const labelOpts = util.filterOpts('label', opts)
  const labelEl = label.call(this, labelOpts)
  opts.class = util.normalizeArray(opts.class, { common: ['form-floating'] })
  opts.content.push(labelEl)
  return util.write(opts)
}

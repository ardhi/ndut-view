const label = require('./label')
const input = require('./input')
const misc = require('./_misc')

module.exports = function (content, opts = {}, radio) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  const labelOpts = util.filterOpts('label', opts)
  const wrapperOpts = util.filterOpts('wrapper', opts)
  wrapperOpts.class = util.normalizeArray(wrapperOpts.class, { common: opts.noLabel ? [] : ['form-check'] })
  opts.type = radio ? 'radio' : 'checkbox'

  const labelEl = label.call(this, null, labelOpts, { common: ['form-check-label'] })
  const inputEl = input.call(this, null, _.omit(opts, ['noWrapper']), { common: ['form-check-input'] })
  if (opts.noWrapper) return inputEl
  if (_.isEmpty(labelOpts.content)) return misc.call(this, 'div', inputEl, wrapperOpts)
  if (opts.inline) wrapperOpts.class.push('form-check-inline')
  return misc.call(this, 'div', [inputEl, labelEl].join('\n'), wrapperOpts)
}

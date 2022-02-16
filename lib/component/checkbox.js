const util = require('./_util')
const label = require('./label')
const input = require('./input')
const misc = require('./_misc')

module.exports = function (content, opts = {}, radio) {
  const { _ } = this.ndut.helper
  opts = util.prep.call(this, null, content, opts)
  const labelOpts = util.filterOpts.call(this, 'label', opts)
  const wrapperOpts = util.filterOpts.call(this, 'wrapper', opts)
  wrapperOpts.class = util.normalizeArray.call(this, wrapperOpts.class, { common: opts.noLabel ? [] : ['form-check'] })
  wrapperOpts.style = util.normalizeObject.call(this, wrapperOpts.style)
  opts.type = radio ? 'radio' : 'checkbox'

  const labelEl = label.call(this, null, labelOpts, { common: ['form-check-label'] })
  const inputEl = input.call(this, null, opts, { common: ['form-check-input'] })
  if (_.isEmpty(labelOpts.content)) return misc.call(this, 'div', inputEl, wrapperOpts)
  if (opts.inline) wrapperOpts.class.push('form-check-inline')
  return misc.call(this, 'div', [inputEl, labelEl].join('\n'), wrapperOpts)
}

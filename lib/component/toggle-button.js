const util = require('./_util')
const label = require('./label')
const input = require('./input')

module.exports = function (content, opts = {}, radio) {
  const { _ } = this.ndut.helper
  opts = util.prep.call(this, null, content, opts)
  const labelOpts = util.filterOpts.call(this, 'label', opts)
  const labelEl = label.call(this, null, labelOpts, { common: ['btn'] })
  opts.type = radio ? 'radio' : 'checkbox'
  opts.autocomplete = 'off'
  const inputEl = input.call(this, null, opts, { common: ['btn-check'] })
  return `${inputEl}\n${labelEl}`
}

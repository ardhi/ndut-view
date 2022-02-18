const label = require('./label')
const misc = require('./_misc')
const defWidth = ['col-sm-3', 'col-sm-9']

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  let l
  let r
  if (opts.width) {
    if (_.isString(opts.width)) [l, r] = _.map(opts.width.split(':'), w => _.trim(w))
    else [l, r] = opts.width
  }
  if (!l) l = defWidth[0]
  if (!r) r = defWidth[1]
  l = util.normalizeWidth(l)
  r = util.normalizeWidth(r)
  opts.class = util.normalizeArray(opts.class, { default: 'mb-3', common: ['row'] })
  const labelOpts = util.filterOpts('label', opts)
  labelOpts.class.unshift(`${l} col-form-label`)
  if (labelOpts.size) labelOpts.class.push(`col-form-label-${labelOpts.size}`)
  const labelEl = label.call(this, _.omit(labelOpts, ['size']))
  const inputEl = opts.content
  const containerOpts = util.filterOpts('container', opts)
  containerOpts.class.unshift(r)
  const containerEl = misc.call(this, 'div', inputEl, containerOpts)
  opts.content = [labelEl, containerEl]
  return util.write(_.omit(opts, ['width']))
}

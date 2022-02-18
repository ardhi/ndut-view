const misc = require('./_misc')
const collapseButton = require('./collapse-button')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep(null, content, opts)
  const id = util.getId(opts)
  const btnOpts = util.filterOpts('button', opts)
  btnOpts.targetId = id
  const btnEl = collapseButton.call(this, btnOpts)
  const colOpts = util.filterOpts('collapse', opts)
  opts.class = util.normalizeArray(opts.class, { common: ['collapse'] })
  opts.id = id
  let collapseEl = misc.call(this, 'div', opts)
  if (opts.collapse) {
    colOpts.style.minHeight = colOpts.minHeight
    collapseEl = misc.call(this, 'div', collapseEl, _.omit(colOpts, ['minHeight']))
  }

  return `<p>${btnEl}</p>\n${collapseEl}`
}

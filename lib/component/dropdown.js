const dropdownMenu = require('./dropdown-menu')
const button = require('./button')
const misc = require('./_misc')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  const btnOpts = util.filterOpts('button', opts)
  const splitOpts = util.filterOpts('split', opts)
  let splitEl
  if (opts.split) {
    splitOpts.color = splitOpts.color || btnOpts.color
    splitOpts.dataBsToggle = 'dropdown'
    splitOpts.ariaExpanded = 'false'
    splitOpts.class.push('dropdown-toggle', 'dropdown-toggle-split')
    if (opts.offset) splitOpts.dataBsOffset = opts.offset
    if (opts.reference) splitOpts.dataBsReference = opts.reference
    if (opts.autoClose) splitOpts.dataBsAutoClose = opts.autoClose
    const c = misc.call(this, 'span', 'Toggle Dropdown', { class: 'visually-hidden' })
    splitEl = button.call(this, c, splitOpts)
  } else {
    if (opts.offset) btnOpts.dataBsOffset = opts.offset
    if (opts.reference) btnOpts.dataBsReference = opts.reference
    if (opts.autoClose) btnOpts.dataBsAutoClose = opts.autoClose
    btnOpts.class.push('dropdown-toggle')
    btnOpts.dataBsToggle = 'dropdown'
    btnOpts.ariaExpanded = 'false'
  }
  btnOpts.content = opts.content
  const btnEl = button.call(this, btnOpts)
  const menuOpts = util.filterOpts('menu', opts)
  const menuEl = dropdownMenu.call(this, opts.menu, menuOpts)
  opts.content = [btnEl, menuEl]
  if (splitEl) opts.content.splice(1, 0, splitEl)
  opts.class = util.normalizeArray(opts.class, { common: [splitEl ? 'btn-group' : 'dropdown'] })
  switch (opts.dir) {
    case 'up': opts.class.push('dropup'); break
    case 'right': opts.class.push('dropend'); break
    case 'left': opts.class.push('dropstart'); break
  }
  return util.write(_.omit(opts, ['button', 'menu', 'split', 'dir', 'offset', 'reference', 'autoClose']))
}

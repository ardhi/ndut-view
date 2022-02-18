const misc = require('./_misc')
const button = require('./button')

module.exports = function (content, opts = {}) {
  const { _, aneka } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep('div', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['accordion'] })
  const baseId = 'id' + (this.ndutDb ? this.ndutDb.helper.generateId() : Date.now())
  if (opts.toggle) opts.id = opts.id || `${baseId}-main`
  _.each(opts.content, (c, idx) => {
    const counter = idx + 1
    let title
    let content
    let collapsed = true
    if (_.isPlainObject(c)) {
      [title, collapsed, content] = c
    } else {
      title = _.get(opts, `headings.${idx}.title`)
      if (!title) title = _.get(opts, `titles.${idx}`)
      if (!title) title = _.get(opts, `titles.${idx}`)
      if (!title) title = `Item ${counter}`
      collapsed = _.get(opts, `headings.${idx}.collapsed`, true)
      content = c
    }
    const buttonOpts = {
      class: collapsed ? 'collapsed' : '',
      ariaExpanded: collapsed ? 'true' : 'false',
      ariaControls: `${baseId}-b-${counter}`,
      dataBsToggle: 'collapse',
      dataBsTarget: `#${baseId}-b-${counter}`
    }
    const buttonEl = button.call(this, title, buttonOpts, { common: 'accordion-button' })
    const headEl = misc.call(this, 'h2', buttonEl, { class: 'accordion-header', id: `${baseId}-h-${counter}` })
    const body = misc.call(this, 'div', content, { class: 'accordion-body' })
    const bodyOpts = {
      class: `accordion-collapse collapse${collapsed ? '' : ' show'}`,
      id: `${baseId}-b-${counter}`,
      ariaLabelledby: `${baseId}-h-${counter}`
    }
    if (opts.toggle) bodyOpts.dataBsParent = `#${opts.id}`
    const bodyEl = misc.call(this, 'div', body, bodyOpts)
    const itemEl = misc.call(this, 'div', [headEl, bodyEl], { class: 'accordion-item' })
    opts.content[idx] = itemEl
  })
  if (opts.flush) opts.class.push('accordion-flush')
  return util.write(_.omit(opts, ['size', 'vertical', 'flush', 'headings', 'titles', 'toggle']))
}

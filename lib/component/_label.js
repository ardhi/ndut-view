const label = require('./label')

module.exports = function (content, opts = {}, ext = {}) {
  const lopts = {
    content: content || opts.content || opts.label,
    class: opts.labelClass,
    style: opts.labelStyle,
    for: opts.id
  }
  return label.call(this, lopts.content, lopts, ext)
}
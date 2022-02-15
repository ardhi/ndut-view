const supported = 'p,span,strike,strong,b,em,h1,h2,h3,h4,h5,h6,code,pre,var,kbd,samp' +
  'tr,td,th,table,fieldset,legend,label,input,select,textarea,address,blockquote,sub,sup' +
  'summary,ul,ol,li,dd,dt,mark,small,i,u,abbr,figure,thead,tfoot,tbody,caption'.split(',')
const util = require('./_util')

module.exports = function (tag, content, opts = {}) {
  const { _ } = this.ndut.helper
  if (!supported.includes(tag)) return ''
  opts = util.prepContent.call(this, content, opts)
  const attr = {}
  attr.class = util.normalizeArray.call(this, opts.class)
  return util.write.call(this, tag, attr, opts.content, opts.newLine)
}

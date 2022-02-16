const supported = 'div,p,span,strike,strong,b,em,h1,h2,h3,h4,h5,h6,code,pre,var,kbd,samp' +
  'tr,td,th,table,fieldset,legend,textarea,address,blockquote,sub,sup' +
  'summary,ul,ol,li,dd,dt,mark,small,i,u,abbr,figure,thead,tfoot,tbody,caption'.split(',')
const util = require('./_util')

module.exports = function (el, content, opts = {}) {
  if (!supported.includes(el)) return ''
  opts = util.prep.call(this, el, content, opts)
  opts.class = util.normalizeArray.call(this, opts.class)
  opts.style = util.normalizeObject.call(this, opts.style)
  return util.write.call(this, opts)
}

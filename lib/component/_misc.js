const supported = 'div,p,span,strike,strong,b,em,h1,h2,h3,h4,h5,h6,code,pre,var,kbd,samp,' +
  'tr,td,th,table,fieldset,legend,textarea,address,blockquote,sub,sup,form,' +
  'summary,ul,ol,li,dd,dt,mark,small,i,u,abbr,figure,thead,tfoot,tbody,caption'.split(',')

module.exports = function (el, content, opts = {}) {
  const { util } = this.ndutView.helper
  if (!supported.includes(el)) return ''
  opts = util.prep(el, content, opts)
  return util.write(opts)
}

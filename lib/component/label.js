const util = require('./_util')

module.exports = function (content, opts = {}, ext = {}) {
  ext.common = ext.common || []
  opts = util.prep.call(this, 'label', content, opts)
  opts.class = util.normalizeArray.call(this, opts.class, { common: ext.common })
  opts.style = util.normalizeObject.call(this, opts.style)
  return util.write.call(this, opts)
}

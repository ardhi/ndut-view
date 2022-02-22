const { bs5Component } = require('html-me')

module.exports = async function () {
  const { _, getNdutConfig } = this.ndut.helper
  const cfg = getNdutConfig('ndut-view')
  let handler = function (tag, content = [], attrib = {}, option = {}) {
    if (_.isPlainObject(content)) {
      option = _.cloneDeep(attrib)
      attrib = _.cloneDeep(content)
      content = []
    }
    return bs5Component(tag, { content, attrib, option })
  }
  this.ndutView.env.addGlobal('component', handler)
  this.ndutView.env.addGlobal('c', handler)
}

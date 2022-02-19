const nl = '\r\n'

class Util {
  constructor (scope) {
    this.scope = scope
    this.colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    this.breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']
    this.sizes = ['md', 'lg']
    this.translates = ['middle']
    this.collapses = ['horizontal']
  }

  convertToClass (main, list, opts = {}) {
    const { _ } = this.scope.ndut.helper
    list.forEach(l => {
      l = l + ''
      const key = _.isEmpty(l) ? main : l
      const replacer = _.camelCase(`${main} ${l}`)
      if (opts[key]) {
        opts.class.push(_.kebabCase(replacer))
        delete opts[key]
      }
    })
  }

  replaceToClass (attr, list, opts = {}) {
    const { _ } = this.scope.ndut.helper
    if (_.has(opts, attr) && list.includes(opts[attr])) {
      opts.class.push(`${attr}${opts[attr] === true ? '' : ('-' + opts[attr])}`)
    }
    delete opts[attr]
  }

  replaceToClassMisc (opts = {}) {
    const { _ } = this.scope.ndut.helper
    if (opts.active) {
      opts.ariaCurrent = opts.ariaCurrent || 'true'
      opts.class.push('active')
      delete opts.active
    }
    if (opts.disabled) {
      opts.ariaDisabled = opts.ariaDisabled || 'true'
      if ([opts.el, opts.tag].includes('a')) {
        opts.class.push('disabled')
        delete opts.disabled
      }
      delete opts.href
    }
  }

  replaceToClassByEl (attr, list, opts = {}) {
    const noSuffix = ['xs']
    const name = { span: 'bg', badge: 'bg', button: 'btn', alert: 'alert', buttonGroup: 'btn-group', a: 'btn', div: 'bg' }
    const { _ } = this.scope.ndut.helper
    if (!(_.keys(name).includes(opts.el) || _.keys(name).includes(opts.compName))) return
    if (_.has(opts, attr) && list.includes(opts[attr])) {
      let value = opts[attr]
      if ((['collapse', 'button'].includes(opts.el) || ['collapse', 'button'].includes(opts.compName)) && opts.outline) value = 'outline-' + value
      opts.class.push(`${name[opts.el]}${noSuffix.includes(opts[attr]) ? '' : ('-' + value)}`)
    }
    delete opts[attr]
  }

  open (opts = {}) {
    const { _, aneka } = this.scope.ndut.helper
    const attrs = []
    this.replaceToClass('position', ['absolute', 'relative', 'static', 'fixed', 'sticky'], opts)
    this.replaceToClass('rounded', [true, 'pill', 'circle'], opts)
    _.each(['top', 'bottom', 'start', 'end'], key => {
      this.replaceToClass(key, [0, 50, 100], opts)
    })
    this.replaceToClass('translate', this.translates, opts)
    this.replaceToClass('collapse', this.collapses, opts)
    this.replaceToClassMisc(opts)
    this.replaceToClassByEl('color', this.colors, opts)
    this.replaceToClassByEl('size', this.sizes, opts)
    const options = _.omit(opts, ['content', 'el', 'tag', 'newLine', 'selfClose', 'compName', 'outline'])
    _.forOwn(options, (v, k) => {
      if (_.isArray(v)) v = _.uniq(v).join(' ')
      if (_.isObject(v)) v = this.stringifyObject(v)
      k = _.kebabCase(_.trim(k))
      if (['readonly', 'multiple', 'disabled', 'selected', 'checked'].includes(k)) attrs.push(k)
      else {
        if (!aneka.isSet(v)) return
        v = v + ''
        if (_.isEmpty(v)) return
        attrs.push(_.trim(`${k}="${_.trim(v)}"`))
      }
    })
    return `<${opts.tag || opts.el}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}${opts.selfClose ? '/>' : '>'}${opts.newLine ? nl : ''}`
  }

  close (opts = {}) {
    return `</${opts.tag || opts.el}>${opts.newLine ? nl : ''}`
  }

  write (opts = {}) {
    const { _ } = this.scope.ndut.helper
    const result = []
    const nopts = _.omit(opts, ['content'])
    nopts.newLine = false
    nopts.selfClose = !!!opts.content
    result.push(this.open(nopts))
    if (opts.content) {
      if (_.isArray(opts.content)) opts.content = opts.content.join(nl)
      result.push(opts.content)
      result.push(this.close(nopts))
    }
    return result.join(opts.newLine ? nl : '') + (opts.newLine ? nl : '')
  }

  normalizeArray (item = [], opts = {}) {
    const { _ } = this.scope.ndut.helper
    opts.default = opts.default || []
    opts.common = opts.common || []
    if (_.isString(item)) item = _.map(item.split(' '), i => _.trim(i))
    if (!_.isEmpty(item)) opts.default = []
    return _.without(_.concat(opts.common, opts.default, item), null, undefined, '')
  }

  camelCaseKeys (item) {
    const { _ } = this.scope.ndut.helper
    const result = {}
    _.forOwn(item, (v, k) => {
      result[_.camelCase(k)] = v
    })
    return result
  }

  normalizeObject (item = {}, opts = {}) {
    const { _ } = this.scope.ndut.helper
    opts.default = this.camelCaseKeys(opts.default) || {}
    opts.common = this.camelCaseKeys(opts.common) || {}
    if (_.isString(item)) {
      const obj = {}
      _.each(_.map(item.split(';'), i => _.trim(i)), v => {
        const pair = _.map(v.split(':'), i => _.trim(i))
        obj[pair[0]] = pair[1]
      })
      item = this.camelCaseKeys(obj)
    }
    item = _.merge(opts.default, item)
    item = _.merge(opts.common, item)
    return item
  }

  normalizeWidth (w) {
    w = w + ''
    if (w.startsWith('col')) return w
    if (w.includes('-')) return `col-${w}`
    return `col-sm-${w}`
  }

  stringifyObject (item) {
    const { _ } = this.scope.ndut.helper
    const result = []
    _.forOwn(item, (v, k) => {
      let key = _.kebabCase(k)
      if (k[0] === '_') key = '--' + key
      result.push(`${key}: ${v}`)
    })
    return result.join('; ')
  }

  prep (el, content, opts = {}) {
    const { _, aneka } = this.scope.ndut.helper
    if (_.isPlainObject(content)) opts = _.cloneDeep(content)
    if (aneka.isSet(content) && !opts.content) opts.content = content
    if (_.isPlainObject(opts.content)) opts.content = []
    if (el) opts.el = el
    if (opts.content && _.isString(opts.content)) opts.content = [opts.content]
    opts.class = this.normalizeArray(opts.class)
    opts.style = this.normalizeObject(opts.style)
    return opts
  }

  filterOpts (key, opts = {}) {
    const { _ } = this.scope.ndut.helper
    const filtered = {}
    const all = _.keys(opts)
    const rest = []
    _.forOwn(opts, (v, k) => {
      const [name, ...parts] = _.kebabCase(k).split('-')
      if (name === key && parts.length > 0) {
        filtered[_.camelCase(parts.join('-'))] = v
      } else {
        rest.push(k)
      }
    })
    if (key === 'label') {
      if (opts.id) filtered.for = opts.id
      if (opts.label) {
        filtered.content = opts.label
        _.pull(rest, 'label')
      }
    }
    _.each(all, a => {
      if (!rest.includes(a)) delete opts[a]
    })
    filtered.class = this.normalizeArray(filtered.class)
    filtered.style = this.normalizeObject(filtered.style)
    return filtered
  }

  getId (opts = {}, suffix) {
    if (opts.id) return opts.id
    let id = 'id-' + (this.scope.ndutDb ? this.scope.ndutDb.helper.generateId() : Date.now())
    if (suffix) id = id + '-' + suffix
    return id
  }
}

module.exports = {
  noScope: true,
  class: Util
}

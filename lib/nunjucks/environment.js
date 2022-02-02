const { Environment, Template } = require("nunjucks")
const lib = require('nunjucks/src/lib')


class ViewEnvironment extends Environment {
  render(name, ctx, theme, cb) {
    if (lib.isFunction(ctx)) {
      cb = ctx
      theme = 'default'
      ctx = null
    }
    if (lib.isFunction(theme)) {
      cb = theme
      theme = 'default'
    }
    theme = theme || 'default'
    name += ':' + theme

    let syncResult = null
    this.getTemplate(name, (err, tmpl) => {
      if (err && cb) {
        callbackAsap(cb, err);
      } else if (err) {
        throw err;
      } else {
        syncResult = tmpl.render(ctx, cb)
      }
    })
    return syncResult
  }

  getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
    var that = this;
    var tmpl = null;
    if (name && name.raw) {
      // this fixes autoescape for templates referenced in symbols
      name = name.raw;
    }

    if (lib.isFunction(parentName)) {
      cb = parentName;
      parentName = null;
      eagerCompile = eagerCompile || false;
    }

    if (lib.isFunction(eagerCompile)) {
      cb = eagerCompile;
      eagerCompile = false;
    }

    if (name instanceof Template) {
      tmpl = name;
    } else if (typeof name !== 'string') {
      throw new Error('template names must be a string: ' + name);
    } else {
      for (let i = 0; i < this.loaders.length; i++) {
        const loader = this.loaders[i];
        tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];
        if (tmpl) {
          break;
        }
      }
    }

    if (tmpl) {
      if (eagerCompile) {
        tmpl.compile();
      }

      if (cb) {
        cb(null, tmpl);
        return undefined;
      } else {
        return tmpl;
      }
    }
    let syncResult;

    const createTemplate = (err, info) => {
      if (!info && !err && !ignoreMissing) {
        err = new Error('template not found: ' + name);
      }

      if (err) {
        if (cb) {
          cb(err);
          return;
        } else {
          throw err;
        }
      }
      let newTmpl;
      if (!info) {
        newTmpl = new Template(noopTmplSrc, this, '', eagerCompile);
      } else {
        newTmpl = new Template(info.src, this, info.path, eagerCompile);
        if (!info.noCache) {
          info.loader.cache[name] = newTmpl;
        }
      }
      if (cb) {
        cb(null, newTmpl);
      } else {
        syncResult = newTmpl;
      }
    };

    lib.asyncIter(this.loaders, (loader, i, next, done) => {
      function handle(err, src) {
        if (err) {
          done(err);
        } else if (src) {
          src.loader = loader;
          done(null, src);
        } else {
          next();
        }
      }
      const theme = name.split(':')[2]

      // Resolve name relative to parentName
      name = that.resolveTemplate(loader, parentName, name);

      if (loader.async) {
        loader.getSource(name, theme, handle);
      } else {
        handle(null, loader.getSource(name, theme));
      }
    }, createTemplate);

    return syncResult;
  }
}

module.exports = ViewEnvironment
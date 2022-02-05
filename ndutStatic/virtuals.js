module.exports = async function (scope) {
  const { _, aneka } = scope.ndut.helper
  const { pathResolve } = aneka
  const bsDir = _.dropRight(pathResolve(require.resolve('bootstrap')).split('/'), 3).join('/') + '/dist'
  const bsIconDir = _.dropRight(pathResolve(require.resolve('bootstrap-icons/package.json')).split('/'), 1).join('/')
  return [
    { root: bsDir, prefix: 'bootstrap' },
    { root: bsIconDir, prefix: 'bootstrap-icons' }
  ]
}

module.exports = async function (scope) {
  const { _, aneka } = scope.ndut.helper
  const { pathResolve, getModuleDirDeep } = aneka
  const bsDir = _.dropRight(pathResolve(require.resolve('bootstrap')).split('/'), 3).join('/') + '/dist'
  const bsIconDir = _.dropRight(pathResolve(require.resolve('bootstrap-icons/package.json')).split('/'), 1).join('/')
  const holderDir = _.dropRight(pathResolve(require.resolve('holderjs/package.json')).split('/'), 1).join('/')
  const lodashDir = getModuleDirDeep('lodash')
  const luxonDir = getModuleDirDeep('luxon') + '/build/global'
  return [
    { root: bsDir, prefix: 'bootstrap' },
    { root: bsIconDir, prefix: 'bootstrap-icons' },
    { root: holderDir, prefix: 'holder' },
    { root: lodashDir, prefix: 'lodash' },
    { root: luxonDir, prefix: 'luxon' }
  ]
}

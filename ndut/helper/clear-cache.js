module.exports = function () {
  const env = this.ndutView.env
  for (let i = 0; i < env.loaders.length; i++) {
    env.loaders[i].cache = {}
  }
}

const defConfig = {
  tooltip: true
}
const config = _.merge(defConfig, {}) // TODO: load from app

if (config.tooltip) {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

/* eslint-disable no-undef */
import 'aurelia-bootstrapper-webpack'

export function configure (aurelia) {
  aurelia.use
    .basicConfiguration()
    .developmentLogging()

  aurelia.start().then(() => {
    aurelia.setRoot('app', document.body)
  })
}

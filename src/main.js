import {bootstrap} from 'aurelia-bootstrapper-webpack'

export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
    .developmentLogging()

  aurelia.start().then(() => {
    aurelia.setRoot('app', document.body)
  });
}

// Variable set by npm scripts in package.json.
// Change the app based on the platform. Value is 'default' by default.
export const platform = process.env.PLATFORM

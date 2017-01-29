/* eslint-disable no-undef */
export class Index {
  constructor () {
    // You can customize the app's content based on the platform
    // These variables are set by webpack via package.json
    this.platform = PLATFORM
    this.environment = PRODUCTION ? 'production' : 'development'
  }
}

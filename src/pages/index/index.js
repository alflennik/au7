// You can customize the app's content based on the platform
// This variable is set in npm scripts in package.json
import {platform} from '../../main.js'
import {inject} from 'aurelia-framework'

@inject (platform)
export class Index {
  constructor (platform) {
    this.platform = platform
  }
}

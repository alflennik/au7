import {setUpFramework7} from './services/f7.js'

export class App {
  constructor () {
    this.views = [{
      name: 'index',
      navTitle: 'Home',
      moduleId: './pages/index/index',
      nav: true,
      homepage: true
    }, {
      name: 'normal-page',
      navTitle: 'Normal Page',
      moduleId: './pages/normal-page/normal-page',
      nav: true
    }, {
      name: 'no-nav',
      moduleId: './pages/no-nav/no-nav',
      nav: false
    }]
  }

  attached () {
    setUpFramework7()
  }
}

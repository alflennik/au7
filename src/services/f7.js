/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import 'framework7/dist/css/framework7.material.css'
import 'framework7/dist/css/framework7.material.colors.css'
import 'framework7/dist/js/framework7.js'

// Framework7 Setup to be called by app.js when DOM is ready
export function setUpFramework7 () {
  const F7 = new Framework7({
    material: true,
    animateNavBackIcon: true
  })

  const mainView = F7.addView('.view-main', {
    domCache: true // enable inline pages
  })
}

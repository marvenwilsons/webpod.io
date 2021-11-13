import dashboard from './service-sample'
import maker from './service-maker'
import empty from './empty'
import univew from './uniview'
import Todos from './todo'
import formBuilder from './form-builder'
import tableSample from './table-sample'

let services = []

export default {
  getAllServices() {
    /**
     * 1. Fetch user services in the server, using user credintials
     * 2. each services has different kinds of versions in it for different kinds of user roles,
     * determine the correct service version to return to the user requesting it.
     * 3. the user will then get its own set of services, to be toggled.
     */

    services = [
      dashboard,
      maker,
      empty,
      univew,
      Todos,
      formBuilder,
      tableSample
    ]
  },
  getService(serviceName) {
    // fetch service in database
    // serviceName is the name of the service that is located in the database
    const selectedService = services.filter(e => e.name == serviceName)[0]
    if(selectedService) {

      // scan service if body has the correct properties
      if(selectedService.body) {
        // put paneConfig object if its missing
        if(!selectedService.body.paneConfig) {
          selectedService.body.paneConfig = {}
        }
        // put paneHooks if its missing
        if(!selectedService.body.paneHooks) {
          selectedService.body.paneHooks = `() => ({})`
        }
        // put viewHooks if its missing
        if(!selectedService.body.viewHooks) {
          selectedService.body.viewHooks = `() => ({})`
        }
        // put viewConfig if its missing
        if(!selectedService.body.viewConfig) {
          selectedService.body.viewConfig = {}
        }
      } else {
        alert(`Error: Invalid service "${serviceName}" missing body property`)
      }
      
      return selectedService
    } else {
      alert(`Cannot find service "${serviceName}" in the services array, please make sure the service name has no typo or the service is registered properly by checking the name property of the service object`)
    }
  }
}
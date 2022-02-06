/**
 * 1. Fetch user services in the server, using user credintials
 * 2. each services has different kinds of versions in it for different kinds of user roles,
 * determine the correct service version to return to the user requesting it.
 * 3. the user will then get its own set of services, to be toggled.
 */
let services = []

export default {
  setServices(s) {
    services = s 
  },
  insertService(s) {
    services.push(s)
  },
  getAllServices() {
    return services
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
      return {
        body: {
          paneConfig: {
            isClosable: false,
            title: 'No service assigned',
          },
          viewConfig: {},
          view: 'pd',
          viewData: undefined,
          viewHooks: ''
        }
      }
      // alert(`Cannot find service "${serviceName}" in the services array, please make sure the service name has no typo or the service is registered properly by checking the name property of the service object`)
    }
  }
}
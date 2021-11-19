## Pane System
- The pane system consist of  array of objects (pane), each object represents a pane,
the purpose of each pane is to display a service data.
---
#### The `pane-system/index.vue` component
- its where the state leaves - paneCollection array
- this component renders the pane-activator where it renders the whole pane
- pane methods on this components mutates the paneCollection array, but this methods are invoke outside by referencing or passing its instance via slots to other outside components. 
---
#### The `pane-system/pane/index.vue` component
- The pane component parse the service data object
it will render a view base on the service configuration.
- #### Methods of pane component
  - [code locator: _ECEE] - emit close
  - [code locator: _OMDL] - spawn a pane modal.
  - [code locator: _SPNP] - spawn a new pane, means insert a new entry on the paneCollections array.
- ### Pane properties and configuration
  - [code locator: _WPRT] - Width property, controlls the width of the pane
---
### Component pane-modal
### Component pane-manager
### Component pane-activator
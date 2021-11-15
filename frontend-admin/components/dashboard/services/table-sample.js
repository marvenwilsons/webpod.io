export default {
  name: 'table-sample',
  description: 'empty',
  userRoleTitle: '',
  body: {
    view: 'dtable', // the name of the view, its a vue component registered globally
    viewConfig: {
      row_operations: ['edit','delete', 'run test'], // todo
      cell_operations: [], // todo
      columns: [], // todo
      column_update_enterface: {}, // todo
      pinned_column: '', // todo
      data_views: [],
      // todo
      source: {
        type: 'csv', // json, csv
        link: 'https://gist.githubusercontent.com/marvenwilsons/f8e09de7fd2b5d0a9ae87bee3c0555dd/raw/1000aba992bd63ef4869a384787a7e2e852550b6/students.csv' 
        // link: 'https://gist.githubusercontent.com/garrettgman/9629323/raw/ee5dfc039fd581cb467cc69c226ea2524913c3d8/deck.csv'
      }
    },
    viewData: [{
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }],
    // viewHooks is used to read properties within the specified view component and sometimes execute view methods
    // each view has its own viewHooks, to know the viewHooks on every views, a documentation will be provided
    viewHooks: `(paneCollection,pane,view) => ({
      onOperation(oName,data,index) {
        console.log(oName,data,index)
      },
      onUpdate({updateURL, context}) {
        console.log('on update')
      },
      onNestedCellClick() {
        console.log('nested cell click.')
      }
    })`,
    paneConfig: {
        width: '1000px',
        title: 'untitled',
    },
    paneHooks: `(paneCollection,pane,view) => ({
      onMount() {
        // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
        // })
        // pane.setPaneLoading(true)
        pane.setPaneTitle(pane.activator)
      },
    })`
  }
}

/**
 * Documentation
 * 
 * Features
    * CSV loading
    * JSON loading
    * Custom Row Operations
    * Custom Cell Operations
    * Custom Update Enterface
    * Column Pinning
    * Cell Updating
    * Data Filter
    * Data Sort
    * Data Views with custom configurations
  
  * Table Types
    * Default
    * Historical (Table for historical data With analysis tools)
 */
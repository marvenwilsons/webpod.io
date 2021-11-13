export default {
  watch: {
    tab(n,o) {
      if(n == 1) {
        this.cellSelectionUpdateMode = true
      } else {
        this.cellSelectionUpdateMode = false
      }

      // if o is not undefined and n is 0 (Cell) scroll to the selected cell
      if(n == 0 && o != undefined) {
        const ct = document.getElementById(this.cellTarget)
        ct.parentElement.classList.add('ve-table-cell-selection')
      }
    },
    selection() {
      // every cell click
      this.tab = 0
    },
    cellSelectionUpdateMode(n,o) {
      const ct = document.getElementById(this.cellTarget)

      if(n /** boolean */) {
        ct.parentElement.classList.add('ve-table-cell-update-bg')
      } else {
        ct.parentElement.classList.remove('ve-table-cell-update-bg')
      }
    },
    cellTarget(n,o) {
      if(o /** string:: id of an element */) {
        const ct = document.getElementById(o)
        ct.parentElement.classList.remove('ve-table-cell-update-bg')
        ct.parentElement.classList.remove('ve-table-cell-selection')
      }
    }
  }
}
export default {
    created() {
        this.currentUid = this.uid()
        const _alert = webpod.dash.alert
        webpod.session.allowOverflow = false

        const data = this.getTileContents()
        if(data) {
            this.project_title = data.title

            if(Object.keys(this.config).includes('editable')) {
                this.editMode = this.config.editable
            } else {
                _alert('Error: Cannot find editable property in viewConfig, defaulting to read only mode.')
                this.editMode = false
            }

            let largestRowEnd = 0
            data.tiles.map(item => {
                item.selected = false
                if(typeof item != 'object') {
                    alert(`Found invalid type inside unitile's viewData it should be an array of objects`)
                    location.reload()
                } else {
                    if(largestRowEnd < item.rowEnd) {
                        largestRowEnd = item.rowEnd
                    }   
                    
                    this.tiles.push(item)
                }
            })

            // default grid settings
            if(data.maxCol) { this.maxCol = data.maxCol }
            if(data.gridGap) { this.gridGap = data.gridGap }
            if(data.gridContainerStyle) { this.gridContainerStyle = data.gridContainerStyle }
            this.maxRows = largestRowEnd + 2

            if(data.gridColumns != undefined) {
                this.gridColumns = data.gridColumns
            } else {
                let col = []
                for(let i = 0; i < this.maxCol; i++) {
                    col.push(`1fr`)
                }
                this.gridColumns = col
            }
            

        } else {
            _alert('Error: unitile data is undefined')
        }
    }
}
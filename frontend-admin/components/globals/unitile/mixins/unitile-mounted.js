export default {
    mounted() {
        
        // bottom alert
        const welcomMsg = webpod.dash.bottomAlert('Welcome to Unitile v-0.1', 'learn more')
        welcomMsg.on('btn-click', () => {
            // show documentation in modal
        })

        // sidebar cog
        const cog = webpod.dash.infoButton.show()
        cog.on('click', () => {
            webpod.dash.modal.show({
                modalTitle: 'GRID SETTINGS',
                viewTrigger: (v) => this.$set(this.modals,'grid_settings',v ? 'show' : 'hide')
            })
        })
        
        // when toggling pane hide the cog
        webpod.session.onPaneToggle = (currentIndex) => {
            if(this.paneIndex != currentIndex) {
                webpod.dash.infoButton.hide()
            } else {
                setTimeout(() => {
                    const x = webpod.dash.infoButton.show()
                    x.on('click', () => {
                        webpod.dash.modal.show({
                            modalTitle: 'GRID SETTINGS',
                        })
                    })
                }, 100)
            }
        }

        // for undo and redo manager
        this.setSessionTrackData(() => {
            return {
                title: this.projectTitle,
                tiles: this.tiles,
                gridGap: this.gridGap,
                maxCol: this.maxCol,
                gridContainerStyle: this.gridContainerStyle,
                tiles_global_style: this.tiles_global_style,
                gridColumns: this.gridColumns,
                gridContainerJustify: this.gridContainerJustify
            }
        })

        // update the specified properties when undo or redo is triggered
        this.session.onUndoRedo = ({tiles, gridGap, maxCol, title, gridColumns, gridContainerStyle, tiles_global_style, gridContainerJustify}) => {
            // data contains the tracked content
            this.changeGridColumn(maxCol)
            this.projectTitle = title
            this.tiles = tiles
            this.gridGap = gridGap
            this.gridContainerStyle = gridContainerStyle
            this.tiles_global_style = tiles_global_style
            this.gridColumns = gridColumns
            this.gridContainerJustify = gridContainerJustify
        }

        // undo redo on msg
        this.session.onMsg = (msg) => {
            webpod.dash.bottomAlert(msg)
        }

        // get all installed apps TODO
        this.apps.all = ['Unitile','Form builder','Simple Slider']

        // default ribbon highlighted option
        this.highlighted_option = this.ribbons[0][0]

        this.removeUnwantedRows()
    }
}
export default {
    data: () => ({
        options: [
            {title: 'Insert text block', d: 'M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z'},
            {title: 'Insert image block', d: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z'},
            {title: 'Insert video block', d: 'M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z'},
            {title: 'Insert app instance block', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20Z'},
            {title: 'Add new layer',d: 'M17,14H19V17H22V19H19V22H17V19H14V17H17V14M11,16L2,9L11,2L20,9L11,16M11,18.54L12,17.75V18C12,18.71 12.12,19.39 12.35,20L11,21.07L2,14.07L3.62,12.81L11,18.54Z' },
            {title: 'Manage layers'},
            {title:'Clone', d: 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'},
            {title:'Remove tile', d: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'},
            {title:'100% h-span', d: 'M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z'}
        ],
        scaleUnits: [
            {title: 'px'},
            {title: '%'},
            {title: 'em'},
            {title: 'vmin'},
            {title: 'vmax'},
            {title: 'cm'},
            {title: 'mm'},
        ],
        disabledOptions: []
    }),
    methods: {
        handleDropDownCommand(cmd,itemIndex,item,tiles) {
            switch(cmd) {
                case 'Add new layer':
                    this.addNewLayer()
                break;
                case 'Manage layers':
                    const modal = webpod.dash.modal.show({
                        modalTitle: 'Layers'
                    })
                break;
                case 'Clone':
                    this.addNewTile(true,itemIndex)
                break;
                case 'Remove tile':
                    if(this.nodeSelectedIndex == itemIndex) {
                        this.nodeSelectedIndex = undefined
                    }
                    
                    tiles = tiles.splice(itemIndex,1)
                    this.addSessionEntry(tiles)
                break;
                case '100% h-span':
                    tiles[itemIndex].colEnd = this.maxCol + 1
                    tiles[itemIndex].colStart = 1
                    this.addSessionEntry(tiles)
                break;
                case '50% h-span':
                    const colEnd = (this.maxCol / 2  + 1) + (tiles[itemIndex].colStart - 1)
                    console.log(colEnd, this.maxCol)
                    if(colEnd - 1 < this.maxCol || colEnd - 1 == this.maxCol) {
                        tiles[itemIndex].colEnd = (this.maxCol / 2  + 1) + (tiles[itemIndex].colStart - 1)
                    } else {
                        webpod.dash.alert('Not enough space to perform 50% horizontal span')
                    }
                    // this.addSessionEntry(tiles)
                    // console.log(tiles[itemIndex].customStyle.span = 4)¸
                break;
                Move
                case 'Move down':
                    this.move('bottom',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                case 'Move up':
                    this.move('top',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                case 'Move left':
                    this.move('left',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                case 'Move right':
                    this.move('right',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                // Dimentions
                case 'Expand height':
                    this.height('add',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                case 'Decrease height':
                    this.height('minus',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                case 'Expand width':
                    this.width('add',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
                case 'Decrease width':
                    this.width('minus',item.id,itemIndex)
                    this.clearSelectedNode()
                break;
            }
        }
    }
}
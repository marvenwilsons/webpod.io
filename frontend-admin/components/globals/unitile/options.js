export default {
    data: () => ({
        options: [
            {title:'Clone', d: 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'},
            {title:'Remove tile', d: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'},
            {title:'100% h-span', d: 'M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z'},
            {title:'50% h-span'},
            {title:'Move down', d: 'M21.5 14.5L16 20L10.5 14.5L11.91 13.09L15 16.17V10.5C15 8 13 6 10.5 6H4V4H10.5C14.09 4 17 6.91 17 10.5V16.17L20.09 13.08L21.5 14.5Z'},
            {title:'Move up', d: 'M21.5 9.5L20.09 10.92L17 7.83V13.5C17 17.09 14.09 20 10.5 20H4V18H10.5C13 18 15 16 15 13.5V7.83L11.91 10.91L10.5 9.5L16 4L21.5 9.5Z'},
            {title:'Move left', d: 'M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z'},
            {title:'Move right', d: 'M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z'},
            {title:'Expand height'},
            {title:'Decrease height'},
            {title:'Expand width'},
            {title:'Decrease width'},
        ],
        disabledOptions: []
    }),
    methods: {
        handleDropDownCommand(cmd,itemIndex,item,tiles) {
            switch(cmd) {
                case 'Clone':
                    this.addNewTile(true,itemIndex)
                break;
                case 'Remove tile':
                    if(this.nodeSelectedIndex == itemIndex) {
                        this.nodeSelectedIndex = undefined
                    }
                    
                    tiles = tiles.splice(itemIndex,1)
                    this.addSessionEntry(tiles)
                    this.refresh()
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
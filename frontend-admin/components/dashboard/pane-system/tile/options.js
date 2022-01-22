export default {
    data: () => ({
        options: [
            {title:'Mark select'},
            {title:'Remove tile', d: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'},
            {title:'100% width', d: 'M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z'},
            {title:'50% width'},
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
                case 'Remove tile':
                    tiles = tiles.splice(itemIndex,1)
                    this.addSessionEntry(tiles)
                    this.refresh()
                break;
                case '100% width':
                    this.width('add',item.id,itemIndex)
                    this.width('add',item.id,itemIndex)
                    this.width('add',item.id,itemIndex)
                    this.width('add',item.id,itemIndex)
                    this.addSessionEntry(tiles)
                break;
                case '50% width':
                    this.width('add',item.id,itemIndex)
                    this.addSessionEntry(tiles)
                break;
                // Move
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
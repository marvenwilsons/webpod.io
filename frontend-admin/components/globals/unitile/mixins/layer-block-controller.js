export default {
    data: () => ({
        layerAndBlockContoller: {
            show: false,
            code: ''
        },
    }),
    methods: {

    },
    mounted() {
        this.layerAndBlockContoller.code = `function(block,layer) {

}`
    }
}
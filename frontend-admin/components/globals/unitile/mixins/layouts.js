export default {
    getLayoutString(screens,containerWidth) {
        /**
         * @param containerWidth int
         * @param screens Array
         * 
         * Purpose
         * - Determines which layout will be used according to the number value of containerWidth
         * - Convert screen keys into int
         * 
         * Notes
         * - 'default' means wide screen or 100% width, or in number is equivalent to Infinity
         */
        let layout = undefined
        Object.keys(screens).map(e => {
            const min = parseFloat(e.split('-')[0])
            const max = parseFloat(e.split('-')[1])
            if(containerWidth >= min && containerWidth <= max) {
                layout = e
            }
        })
        return layout
    },
    getLayoutKeys(screens) {
        return {
            // raw sample output: ['100-700']
            raw: Object.keys(screens),
            // parsed sample output: [100,700]
            parsed: Object.keys(screens).map(e => {
                if(e != 'default') {
                    const min = parseFloat(e.split('-')[0])
                    const max = parseFloat(e.split('-')[1])
                    return [min,max]
                } else {
                    return Infinity
                }
            }),
            // max sample output: [100,200,700]
            max: (Object.keys(screens).map(e => {
                if(e) {
                    const max = parseFloat(e.split('-')[1])
                    return max
                }
            })).sort((a,b) => b-a)

        }
    },
    getLayoutMax(ranges) {
        /**
         * sample input: ['Infinity-700','700-300','300-1'] (MaxMin is the format of ranges)
         * output shoule be: ['Infinity','700','300']
         */

        return ranges.map(range => parseFloat(range.split('-')[0]))
    },
    constructLayoutRange(maxScreenArray) {
        /**
         * @param maxScreenArray array
         * Sample input: [700,400,300,100] <-- each item represents max width's
         * converted into pixels ['700px','400px','300px','100px']
         */

        let resultMinMax = []
        let resultMaxMin = []
        
        maxScreenArray
        .sort((a,b) => b-a)
        .map((e,i) => {
            const prevMax = maxScreenArray[i+1]
            resultMinMax.push( 
                ( (prevMax == undefined ? 1 : prevMax) +'-'+ e )
            )
            resultMaxMin.push( 
                ( e +'-'+ (prevMax == undefined ? 1 : prevMax) )
            )
        })

        /**
         * It will return an object containing the ranges
         * sample output: minMax: ['700-Infinity','400-700','700-300','100-1']
         * sample output: maxMin: ['Infinity-700','700-400','300-700','1-100']
         */
        return {
            minMax: resultMinMax,
            maxMin: resultMaxMin
        }
    },
    getLayoutRange(maxWidth,rangesArray) {
        /**
         * @param maxWidth int
         * @param rangesArray array of strings
         * 
         * sample input maxWidth: 300
         * sample input rangesArray: ['600-Infinity','400-600','1-400'] (format is minMax)
         * sample output base on inputs: '400-600'
         * 
         * output is '400-600' because the maxWidth values 300 belongs in '400-600' range
         */

        const numberfyRangeArray = rangesArray.map(range => {
            return [
                parseFloat(range.split('-')[0]),
                parseFloat(range.split('-')[1])
            ]
        })
        const range = (numberfyRangeArray.map(range => {
            const min = range[0]
            const max = range[1]
            if(maxWidth <= min && maxWidth > max) {
                return `${min}-${max}`
            } else if(maxWidth >= min && max > maxWidth) {
                return `${min}-${max}`
            }
        })).filter(a => a != undefined)

        return range[0]

    },
    flipLayoutRange(layoutRange) {
        /**
         * input type should be string
         * sample input: '700-300'
         * sample output: '300-700'
         */
        return `${layoutRange.split('-')[1]}-${layoutRange.split('-')[0]}`
    },
}
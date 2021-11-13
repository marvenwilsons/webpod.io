function multiInputField_tabIndex_mapping_system (arr) {
    let f = []
    const p = []
    let v = undefined
    arr.map((e,i) => {
        if(e.includes(',')) {
            mode = 'multi'
            const flat = e.split(',')
            arr.splice(i,1,flat)
            const constract_nArr = arr.flat().map((_,ib) => ib  + 1)
            
            p.push({
                startIndex:i,
                digits: flat.length,
            })

            constract_nArr.map((e_a,i_a) => {
                const v = i_a+1
                !f.includes(v) && f.push(v)
            })
        }


        return f
    })

    function recur(opt,arr_set,startAt) {
        const {startIndex,digits} = opt[startAt]
        const digitsTobeInsirted = []
        for(let t = 0; t < digits; t++) {
            const target = startIndex+t
            digitsTobeInsirted.push(arr_set[target])
            arr_set.splice(target,1,'x') 
            const x = arr_set.join(',').replace(/[x]/gm,'').split(',').filter(e => e != "")
            const insertAt = opt[startAt].startIndex
            x.splice(insertAt,0,`${digitsTobeInsirted.join('')}`)
            v = x
        }
        if(opt.length - 1 != startAt) {
            const d = v.map(e => parseInt(e))
            recur(p,d,startAt + 1)
        }
    }

     
    recur(p,f,0)

    p.map(({startIndex,digits}, index) => {
        let spacedby = 0
        if(v[startIndex].length == digits) {
            spacedby = 1
        } else {
            if(v[startIndex].includes('910')) {
                spacedby = null
            } else {
                spacedby = 2
            }
        }

        if(spacedby != null) {
            var regex = `.{1,${spacedby}}`;
            var re = new RegExp(regex,"g");
            const formatedValue = v[startIndex].match(re).join(',')
            v.splice(startIndex,1,formatedValue)
        } else {
            // when the first digit is single and the next is multiple like = '9,10,11'
            let x = v[startIndex].split('')
            x.shift()

            var regex = `.{1,2}`;
            var re = new RegExp(regex,"g");
            const nv = `9,${x.join('').match(re).join(',')}`
            v.splice(startIndex,1,nv)
        }
    })
    
    return v
}

function main(arr) {
    let mode = false
    arr.map(e => {
        if(e.length > 1) {
            mode = true
        }
    })

    if(mode) {
        return multiInputField_tabIndex_mapping_system(arr)
    } else {
        return arr.map((item,index) => `${index + 1}`)
    }
}

module.exports = main
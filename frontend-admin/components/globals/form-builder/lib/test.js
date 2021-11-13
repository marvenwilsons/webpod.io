// const correctify = require('./multiInputField_tabIndex_mapping_system')

// test('Happy path', () => {
//     const op = correctify(['1','2','3','4','5'])
//     expect(op).toEqual(['1','2','3','4','5'])
// })

// test('test 2', () => {
//     const op = correctify(['1','2','4','4','6'])
//     expect(op).toEqual(['1','2','3','4','5'])
// })

// test('test 3', () => {
//     const op = correctify(['1','9','4,5,4','4,6','6'])
//     expect(op).toEqual(['1','2','3,4,5','6,7','8'])
// })

// test('test 4', () => {
//     const op = correctify(['1','2','2,2,2','2,2','8','9','2,11','2', '2,2,2'])
//     expect(op).toEqual(['1','2','3,4,5','6,7','8','9','10,11','12', '13,14,15'])
// })

// test('test 5', () => {
//     const op = correctify(['1,2,3,3','3,3','7,8','3','13','91'])
//     expect(op).toEqual(['1,2,3,4','5,6','7,8','9','10','11'])
// })
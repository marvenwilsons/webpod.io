import { getLayoutRange } from './layouts.js'

if(getLayoutRange(20,['300-500','300-1']) != '300-1') {
    console.error('Test1 fail for get layout range')
}

if(getLayoutRange(200,['300-500','300-1']) != '300-1') {
    console.error('Test2 fail for get layout range')
}

if(getLayoutRange(100,['300-500','300-1']) != '300-1') {
    console.error('Test3 fail for get layout range')
}

if(getLayoutRange(300,['300-500','300-1']) != '300-1') {
    console.error('Test4 fail for get layout range')
}

const test5 = getLayoutRange(400,['300-500','300-1']) 
if(test5 != '300-500') {
    console.error('Test5 fail for get layout range. Output:', test5)
}

const test6 = getLayoutRange(301,['300-500','300-1']) 
if(test6 != '300-500') {
    console.error('Test6 fail for get layout range. Output:', test6)
}

const test7 = getLayoutRange(600,['300-500','300-1']) 
if(test7 != undefined) {
    console.error('Test7 fail for get layout range. Output:', test7)
}
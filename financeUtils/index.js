// import {ExcelFormulas} from './utils.mjs'
// import { getAPR, getRAPR, getRealRate } from './selfUtils.js'

const getRealRate = require('./getRealRate')

// const testCashs = [1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51]
// const result = ExcelFormulas.IRR(testCashs, 0.144)

// const rate = getAPR(0.0005, 30)
// const antRate = getRAPR(rate)

// console.log('rate', rate)
// console.log('antRate', antRate)

const rateObj = {
  'rate-0.00015': getRealRate(0.00015, 'day'),
  'rate-0.0004': getRealRate(0.0004, 'day'),
  'rate-0.00045': getRealRate(0.00045, 'day'),
  'rate-0.0005': getRealRate(0.0005, 'day'),
  'rate-0.0006': getRealRate(0.0006, 'day'),
}

console.log('rateObj', rateObj) 

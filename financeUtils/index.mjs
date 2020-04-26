/** 日利率换算--->年化收益率 */

/**利率名词
 * 1. 名义年利率: APR, annual percentage rate
 * 2. 有效年利率(实际年利率):Real annual interest rate RAPR
 * 3.
 */

/**计息方式
 * 1. 等额本息
 * 2. 等额本金
 * 3. 先息后本
 * 4. 连本带息
 */

import {ExcelFormulas} from './utils.mjs'

const testCashs = [1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51, 1797.51]
const result = ExcelFormulas.IRR(testCashs, 0.144)

console.log('result', result)

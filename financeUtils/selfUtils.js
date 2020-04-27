
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


/**
 * 
 * @param r 
 * @param m 
 */
export const getAPR = (r, m) => {
  return r * m
}

/**
 * 
 * @param r 一个计息周期内的利率
 * @param m 计息周期次数
 * @param P 本金
 * @param I 年利息
 * @param F 年本息和
 */
export const getRAPR = (r, month, P, I, F) => {
  let rAPR = 'isNaN'
  const m = month || 12
  const apr = getAPR(r, m)

  rAPR = (1 + r)**m - 1
  return rAPR
}

/**
 * 
 * @param rate 名义利率
 * @param rateType 利率类型; 'day', 'month', 'year'(默认值)
 * @param cycleNum 计息周期次数
 * @param cycleType 计息周期类型; 'day', 'month'(默认值), 'year'
 */
export const getRealRate = (rate, rateType = 'year', cycleNum = 12, cycleType = 'month') => {
  let realRate = 'isNaN'
  let r = rate
  let m = cycleNum

  // 根据利率类型, 计算出对应的名义年利率
  if (rateType === 'day') {
    r = rate * 365
  } else if (rateType === 'month') {
    r = rate * 12
  } else {
    r = rate
  }

  // // 根据计息周期类型, 计算出计息周期次数
  // if (cycleType) {

  // }

  realRate = (1 + r/m)**m - 1
  return realRate
}
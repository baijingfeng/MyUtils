/**
 * 
 * @param rate 名义利率
 * @param rateType 利率类型; 'day', 'month', 'year'(默认值)
 * @param cycleNum 计息周期次数
 * @param cycleType 计息周期类型; 'day', 'month'(默认值), 'year'
 */
const getRealRate = (rate, rateType = 'year', cycleNum = 12, cycleType = 'month') => {
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

module.exports = getRealRate
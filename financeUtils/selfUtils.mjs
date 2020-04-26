/**
 * 
 * @param r 名义利率
 * @param m 计息周期次数
 * @param P 本金
 * @param I 年利息
 * @param F 年本息和
 */
export const getRAPR = (r, m, P, I, F) => {
  let rAPR = 'isNaN'
  if (P && I) {
    rAPR = I / P
  } else if (r && m) {
    rAPR = (1 + r/m)^m - 1
  } else if (P )
  return rAPR
}
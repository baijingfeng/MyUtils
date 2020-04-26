/**
 * IRR（Internal Rate of Return），内部收益率。(如果你是固定时间投资一笔，那么可以使用excel的IRR函数)
 * XIRR(投资不定时不定金额)
 */

/* Based on
 * - EGM Mathematical Finance class by Enrique Garcia M. <egarcia@egm.co>
 * - A Guide to the PMT, FV, IPMT and PPMT Functions by Kevin (aka MWVisa1)
 */
export const ExcelFormulas = {
	PVIF: function (rate, nper) {
		return Math.pow(1 + rate, nper)
	},

	FVIFA: function (rate, nper) {
		return rate == 0 ? nper : (this.PVIF(rate, nper) - 1) / rate
	},

	PMT: function (rate, nper, pv, fv, type) {
		if (!fv) fv = 0
		if (!type) type = 0

		if (rate == 0) return -(pv + fv) / nper

		var pvif = Math.pow(1 + rate, nper)
		var pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)

		if (type == 1) {
			pmt /= 1 + rate
		}

		return pmt
	},

	IPMT: function (pv, pmt, rate, per) {
		var tmp = Math.pow(1 + rate, per)
		return 0 - (pv * tmp * rate + pmt * (tmp - 1))
	},

	PPMT: function (rate, per, nper, pv, fv, type) {
		if (per < 1 || per >= nper + 1) return null
		var pmt = this.PMT(rate, nper, pv, fv, type)
		var ipmt = this.IPMT(pv, pmt, rate, per - 1)
		return pmt - ipmt
	},

	DaysBetween: function (date1, date2) {
		var oneDay = 24 * 60 * 60 * 1000
		return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
	},

	// Change Date and Flow to date and value fields you use
	XNPV: function (rate, values) {
		var xnpv = 0.0
		var firstDate = new Date(values[0].Date)
		for (var key in values) {
			var tmp = values[key]
			var value = tmp.Flow
			var date = new Date(tmp.Date)
			xnpv += value / Math.pow(1 + rate, this.DaysBetween(firstDate, date) / 365)
		}
		return xnpv
	},

	XIRR: function (values, guess) {
		if (!guess) guess = 0.1

		var x1 = 0.0
		var x2 = guess
		var f1 = this.XNPV(x1, values)
		var f2 = this.XNPV(x2, values)

		for (var i = 0; i < 100; i++) {
			if (f1 * f2 < 0.0) break
			if (Math.abs(f1) < Math.abs(f2)) {
				f1 = this.XNPV((x1 += 1.6 * (x1 - x2)), values)
			} else {
				f2 = this.XNPV((x2 += 1.6 * (x2 - x1)), values)
			}
		}

		if (f1 * f2 > 0.0) return null

		var f = this.XNPV(x1, values)
		if (f < 0.0) {
			var rtb = x1
			var dx = x2 - x1
		} else {
			var rtb = x2
			var dx = x1 - x2
		}

		for (var i = 0; i < 100; i++) {
			dx *= 0.5
			var x_mid = rtb + dx
			var f_mid = this.XNPV(x_mid, values)
			if (f_mid <= 0.0) rtb = x_mid
			if (Math.abs(f_mid) < 1.0e-6 || Math.abs(dx) < 1.0e-6) return x_mid
		}

		return null
	},

	IRR: function (cashFlows, estimatedResult) {
		var result = 'isNAN'
		if (cashFlows != null && cashFlows.length > 0) {
			// check if business startup costs is not zero:
			if (cashFlows[0] != 0) {
				var noOfCashFlows = cashFlows.length
				var sumCashFlows = 0
				// check if at least 1 positive and 1 negative cash flow exists:
				var noOfNegativeCashFlows = 0
				var noOfPositiveCashFlows = 0
				for (var i = 0; i < noOfCashFlows; i++) {
					sumCashFlows += cashFlows[i]
					if (cashFlows[i] > 0) {
						noOfPositiveCashFlows++
					} else {
						if (cashFlows[i] < 0) {
							noOfNegativeCashFlows++
						}
					}
				}

				// at least 1 negative and 1 positive cash flow available?
				if (noOfNegativeCashFlows > 0 && noOfPositiveCashFlows > 0) {
					// set estimated result:
					var irrGuess = 0.1 // default: 10%
					if (!isNaN(estimatedResult)) {
						irrGuess = estimatedResult
						if (irrGuess <= 0) {
							irrGuess = 0.5
						}
					}

					// initialize first IRR with estimated result:
					var irr = 0
					if (sumCashFlows < 0) {
						// sum of cash flows negative?
						irr = -irrGuess
					} else {
						// sum of cash flows not negative
						irr = irrGuess
					}

					// iteration:
					// the smaller the distance, the smaller the interpolation
					// error
					var minDistance = 1e-15

					// business startup costs
					var cashFlowStart = cashFlows[0]
					var maxIteration = 100
					var wasHi = false
					var cashValue = 0
					for (var i = 0; i <= maxIteration; i++) {
						// calculate cash value with current irr:
						cashValue = cashFlowStart // init with startup costs

						// for each cash flow
						for (var j = 1; j < noOfCashFlows; j++) {
							cashValue += cashFlows[j] / Math.pow(1 + irr, j)
						}

						// cash value is nearly zero
						if (Math.abs(cashValue) < 0.01) {
							result = irr
							break
						}

						// adjust irr for next iteration:
						// cash value > 0 => next irr > current irr
						if (cashValue > 0) {
							if (wasHi) {
								irrGuess /= 2
							}
							irr += irrGuess
							if (wasHi) {
								irrGuess -= minDistance
								wasHi = false
							}
						} else {
							// cash value < 0 => next irr < current irr
							irrGuess /= 2
							irr -= irrGuess
							wasHi = true
						}

						// estimated result too small to continue => end
						// calculation
						if (irrGuess <= minDistance) {
							result = irr
							break
						}
					}
				}
			}
		}
		return result
	},
}

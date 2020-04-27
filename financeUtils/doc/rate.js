
// 基础利率表, 百分比值
exports.baseRate = {
	inflationRate: 5.00,// 通货膨胀率

	bankBaseDepositRates: {
		deposit_0: 0.35, // 活期存款
		deposit_3m: 1.10, // 三月定投
		deposit_6m: 1.30, // 一年定投
		deposit_1y: 1.50, // 一年定投
		deposit_3y: 2.75, // 三年定投
	},

	bankBaseLoanRates: {
		loan_1: 4.35, // (0, 1] 贷款
		loan_5: 4.75, // (1, 5] 贷款
		loan_6: 4.90, // (5, +00) 
	},

	bankBaseFundRates: {// 公积金
		loan_1: 2.75, // (0, 5] 公积金贷款
		loan_5: 3.25, // (5, +00) 公积金贷款
	}

}

// 利率表, 百分比值
exports.antBorrowRate = {
	'rate-万1.5': 5.62,
	'rate-万4': 15.62,
	'rate-万4.5': 17.72,
	'rate-万5': 19.86,
	'rate-万6': 24.24,
}

// 利率表, 原始值
exports.antBorrowRate = {
	'rate-0.00015': 0.05614499334922374,
	'rate-0.0004': 0.1561771150770117,
	'rate-0.00045': 0.17719685665897122,
	'rate-0.0005': 0.19856637054653015,
	'rate-0.0006': 0.24237591966916394,
}


function getDay(day) {
	var today = new Date();
	var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
	today.setTime(targetday_milliseconds);
	var tYear = today.getFullYear();
	var tMonth = today.getMonth();
	var tDate = today.getDate();
	tMonth = doHandleMonth(tMonth + 1);
	tDate = doHandleMonth(tDate);
	return tYear + "-" + tMonth + "-" + tDate;
}

function toDay(str) {
	var today = new Date(parseInt(str));
	var tYear = today.getFullYear();
	var tMonth = today.getMonth();
	var tDate = today.getDate();
	tMonth = doHandleMonth(tMonth + 1);
	tDate = doHandleMonth(tDate);
	return tYear + "-" + tMonth + "-" + tDate;
}


function doHandleMonth(month) {
	var m = month;
	if (month.toString().length == 1) {
		m = "0" + month;
	}

	return m;
}

function getDayOnlyDay(day) {
	var today = new Date();
	var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
	today.setTime(targetday_milliseconds);
	var tYear = today.getFullYear();
	var tMonth = today.getMonth();
	var tDate = today.getDate();
	tMonth = doHandleMonth(tMonth + 1);
	tDate = doHandleMonth(tDate);
	return tMonth + "-" + tDate;
}


function getChartDate() {
	var chartdata_1 = []
	for (var n = 6; n >= 0; n--) {
		chartdata_1[6 - n] = getDayOnlyDay(-n)
	}
	return chartdata_1
}

function getChartData(obj) {
	var chartdata_2 = [0, 0, 0, 0, 0, 0, 0]
	var list = obj;
	list.map((item, index) => {
		for (var i = 6; i >= 0; i--) {
			if (toDay(item.date) == getDay(-i)) {
				chartdata_2[6 - i] += parseFloat((parseInt(item.seconds) / 60).toFixed(1));
			}
		}
	})
	return chartdata_2
}

function classify_name(name){
	switch (name) {
		case 'work':
			return '工作';
			break;
		case 'study':
			return '学习';
			break;
		case 'sport':
			return '运动';
			break;
		case 'health':
			return '健康';
			break;
		case 'entertainment':
			return '娱乐';
			break;
	}
}

function getChartData_3(obj) {
	var classify_list = [];
	var chartdata_3 = [];
	var list = obj;

	list.map((item, index) => {
		if (classify_list.indexOf(item.classify) == -1) {
			classify_list.push(item.classify)
		}
	})

	list.map((item) => {
		for (var x=0;x<classify_list.length;x++) {
			if (item.classify == classify_list[x]) {
				if (JSON.stringify(chartdata_3).indexOf(item.classify) == -1) {
					chartdata_3.push({
						name: classify_name(item.classify),
						value: item.seconds
					})
				} else {
					chartdata_3.find((classify_item, classify_index) => {
						if (classify_item.name == classify_name(item.classify)) {
							chartdata_3[classify_index].value += parseInt(item.seconds)
						}
					})
				}
			}
		}
	})
	
	return chartdata_3

}

module.exports = {
	getChartDate: getChartDate,
	getChartData: getChartData,
	getChartData_3: getChartData_3
}

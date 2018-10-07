
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

function toDay(str){
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

function getDayOnlyDay(day){
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


function getChartDate(){
	var chartdata_1 = []
	for(var n=6;n>=0;n--){
	    chartdata_1[6-n] = getDayOnlyDay(-n)
	}
	return chartdata_1
}

function getChartData(obj){
	var chartdata_2 = [0,0,0,0,0,0,0]
	var list = obj;
	list.map((item, index) => {
	  for(var i=6;i>=0;i--){
	    if(toDay(item.date)==getDay(-i)){
	      chartdata_2[6-i]+=parseFloat((parseInt(item.seconds)/60).toFixed(1));
	    }
	  }
	})
	return chartdata_2
}

module.exports = {
	getChartDate: getChartDate,
	getChartData: getChartData
}
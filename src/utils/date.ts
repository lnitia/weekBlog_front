export function getDate(){
    var  date =  new  Date();
    var  seperator1 =  "-" ;
    var  year = date.getFullYear();
    var  month = date.getMonth() + 1;
    var months = ""
    var  strDate = date.getDate();
    var strDates = ''
    if  (month >= 1 && month <= 9) {
      months =  "0"  + month;
    }else{ months = month.toString() }
    if  (strDate >= 0 && strDate <= 9) {
      strDates =  "0"  + strDate;
    }else{ strDates = strDate.toString() }
    var  currentdate = year + seperator1 + months + seperator1 + strDates;
    return  currentdate;
}

export function getWeekNumber(date:string) {
  var dates = date.split("-")
  var y = parseInt(dates[0]);
  var m = parseInt(dates[1]);
  var d = parseInt(dates[2]);
  var targetDay = new Date(y, m - 1, d);
  var year = targetDay.getFullYear();
  var month = targetDay.getMonth();
  var days = targetDay.getDate();
  //那一天是那一年中的第多少天
  for (var i = 1; i < m; i++) {
      days += getMonthDays(year, i);
  }
  //那一年第一天是星期几
  var yearFirstDay = new Date(year, 0, 1).getDay();
  //计算是第几周
  days += yearFirstDay;
  var week = Math.ceil(days / 7);
  return week;
}

function getMonthDays(year:number, month:number) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}
function isLeapYear(year:number) {
  return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

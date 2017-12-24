// 获取最近7天日期
let myDate = new Date()
myDate.setDate(myDate.getDate() - 7)
let dateArray = []
let dateTemp
let flag = 1
for (var i = 0; i < 7; i++) {
  dateTemp = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
  dateArray.push(dateTemp)
  myDate.setDate(myDate.getDate() + flag)
}
export {dateArray}

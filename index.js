/* Your Code Here */
let createEmployeeRecord = function(empArray){
    return {
      firstName: empArray[0],
      familyName: empArray[1],
      title: empArray[2],
      payPerHour: empArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }

  let createEmployeeRecords = function(arrayOfEmps){
    return arrayOfEmps.map(empArray => {
     return createEmployeeRecord(empArray)
    })
  }

  let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
  
    this.timeInEvents.push({ 
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
   // hour: parseInt(dateStamp.slice(11)),
   // date: dateStamp.slice(0,10)
    })
    return this
  }

  let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({ 
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    })
    return this
  }  

  let hoursWorkedOnDate = function(date){
    let inDate = this.timeInEvents.find(key => {
      return key.date === date
      })
    let outDate = this.timeOutEvents.find(key => {
      return key.date === date
      })
    return (outDate.hour - inDate.hour) / 100
  }

  let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

  let findEmployeeByFirstName = function(arrayOfEmps, firstName){
    return arrayOfEmps.find(empRecObj => empRecObj.firstName === firstName)
  }
  
  let calculatePayroll = function(arrayOfEmps){
    return arrayOfEmps.reduce((memo, empRecObj) => {
      return memo + allWagesFor.call(empRecObj)
    }, 0)
  }
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;


const months = [
    {
      value: "0",
      name: "January",
      shortName: "Jan",
    },
    {
      value: "1",
      name: "February",
      shortName: "Feb",
    },
    {
      value: "2",
      name: "March",
      shortName: "Mar",
    },
    {
      value: "3",
      name: "April",
      shortName: "Apr",
    },
    {
      value: "4",
      name: "May",
      shortName: "May",
    },
    {
      value: "5",
      name: "June",
      shortName: "June",
    },
    {
      value: "6",
      name: "July",
      shortName: "July",
    },
    {
      value: "7",
      name: "August",
      shortName: "Aug",
    },
    {
      value: "8",
      name: "September",
      shortName: "Sept",
    },
    {
      value: "9",
      name: "October",
      shortName: "Oct",
    },
    {
      value: "10",
      name: "November",
      shortName: "Nov",
    },
    {
      value: "11",
      name: "December",
      shortName: "Dec",
    },
  ];

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const getMonths = () => months

const getDateFromString = str => new Date(str)

const getYYYYMMDDstringFormat = d => 
  d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);


const toDateString = (d) => {
    var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
    " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    return datestring;
}

const getMessageTime = (str) => {
    var now = new Date();
    const date = getDateFromString(str);
    var Difference_In_Days = now.getDate() - date.getDate();
    if(Difference_In_Days <= 7){
        // get day in words 
        var datestring = days[date.getDay()]+" "+date.getHours() + ":" + date.getMinutes();
        if(Difference_In_Days < 1){
            datestring = "today "+("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        else if(Difference_In_Days >= 1 && Difference_In_Days < 2){
            datestring = "yesterday "+("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        // add time and return
        return datestring 
    }

    // date format
    var datestring = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " +
    ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    return datestring;

}


const getMessageDate = (str) => {
  var now = new Date();
  const date = getDateFromString(str);
  var Difference_In_Days = date.getDate() - now.getDate() ;
  if(Difference_In_Days <= 7){
      // get day in words 
      var datestring =  days[date.getDay()];
      if(Difference_In_Days < 1 && Difference_In_Days > -1){
          datestring = "today";
      }
      else if(Difference_In_Days >= 1 && Difference_In_Days < 2){
          datestring = "tomorrow";
      }else if(Difference_In_Days > -2 && Difference_In_Days < 0){
          datestring = "yesterday";
      }
      // add time and return
      return datestring 
  }

  // date format
  var datestring = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear();

  return datestring;

}

const getMessageTimeHHMM = (str) => {
  var now = new Date();
  const d = getDateFromString(str);
  return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

const DateService = {
   getMonths, toDateString, getMessageTime, getDateFromString, getYYYYMMDDstringFormat,getMessageTimeHHMM,getMessageDate
};

export default DateService;
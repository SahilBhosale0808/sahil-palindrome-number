let dateInputRef = document.querySelector("#user-input");
let showBtnRef = document.querySelector("#check-btn");
let resultRef = document.querySelector("#output");

function reverseString(str) {
  var listOfChars = str.split("");
  var reversedListOfChars = listOfChars.reverse();
  var reversedStr = reversedListOfChars.join("");
  return reversedStr;
}

function isPalindrome(str) {
  var reverse = reverseString(str);
  return str === reverse;
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > dayInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function clickHandler(e) {
  var bdayStr = dateInputRef.value;
  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");
    var date = {
      day: listOfDate[2],
      month: listOfDate[1],
      year: listOfDate[0],
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);
    if (isPalindrome) {
      resultRef.innerText = "Yes! Your birthday is a palindrome !🥳🥳";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      resultRef.innerText = `Your birthday is not a palindrome \nThe nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`;
    }
  }
}

showBtnRef.addEventListener("click", clickHandler);

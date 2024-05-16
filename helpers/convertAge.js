const convertAge = (date) => {
  const [day, month, year] = date.split("-").map(Number);
  const noticeDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const timeDifference = currentDate - noticeDate;
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365;
  const age = Math.floor(timeDifference / millisecondsPerYear);
  return age;
};

module.exports = convertAge;

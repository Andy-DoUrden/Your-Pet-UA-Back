const convertAge = (date) => {
  const currentDate = new Date();
  const noticeDate = new Date(date);
  const timeDifference = currentDate - noticeDate;
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365;
  const age = Math.floor(timeDifference / millisecondsPerYear);
  return age;
};

module.exports = convertAge;

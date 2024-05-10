function ageNotice(age) {
  if (age === "to-1") {
    return { $lt: 1 };
  }

  if (age === "to-2") {
    return { $lt: 2 };
  }

  if (age === "from-2") {
    return { $gte: 2 };
  }

  return null;
}

module.exports = ageNotice;

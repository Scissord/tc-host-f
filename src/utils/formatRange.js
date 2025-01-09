const formatRange = (newDate) => {
  const startDay = String(newDate[0].getDate()).padStart(2, '0');
  const startMonth = String(newDate[0].getMonth() + 1).padStart(2, '0');
  const startYear = newDate[0].getFullYear();
  const startDate = `${startDay}.${startMonth}.${startYear}`;

  const endDay = String(newDate[1].getDate()).padStart(2, '0');
  const endMonth = String(newDate[1].getMonth() + 1).padStart(2, '0');
  const endYear = newDate[1].getFullYear();
  const endDate = `${endDay}.${endMonth}.${endYear}`;

  return `${startDate} - ${endDate}`;
};

export default formatRange;

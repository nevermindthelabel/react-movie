// convert time to hours and minutes
const calcTime = time => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h :${minutes}m`;
};

// convert a number to USD
const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(money);
};

export { calcTime, convertMoney };

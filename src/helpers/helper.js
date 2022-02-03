export const time_convert = (num) => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  if (hours === 0) {
    return minutes + ' Min';
  } else if (minutes === 0) {
    return hours + ' Hour';
  } else {
    return hours + ' Hour ' + minutes + ' Min';
  }
};

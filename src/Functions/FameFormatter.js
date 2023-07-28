export function formatValue(value) {
  var formattedVal = 0;
  if (value.toString().length > 9) {
    formattedVal = value / 1000000000;
    return formattedVal.toFixed(2) + "b";
  }
  if (value.toString().length > 6) {
    formattedVal = value / 1000000;
    return formattedVal.toFixed(2) + "m";
  }
  if (value.toString().length > 3) {
    formattedVal = value / 1000;
    return formattedVal.toFixed(2) + "k";
  }
  return value;
}

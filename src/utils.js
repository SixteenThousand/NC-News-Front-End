/**
 * Converts a time stamp representing time since Epoch to a string
 * representation of it in the current locale.
 *   @param timeSinceEpoch: Number - the time stamp
 *   @param includeTime: Boolean - whether to include the time as well as
 *   the date
*/
export function formatDate(timeSinceEpoch,includeTime) {
  function format2Digits(num) {
    return num.toString().padStart(2,'0');
  }
  const postedDate = new Date(timeSinceEpoch);
  let result = "".concat(
    postedDate.getFullYear(),
    "-",
    format2Digits(postedDate.getMonth()+1),
    "-",
    format2Digits(postedDate.getDate()));
  if(includeTime) {
    result = result.concat(
      " ",
      format2Digits(postedDate.getHours()),
      ":",
      format2Digits(postedDate.getMinutes()));
  }
  return result;
}

/**
 * Makes comparator functions for objects that compares them by a given key.
 * For use in .sort or .toSorted
 * @param key: String - the key to sort by
 */
export function compareByKey(key) {
  return function(a,b) {
    if(a[key] > b[key]) return 1;
    if(a[key] === b[key]) return 0;
    return -1;
  };
}

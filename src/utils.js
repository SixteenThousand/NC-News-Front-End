/**
 * Converts
*/
export function formatDate(timeSinceEpoch) {
  const postedDate = new Date(timeSinceEpoch);
  return "".concat(
    postedDate.getFullYear(),
    "-",
    (postedDate.getMonth()+1).toString().padStart(2,'0'),
    "-",
    postedDate.getDate());
}

export default function parseDateTime(dateField, timeField) {
  // Convert the "date" field to a JavaScript Date object
  const date = new Date(dateField.seconds * 1000 + dateField.nanoseconds / 1000000);

  // Convert the "time" field to a JavaScript Date object
  const time = new Date(timeField.seconds * 1000 + timeField.nanoseconds / 1000000);

  // Combine date and time into a single Date object
  date.setHours(time.getHours(), time.getMinutes(), 0);

  return date; // Return the combined Date object
}

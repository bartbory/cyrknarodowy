export default function dateFormater(date: string) {
  const newDate = new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return newDate;
}

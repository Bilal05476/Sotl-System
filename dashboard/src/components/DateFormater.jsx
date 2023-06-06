export const dateFormater = (dateToFromat) => {
  const date = new Date(dateToFromat);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return <td className="digits">{formattedDate}</td>;
};

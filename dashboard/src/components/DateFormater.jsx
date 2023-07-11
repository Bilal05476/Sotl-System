export const dateFormater = (dateToFromat) => {
  const date = new Date(dateToFromat);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return <td className="digits">{formattedDate}</td>;
};

export const dateFormater2 = (dateToFromat) => {
  const date = new Date(dateToFromat);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

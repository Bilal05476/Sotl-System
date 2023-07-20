export const dateFormater = (dateToFromat) => {
  if (dateToFromat) {
    const date = new Date(dateToFromat);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return <td className="digits">{formattedDate}</td>;
  }
  return <td>---</td>;
};

export const dateFormater2 = (dateToFromat) => {
  if (dateToFromat) {
    const date = new Date(dateToFromat);
    const formattedDate = date.toUTCString();
    return formattedDate.slice(0, 22);
  }
  return "---";
};

export const streamDateFormater = (dateToFromat) => {
  if (dateToFromat) {
    const date = new Date(dateToFromat);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  return "--";
};

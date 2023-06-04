export const convertDate = (oldDate) => {
  const date = new Date(oldDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
export const convertCurrencyToIndian = (amount) => {
  if (!amount) return "-";
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

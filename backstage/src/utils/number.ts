const convertNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(value);
};

export { convertNumber };

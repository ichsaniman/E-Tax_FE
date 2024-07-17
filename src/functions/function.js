export function getMonthValue(monthName) {
  const months = [
    { name: "Januari", value: "01-31" },
    { name: "Februari", value: "02" },
    { name: "Maret", value: "03" },
    { name: "April", value: "04" },
    { name: "Mei", value: "05" },
    { name: "Juni", value: "06" },
    { name: "Juli", value: "07" },
    { name: "Agustus", value: "08" },
    { name: "September", value: "09" },
    { name: "Oktober", value: "10" },
    { name: "November", value: "11" },
    { name: "Desember", value: "12" },
  ];
  const month = months.find((m) => m.name === monthName);
  return month ? month.value : null;
}

export function addZeroInFront() {}

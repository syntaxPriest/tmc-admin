export const handleZero = (e:any) => {
  if (e.target.value.charAt(0) === '0') {
    e.target.value = e.target.value.slice(1);
  }
  if (e.target.value.length === 10) {
    e.target.value = e.target.value.slice(0, 10);
  }
};

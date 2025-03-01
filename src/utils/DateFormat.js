const formatDate = (input) => {
  const date = new Date(input);
  if (isNaN(date)) return 'Invalid Date'; // Handle invalid inputs

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default formatDate;

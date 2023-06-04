const isValidText = (name) => {
  return name.length >= 5;
};

const isValidEmail = (email) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return emailPattern.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phonePattern = /^\d{11}$/;

  return phonePattern.test(phoneNumber);
};

const isValidCVPathLink = (path) => {
  const urlPattern =
    /^(https?|ftp):\/\/([\w.-]+)(\.[\w]+)+(\/[\w\.-]*)*(\?[\w\.-]+=[\w\.-]+(&[\w\.-]+=[\w\.-]+)*)?$/;

  return urlPattern.test(path);
};

const isValidAge = (dateOfBirth) => {
  const today = new Date();
  const dob = new Date(dateOfBirth);

  const timeDiff = Math.abs(today.getTime() - dob.getTime());
  const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

  return age >= 18;
};

const isValidAddress = (address) => {
  return address.length >= 5;
};

const isValidSelect = (selectedId) => {
  return selectedId !== "";
};

const isValidSalary = (salary) => {
  return salary > -1;
};

const isValidStartingDate = (startDate) => {
  const today = new Date();
  const providedDate = new Date(startDate);

  return providedDate.getTime() >= today.getTime();
};

const isValidGender = (gender) => {
  return gender !== "";
};

export default {
  isValidEmail,
  isValidPhoneNumber,
  isValidText,
  isValidCVPathLink,
  isValidAge,
  isValidAddress,
  isValidSalary,
  isValidStartingDate,
  isValidGender,
  isValidSelect,
};

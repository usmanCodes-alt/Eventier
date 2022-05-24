import validator from "validator";

const specialCharacterCheck = (value) => {
  if (
    value.includes("#") ||
    value.includes("$") ||
    value.includes("%") ||
    value.includes("&") ||
    value.includes("'") ||
    value.includes("*") ||
    value.includes("+") ||
    value.includes("-") ||
    value.includes("/") ||
    value.includes("?") ||
    value.includes("^")
  ) {
    return true;
  }
  return false;
};

export const validateEmail = (value) => {
  if (value.length === 0) return false;

  if (value.length > 32) return false;

  // special characters filter
  if (specialCharacterCheck(value)) {
    return false;
  }

  return validator.isEmail(value);
};

export const validatePassword = (value) => {
  if (value.length < 8) return false;

  if (value.length > 32) return false;

  return validator.isStrongPassword(value, {
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
  });
};

export const validateFirstName = (value) => {
  // check if name is empty
  if (value.length === 0) {
    return false;
  }

  if (value.length > 26) {
    return false;
  }
  //check if the first name string contains a number
  const hasNumber = /\d/;
  if (hasNumber.test(value)) {
    return false;
  }

  // check for special characters
  if (
    specialCharacterCheck(value) ||
    value.includes("_") ||
    value.includes("@")
  ) {
    return false;
  }

  return true;
};

export const validateCountry = (value) => {
  if (!value) {
    return;
  }

  if (value.length === 0) {
    return false;
  }
  //check if the first name string contains a number
  const hasNumber = /\d/;
  if (hasNumber.test(value)) {
    return false;
  }

  // check for special characters
  if (
    specialCharacterCheck(value) ||
    value.includes("_") ||
    value.includes("@")
  ) {
    return false;
  }

  return true;
};

export const validateStoreName = (value) => {
  if (value.length < 3) return false;

  if (value.length > 32) return false;

  return true;
};

export const validatePhoneNumber = (value) => {
  return validator.isMobilePhone(value, ["en-PK"]);
};

export const validateServiceName = (value) => {
  if (value.length < 3) return false;

  if (value.length > 32) return false;

  if (specialCharacterCheck(value)) {
    return false;
  }

  return true;
};

export const validateServiceType = (value) => {
  if (value.length === 0) {
    return false;
  }

  return true;
};

export const validateServiceUnitPrice = (value) => {
  if (!value) return;

  if (value.length === 0) return false;

  if (value.length > 16) return false;

  if (specialCharacterCheck(String(value))) return false;

  if (Number(value) < 0) return false;

  return true;
};

export const validateDescription = (value) => {
  if (value.length === 0) return false;

  if (value.length > 500) return false;

  return true;
};

export const validateStreet = (value) => {
  if (value.length === 0) return false;

  if (value.length > 32) return false;

  //check if the first name string contains a number
  const hasNumber = /\d/;
  if (hasNumber.test(value)) {
    return false;
  }

  if (specialCharacterCheck(value)) return false;

  return true;
};

export const validateCity = (value) => {
  if (value.length === 0) return false;

  if (value.length > 32) return false;

  //check if the first name string contains a number
  const hasNumber = /\d/;
  if (hasNumber.test(value)) {
    return false;
  }

  if (specialCharacterCheck(value)) return false;

  return true;
};

export const validateProvince = (value) => {
  if (value.length === 0) return false;

  if (value.length > 32) return false;

  //check if the first name string contains a number
  const hasNumber = /\d/;
  if (hasNumber.test(value)) {
    return false;
  }

  if (specialCharacterCheck(value)) return false;

  return true;
};

export const validateServiceStatus = (value) => {
  // if (value !== "active" || value !== "in-active") return false;

  // return true;
  if (value === "active") return true;

  if (value === "in-active") return true;

  return false;
};

export const validateDiscount = (value) => {
  if (!value) return;

  if (value.length === 0) return false;

  if (value.length > 2) return false;

  if (specialCharacterCheck(String(value))) return false;

  if (Number(value) < 0) return false;

  return true;
};

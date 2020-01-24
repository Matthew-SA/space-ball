const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateStatInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  if (Validator.isEmpty(data.username)) {
    errors.username = "Stat Username is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

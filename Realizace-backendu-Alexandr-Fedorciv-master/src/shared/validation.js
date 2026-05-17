const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;

const ajv = new Ajv();
addFormats(ajv);

function validate(schema, dtoIn) {
  const valid = ajv.validate(schema, dtoIn);
  return { valid, errors: ajv.errors };
}

function rejectInvalidDto(res, errors) {
  res.status(400).json({
    code: "dtoInIsNotValid",
    message: "dtoIn is not valid",
    validationError: errors,
  });
}

module.exports = { validate, rejectInvalidDto };

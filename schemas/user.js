const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .message("Недійсна електронна адреса. Укажіть дійсну адресу електронної пошти із розширенням .com, .net або .org")
    .required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .message(
      "Недійсний формат пароля. Будь ласка, переконайтеся, що ваш пароль: містить принаймні 6 символів, не більше 16 символів, містить принаймні одну цифру, містить принаймні одну малу літеру, містить принаймні одну велику літеру."
    )
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .message("Invalid Email. Please provide a valid email ending .com, .net or .org")
    .required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .message(
      "Invalid password format. Please make sure your password: is at least 6 characters long, is at most 16 characters long, - contains at least one digit, contains at least one lowercase letter, contains at least one uppercase letter."
    )
    .required(),
});

const usersSchema = Joi.object({
  avatarURL: Joi.string(),
  name: Joi.string().min(2).max(16),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .message("Invalid Email. Please provide a valid email ending .com, .net or .org"),
  date: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .message("Date is required. Invalid date of birth format. Please enter a valid date in the format dd-mm-yyyy.")
    .required(),
  phone: Joi.string()
    .pattern(/^\+\d{12}$/)
    .message("Please enter valid phone +000000000000")
    .required(),
  city: Joi.string()
    .pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
    .messages({
      "string.pattern.base": "Location must be in a valid city format",
      "any.required": "Location is required. Please provide a location in city format.",
    })
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  usersSchema,
};

module.exports = {
  schemas,
};

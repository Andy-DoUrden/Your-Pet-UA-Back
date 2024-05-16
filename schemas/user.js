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
    .message("Недійсна електронна адреса. Укажіть дійсну електронну адресу із розширенням .com, .net або .org")
    .required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .message(
      "Недійсний формат пароля. Будь ласка, переконайтеся, що ваш пароль: містить принаймні 6 символів, не більше 16 символів, - містить принаймні одну цифру, містить принаймні одну малу літеру, містить принаймні одну велику літеру."
    )
    .required(),
});

const usersSchema = Joi.object({
  avatarURL: Joi.string(),
  name: Joi.string().min(2).max(16),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .message("Недійсна електронна адреса. Укажіть дійсну електронну адресу із розширенням .com, .net або .org"),
  date: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .message("Необхідно вказати дату. Недійсний формат дати народження. Введіть дійсну дату у форматі дд-мм-рррр.")
    .required(),
  phone: Joi.string()
    .pattern(/^\+\d{12}$/)
    .message("Введіть дійсний телефон +000000000000")
    .required(),
  city: Joi.string()
    .pattern(/^([А-ЩЬЮЯҐЄІЇа-щьюяґєіїьі0-9'-]+\s?){1,}$/iu)
    .messages({
      "string.pattern.base": "Розташування має бути в дійсному форматі міста",
      "any.required": "Необхідно вказати місцезнаходження. Будь ласка, вкажіть розташування у форматі міста.",
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

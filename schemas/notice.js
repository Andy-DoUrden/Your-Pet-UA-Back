const joi = require("joi");

const addNotice = joi.object({
  title: joi.string().required().messages({
    "any.required": "Необхідно вказати заголовок. Будь ласка, вкажіть заголовок для додавання.",
  }),
  category: joi.string().required().valid("sell", "lost-found", "in-good-hands").messages({
    "any.required": "Необхідно вказати категорію. Будь ласка, вкажіть категорію для додавання.",
  }),
  name: joi.string().required().min(2).max(16).messages({
    "any.required": "Необхідно вказати ім'я. Будь ласка, вкажіть ім'я для додавання.",
  }),
  date: joi
    .string()
    .required()
    .regex(/^\d{2}-\d{2}-\d{4}$/)
    .messages({
      "any.required": "Необхідно вказати дату. Будь ласка, вкажіть дату народження Вашої тварини.",
    }),
  type: joi.string().required().min(2).max(16).messages({
    "any.required": "Потрібно вказати породу. Будь ласка, вкажіть породу вашої тварини.",
  }),
  sex: joi.string().required().valid("Ч", "Ж").messages({
    "any.only": "Стать має бути або «чоловічою», або «жіночою».",
    "any.required": "Потрібна підписка.",
  }),
  location: joi
    .string()
    .regex(/^([А-ЩЬЮЯҐЄIЇІІа-щьюяґєіїьі]+\s?){1,}$/iu)
    .required()
    .messages({
      "string.pattern.base": "Розташування має бути в дійсному форматі міста",
      "any.required": "Необхідно вказати місцезнаходження. Будь ласка, вкажіть розташування у форматі міста.",
    }),
  price: joi.string().min(1).messages({
    "any.required": "Ціна обов'язкова. Вкажіть, будь ласка, ціну вашого улюбленця.",
  }),
  comments: joi.string(),
  avatarURl: joi.string(),
  owner: joi.string(),
});

module.exports = {
  addNotice,
};

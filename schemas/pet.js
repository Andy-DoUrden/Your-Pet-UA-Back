const joi = require("joi");

const addPet = joi.object({
  name: joi.string().required().messages({
    "any.required": "Необхідно вказати ім'я. Будь ласка, вкажіть ім'я вашої тварини.",
  }),
  date: joi.string().required().messages({
    "any.required": "Необхідно вказати дату. Будь ласка, вкажіть дату народження Вашої тварини.",
  }),
  type: joi.string().required().messages({
    "any.required": "Потрібно вказати породу. Будь ласка, вкажіть породу вашої тварини.",
  }),
  avatarURL: joi.string(),
  comments: joi.string(),
  owner: joi.string(),
});

module.exports = {
  addPet,
};

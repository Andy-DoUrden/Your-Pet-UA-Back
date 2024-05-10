const joi = require("joi");

const addNotice = joi.object({
  title: joi.string().required().messages({
    "any.required": "Title is required. Please provide the Title for add.",
  }),
  category: joi.string().required().valid("sell", "lost-found", "in-good-hands").messages({
    "any.required": "Title is required. Please provide the Title for add.",
  }),
  name: joi.string().required().min(2).max(16).messages({
    "any.required": "Name is required. Please provide the name of your pet.",
  }),
  date: joi
    .string()
    .required()
    .regex(/^\d{2}-\d{2}-\d{4}$/)
    .messages({
      "any.required": "Date is required. Please provide a date of birth of your pet.",
    }),
  type: joi.string().required().min(2).max(16).messages({
    "any.required": "Type is required. Please provide a type of your pet.",
  }),
  sex: joi.string().required().valid("male", "female").messages({
    "any.only": "Sex must be either 'male', or 'female'.",
    "any.required": "Subscription is required.",
  }),
  location: joi
    .string()
    .regex(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
    .required()
    .messages({
      "string.pattern.base": "Location must be in a valid city format",
      "any.required": "Location is required. Please provide a location in city format.",
    }),
  price: joi.string().min(1).messages({
    "any.required": "Price is required. Please provide a price of your pet.",
  }),
  comments: joi.string(),
  avatarURl: joi.string(),
  owner: joi.string(),
});

module.exports = {
  addNotice,
};

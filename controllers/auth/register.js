const User = require("../../models/user");
const bcryptjs = require("bcrypt");
const cntrlWrapper = require("../../helpers/controllerWrapper");
const requestError = require("../../helpers/requestError");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Цей імейл вже використовується");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL:
      "https://thumbs.dreamstime.com/b/no-image-icon-vector-available-picture-symbol-isolated-white-background-suitable-user-interface-element-205805243.jpg",
    date: "01-01-2024",
    phone: "+380000000000",
    city: "Не вказано",
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = {
  register: cntrlWrapper(register),
};

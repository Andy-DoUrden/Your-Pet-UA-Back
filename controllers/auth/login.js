const User = require("../../models/user");
const bcryptjs = require("bcrypt");
const cntrlWrapper = require("../../helpers/controllerWrapper");
const requestError = require("../../helpers/requestError");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(401, "email or password invalid");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    throw requestError(401, "email or password invalid");
  }

  if (user.token) {
    try {
      jwt.verify(user.token, process.env.AUTH_SECRET_KEY);
      return res.json({
        token: user.token,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      const payload = {
        id: user._id,
      };

      const newToken = jwt.sign(payload, process.env.AUTH_SECRET_KEY, {
        expiresIn: "24h",
      });

      await User.findByIdAndUpdate(user._id, { token: newToken });
      return res.json({
        token: newToken,
        name: user.name,
        email: user.email,
      });
    }
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    name: user.name,
    email: user.email,
  });
};

module.exports = {
  login: cntrlWrapper(login),
};

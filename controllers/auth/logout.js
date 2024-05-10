const User = require("../../models/user");
const cntrlWrapper = require("../../helpers/controllerWrapper");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }, { new: true });
  res.json({
    message: "logout success",
  });
};

module.exports = {
  logout: cntrlWrapper(logout),
};

const UserPet = require("../../models/pet");
const path = require("path");
const fs = require("fs/promises");

const { requestError } = require("../../helpers");

const deletePet = async (req, res, next) => {
  const { petId } = req.params;
  const { id } = req.user;

  const pet = await UserPet.findById(petId);
  const ownerId = pet.owner.toString();

  if (ownerId !== id) {
    throw requestError(403, "This pet is not yours");
  }

  const avatarsDir = path.join(__dirname, "../", "../", "public", pet.avatarURL);
  fs.unlink(avatarsDir);

  const result = await UserPet.findByIdAndRemove(petId);
  if (!result) {
    throw requestError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = deletePet;

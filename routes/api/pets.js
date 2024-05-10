const express = require("express");
const { validationMiddleware, authenticate } = require("../../middleware");
const { handleFileUpload } = require("../../middleware/uploadMiddleware");
const schema = require("../../schemas/pet");
const ctrlPet = require("../../controllers/pet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The pet's name
 *         date:
 *           type: string
 *           description: The pet's date
 *         type:
 *           type: string
 *           description: The pet's type
 *         comments:
 *           type: string
 *           description: Comments about the pet
 *         avatarURL:
 *           type: string
 *           description: URL of the pet's avatar
 *         owner:
 *           type: string
 *           description: Owner's ID
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: List all pets of the authenticated user
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     date:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     city:
 *                       type: string
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Server error
 */

router.get("/", authenticate, wrapper(ctrlPet.listPets));

/**
 * @swagger
 * /api/pets/add:
 *   post:
 *     summary: Add a new pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               type:
 *                 type: string
 *               comments:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Bad request, validation failed
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Server error
 */

router.post(
  "/add",
  authenticate,
  handleFileUpload,
  validationMiddleware(schema.addPet),
  wrapper(ctrlPet.addPet)
);

/**
 * @swagger
 * /api/pets/delete/{petId}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the pet to be deleted
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       401:
 *         description: Unauthorized, authentication failed
 *       403:
 *         description: Forbidden, the pet does not belong to the authenticated user
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Server error
 */

router.delete("/delete/:petId", authenticate, wrapper(ctrlPet.deletePet));

module.exports = router;

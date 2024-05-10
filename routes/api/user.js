const express = require("express");
const ctrl = require("../../controllers/user");
const { schemas } = require("../../schemas/user");
const { validationMiddleware, authenticate, uploadMiddleware } = require("../../middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 16
 *         email:
 *           type: string
 *           format: email
 *         date:
 *           type: string
 *         phone:
 *           type: string
 *         city:
 *           type: string

 */

/**
 * @swagger
 * /api/users/updateUser:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 16
 *               email:
 *                 type: string
 *                 format: email
 *               date:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *               avatarURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, validation failed
 *       401:
 *         description: Unauthorized, authentication failed
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.patch(
  "/updateUser",
  authenticate,
  // uploadMiddleware.single("image"),
  validationMiddleware(schemas.usersSchema),
  ctrl.updateUser
);

module.exports = router;

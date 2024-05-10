const express = require("express");
const cntrl = require("../../controllers/auth/");
const { schemas } = require("../../schemas/user");
const { validationMiddleware, authenticate } = require("../../middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization API
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
 *         password:
 *           type: string
 *         date:
 *           type: string
 *         phone:
 *           type: string
 *         city:
 *           type: string
 *         token:
 *           type: string
 *         favoritesArr:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request, user already exists or validation failed
 *       500:
 *         description: Server error
 */

router.post(
  "/register",
  validationMiddleware(schemas.registerSchema),
  cntrl.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request, invalid credentials
 *       401:
 *         description: Unauthorized, incorrect email or password
 *       500:
 *         description: Server error
 */

router.post("/login", validationMiddleware(schemas.loginSchema), cntrl.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized, user not logged in
 *       500:
 *         description: Server error
 */

router.post("/logout", authenticate, cntrl.logout);

module.exports = router;

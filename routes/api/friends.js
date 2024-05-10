const express = require("express");
const getFriends = require("../../controllers/friends/friends");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Friends management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Friend:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the friend
 *         title:
 *           type: string
 *           description: Title of the friend
 *         url:
 *           type: string
 *           description: URL related to the friend
 *         addressUrl:
 *           type: string
 *           description: URL related to the friend's address
 *         imageUrl:
 *           type: string
 *           description: URL of the friend's image
 *         address:
 *           type: string
 *           description: Address of the friend
 *         workDays:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               isOpen:
 *                 type: string
 *                 description: Indicates if the friend is open
 *               from:
 *                 type: string
 *                 description: Opening time
 *               to:
 *                 type: string
 *                 description: Closing time
 *         phone:
 *           type: string
 *           description: Phone number of the friend
 *         email:
 *           type: string
 *           description: Email address of the friend
 */

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Get list of friends
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: A list of friends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Friend'
 *       500:
 *         description: Server error
 */

router.get("/", wrapper(getFriends));

module.exports = router;

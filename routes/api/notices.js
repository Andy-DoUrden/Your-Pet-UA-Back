const express = require("express");
const { validationMiddleware, authenticate } = require("../../middleware");
const { handleFileUpload } = require("../../middleware/uploadMiddleware");
const schema = require("../../schemas/notice");
const ctrlNotice = require("../../controllers/notices");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notices
 *   description: Notice management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notice:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The notice's title
 *         category:
 *           type: string
 *           description: The notice's category
 *         name:
 *           type: string
 *           description: The notice's name
 *         date:
 *           type: string
 *           description: The notice's date
 *         type:
 *           type: string
 *           description: The notice's type
 *         sex:
 *           type: string
 *           description: The notice's sex
 *         location:
 *           type: string
 *           description: The notice's location
 *         price:
 *           type: string
 *           description: The notice's price
 *         comments:
 *           type: string
 *           description: Comments about the notice
 *         avatarURL:
 *           type: string
 *           description: URL of the notice's avatar
 *         owner:
 *           type: string
 *           description: Owner's ID
 */

/**
 * @swagger
 * /api/notices/addNotice:
 *   post:
 *     summary: Add a new notice
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               type:
 *                 type: string
 *               sex:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: string
 *               comments:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Notice added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       404:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */

router.post(
  "/addNotice",
  authenticate,
  handleFileUpload,
  validationMiddleware(schema.addNotice),
  wrapper(ctrlNotice.addNotice)
);

/**
 * @swagger
 * /api/notices/deleteNotice/{noticeId}:
 *   delete:
 *     summary: Delete a notice
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noticeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notice to be deleted
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       403:
 *         description: Not authorized to delete this notice
 *       404:
 *         description: Notice not found
 *       500:
 *         description: Server error
 */

router.delete("/deleteNotice/:noticeId", authenticate, wrapper(ctrlNotice.deleteNotice));

/**
 * @swagger
 * /api/notices/getOne/{noticeId}:
 *   get:
 *     summary: Get a single notice by ID
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: noticeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notice to retrieve
 *     responses:
 *       200:
 *         description: A single notice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       404:
 *         description: Notice not found
 *       500:
 *         description: Server error
 */
router.get("/getOne/:noticeId", wrapper(ctrlNotice.getOne));

/**
 * @swagger
 * /api/notices/myNotices:
 *   get:
 *     summary: Get user's notices
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Filter notices by a search query
 *       - in: query
 *         name: age
 *         schema:
 *           type: string
 *         description: Filter notices by age
 *       - in: query
 *         name: sex
 *         schema:
 *           type: string
 *         description: Filter notices by sex
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of notices per page
 *     responses:
 *       200:
 *         description: A list of user's notices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notice'
 *                 totalCount:
 *                   type: integer
 *       500:
 *         description: Server error
 */

router.get("/myNotices", authenticate, wrapper(ctrlNotice.listMyNotices));

/**
 * @swagger
 * /api/notices/myFavorite:
 *   get:
 *     summary: Get user's favorite notices
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Filter notices by a search query
 *       - in: query
 *         name: age
 *         schema:
 *           type: string
 *         description: Filter notices by age
 *       - in: query
 *         name: sex
 *         schema:
 *           type: string
 *         description: Filter notices by sex
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of notices per page
 *     responses:
 *       200:
 *         description: A list of user's favorite notices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notice'
 *                 totalCount:
 *                   type: integer
 *       500:
 *         description: Server error
 */

router.get("/myFavorite", authenticate, wrapper(ctrlNotice.listFavorite));

/**
 * @swagger
 * /api/notices/favorite/{noticeId}:
 *   patch:
 *     summary: Update user favorites
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noticeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notice to be favorited/unfavorited
 *     responses:
 *       200:
 *         description: Successfully added/removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized, authentication failed
 *       404:
 *         description: User or notice not found
 *       500:
 *         description: Server error
 */

router.patch("/favorite/:noticeId", authenticate, wrapper(ctrlNotice.updateFavorite));

/**
 * @swagger
 * /api/notices/{category}:
 *   get:
 *     summary: Get all notices by category
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of notices to retrieve (sell, in-good-hands, lost-found)
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Filter notices by a search query
 *       - in: query
 *         name: age
 *         schema:
 *           type: string
 *         description: Filter notices by age
 *       - in: query
 *         name: sex
 *         schema:
 *           type: string
 *         description: Filter notices by sex
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of notices per page
 *     responses:
 *       200:
 *         description: A list of notices by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notice'
 *                 totalCount:
 *                   type: integer
 *       404:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */

router.get("/:category", wrapper(ctrlNotice.listNotices));

module.exports = router;

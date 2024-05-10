const express = require("express");
const getNews = require("../../controllers/news/getNews");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API endpoints for retrieving news
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         date:
 *           type: string
 *       required:
 *         - title
 *         - content
 *         - date
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get news based on query parameters
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Search query for news title
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of news items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved news
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 news:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *                 totalCount:
 *                   type: integer
 *       400:
 *         description: Bad request, invalid query parameter
 *       500:
 *         description: Server error
 */

router.get("/", wrapper(getNews));

module.exports = router;

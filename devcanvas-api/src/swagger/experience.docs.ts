/**
 * @swagger
 * components:
 *   securitySchemes:
 *     customAuth:
 *       type: apiKey
 *       in: header
 *       name: auth_token
 *       description: Enter your auth token
 *   schemas:
 *     Experience:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Senior Software Engineer"
 *         company:
 *           type: string
 *           example: "Tech Corp Inc."
 *         location:
 *           type: string
 *           example: "San Francisco, CA"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2022-09-27 18:00:00.000"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2023-09-30 18:00:00.000"
 *         description:
 *           type: string
 *           example: "Developed scalable microservices architecture"
 *
 *     ExperienceCreate:
 *       type: object
 *       required:
 *         - title
 *         - company
 *         - startDate
 *       properties:
 *         title:
 *           type: string
 *         company:
 *           type: string
 *         location:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *
 *     ExperienceUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         company:
 *           type: string
 *         location:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Experience not found or unauthorized"
 */

/**
 * @swagger
 * tags:
 *   name: Experiences
 *   description: User work experience management
 */

/**
 * @swagger
 * /experiences:
 *   get:
 *     summary: Get all experiences for the current user
 *     tags: [Experiences]
 *     security:
 *       - customAuth: []
 *     responses:
 *       200:
 *         description: List of experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Create a new experience for the current user
 *     tags: [Experiences]
 *     security:
 *       - customAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/ExperienceCreate'
 *     responses:
 *       201:
 *         description: Experience created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /experiences/{id}:
 *   put:
 *     summary: Update an experience
 *     tags: [Experiences]
 *     security:
 *       - customAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperienceUpdate'
 *     responses:
 *       200:
 *         description: Experience updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Experience updated successfully"
 *                 experience:
 *                   $ref: '#/components/schemas/Experience'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /experiences/{id}:
 *   delete:
 *     summary: Delete an experience
 *     tags: [Experiences]
 *     security:
 *       - customAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Experience deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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
 *     Education:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         school:
 *           type: string
 *           example: "University of Example"
 *         degree:
 *           type: string
 *           example: "Bachelor of Science"
 *         field:
 *           type: string
 *           example: "Computer Science"
 *         startYear:
 *           type: string
 *           format: date-time
 *           example: "2022-09-27 18:00:00.000"
 *         endYear:
 *           type: string
 *           format: date-time
 *           example: "2023-09-30 18:00:00.000"
 *         description:
 *           type: string
 *           example: "Specialized in Artificial Intelligence"
 *         grade:
 *           type: string
 *           example: "5"
 *
 *     EducationCreate:
 *       type: object
 *       required:
 *         - school
 *         - degree
 *         - field
 *         - startYear
 *       properties:
 *         school:
 *           type: string
 *         degree:
 *           type: string
 *         field:
 *           type: string
 *         startYear:
 *           type: string
 *           format: date-time
 *         endYear:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         grade:
 *           type: string
 *
 *     EducationUpdate:
 *       type: object
 *       properties:
 *         school:
 *           type: string
 *         degree:
 *           type: string
 *         field:
 *           type: string
 *         startYear:
 *           type: string
 *           format: date-time
 *         endYear:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         grade:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Education not found or unauthorized"
 */

/**
 * @swagger
 * tags:
 *   name: Education
 *   description: User education management
 */

/**
 * @swagger
 * /educations:
 *   get:
 *     summary: Get all educations for the current user
 *     tags: [Education]
 *     security:
 *       - customAuth: []
 *     responses:
 *       200:
 *         description: List of educations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /educations:
 *   post:
 *     summary: Create a new education for the current user
 *     tags: [Education]
 *     security:
 *       - customAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationCreate'
 *     responses:
 *       201:
 *         description: Education created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
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
 * /educations/{id}:
 *   put:
 *     summary: Update an education
 *     tags: [Education]
 *     security:
 *       - customAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Education ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationUpdate'
 *     responses:
 *       200:
 *         description: Education updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 education:
 *                   $ref: '#/components/schemas/Education'
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
 * /educations/{id}:
 *   delete:
 *     summary: Delete an education
 *     tags: [Education]
 *     security:
 *       - customAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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

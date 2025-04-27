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
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         profilePicture:
 *           type: string
 *           nullable: true
 *           example: "https://storage.example.com/profile-pictures/abc123.jpg"
 *         location:
 *            type: string
 *            nullable: true
 *            example: "Lahore"
 *         aboutMe:
 *            type: string
 *            nullable: true
 *            example: "I am a developer"
 *         contact:
 *            type: string
 *            nullable: true
 *            example: "090078601"
 *         title:
 *            type: string
 *            nullable: true
 *            example: "Software Devloper"
 *         headline:
 *            type: string
 *            nullable: true
 *            example: "I am developer"
 *         resume:
 *           type: string
 *           nullable: true
 *           example: "https://storage.example.com/resumes/xyz789.pdf"
 *         publishPortfolio:
 *           type: boolean
 *           example: true
 *
 *     ProfileUpdate:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         profilePicture:
 *           type: string
 *           format: binary
 *         resume:
 *           type: string
 *           format: binary
 *         location:
 *            type: string
 *            nullable: true
 *         aboutMe:
 *            type: string
 *            nullable: true
 *         contact:
 *            type: string
 *            nullable: true
 *         title:
 *            type: string
 *            nullable: true
 *         headline:
 *            type: string
 *            nullable: true
 *
 *     PortfolioStatusResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Portfolio status updated successfully"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Unauthorized"
 */

/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [User Profile]
 *     security:
 *       - customAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User Profile]
 *     security:
 *       - customAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               resume:
 *                 type: string
 *                 format: binary
 *               location:
 *                 type: string
 *               aboutMe:
 *                 type: string
 *               contact:
 *                 type: string
 *               title:
 *                 type: string
 *               headline:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /user/toggle-portfolio-status:
 *   patch:
 *     summary: Toggle portfolio publication status
 *     tags: [User Profile]
 *     security:
 *       - customAuth: []
 *     responses:
 *       200:
 *         description: Portfolio status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioStatusResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

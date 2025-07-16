// const express = require('express');
// const router = express.Router();
// const AuthController = require('../controllers/auth.controller');

// router.post('/register', AuthController.register);
// router.post('/login', AuthController.login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { body } = require('express-validator');

router.post(
  '/register',
  [
    body('nombre').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
  ],
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  AuthController.login
);

module.exports = router;

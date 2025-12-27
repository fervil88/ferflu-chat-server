/*
path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controlles/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.post(
  '/new',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
  ],
  login
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;

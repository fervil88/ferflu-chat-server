/*
path: api/messages
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getMessages } = require('../controlles/messages');

const router = Router();
router.get('/:from', validateJWT, getMessages);

module.exports = router;

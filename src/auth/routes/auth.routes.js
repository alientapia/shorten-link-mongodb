const { Router } = require('express');
const { signUp, signIn, perfil } = require('../controllers/auth.controller');
const { verifyToken } = require('../../middlewares/verifyToken');

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/me', verifyToken, perfil);

module.exports = router;

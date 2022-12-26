const { Router } = require('express');
const {
  acortarLink,
  redirectLink,
  homeLink,
} = require('../controllers/urls.controllers');
const { verifyToken } = require('../../middlewares/verifyToken');
const router = Router();

router.post('/', verifyToken, acortarLink);
router.get('/:code', redirectLink);
router.get('/', homeLink);

module.exports = router;

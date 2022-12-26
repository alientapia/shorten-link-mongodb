const { Router } = require('express');
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;

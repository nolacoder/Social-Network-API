const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
 } = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:_id
router
    .route('/:_id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend);


module.exports = router;

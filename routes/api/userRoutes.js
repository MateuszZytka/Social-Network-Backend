const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')

// api/users
router.route('/').get(getUsers).post(createUser)

// api/users/:userId
router.route('/:userId').get(getSingleUser).post(deleteUser).put(updateUser)

// api/users/:userId/friends/:friendId
router.route('/userId/friends/:friendId').get(addFriend).post(deleteFriend)

module.exports = router;

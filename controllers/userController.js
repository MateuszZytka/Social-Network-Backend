const { User } = require('../models')

// TODO: FIX CREATE AND DELETE FRIEND

module.exports = {

    //get all Users
    getUsers(req, res) {
        User.find()
        .then((Users) => res.json(Users))
        .catch((err) => res.status(500).json(err));
    },
    //get a single User
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then((User) => 
                !User
                    ? res.status(404).json({ message: 'No User with that ID' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
    // creatae a User
    createUser(req, res) {
        User.create(req.body)
            .then((User) => res.json(User))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((User) =>
                !User
                    ? res.status(404).json({ message: 'No User with this id!' })
                    : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
    },
    // delete a User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((User) =>
          !User
            ? res.status(404).json({ message: 'No User with that ID' })
            : User.deleteMany({ _id: { $in: User.thoughts } })
        )
        .then(() => res.json({ message: 'Users and Thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // create friend
    addFriend(req, res) {
        console.log(req.params.friendId)
        console.log(req.params.userId)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((User) =>
            !User
                ? res
                    .status(404).json({ message: 'No User found with that Id'})
                    : res.json(User)
                    )
                .catch((err) => res.status(500).json(err));
    },
    // delete friend
    deleteFriend(req, res) {
        
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId} },
            { runValidators: true, new: true }
        )
            .then((User) =>
            !User
                ? res
                    .status(404).json({ message: 'No User found with that Id'})
                    : res.json(User)
                    )
                .catch((err) => res.status(500).json(err));
    }
}
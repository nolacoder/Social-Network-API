const { User, Thought } = require('../models');

// These controllers are used by the userRoutes in the routes/api folder. To make exporting these functions easier they are defined in a module.exports object.

module.exports = {
    // Gets all uers
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Creates a single user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Gets a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params._id })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Could not find a user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Updates a single user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Could not find a user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Deletes a single user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params._id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Could not find a user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Adds a single friend to a user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Could not find a user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Deletes a single friend from a user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Could not find a user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}

const { User, Thought } = require('../models');

// These controllers are used by the thoughtRoutes in the routes/api folder. To make exporting these functions easier they are defined in a module.exports object.

module.exports = {
    // Gets all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Creates a single thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                res.json(thought);
                User.findOneAndUpdate(
                    { username: thought.username },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
            })
            .then()
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Gets a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params._id })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find a thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Updates a single thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'Could not find a thought with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Deletes a single thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params._id })
      .then(() => res.json({ message: 'Thought deleted'}))
      .catch((err) => res.status(500).json(err));
    },
    // Creates a single reaction on a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'Could not find a thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Deletes a single reaction from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'Could not find a thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}

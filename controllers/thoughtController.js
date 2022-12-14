const { User, Thought } = require('../models')

// TODO: PUSH THOUGHT TO USER ARRAY FOR CREATE ROUTE

module.exports = {

    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // creatae a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => 
            User.findOneAndUpdate(
                { _id : req.body.userId },
                { $push: { thoughts : thought._id }},
                { new: true }
            )
        )
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : Thought.deleteMany({ _id: { $in: Thought.reactions } })
        )
        .then(() => res.json({ message: 'Thoughts and reactions deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res
                    .status(404).json({ message: 'No thought found with that Id'})
                    : res.json(thought)
                    )
                .catch((err) => res.status(500).json(err));
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionsId} } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res
                    .status(404).json({ message: 'No thought found with that Id'})
                    : res.json(thought)
                    )
                .catch((err) => res.status(500).json(err));
    }
}
const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers')

// api/thoughts
router.route('/').get(getThoughts).post(createThought)

// api/:thoughtId/:thoughtId
router.route('/:thoughtId').get(getSingleThought).post(deleteThought).put(updateThought)

// api/thoughts/:thoughtId/reactions
router.route('/thoughts/:thoughtId/reactions').get(createReaction).post(deleteReaction)

module.exports = router;
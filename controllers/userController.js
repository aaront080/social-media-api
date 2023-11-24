const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'no userwith this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                username: req.body.username,
                email: req.body.email
            },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`updated: ${results}`);
                } else {
                    console.log(err);
                    res.status(500).json({ message: 'error', err });
                }
            }
        )
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user 
                ? res.status(404).json({ message: 'no user with that ID' })
                : Thought.deleteMany({ username: user.username })
                    .then((thoughts) =>
                        !thoughts
                        ? res.status(404).json({ message: 'no thouhts for that user'})
                        : res.json(user)
                    )
                )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
            .select('-__v')
            .then((user) => {
                return User.findOneAndUpdate (
                    { _id: req.params.userId},
                    {$addToSet: {
                        friends: user._id
                    }},
                    { new: true }
                );
            }).then((user) =>
                !user
                    ? res.status(404).json({ message: 'no user with that ID'})
                    : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
            .select('-__v')
            .then((user) => {
                return User.findOneAndUpdate (
                    { _id: req.params.userId },
                    {$pull: {
                        friends: user._id
                    }},
                    { new: true }
                );
            }).then((user) =>
                !user
                    ? res.status(404).json({ message: 'no user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};
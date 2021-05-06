const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUserList = (req, res) => {
    User.find()
        .select('-salt -hash')
        .exec((err, user) => {
            if (!user) {
                return res.status(404).json({ 'message': 'No users found' });
            } else if (err) {
                return res.status(404).json(err);
            } else {
                return res.status(200).json(user);
            }
        });
};

const getUser = (req, res) => {
    User.findById(req.params.userId)
        .select('-salt -hash')
        .exec((err, user) => {
            if (!user) {
                return res.status(404).json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(404).json(err);
            } else {
                return res.status(200).json(user);
            }
        });
};

const updateUser = (req, res) => {
    if (!req.params.userId) {
        return res.status(404).json({
            'message': 'userId is required',
        });
    }
    User.findById(req.params.userId)
        .select('-salt -hash')
        .exec((err, user) => {
            if (!user) {
                return res.status(404).json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(404).json(err);
            } else {
                (user.name = req.body.name ? req.body.name : user.name),
                    (user.email = req.body.email ? req.body.email : user.email),
                    (user.admin = req.body.admin ? req.body.admin : user.admin),
                    (user.editor = req.body.editor ? req.body.editor : user.editor);
                user.save((err, user) => {
                    if (err) {
                        res.status(404).json(err);
                    } else {
                        res.status(200).json(user);
                    }
                });
            }
        });
};

const deleteUser = (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(404).json({
            'message': 'Not found - userId is required',
        });
    } else {
        User.findByIdAndRemove(userId).exec((err, user) => {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.status(204).json(null);
            }
        });
    }
};

module.exports = {
    getUserList,
    getUser,
    updateUser,
    deleteUser,
};

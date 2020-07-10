const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../Models/User');
const config = require('config');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Enter all fields!' });
    }

    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User doesnot exists' });

        bcrypt.compare(password, user.password).then(
            isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'invalid credentials' });

                jwt.sign(
                    { id: user.id },
                    config.get('jwtsecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                )
            }
        )
    });
});

module.exports = router;

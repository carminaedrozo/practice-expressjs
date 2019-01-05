const {check, validationResult} = require('express-validator/check');

module.exports = {
    addUser: (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            let query = "SELECT * FROM `users`";

            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('index.ejs', {
                    title: 'Customers',
                    users: result,
                    errors: errors
                })
            })

        } else {

            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;

            let query = "INSERT INTO `users` (first_name, last_name, email) VALUES (?,?,?)";
            db.query(query, [first_name, last_name, email], (err, result) => {
                console.log(result);
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });

        }

    },

    deletePlayer: (req, res) => {
        let userId = req.params.id;
        let query = "DELETE FROM `users` WHERE id =" + userId + " ";

        db.query(query, (err, result) => {
            console.log(result);
            res.redirect('/');
        })
    },

    updatePlayer: (req, res) => {
        let userId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;

        let query = "UPDATE `users` SET first_name= ?, last_name = ?, email = ? WHERE id=?";
        db.query(query,[first_name, last_name, email, userId], (err, result) => {
            console.log(result);
            res.redirect('/');
        })
    }
};
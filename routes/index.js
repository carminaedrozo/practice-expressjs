module.exports = {
    getHomepage: (req, res) => {
        let query = "SELECT * FROM `users`";

        db.query(query, (err, result) => {
            res.render('index.ejs', {
                title: 'Customers',
                users: result
            })
        })
    },
    getEditPage: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM `users` WHERE id=" + userId + "";

        db.query(query, (err, result) => {
            console.log(result);
            res.render('editUser.ejs', {
                    title: "Edit User " + result[0].first_name,
                    user: result
                }
            )
        });

    }
};
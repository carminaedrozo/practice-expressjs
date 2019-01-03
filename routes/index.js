module.exports = {
    getHomepage: (req, res) => {
        let query = "SELECT * FROM `users`";

        db.query(query, (err, result) => {
            // if(err){
            //     res.redirect('/');
            // }
            res.render('index.ejs', {
                title: 'Customers',
                users: result
            })
        })
    }
};
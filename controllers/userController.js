const db = require("../models");
const { hash } = require("bcrypt");

module.exports = {

    createUser: function(req, res) {

        let { username, email, mobile, first_name, last_name, password } = req.body;

        if (!username) {
            return res.send({
                success: false,
                error: "Username cannot be blank"
            });
        };

        if (!email) {
            return res.send({
                success: false,
                error: "Email cannot be blank"
            });
        };

        if (!mobile) {
            return res.send({
                success: false,
                error: "Mobile number cannot be blank"
            });
        };

        if (!first_name) {
            return res.send({
                success: false,
                message: "First name cannot be blank"
            });
        };        

        if (!last_name) {
            return res.send({
                success: false,
                message: "Last name cannot be blank"
            });
        };

        if (!password) {
            return res.send({
                success: false,
                message: "Password is required"
            });
        };

        db.Users.findAll({ where: { email: email.toLowerCase(), username: username.toLowerCase() }}).then((previousUsers) => {
            if (previousUsers.length > 0) {
                return res.send("Error: User already exists")
            }

            // Creating new user object
            const newUser = new db.Users();

            // Setting fields for the new user    
            newUser._modelOptions.classMethods.generateHash(password).then((hash) => {
                newUser.username = username.toLowerCase();
                newUser.email = email.toLowerCase();
                newUser.mobile = mobile;
                newUser.first_name = first_name;
                newUser.last_name = last_name;  
                newUser.password = hash;
                newUser.save().then((user) => {
                    console.log("USER", user)
                    return res.send({
                        success: true,
                        message: "Signup successful"
                    });
                }).catch((err) => {
                    console.log(err);
                });
            });

        }).catch((err) => {
            console.log(err);
        });
    },
    
    
    
    // signInUser: function(req, res) {
    //     const { password, email } = req.body;

    //     if (!email) {
    //         return res.send({
    //             success: false,
    //             message: "Error: Please enter a valid email address"
    //         });
    //     };

    //     if (!password) {
    //         return res.send({
    //             success: false,
    //             message: "Error: Please enter your password"
    //         });
    //     };
        
    //     db.Users.findOne({ email: email.toLowerCase() }, (err, users) => {
    //         if (err) {
    //             console.log(err);
    //             return res.send({
    //                 success: false,
    //                 message: "Error: server error"
    //             });
    //         }
    
    //         if (users === null) {
    //             return res.send({
    //                 success: false,
    //                 message: "Invalid Login"
    //             });
    //         }
    
    //         if (!users.validPassword(password)) {
    //             return res.send({
    //                 success: false,
    //                 message: "Invalid Password"
    //             });
    //         }
    
    //         const userSession = new db.UserSession();
    
    //         userSession.userId = users._id;
            
    //         userSession.save((err, doc) => {
    //             if (err) {
    //                 console.log(err);
    //                 return res.send({
    //                     success: false,
    //                     message: "Error: server error"
    //                 });
    //             }
    
    //             console.log("Token created: ", doc._id, "\n");
    //             return res.send({
    //                 success: true,
    //                 message: "Signed in!",
    //                 token: doc._id
    //             });
    //         });
    //     });
    // },


}
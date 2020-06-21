const router = require("express").Router();
const userController = require("../../controllers/userController");

router
    .route("/create-user")
    .post(userController.createUser);

module.exports = router;
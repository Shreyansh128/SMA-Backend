const express = require("express");

const router = express.Router();

const PaymentController = require("../controllers/PaymentController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');





router.post("/createPayment",
    //  authenticateUser , authorizeRoles('admin'),
      PaymentController.createPayment);

router.get("/getPayment",
    //  authenticateUser , authorizeRoles('admin'),
      PaymentController.getPayment);

router.delete("/deletePayment/:id",
    //  authenticateUser , authorizeRoles('admin'),
      PaymentController.deletePayment);


module.exports = router;
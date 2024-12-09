const express = require('express');

const router = express.Router();

const Expenses = require("../models/ExpensesModel");

const ExpensesController = require("../controllers/ExpensesController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/createExpenses",
    //  authenticateUser , authorizeRoles('admin'),
      Expenses.uploadedAvatar, ExpensesController.createExpenses);

router.get("/ViewExpenses",
    //  authenticateUser , authorizeRoles('admin'),
      ExpensesController.ViewExpenses);

router.delete("/deleteExpenses/:id",
    //  authenticateUser , authorizeRoles('admin'),
      ExpensesController.deleteExpenses);

router.put("/updateExpenses/:id",
    //  authenticateUser , authorizeRoles('admin'),
      Expenses.uploadedAvatar, ExpensesController.updateExpenses)



module.exports = router;
const Maintenance = require('../models/MaintenanceModel');
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");
const bcrypt = require('bcrypt');

exports.createMaintenance = async (req, res) => {
    try {
        const { Maintenance_amount, Penalty_Amount, Due_date, lastDate, penaltyAppliedAfterDays, status, Payment_Method, adminId, societyId } = req.body;

        // Check if Admin exists
        // const admin = await Admin.findById(adminId);
        // if (!admin) {
        //     return res.status(404).json({ msg: "Admin not found" });
        // }

        // // Check if Society exists
        // const society = await Society.findById(societyId);
        // if (!society) {
        //     return res.status(404).json({ msg: "Society not found" });
        // }

        const penaltyStartDate = new Date(Due_date);
        penaltyStartDate.setDate(penaltyStartDate.getDate() + penaltyAppliedAfterDays);

        const maintenance = new Maintenance({
            Maintenance_amount,
            Penalty_Amount,
            Due_date,
            lastDate,
            penaltyAppliedAfterDays,
            status,
            Payment_Method,
            adminId,
            societyId,
            penaltyStartDate,
        });

        await maintenance.save();
        res.status(201).json(maintenance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

function calculatePenalty(maintenance) {
    const currentDate = new Date();
    const penaltyStartDate = new Date(maintenance.Due_date);
    penaltyStartDate.setDate(penaltyStartDate.getDate() + maintenance.penaltyAppliedAfterDays);

    console.log("Current Date:", currentDate);
    console.log("Penalty Start Date:", penaltyStartDate);

    if (currentDate > penaltyStartDate) {
        const daysOverdue = Math.floor((currentDate - penaltyStartDate) / (1000 * 60 * 60 * 24));
        console.log("Days Overdue:", daysOverdue);
        const totalPenalty = maintenance.Penalty_Amount * maintenance.penaltyAppliedAfterDays;
        console.log("Total Penalty:", totalPenalty);
        // return daysOverdue * maintenance.Penalty_Amount; 
        return totalPenalty;
    }

    console.log("No penalty applied.");
    return 0;
}

exports.getAllMaintenances = async (req, res) => {
    try {
        const maintenances = await Maintenance.find();

        const updatedMaintenances = maintenances.map(maintenance => ({
            ...maintenance.toObject(),
            calculatedPenalty: calculatePenalty(maintenance),
        }));

        res.status(200).json(updatedMaintenances);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.password_match = async (req, res) => {
    const { password } = req.body; // Extract the plain-text password from the request body
    try {
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Fetch the first admin record from the database
        const admin = await Admin.findOne().select('password');
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        // Compare the plain-text password with the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password does not match" });
        }

        res.status(200).json({ msg: "Password matches" , admin , isMatch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMaintenance = async (req, res) => {
    try{
        const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.json({ msg: "Maintenance updated successfully", maintenance });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.status(200).json({ message: "Maintenance record deleted successfully" , maintenance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
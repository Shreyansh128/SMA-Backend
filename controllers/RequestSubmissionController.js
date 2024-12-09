const Request = require("../models/RequestSubmissionModel");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createRequestSubmission = async(req,res)=>{
    //  console.log(req.body);
     try {
        const { Requester_Name, Request_name, Request_Date, wing, unit, Priority, status} = req.body;
        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if (!Requester_Name || !Request_name) {
            return res.status(400).json({ msg: "Requester_Name and Request_name are required." });
        }

        const newRequest = new Request({ Requester_Name, Request_name, Request_Date, wing, unit, Priority, status });
        await newRequest.save();    
        res.json(newRequest);
    } 
    catch(err){ 
        console.error("Error creating RequestSubmission:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports.getRequestSubmission = async(req, res)=> {
    try{
        const ViewAllRequest = await Request.find();
        res.json(ViewAllRequest);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteRequestSubmission = async(req, res)=> {
    try{
        const { id } = req.params;
        const deleteRequests = await Request.findByIdAndDelete(id);
        if(!deleteRequests){
            return res.status(404).json({ msg : "RequestSubmission data Not Found" });
        }
        res.json({ msg: "RequestSubmission deleted succsessfully", deleteRequests });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }   
}

module.exports.updateRequestSubmission = async(req, res) => {
    try {
        const { id } = req.params;
        const { Requester_Name, Request_name, Request_Date, wing, unit, Priority, status } = req.body;

        const allowedPriorities = ["Low", "Medium", "High"];
        const allowedStatuses = ["Pending", "Open", "Solve"];

        if (Priority && !allowedPriorities.includes(Priority)) {
            return res.status(400).json({ msg: `Invalid value for Priority. Allowed values are: ${allowedPriorities}` });
        }
        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({ msg: `Invalid value for status. Allowed values are: ${allowedStatuses}` });
        }

        const updateRequest = await Request.findByIdAndUpdate( id, { Requester_Name, Request_name, Request_Date, wing, unit, Priority, status }, { new: true } );
        if (!updateRequest) {
            return res.status(404).json({ msg: "RequestSubmission Not Found" });
        }
        res.json({ msg: "RequestSubmission updated successfully", updateRequest });
    } 
    catch(err){
        console.error("Error updating RequestSubmission:", err.message);
        res.status(500).send("Server error, data not updated");
    }
}
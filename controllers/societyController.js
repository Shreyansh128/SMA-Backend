const Society = require("../models/societyModel"); 

module.exports.createSociety = async (req, res) => {
    try {
        const { societyName, address, country, state, city, Zip_code } = req.body;
        let society = await Society.findOne({ societyName });
        if (society) {
            return res.status(400).json({ msg: 'Society already exists' });
        }
        society = new Society({
            societyName,
            address,
            country,
            state,
            city,
            Zip_code
        });
        await society.save();
        res.status(201).json({
            society
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


module.exports.getSociety = async (req, res) => {
    try {
        const ViewAllSociety = await Society.find();
        res.json(ViewAllSociety);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports.deleteSociytey = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSociety = await Society.findByIdAndDelete(id);
        if (!deletedSociety) {
            return res.status(404).json({ msg: "Society data not found" });
        }

        res.json({ msg: "Society deleted successfully", deletedSociety });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports.updateSociety = async (req, res) => {
    try {
        const { id } = req.params;
        const { societyName, address, country, state, city, Zip_code } = req.body;

        const updatedSociety = await Society.findByIdAndUpdate(id, { societyName, address, country, state, city, Zip_code }, { new: true });
        if (!updatedSociety) {
            return res.status(404).json({ msg: "Society data not found" });
        }

        res.json({ msg: "Society updated successfully", updatedSociety });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
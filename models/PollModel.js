const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    Polls :{
        type: String,
        enum: ["Multichoice polls", "Ranking polls" ,"Pating polls", "Numerical polls", "Text polls"],
        required: true
    },
    Question :{
        type: String,
        required: true
    },
    Option_1 :{
        type: String,
        required: true
    },
    Option_2 :{
        type: String,
        required: true
    },
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
    societyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Society',
        required: true
    }
});

const Poll = mongoose.model('Poll', PollSchema);
module.exports = Poll;
const mongoose = require('mongoose');
const ConnectToDB = async (url) => {
    await mongoose.connect(url)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(error => console.log("Error connecting to MongoDB", error));
};

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    balance: {
        type: Number,
        required: true,
        default: 3000 
    }
});

const TransferSchema = new mongoose.Schema({
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
const TransferTable = mongoose.model('TransferTable', TransferSchema);

module.exports = { ConnectToDB, Customer, TransferTable };

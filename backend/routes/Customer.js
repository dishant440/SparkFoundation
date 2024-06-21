const express = require("express");
const router = express.Router();
const { Customer, TransferTable } = require("../database/db");
const mongoose = require("mongoose");



router.get('/history', async (req, res) => {
  try {
    const transferHistory = await TransferTable.aggregate([
      {
        $lookup: {
          from: 'customers', // Name of the Customer collection in MongoDB
          localField: 'fromId', // Field from TransferTable
          foreignField: '_id', // Field from Customer collection
          as: 'fromCustomer' // The new field to add to the transferHistory with the matched customer documents
        }
      },
      {
        $lookup: {
          from: 'customers', // Name of the Customer collection in MongoDB
          localField: 'toId', // Field from TransferTable
          foreignField: '_id', // Field from Customer collection
          as: 'toCustomer' // The new field to add to the transferHistory with the matched customer documents
        }
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          date: 1,
          fromId: 1,
          toId: 1,
          'fromCustomer.name': 1, // Include only the customer name in the response
          'toCustomer.name': 1 // Include only the customer name in the response
        }
      }
    ]);

    return res.json({
      transferHistory
    });
  } catch (error) {
    return res.json({
      error: error.message
    });
  }
});

router.post("/transfer", async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const senderEmail = req.body.sender;

    const receiverEmail = req.body.receiver;
    const amount = req.body.amount;

    const SenderAccount = await Customer.findOne({
      email: senderEmail,
    }).session(session);

    if (!SenderAccount || SenderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance or invalid sender account",
      });
    }

    const ReceiverAccount = await Customer.findOne({
      email: receiverEmail,
    }).session(session);
    if (!ReceiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid receiver account",
      });
    }

    await Customer.updateOne(
      { email: senderEmail },
      { $inc: { balance: -amount } }
    ).session(session);

    await Customer.updateOne(
      { email: receiverEmail },
      { $inc: { balance: amount } }
    ).session(session);

    const transfer = new TransferTable({
      fromId: SenderAccount._id,
      toId: ReceiverAccount._id,
      amount: amount,
    });

    await transfer.save({ session });

    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (session) {
      session.endSession();
    }
  }
});

router.get("/allCustomer", async (req, res) => {
  try {
    const users = await Customer.find({});
   
    res.json({
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

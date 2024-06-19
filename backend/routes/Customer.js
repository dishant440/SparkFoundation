const express = require("express");
const router = express.Router();
const { Customer, TransferTable } = require("../database/db");
const mongoose = require("mongoose");


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

// Get all customers route
router.get("/allCustomer", async (req, res) => {
  try {
    const users = await Customer.find({});
    res.json({
      users: users.map((user) => ({
        email: user.email,
        name: user.name,
        id: user._id,
        balance: user.balance,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

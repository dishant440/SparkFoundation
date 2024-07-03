const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, TransferTable } = require('../database/db'); // Adjust the import according to your setup

router.post("/transfer", async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { sender: senderEmail, receiver: receiverEmail, amount } = req.body;

    const SenderAccount = await Customer.findOne({ email: senderEmail }).session(session);
    if (!SenderAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid sender account" });
    }

    if (SenderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const ReceiverAccount = await Customer.findOne({ email: receiverEmail }).session(session);
    if (!ReceiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid receiver account" });
    }

    await Customer.updateOne(
      { email: senderEmail },
      { $inc: { balance: -amount } },
      { session }
    );

    await Customer.updateOne(
      { email: receiverEmail },
      { $inc: { balance: amount } },
      { session }
    );

    const transfer = new TransferTable({
      fromId: SenderAccount._id,
      toId: ReceiverAccount._id,
      amount: amount,
    });

    await transfer.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transfer successful" });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const userSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  paymentDetails: { type: String },
}, { timestamps: true });

const UserSubscription = mongoose.model("UserSubscription", userSubscriptionSchema);
module.exports = { UserSubscription };
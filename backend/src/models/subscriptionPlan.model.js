const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
  description: { type: String },
}, { timestamps: true });

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
module.exports = { SubscriptionPlan };
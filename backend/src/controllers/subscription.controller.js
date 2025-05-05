const { SubscriptionPlan } = require("../models/subscriptionplan.model");
const { UserSubscription } = require("../models/userSubscription.model");

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { planId, paymentDetails } = req.body;
    const userId = req.user.id;
    
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    
    const subscription = new UserSubscription({
      userId,
      planId,
      paymentDetails,
      startDate,
      endDate,
    });
    
    await subscription.save();
    res.status(201).json({ message: "Subscription created successfully" });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
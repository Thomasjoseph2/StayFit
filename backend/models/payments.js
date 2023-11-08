import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    subscribed_plan: {
      type: String,
      required: true,
    },
    subscribed_plan_id:{
      type: String,
      required: true,
    }
    
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;

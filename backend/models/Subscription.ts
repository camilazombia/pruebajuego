import mongoose, { Schema, models, model } from 'mongoose';

const SubscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    plan: {
      type: String,
      enum: ['plan_10_meses', 'plan_6_meses', 'contado'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'past_due', 'grace_period', 'cancelled'],
      default: 'active',
    },
    stripeCustomerId:     { type: String },
    stripeSubscriptionId: { type: String, sparse: true },
    stripeScheduleId:     { type: String, sparse: true },
    stripePaymentIntentId:{ type: String, sparse: true },
    currentPeriodEnd:     { type: Date },
    gracePeriodEnd:       { type: Date },
  },
  { timestamps: true },
);

export const Subscription = models.Subscription || model('Subscription', SubscriptionSchema);

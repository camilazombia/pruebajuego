import { Schema, models, model } from 'mongoose';

const ChatbotUsageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  dailyUsageMs: { type: Number, default: 0 },
  lastResetDate: { type: Date, default: Date.now },
}, { timestamps: true });

export const ChatbotUsage = models.ChatbotUsage || model('ChatbotUsage', ChatbotUsageSchema);

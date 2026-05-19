import { Schema, models, model } from 'mongoose';

const DailyPracticeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  streak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastCompletedDate: Date,
  totalXP: { type: Number, default: 0 },
  totalActivities: { type: Number, default: 0 },
  completedDays: [{
    date: Date,
    activityType: String,
    score: Number,
    xpEarned: Number,
  }],
}, { timestamps: true });

export const DailyPractice = models.DailyPractice || model('DailyPractice', DailyPracticeSchema);

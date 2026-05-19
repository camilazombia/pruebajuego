import { Schema, models, model } from 'mongoose';

const ProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  progress: [{
    level: String,
    modules: [String],
    completed: { type: Boolean, default: false },
    completedAt: Date,
    examScore: Number,
  }],
  completedResources: [Number],
}, { timestamps: true });

export const Progress = models.Progress || model('Progress', ProgressSchema);

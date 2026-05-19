import { Schema, models, model } from 'mongoose';

const UserProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
  progress: [{
    level: {
      type: String,
      enum: ['Principiante', 'Intermedio', 'Avanzado', 'Master'],
    },
    modules: [String],
  }],
}, { timestamps: true });

export const UserProgress = models.UserProgress || model('UserProgress', UserProgressSchema);

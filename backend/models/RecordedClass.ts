import { Schema, models, model } from 'mongoose';

const RecordedClassSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  driveUrl: String,
  level: { type: String, enum: ['Principiante', 'Intermedio', 'Avanzado', 'General'] },
  date: { type: Date, default: Date.now },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

export const RecordedClass = models.RecordedClass || model('RecordedClass', RecordedClassSchema);

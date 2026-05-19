import { Schema, models, model } from 'mongoose';

const CertificateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: String, enum: ['Principiante', 'Intermedio', 'Avanzado'] },
  title: String,
  description: String,
  issuedAt: { type: Date, default: Date.now },
  pdfUrl: String,
  certificateId: {
    type: String,
    unique: true,
    default: () => `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  },
  status: { type: String, enum: ['pending', 'issued'], default: 'pending' },
}, { timestamps: true });

export const Certificate = models.Certificate || model('Certificate', CertificateSchema);
